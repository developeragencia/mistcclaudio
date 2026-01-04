const express = require('express');
const router = express.Router();
const db = require('../database-adapter');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Criar contato (público)
router.post('/', (req, res) => {
  const { nome_completo, email, telefone, assunto, mensagem } = req.body;
  const user_id = req.user ? req.user.id : null;

  if (!nome_completo || !email || !assunto || !mensagem) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
  }

  if (mensagem.length < 10) {
    return res.status(400).json({ error: 'Mensagem deve ter no mínimo 10 caracteres' });
  }

  db.run(
    'INSERT INTO contatos (user_id, nome_completo, email, telefone, assunto, mensagem) VALUES (?, ?, ?, ?, ?, ?)',
    [user_id, nome_completo, email, telefone || null, assunto, mensagem],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao enviar mensagem' });
      }

      db.get('SELECT * FROM contatos WHERE id = ?', [this.lastID], (err, contato) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao buscar contato criado' });
        }
        res.status(201).json(contato);
      });
    }
  );
});

// Listar contatos (admin)
router.get('/', authenticateToken, requireAdmin, (req, res) => {
  const { status } = req.query;

  let query = 'SELECT * FROM contatos WHERE 1=1';
  const params = [];

  if (status && status !== 'todos') {
    query += ' AND status = ?';
    params.push(status);
  }

  query += ' ORDER BY created_at DESC';

  db.all(query, params, (err, contatos) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar contatos' });
    }
    res.json(contatos);
  });
});

// Atualizar status do contato (admin)
router.patch('/:id/status', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status é obrigatório' });
  }

  db.run('UPDATE contatos SET status = ? WHERE id = ?', [status, id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar status' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Contato não encontrado' });
    }

    res.json({ message: 'Status atualizado com sucesso' });
  });
});

// Deletar contato (admin)
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM contatos WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar contato' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Contato não encontrado' });
    }

    res.json({ message: 'Contato deletado com sucesso' });
  });
});

module.exports = router;

