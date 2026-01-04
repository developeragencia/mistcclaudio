const express = require('express');
const router = express.Router();
const db = require('../database-adapter');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Buscar configuração
router.get('/:chave', (req, res) => {
  const { chave } = req.params;

  db.get('SELECT valor FROM configuracoes WHERE chave = ?', [chave], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar configuração' });
    }

    res.json({ chave, valor: row ? row.valor : null });
  });
});

// Buscar todas as configurações
router.get('/', (req, res) => {
  db.all('SELECT chave, valor FROM configuracoes', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar configurações' });
    }

    const configs = {};
    rows.forEach(row => {
      configs[row.chave] = row.valor;
    });

    res.json(configs);
  });
});

// Atualizar configuração (admin)
router.put('/:chave', authenticateToken, requireAdmin, (req, res) => {
  const { chave } = req.params;
  const { valor } = req.body;

  db.run(
    'INSERT OR REPLACE INTO configuracoes (chave, valor, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)',
    [chave, valor],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar configuração' });
      }

      res.json({ chave, valor, message: 'Configuração atualizada com sucesso' });
    }
  );
});

module.exports = router;

