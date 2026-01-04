const express = require('express');
const router = express.Router();
const db = require('../database-adapter');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Listar banners ativos (público)
router.get('/ativos', (req, res) => {
  db.all(
    'SELECT * FROM banners WHERE ativo = 1 ORDER BY ordem ASC',
    [],
    (err, banners) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar banners' });
      }
      res.json(banners);
    }
  );
});

// Listar todos os banners (admin)
router.get('/', authenticateToken, requireAdmin, (req, res) => {
  db.all('SELECT * FROM banners ORDER BY ordem ASC', [], (err, banners) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar banners' });
    }
    res.json(banners);
  });
});

// Criar banner (admin)
router.post('/', authenticateToken, requireAdmin, (req, res) => {
  const { titulo, subtitulo, link, imagem, ordem, ativo } = req.body;

  if (!titulo || !imagem) {
    return res.status(400).json({ error: 'Título e imagem são obrigatórios' });
  }

  db.run(
    'INSERT INTO banners (titulo, subtitulo, link, imagem, ordem, ativo) VALUES (?, ?, ?, ?, ?, ?)',
    [titulo, subtitulo || null, link || null, imagem, ordem || 0, ativo !== undefined ? ativo : 1],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao criar banner' });
      }

      db.get('SELECT * FROM banners WHERE id = ?', [this.lastID], (err, banner) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao buscar banner criado' });
        }
        res.status(201).json(banner);
      });
    }
  );
});

// Atualizar banner (admin)
router.put('/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { titulo, subtitulo, link, imagem, ordem, ativo } = req.body;

  db.run(
    'UPDATE banners SET titulo = ?, subtitulo = ?, link = ?, imagem = ?, ordem = ?, ativo = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [titulo, subtitulo || null, link || null, imagem, ordem || 0, ativo !== undefined ? ativo : 1, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar banner' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Banner não encontrado' });
      }

      db.get('SELECT * FROM banners WHERE id = ?', [id], (err, banner) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao buscar banner atualizado' });
        }
        res.json(banner);
      });
    }
  );
});

// Deletar banner (admin)
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM banners WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar banner' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Banner não encontrado' });
    }

    res.json({ message: 'Banner deletado com sucesso' });
  });
});

module.exports = router;

