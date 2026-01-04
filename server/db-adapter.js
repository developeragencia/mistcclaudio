// Adaptador para compatibilidade entre SQLite e MySQL
// Este arquivo permite usar a mesma interface de código

const { query } = require('./database-mysql');

// Adaptar métodos para compatibilidade com código existente
const db = {
  // Adaptar db.get (SQLite) para MySQL
  get: async (sql, params = []) => {
    const results = await query(sql, params);
    return results[0] || null;
  },
  
  // Adaptar db.all (SQLite) para MySQL
  all: async (sql, params = []) => {
    return await query(sql, params);
  },
  
  // Adaptar db.run (SQLite) para MySQL
  run: async (sql, params = []) => {
    const result = await query(sql, params);
    return {
      lastID: result.insertId,
      changes: result.affectedRows
    };
  },
  
  // Método direto query
  query: query
};

module.exports = db;

