/**
 * Adaptador de banco de dados
 * Permite que as rotas usem a mesma interface (callbacks) 
 * mas funcionam com SQLite (dev) ou MySQL (produção)
 */

let db;
const useMySQL = process.env.NODE_ENV === 'production' || process.env.DB_HOST;

if (useMySQL) {
  // Usar MySQL com interface de callbacks
  const mysqlDb = require('./database-mysql');
  
  db = {
    get: (sql, params, callback) => {
      mysqlDb.query(sql, params || [])
        .then(results => {
          const result = Array.isArray(results) && results.length > 0 ? results[0] : null;
          if (callback) callback(null, result);
        })
        .catch(error => {
          if (callback) callback(error, null);
        });
    },
    
    all: (sql, params, callback) => {
      mysqlDb.query(sql, params || [])
        .then(results => {
          if (callback) callback(null, results);
        })
        .catch(error => {
          if (callback) callback(error, null);
        });
    },
    
    run: (sql, params, callback) => {
      mysqlDb.query(sql, params || [])
        .then(results => {
          const result = {
            lastID: results.insertId || null,
            changes: results.affectedRows || 0
          };
          if (callback) {
            if (typeof callback === 'function') {
              callback.call(result, null);
            }
          }
        })
        .catch(error => {
          if (callback && typeof callback === 'function') {
            callback.call({ lastID: null, changes: 0 }, error);
          }
        });
      // Retornar objeto com lastID e changes para compatibilidade
      return {
        lastID: null,
        changes: 0
      };
    }
  };
  
  console.log('🔵 Database adapter: MySQL (produção)');
} else {
  // Usar SQLite (desenvolvimento)
  db = require('./database');
  console.log('🟢 Database adapter: SQLite (desenvolvimento)');
}

module.exports = db;

