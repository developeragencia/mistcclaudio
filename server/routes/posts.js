const express = require('express');
const router = express.Router();
const db = require('../database-adapter');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Listar posts públicos
router.get('/publicos', (req, res) => {
  db.all(
    `SELECT * FROM posts 
     WHERE status = 'publicado' 
     ORDER BY data_publicacao DESC, created_at DESC`,
    [],
    (err, posts) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar posts' });
      }
      res.json(posts);
    }
  );
});

// Listar todos os posts (admin)
router.get('/', authenticateToken, requireAdmin, (req, res) => {
  const { status, busca } = req.query;

  let query = 'SELECT * FROM posts WHERE 1=1';
  const params = [];

  if (status && status !== 'todos') {
    query += ' AND status = ?';
    params.push(status);
  }

  if (busca) {
    query += ' AND (titulo LIKE ? OR categoria LIKE ?)';
    params.push(`%${busca}%`, `%${busca}%`);
  }

  query += ' ORDER BY created_at DESC';

  db.all(query, params, (err, posts) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar posts' });
    }
    res.json(posts);
  });
});

// Buscar post por ID (público)
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM posts WHERE id = ?', [id], (err, post) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar post' });
    }

    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }

    res.json(post);
  });
});

// Criar post (admin)
router.post('/', authenticateToken, requireAdmin, (req, res) => {
  const { titulo, categoria, resumo, conteudo, imagem_capa, status, data_publicacao } = req.body;

  if (!titulo || !conteudo) {
    return res.status(400).json({ error: 'Título e conteúdo são obrigatórios' });
  }

  db.run(
    'INSERT INTO posts (titulo, categoria, resumo, conteudo, imagem_capa, status, data_publicacao) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [titulo, categoria || null, resumo || null, conteudo, imagem_capa || null, status || 'rascunho', data_publicacao || null],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao criar post' });
      }

      db.get('SELECT * FROM posts WHERE id = ?', [this.lastID], (err, post) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao buscar post criado' });
        }
        res.status(201).json(post);
      });
    }
  );
});

// Atualizar post (admin)
router.put('/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { titulo, categoria, resumo, conteudo, imagem_capa, status, data_publicacao } = req.body;

  db.run(
    'UPDATE posts SET titulo = ?, categoria = ?, resumo = ?, conteudo = ?, imagem_capa = ?, status = ?, data_publicacao = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [titulo, categoria || null, resumo || null, conteudo, imagem_capa || null, status, data_publicacao || null, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar post' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }

      db.get('SELECT * FROM posts WHERE id = ?', [id], (err, post) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao buscar post atualizado' });
        }
        res.json(post);
      });
    }
  );
});

// Deletar post (admin)
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM posts WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar post' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }

    res.json({ message: 'Post deletado com sucesso' });
  });
});

module.exports = router;

