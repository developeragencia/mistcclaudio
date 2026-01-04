/**
 * Wrapper para compatibilidade entre SQLite e MySQL
 * Em produção, usa MySQL. Em desenvolvimento, usa SQLite.
 */

let db;
let dbType;

if (process.env.NODE_ENV === 'production' || process.env.DB_HOST) {
  // Usar MySQL
  const mysqlDb = require('./database-mysql');
  dbType = 'mysql';
  
  db = {
    get: async (sql, params, callback) => {
      try {
        const results = await mysqlDb.query(sql, params || []);
        const result = Array.isArray(results) && results.length > 0 ? results[0] : null;
        if (callback) callback(null, result);
        return result;
      } catch (error) {
        if (callback) callback(error, null);
        throw error;
      }
    },
    
    all: async (sql, params, callback) => {
      try {
        const results = await mysqlDb.query(sql, params || []);
        if (callback) callback(null, results);
        return results;
      } catch (error) {
        if (callback) callback(error, null);
        throw error;
      }
    },
    
    run: async (sql, params, callback) => {
      try {
        const results = await mysqlDb.query(sql, params || []);
        const result = {
          lastID: results.insertId || null,
          changes: results.affectedRows || 0
        };
        if (callback) {
          if (typeof callback === 'function') {
            callback.call(result, null);
          }
        }
        return result;
      } catch (error) {
        if (callback && typeof callback === 'function') {
          callback.call({ lastID: null, changes: 0 }, error);
        }
        throw error;
      }
    }
  };
} else {
  // Usar SQLite (desenvolvimento)
  db = require('./database');
  dbType = 'sqlite';
}

module.exports = db;
module.exports.dbType = dbType;

