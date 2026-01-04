const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Criar diretórios necessários
const uploadsDir = path.join(__dirname, 'uploads');
const profilesDir = path.join(uploadsDir, 'profiles');
const coversDir = path.join(uploadsDir, 'covers');
const bannersDir = path.join(uploadsDir, 'banners');
const postsDir = path.join(uploadsDir, 'posts');

[uploadsDir, profilesDir, coversDir, bannersDir, postsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Inicializar banco de dados
db.serialize(() => {
  // Tabela de usuários
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_completo TEXT NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    tipo TEXT NOT NULL CHECK(tipo IN ('cliente', 'consultor', 'admin')),
    status TEXT DEFAULT 'ativo' CHECK(status IN ('ativo', 'bloqueado', 'banido')),
    banimento_motivo TEXT,
    saldo REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabela de consultores (extensão de users)
  db.run(`CREATE TABLE IF NOT EXISTS consultores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    nome_artistico TEXT NOT NULL,
    especialidade TEXT NOT NULL,
    categoria TEXT NOT NULL,
    preco_minuto REAL NOT NULL,
    biografia TEXT NOT NULL,
    anos_experiencia INTEGER,
    foto_perfil TEXT,
    imagem_capa TEXT,
    status TEXT DEFAULT 'offline' CHECK(status IN ('online', 'ocupado', 'offline', 'indisponivel')),
    status_aprovacao TEXT DEFAULT 'pendente' CHECK(status_aprovacao IN ('pendente', 'aprovado', 'rejeitado')),
    rating REAL DEFAULT 0,
    total_avaliacoes INTEGER DEFAULT 0,
    pix_tipo TEXT,
    pix_chave TEXT,
    pix_nome TEXT,
    pix_cpf TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`);

  // Tabela de métodos de consulta
  db.run(`CREATE TABLE IF NOT EXISTS consultor_metodos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    consultor_id INTEGER NOT NULL,
    metodo TEXT NOT NULL CHECK(metodo IN ('audio_chat', 'telefone_whatsapp', 'video', 'email_gravacao')),
    FOREIGN KEY (consultor_id) REFERENCES consultores(id) ON DELETE CASCADE
  )`);

  // Tabela de consultas
  db.run(`CREATE TABLE IF NOT EXISTS consultas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    consultor_id INTEGER NOT NULL,
    duracao INTEGER NOT NULL,
    valor_total REAL NOT NULL,
    metodo TEXT,
    status TEXT DEFAULT 'pendente' CHECK(status IN ('pendente', 'aceita', 'recusada', 'em_andamento', 'finalizada', 'cancelada')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES users(id),
    FOREIGN KEY (consultor_id) REFERENCES consultores(id)
  )`);

  // Tabela de avaliações
  db.run(`CREATE TABLE IF NOT EXISTS avaliacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    consulta_id INTEGER NOT NULL UNIQUE,
    cliente_id INTEGER NOT NULL,
    consultor_id INTEGER NOT NULL,
    nota INTEGER NOT NULL CHECK(nota >= 1 AND nota <= 5),
    comentario TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (consulta_id) REFERENCES consultas(id),
    FOREIGN KEY (cliente_id) REFERENCES users(id),
    FOREIGN KEY (consultor_id) REFERENCES consultores(id)
  )`);

  // Tabela de pagamentos
  db.run(`CREATE TABLE IF NOT EXISTS pagamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    consulta_id INTEGER,
    tipo TEXT NOT NULL CHECK(tipo IN ('consulta', 'creditos', 'pacote', 'plano', 'assinatura')),
    valor REAL NOT NULL,
    forma_pagamento TEXT NOT NULL CHECK(forma_pagamento IN ('pix', 'cartao_credito', 'cartao_debito')),
    status TEXT DEFAULT 'pendente' CHECK(status IN ('pendente', 'processando', 'aprovado', 'rejeitado', 'cancelado', 'reembolsado')),
    rejeicao_motivo TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (consulta_id) REFERENCES consultas(id)
  )`);

  // Tabela de transações (carteira)
  db.run(`CREATE TABLE IF NOT EXISTS transacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    tipo TEXT NOT NULL CHECK(tipo IN ('credito', 'debito')),
    descricao TEXT NOT NULL,
    valor REAL NOT NULL,
    status TEXT DEFAULT 'aprovado' CHECK(status IN ('pendente', 'aprovado', 'rejeitado')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);

  // Tabela de banners
  db.run(`CREATE TABLE IF NOT EXISTS banners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    subtitulo TEXT,
    link TEXT,
    imagem TEXT NOT NULL,
    ordem INTEGER DEFAULT 0,
    ativo INTEGER DEFAULT 1 CHECK(ativo IN (0, 1)),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabela de posts do blog
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    categoria TEXT,
    resumo TEXT,
    conteudo TEXT NOT NULL,
    imagem_capa TEXT,
    status TEXT DEFAULT 'rascunho' CHECK(status IN ('rascunho', 'publicado', 'arquivado')),
    data_publicacao DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabela de contatos
  db.run(`CREATE TABLE IF NOT EXISTS contatos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    nome_completo TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT,
    assunto TEXT NOT NULL,
    mensagem TEXT NOT NULL,
    status TEXT DEFAULT 'pendente' CHECK(status IN ('pendente', 'lida', 'respondida', 'arquivada')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);

  // Tabela de intermediação de pagamentos
  db.run(`CREATE TABLE IF NOT EXISTS intermediacao_pagamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    consulta_id INTEGER NOT NULL,
    consultor_id INTEGER NOT NULL,
    valor_consultor REAL NOT NULL,
    valor_plataforma REAL NOT NULL,
    valor_total REAL NOT NULL,
    status TEXT DEFAULT 'pendente' CHECK(status IN ('pendente', 'pago')),
    pix_id TEXT,
    data_pagamento DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (consulta_id) REFERENCES consultas(id),
    FOREIGN KEY (consultor_id) REFERENCES consultores(id)
  )`);

  // Tabela de configurações
  db.run(`CREATE TABLE IF NOT EXISTS configuracoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chave TEXT UNIQUE NOT NULL,
    valor TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabela de links do rodapé
  db.run(`CREATE TABLE IF NOT EXISTS rodape_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    url TEXT NOT NULL,
    ordem INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabela de categorias do rodapé
  db.run(`CREATE TABLE IF NOT EXISTS rodape_categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    icone TEXT,
    url TEXT,
    ordem INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Inserir configurações padrão
  db.run(`INSERT OR IGNORE INTO configuracoes (chave, valor) VALUES 
    ('nome_site', 'Conselhos Esotéricos'),
    ('email_contato', 'contato@conselhosesotericos.com'),
    ('descricao_site', 'Plataforma de consultas esotéricas online'),
    ('telefone', ''),
    ('endereco', ''),
    ('logo', ''),
    ('facebook', ''),
    ('instagram', ''),
    ('whatsapp', ''),
    ('youtube', ''),
    ('twitter', ''),
    ('linkedin', ''),
    ('copyright', '© 2024 Conselhos Esotéricos. Todos os direitos reservados.'),
    ('modo_manutencao', '0'),
    ('mensagem_manutencao', ''),
    ('taxa_comissao', '10')
  `);

  // Criar usuário admin padrão (senha: admin123)
  const bcrypt = require('bcryptjs');
  const adminPassword = bcrypt.hashSync('admin123', 10);
  db.run(`INSERT OR IGNORE INTO users (nome_completo, cpf, email, senha, tipo, status) 
    VALUES ('Administrador', '00000000000', 'admin@conselhosesotericos.com', ?, 'admin', 'ativo')`, [adminPassword]);

  console.log('Banco de dados inicializado com sucesso!');
});

module.exports = db;

