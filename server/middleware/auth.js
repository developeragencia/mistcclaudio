const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'seu_secret_super_seguro_aqui_mude_em_producao';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

const requireAdmin = (req, res, next) => {
  if (req.user.tipo !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
  }
  next();
};

const requireConsultor = (req, res, next) => {
  if (req.user.tipo !== 'consultor' && req.user.tipo !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado. Apenas consultores.' });
  }
  next();
};

const requireCliente = (req, res, next) => {
  if (req.user.tipo !== 'cliente' && req.user.tipo !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado. Apenas clientes.' });
  }
  next();
};

module.exports = {
  authenticateToken,
  requireAdmin,
  requireConsultor,
  requireCliente,
  JWT_SECRET
};

