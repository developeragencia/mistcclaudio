const express = require('express');
const router = express.Router();
const db = require('../database-adapter');
const { authenticateToken, requireConsultor, requireCliente } = require('../middleware/auth');

// Criar consulta (cliente)
router.post('/', authenticateToken, requireCliente, (req, res) => {
  const { consultor_id, duracao, metodo } = req.body;

  if (!consultor_id || !duracao) {
    return res.status(400).json({ error: 'Consultor e duração são obrigatórios' });
  }

  // Buscar preço do consultor
  db.get('SELECT preco_minuto FROM consultores WHERE id = ? AND status_aprovacao = "aprovado"', [consultor_id], (err, consultor) => {
    if (err || !consultor) {
      return res.status(404).json({ error: 'Consultor não encontrado' });
    }

    const valorTotal = consultor.preco_minuto * duracao;

    // Verificar saldo do cliente
    db.get('SELECT saldo FROM users WHERE id = ?', [req.user.id], (err, user) => {
      if (err || !user) {
        return res.status(500).json({ error: 'Erro ao verificar saldo' });
      }

      if (user.saldo < valorTotal) {
        return res.status(400).json({ error: 'Saldo insuficiente. Adicione créditos para continuar.' });
      }

      // Criar consulta
      db.run(
        'INSERT INTO consultas (cliente_id, consultor_id, duracao, valor_total, metodo, status) VALUES (?, ?, ?, ?, ?, ?)',
        [req.user.id, consultor_id, duracao, valorTotal, metodo || null, 'pendente'],
        function(err) {
          if (err) {
            return res.status(500).json({ error: 'Erro ao criar consulta' });
          }

          const consultaId = this.lastID;

          // Debitar saldo do cliente
          db.run('UPDATE users SET saldo = saldo - ? WHERE id = ?', [valorTotal, req.user.id]);

          // Criar transação de débito
          db.run(
            'INSERT INTO transacoes (user_id, tipo, descricao, valor, status) VALUES (?, ?, ?, ?, ?)',
            [req.user.id, 'debito', `Consulta com consultor #${consultor_id}`, valorTotal, 'aprovado']
          );

          // Buscar consulta criada
          db.get('SELECT * FROM consultas WHERE id = ?', [consultaId], (err, consulta) => {
            if (err) {
              return res.status(500).json({ error: 'Erro ao buscar consulta criada' });
            }
            res.status(201).json(consulta);
          });
        }
      );
    });
  });
});

// Listar consultas do cliente
router.get('/cliente', authenticateToken, requireCliente, (req, res) => {
  const { status } = req.query;

  let query = `
    SELECT c.*, 
           cons.nome_artistico, cons.foto_perfil, cons.especialidade,
           u.nome_completo as cliente_nome, u.email as cliente_email
    FROM consultas c
    INNER JOIN consultores cons ON c.consultor_id = cons.id
    INNER JOIN users u ON c.cliente_id = u.id
    WHERE c.cliente_id = ?
  `;
  const params = [req.user.id];

  if (status && status !== 'todos') {
    query += ' AND c.status = ?';
    params.push(status);
  }

  query += ' ORDER BY c.created_at DESC';

  db.all(query, params, (err, consultas) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar consultas' });
    }
    res.json(consultas);
  });
});

// Listar consultas do consultor
router.get('/consultor', authenticateToken, requireConsultor, (req, res) => {
  const { status } = req.query;

  // Buscar ID do consultor
  db.get('SELECT id FROM consultores WHERE user_id = ?', [req.user.id], (err, consultor) => {
    if (err || !consultor) {
      return res.status(404).json({ error: 'Perfil de consultor não encontrado' });
    }

    let query = `
      SELECT c.*, 
             u.nome_completo as cliente_nome, u.email as cliente_email
      FROM consultas c
      INNER JOIN users u ON c.cliente_id = u.id
      WHERE c.consultor_id = ?
    `;
    const params = [consultor.id];

    if (status && status !== 'todos') {
      query += ' AND c.status = ?';
      params.push(status);
    }

    query += ' ORDER BY c.created_at DESC';

    db.all(query, params, (err, consultas) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar consultas' });
      }
      res.json(consultas);
    });
  });
});

// Buscar consulta por ID
router.get('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  db.get(
    `SELECT c.*, 
            cons.nome_artistico, cons.foto_perfil, cons.especialidade,
            u.nome_completo as cliente_nome, u.email as cliente_email
     FROM consultas c
     INNER JOIN consultores cons ON c.consultor_id = cons.id
     INNER JOIN users u ON c.cliente_id = u.id
     WHERE c.id = ?`,
    [id],
    (err, consulta) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar consulta' });
      }

      if (!consulta) {
        return res.status(404).json({ error: 'Consulta não encontrada' });
      }

      // Verificar permissão
      if (req.user.tipo === 'cliente' && consulta.cliente_id !== req.user.id) {
        return res.status(403).json({ error: 'Acesso negado' });
      }

      if (req.user.tipo === 'consultor') {
        db.get('SELECT id FROM consultores WHERE user_id = ?', [req.user.id], (err, consultor) => {
          if (err || !consultor || consulta.consultor_id !== consultor.id) {
            return res.status(403).json({ error: 'Acesso negado' });
          }
          res.json(consulta);
        });
      } else {
        res.json(consulta);
      }
    }
  );
});

// Aceitar consulta (consultor)
router.patch('/:id/aceitar', authenticateToken, requireConsultor, (req, res) => {
  const { id } = req.params;

  db.get('SELECT id FROM consultores WHERE user_id = ?', [req.user.id], (err, consultor) => {
    if (err || !consultor) {
      return res.status(404).json({ error: 'Perfil de consultor não encontrado' });
    }

    db.run(
      'UPDATE consultas SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND consultor_id = ? AND status = ?',
      ['aceita', id, consultor.id, 'pendente'],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Erro ao aceitar consulta' });
        }

        if (this.changes === 0) {
          return res.status(404).json({ error: 'Consulta não encontrada ou já processada' });
        }

        res.json({ message: 'Consulta aceita com sucesso' });
      }
    );
  });
});

// Recusar consulta (consultor)
router.patch('/:id/recusar', authenticateToken, requireConsultor, (req, res) => {
  const { id } = req.params;

  db.get('SELECT id FROM consultores WHERE user_id = ?', [req.user.id], (err, consultor) => {
    if (err || !consultor) {
      return res.status(404).json({ error: 'Perfil de consultor não encontrado' });
    }

    db.serialize(() => {
      // Buscar consulta
      db.get('SELECT * FROM consultas WHERE id = ? AND consultor_id = ?', [id, consultor.id], (err, consulta) => {
        if (err || !consulta || consulta.status !== 'pendente') {
          return res.status(404).json({ error: 'Consulta não encontrada ou já processada' });
        }

        // Atualizar status
        db.run('UPDATE consultas SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', ['recusada', id]);

        // Reembolsar cliente
        db.run('UPDATE users SET saldo = saldo + ? WHERE id = ?', [consulta.valor_total, consulta.cliente_id]);

        // Criar transação de crédito
        db.run(
          'INSERT INTO transacoes (user_id, tipo, descricao, valor, status) VALUES (?, ?, ?, ?, ?)',
          [consulta.cliente_id, 'credito', `Reembolso consulta #${id}`, consulta.valor_total, 'aprovado']
        );

        res.json({ message: 'Consulta recusada e cliente reembolsado' });
      });
    });
  });
});

// Iniciar consulta (consultor)
router.patch('/:id/iniciar', authenticateToken, requireConsultor, (req, res) => {
  const { id } = req.params;

  db.get('SELECT id FROM consultores WHERE user_id = ?', [req.user.id], (err, consultor) => {
    if (err || !consultor) {
      return res.status(404).json({ error: 'Perfil de consultor não encontrado' });
    }

    db.run(
      'UPDATE consultas SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND consultor_id = ? AND status = ?',
      ['em_andamento', id, consultor.id, 'aceita'],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Erro ao iniciar consulta' });
        }

        if (this.changes === 0) {
          return res.status(404).json({ error: 'Consulta não encontrada ou não pode ser iniciada' });
        }

        res.json({ message: 'Consulta iniciada com sucesso' });
      }
    );
  });
});

// Finalizar consulta (consultor)
router.patch('/:id/finalizar', authenticateToken, requireConsultor, (req, res) => {
  const { id } = req.params;

  db.get('SELECT id FROM consultores WHERE user_id = ?', [req.user.id], (err, consultor) => {
    if (err || !consultor) {
      return res.status(404).json({ error: 'Perfil de consultor não encontrado' });
    }

    db.serialize(() => {
      db.get('SELECT * FROM consultas WHERE id = ? AND consultor_id = ?', [id, consultor.id], (err, consulta) => {
        if (err || !consulta) {
          return res.status(404).json({ error: 'Consulta não encontrada' });
        }

        if (consulta.status !== 'em_andamento') {
          return res.status(400).json({ error: 'Consulta não está em andamento' });
        }

        // Finalizar consulta
        db.run('UPDATE consultas SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', ['finalizada', id]);

        // Criar intermediação de pagamento (70% consultor, 30% plataforma)
        const valorConsultor = consulta.valor_total * 0.7;
        const valorPlataforma = consulta.valor_total * 0.3;

        db.run(
          'INSERT INTO intermediacao_pagamentos (consulta_id, consultor_id, valor_consultor, valor_plataforma, valor_total, status) VALUES (?, ?, ?, ?, ?, ?)',
          [id, consultor.id, valorConsultor, valorPlataforma, consulta.valor_total, 'pendente']
        );

        res.json({ message: 'Consulta finalizada com sucesso' });
      });
    });
  });
});

module.exports = router;

