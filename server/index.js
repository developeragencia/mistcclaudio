const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Inicializar banco de dados
require('./database');

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/banners', require('./routes/banners'));
app.use('/api/consultores', require('./routes/consultores'));
app.use('/api/consultas', require('./routes/consultas'));
app.use('/api/pagamentos', require('./routes/pagamentos'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/contatos', require('./routes/contatos'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/config', require('./routes/config'));
app.use('/api/upload', require('./routes/upload'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando' });
});

// Servir arquivos estáticos do frontend (após build)
const clientBuildPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  
  // Rota catch-all: serve o index.html para todas as rotas não-API
  app.get('*', (req, res) => {
    // Não servir index.html para rotas da API
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    }
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  if (fs.existsSync(clientBuildPath)) {
    console.log(`Frontend sendo servido a partir de ${clientBuildPath}`);
  } else {
    console.log(`Frontend não encontrado em ${clientBuildPath}. Execute 'npm run build' primeiro.`);
  }
});

module.exports = app;
