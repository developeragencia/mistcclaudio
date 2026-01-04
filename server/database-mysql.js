const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuração da conexão
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'conselhos_esotericos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Criar pool de conexões
const pool = mysql.createPool(dbConfig);

// Função para executar queries
const query = async (sql, params = []) => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Erro na query:', error);
    throw error;
  }
};

// Função para inicializar o banco de dados
const initDatabase = async () => {
  try {
    // Criar tabelas
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome_completo VARCHAR(255) NOT NULL,
        cpf VARCHAR(14) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        tipo ENUM('cliente', 'consultor', 'admin') NOT NULL,
        status ENUM('ativo', 'bloqueado', 'banido') DEFAULT 'ativo',
        banimento_motivo TEXT,
        saldo DECIMAL(10,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS consultores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL UNIQUE,
        nome_artistico VARCHAR(255) NOT NULL,
        especialidade VARCHAR(255) NOT NULL,
        categoria VARCHAR(100) NOT NULL,
        preco_minuto DECIMAL(10,2) NOT NULL,
        biografia TEXT NOT NULL,
        anos_experiencia INT,
        foto_perfil VARCHAR(500),
        imagem_capa VARCHAR(500),
        status ENUM('online', 'ocupado', 'offline', 'indisponivel') DEFAULT 'offline',
        status_aprovacao ENUM('pendente', 'aprovado', 'rejeitado') DEFAULT 'pendente',
        rating DECIMAL(3,2) DEFAULT 0,
        total_avaliacoes INT DEFAULT 0,
        pix_tipo VARCHAR(50),
        pix_chave VARCHAR(255),
        pix_nome VARCHAR(255),
        pix_cpf VARCHAR(14),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS consultor_metodos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        consultor_id INT NOT NULL,
        metodo ENUM('audio_chat', 'telefone_whatsapp', 'video', 'email_gravacao') NOT NULL,
        FOREIGN KEY (consultor_id) REFERENCES consultores(id) ON DELETE CASCADE
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS consultas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cliente_id INT NOT NULL,
        consultor_id INT NOT NULL,
        duracao INT NOT NULL,
        valor_total DECIMAL(10,2) NOT NULL,
        metodo VARCHAR(50),
        status ENUM('pendente', 'aceita', 'recusada', 'em_andamento', 'finalizada', 'cancelada') DEFAULT 'pendente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (cliente_id) REFERENCES users(id),
        FOREIGN KEY (consultor_id) REFERENCES consultores(id)
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS avaliacoes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        consulta_id INT NOT NULL UNIQUE,
        cliente_id INT NOT NULL,
        consultor_id INT NOT NULL,
        nota INT NOT NULL CHECK (nota >= 1 AND nota <= 5),
        comentario TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (consulta_id) REFERENCES consultas(id),
        FOREIGN KEY (cliente_id) REFERENCES users(id),
        FOREIGN KEY (consultor_id) REFERENCES consultores(id)
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS pagamentos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        consulta_id INT,
        tipo ENUM('consulta', 'creditos', 'pacote', 'plano', 'assinatura') NOT NULL,
        valor DECIMAL(10,2) NOT NULL,
        forma_pagamento ENUM('pix', 'cartao_credito', 'cartao_debito') NOT NULL,
        status ENUM('pendente', 'processando', 'aprovado', 'rejeitado', 'cancelado', 'reembolsado') DEFAULT 'pendente',
        rejeicao_motivo TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (consulta_id) REFERENCES consultas(id)
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS transacoes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        tipo ENUM('credito', 'debito') NOT NULL,
        descricao VARCHAR(255) NOT NULL,
        valor DECIMAL(10,2) NOT NULL,
        status ENUM('pendente', 'aprovado', 'rejeitado') DEFAULT 'aprovado',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS banners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        subtitulo TEXT,
        link VARCHAR(500),
        imagem VARCHAR(500) NOT NULL,
        ordem INT DEFAULT 0,
        ativo TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        categoria VARCHAR(100),
        resumo TEXT,
        conteudo TEXT NOT NULL,
        imagem_capa VARCHAR(500),
        status ENUM('rascunho', 'publicado', 'arquivado') DEFAULT 'rascunho',
        data_publicacao DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS contatos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        nome_completo VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        telefone VARCHAR(20),
        assunto VARCHAR(100) NOT NULL,
        mensagem TEXT NOT NULL,
        status ENUM('pendente', 'lida', 'respondida', 'arquivada') DEFAULT 'pendente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS intermediacao_pagamentos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        consulta_id INT NOT NULL,
        consultor_id INT NOT NULL,
        valor_consultor DECIMAL(10,2) NOT NULL,
        valor_plataforma DECIMAL(10,2) NOT NULL,
        valor_total DECIMAL(10,2) NOT NULL,
        status ENUM('pendente', 'pago') DEFAULT 'pendente',
        pix_id VARCHAR(255),
        data_pagamento DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (consulta_id) REFERENCES consultas(id),
        FOREIGN KEY (consultor_id) REFERENCES consultores(id)
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS configuracoes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        chave VARCHAR(100) UNIQUE NOT NULL,
        valor TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS rodape_links (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        url VARCHAR(500) NOT NULL,
        ordem INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS rodape_categorias (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        icone VARCHAR(100),
        url VARCHAR(500),
        ordem INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Inserir configurações padrão
    await query(`
      INSERT IGNORE INTO configuracoes (chave, valor) VALUES 
      ('nome_site', 'Conselhos Esotéricos'),
      ('email_contato', 'contato@conselhosesotericos.com.br'),
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
    const adminPassword = await bcrypt.hash('admin123', 10);
    
    const existingAdmins = await query('SELECT id FROM users WHERE email = ?', ['admin@conselhosesotericos.com.br']);
    if (!existingAdmins || existingAdmins.length === 0) {
      await query(
        'INSERT INTO users (nome_completo, cpf, email, senha, tipo, status) VALUES (?, ?, ?, ?, ?, ?)',
        ['Administrador', '00000000000', 'admin@conselhosesotericos.com.br', adminPassword, 'admin', 'ativo']
      );
    }

    console.log('Banco de dados MySQL inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
    throw error;
  }
};

// Inicializar banco ao carregar o módulo (apenas se não houver erro)
initDatabase().catch(err => {
  console.error('Erro ao inicializar banco de dados MySQL:', err);
  // Não impede o servidor de iniciar, mas loga o erro
});

module.exports = {
  pool,
  query,
  initDatabase
};

