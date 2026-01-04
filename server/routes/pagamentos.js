const express = require('express');
const router = express.Router();
const db = require('../database-adapter');
const { authenticateToken, requireAdmin, requireCliente } = require('../middleware/auth');

// Listar pagamentos do cliente
router.get('/cliente', authenticateToken, requireCliente, (req, res) => {
  db.all(
    `SELECT * FROM pagamentos 
     WHERE user_id = ? 
     ORDER BY created_at DESC`,
    [req.user.id],
    (err, pagamentos) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar pagamentos' });
      }
      res.json(pagamentos);
    }
  );
});

// Listar todos os pagamentos (admin)
router.get('/', authenticateToken, requireAdmin, (req, res) => {
  const { status, forma_pagamento } = req.query;

  let query = 'SELECT p.*, u.nome_completo as usuario_nome FROM pagamentos p INNER JOIN users u ON p.user_id = u.id WHERE 1=1';
  const params = [];

  if (status && status !== 'todos') {
    query += ' AND p.status = ?';
    params.push(status);
  }

  if (forma_pagamento && forma_pagamento !== 'todas') {
    query += ' AND p.forma_pagamento = ?';
    params.push(forma_pagamento);
  }

  query += ' ORDER BY p.created_at DESC';

  db.all(query, params, (err, pagamentos) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar pagamentos' });
    }
    res.json(pagamentos);
  });
});

// Criar pagamento (adicionar créditos)
router.post('/creditos', authenticateToken, requireCliente, (req, res) => {
  const { valor, forma_pagamento } = req.body;

  if (!valor || !forma_pagamento || valor <= 0) {
    return res.status(400).json({ error: 'Valor e forma de pagamento são obrigatórios' });
  }

  db.run(
    'INSERT INTO pagamentos (user_id, tipo, valor, forma_pagamento, status) VALUES (?, ?, ?, ?, ?)',
    [req.user.id, 'creditos', valor, forma_pagamento, 'pendente'],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao criar pagamento' });
      }

      db.get('SELECT * FROM pagamentos WHERE id = ?', [this.lastID], (err, pagamento) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao buscar pagamento criado' });
        }
        res.status(201).json(pagamento);
      });
    }
  );
});

// Aprovar pagamento (admin)
router.patch('/:id/aprovar', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;

  db.serialize(() => {
    db.get('SELECT * FROM pagamentos WHERE id = ?', [id], (err, pagamento) => {
      if (err || !pagamento) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }

      if (pagamento.status !== 'pendente' && pagamento.status !== 'processando') {
        return res.status(400).json({ error: 'Pagamento já foi processado' });
      }

      // Atualizar status
      db.run('UPDATE pagamentos SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', ['aprovado', id]);

      // Se for créditos, adicionar ao saldo
      if (pagamento.tipo === 'creditos') {
        db.run('UPDATE users SET saldo = saldo + ? WHERE id = ?', [pagamento.valor, pagamento.user_id]);

        // Criar transação
        db.run(
          'INSERT INTO transacoes (user_id, tipo, descricao, valor, status) VALUES (?, ?, ?, ?, ?)',
          [pagamento.user_id, 'credito', `Adição de créditos - Pagamento #${id}`, pagamento.valor, 'aprovado']
        );
      }

      res.json({ message: 'Pagamento aprovado com sucesso' });
    });
  });
});

// Rejeitar pagamento (admin)
router.patch('/:id/rejeitar', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { motivo } = req.body;

  db.run(
    'UPDATE pagamentos SET status = ?, rejeicao_motivo = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    ['rejeitado', motivo || null, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao rejeitar pagamento' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }

      res.json({ message: 'Pagamento rejeitado' });
    }
  );
});

module.exports = router;

