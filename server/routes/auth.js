const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database-adapter');
const { JWT_SECRET, authenticateToken } = require('../middleware/auth');

// Login
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    if (user.status === 'bloqueado' || user.status === 'banido') {
      return res.status(403).json({ error: 'Conta bloqueada ou banida' });
    }

    const validPassword = await bcrypt.compare(senha, user.senha);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Buscar dados do consultor se for consultor
    let consultor = null;
    if (user.tipo === 'consultor') {
      db.get('SELECT * FROM consultores WHERE user_id = ?', [user.id], (err, consultorData) => {
        if (!err && consultorData) {
          consultor = consultorData;
        }
        generateToken(user, consultor);
      });
    } else {
      generateToken(user, null);
    }

    function generateToken(user, consultor) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          tipo: user.tipo,
          nome: user.nome_completo
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const userData = {
        id: user.id,
        nome: user.nome_completo,
        email: user.email,
        tipo: user.tipo,
        status: user.status,
        saldo: user.saldo
      };

      if (consultor) {
        userData.consultor = {
          id: consultor.id,
          nome_artistico: consultor.nome_artistico,
          status_aprovacao: consultor.status_aprovacao
        };
      }

      res.json({ token, user: userData });
    }
  });
});

// Registrar Cliente
router.post('/register/cliente', async (req, res) => {
  const { nome_completo, cpf, email, senha } = req.body;

  if (!nome_completo || !cpf || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  if (senha.length < 6) {
    return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' });
  }

  const hashedPassword = await bcrypt.hash(senha, 10);

  db.run(
    'INSERT INTO users (nome_completo, cpf, email, senha, tipo) VALUES (?, ?, ?, ?, ?)',
    [nome_completo, cpf, email, hashedPassword, 'cliente'],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Email ou CPF já cadastrado' });
        }
        return res.status(500).json({ error: 'Erro ao criar usuário' });
      }

      const token = jwt.sign(
        {
          id: this.lastID,
          email: email,
          tipo: 'cliente',
          nome: nome_completo
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        token,
        user: {
          id: this.lastID,
          nome: nome_completo,
          email: email,
          tipo: 'cliente',
          status: 'ativo',
          saldo: 0
        }
      });
    }
  );
});

// Registrar Consultor
router.post('/register/consultor', async (req, res) => {
  const { nome_completo, cpf, email, senha, nome_artistico, especialidade, categoria, preco_minuto, biografia, anos_experiencia, foto_perfil, imagem_capa, metodos } = req.body;

  if (!nome_completo || !cpf || !email || !senha || !nome_artistico || !especialidade || !categoria || !preco_minuto || !biografia || !foto_perfil) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
  }

  if (senha.length < 6) {
    return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' });
  }

  if (biografia.length < 50) {
    return res.status(400).json({ error: 'Biografia deve ter no mínimo 50 caracteres' });
  }

  const hashedPassword = await bcrypt.hash(senha, 10);

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    db.run(
      'INSERT INTO users (nome_completo, cpf, email, senha, tipo) VALUES (?, ?, ?, ?, ?)',
      [nome_completo, cpf, email, hashedPassword, 'consultor'],
      function(err) {
        if (err) {
          db.run('ROLLBACK');
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Email ou CPF já cadastrado' });
          }
          return res.status(500).json({ error: 'Erro ao criar usuário' });
        }

        const userId = this.lastID;

        db.run(
          'INSERT INTO consultores (user_id, nome_artistico, especialidade, categoria, preco_minuto, biografia, anos_experiencia, foto_perfil, imagem_capa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [userId, nome_artistico, especialidade, categoria, preco_minuto, biografia, anos_experiencia || null, foto_perfil, imagem_capa || null],
          function(err) {
            if (err) {
              db.run('ROLLBACK');
              return res.status(500).json({ error: 'Erro ao criar perfil de consultor' });
            }

            const consultorId = this.lastID;

            // Inserir métodos de consulta
            if (metodos && Array.isArray(metodos) && metodos.length > 0) {
              const stmt = db.prepare('INSERT INTO consultor_metodos (consultor_id, metodo) VALUES (?, ?)');
              metodos.forEach(metodo => {
                stmt.run([consultorId, metodo]);
              });
              stmt.finalize();
            }

            db.run('COMMIT');

            const token = jwt.sign(
              {
                id: userId,
                email: email,
                tipo: 'consultor',
                nome: nome_completo
              },
              JWT_SECRET,
              { expiresIn: '7d' }
            );

            res.status(201).json({
              token,
              user: {
                id: userId,
                nome: nome_completo,
                email: email,
                tipo: 'consultor',
                status: 'ativo',
                saldo: 0,
                consultor: {
                  id: consultorId,
                  nome_artistico: nome_artistico,
                  status_aprovacao: 'pendente'
                }
              }
            });
          }
        );
      }
    );
  });
});

// Verificar token
router.get('/verify', authenticateToken, (req, res) => {
  db.get('SELECT * FROM users WHERE id = ?', [req.user.id], (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    let consultor = null;
    if (user.tipo === 'consultor') {
      db.get('SELECT * FROM consultores WHERE user_id = ?', [user.id], (err, consultorData) => {
        if (!err && consultorData) {
          consultor = consultorData;
        }
        sendUserData();
      });
    } else {
      sendUserData();
    }

    function sendUserData() {
      const userData = {
        id: user.id,
        nome: user.nome_completo,
        email: user.email,
        tipo: user.tipo,
        status: user.status,
        saldo: user.saldo
      };

      if (consultor) {
        userData.consultor = {
          id: consultor.id,
          nome_artistico: consultor.nome_artistico,
          status_aprovacao: consultor.status_aprovacao
        };
      }

      res.json({ user: userData });
    }
  });
});

module.exports = router;

