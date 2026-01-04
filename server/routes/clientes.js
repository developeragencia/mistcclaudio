const express = require('express');
const router = express.Router();
const db = require('../database-adapter');
const { authenticateToken, requireCliente } = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// Buscar perfil do cliente
router.get('/perfil', authenticateToken, requireCliente, (req, res) => {
  db.get('SELECT id, nome_completo, cpf, email, tipo, status, saldo FROM users WHERE id = ?', [req.user.id], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar perfil' });
    }

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(user);
  });
});

// Atualizar perfil do cliente
router.put('/perfil', authenticateToken, requireCliente, (req, res) => {
  const { nome_completo, email, senha } = req.body;

  let query = 'UPDATE users SET nome_completo = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  const params = [nome_completo, email, req.user.id];

  if (senha && senha.length >= 6) {
    bcrypt.hash(senha, 10).then(hashedPassword => {
      query = 'UPDATE users SET nome_completo = ?, email = ?, senha = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
      params.splice(2, 0, hashedPassword);
      params[params.length - 1] = req.user.id;

      db.run(query, params, function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Email já está em uso' });
          }
          return res.status(500).json({ error: 'Erro ao atualizar perfil' });
        }

        db.get('SELECT id, nome_completo, cpf, email, tipo, status, saldo FROM users WHERE id = ?', [req.user.id], (err, user) => {
          if (err) {
            return res.status(500).json({ error: 'Erro ao buscar perfil atualizado' });
          }
          res.json(user);
        });
      });
    });
  } else {
    db.run(query, params, function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Email já está em uso' });
        }
        return res.status(500).json({ error: 'Erro ao atualizar perfil' });
      }

      db.get('SELECT id, nome_completo, cpf, email, tipo, status, saldo FROM users WHERE id = ?', [req.user.id], (err, user) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao buscar perfil atualizado' });
        }
        res.json(user);
      });
    });
  }
});

// Buscar transações (carteira)
router.get('/transacoes', authenticateToken, requireCliente, (req, res) => {
  db.all(
    `SELECT * FROM transacoes 
     WHERE user_id = ? 
     ORDER BY created_at DESC`,
    [req.user.id],
    (err, transacoes) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar transações' });
      }
      res.json(transacoes);
    }
  );
});

// Dashboard - Estatísticas do cliente
router.get('/dashboard', authenticateToken, requireCliente, (req, res) => {
  db.get('SELECT COUNT(*) as total FROM consultas WHERE cliente_id = ?', [req.user.id], (err, totalResult) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar estatísticas' });
    }

    db.get('SELECT COUNT(*) as pendentes FROM consultas WHERE cliente_id = ? AND status = ?', [req.user.id, 'pendente'], (err, pendentesResult) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar estatísticas' });
      }

      db.get('SELECT COUNT(*) as finalizadas FROM consultas WHERE cliente_id = ? AND status = ?', [req.user.id, 'finalizada'], (err, finalizadasResult) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao buscar estatísticas' });
        }

        db.get('SELECT COALESCE(SUM(valor_total), 0) as total_gasto FROM consultas WHERE cliente_id = ? AND status IN (?, ?, ?)', 
          [req.user.id, 'finalizada', 'em_andamento', 'aceita'], (err, gastoResult) => {
          if (err) {
            return res.status(500).json({ error: 'Erro ao buscar estatísticas' });
          }

          res.json({
            total_consultas: totalResult.total,
            consultas_pendentes: pendentesResult.pendentes,
            consultas_finalizadas: finalizadasResult.finalizadas,
            total_gasto: gastoResult.total_gasto || 0
          });
        });
      });
    });
  });
});

module.exports = router;

