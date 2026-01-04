const express = require('express');
const router = express.Router();
const db = require('../database');
const { authenticateToken } = require('../middleware/auth');

// Listar consultores (público)
router.get('/', (req, res) => {
  const { categoria, status, busca, limit = 50, offset = 0 } = req.query;
  
  let query = `
    SELECT c.*, u.email, u.status as user_status
    FROM consultores c
    INNER JOIN users u ON c.user_id = u.id
    WHERE c.status_aprovacao = 'aprovado' AND u.status = 'ativo'
  `;
  const params = [];

  if (categoria) {
    query += ' AND c.categoria = ?';
    params.push(categoria);
  }

  if (status && status !== 'todos') {
    query += ' AND c.status = ?';
    params.push(status);
  }

  if (busca) {
    query += ' AND (c.nome_artistico LIKE ? OR c.especialidade LIKE ?)';
    params.push(`%${busca}%`, `%${busca}%`);
  }

  query += ' ORDER BY c.rating DESC, c.total_avaliacoes DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));

  db.all(query, params, (err, consultores) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar consultores' });
    }

    // Buscar métodos para cada consultor
    const consultoresWithMethods = consultores.map(consultor => {
      return new Promise((resolve) => {
        db.all('SELECT metodo FROM consultor_metodos WHERE consultor_id = ?', [consultor.id], (err, metodos) => {
          resolve({
            ...consultor,
            metodos: metodos ? metodos.map(m => m.metodo) : []
          });
        });
      });
    });

    Promise.all(consultoresWithMethods).then(results => {
      res.json(results);
    });
  });
});

// Buscar consultor por ID (público)
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.get(
    `SELECT c.*, u.email, u.status as user_status
     FROM consultores c
     INNER JOIN users u ON c.user_id = u.id
     WHERE c.id = ? AND c.status_aprovacao = 'aprovado'`,
    [id],
    (err, consultor) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar consultor' });
      }

      if (!consultor) {
        return res.status(404).json({ error: 'Consultor não encontrado' });
      }

      db.all('SELECT metodo FROM consultor_metodos WHERE consultor_id = ?', [id], (err, metodos) => {
        consultor.metodos = metodos ? metodos.map(m => m.metodo) : [];
        res.json(consultor);
      });
    }
  );
});

// Consultores em destaque (home)
router.get('/destaque/home', (req, res) => {
  db.all(
    `SELECT c.*, u.email, u.status as user_status
     FROM consultores c
     INNER JOIN users u ON c.user_id = u.id
     WHERE c.status_aprovacao = 'aprovado' AND u.status = 'ativo' AND c.status = 'online'
     ORDER BY c.rating DESC, c.total_avaliacoes DESC
     LIMIT 6`,
    [],
    (err, consultores) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar consultores' });
      }

      const consultoresWithMethods = consultores.map(consultor => {
        return new Promise((resolve) => {
          db.all('SELECT metodo FROM consultor_metodos WHERE consultor_id = ?', [consultor.id], (err, metodos) => {
            resolve({
              ...consultor,
              metodos: metodos ? metodos.map(m => m.metodo) : []
            });
          });
        });
      });

      Promise.all(consultoresWithMethods).then(results => {
        res.json(results);
      });
    }
  );
});

module.exports = router;

