const express = require('express');
const router = express.Router();
const db = require('../database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// Aplicar middleware de autenticação e admin em todas as rotas
router.use(authenticateToken);
router.use(requireAdmin);

// Dashboard - Estatísticas
router.get('/dashboard', (req, res) => {
  db.get('SELECT COUNT(*) as total FROM consultores', [], (err, consultoresResult) => {
    db.get('SELECT COUNT(*) as aprovados FROM consultores WHERE status_aprovacao = ?', ['aprovado'], (err, aprovadosResult) => {
      db.get('SELECT COUNT(*) as pendentes FROM consultores WHERE status_aprovacao = ?', ['pendente'], (err, pendentesResult) => {
        db.get('SELECT COUNT(*) as total FROM users', [], (err, usuariosResult) => {
          db.get('SELECT COUNT(*) as ativos FROM users WHERE status = ?', ['ativo'], (err, ativosResult) => {
            db.get('SELECT COUNT(*) as bloqueados FROM users WHERE status = ?', ['bloqueado'], (err, bloqueadosResult) => {
              db.get('SELECT COUNT(*) as total FROM consultas', [], (err, consultasResult) => {
                db.get('SELECT COUNT(*) as pendentes FROM consultas WHERE status = ?', ['pendente'], (err, consultasPendentesResult) => {
                  db.get('SELECT COALESCE(SUM(valor_total), 0) as receita FROM consultas WHERE status = ?', ['finalizada'], (err, receitaResult) => {
                    db.get('SELECT COUNT(*) as total FROM pagamentos WHERE status = ?', ['aprovado'], (err, pagamentosResult) => {
                      db.get('SELECT COUNT(*) as total FROM contatos', [], (err, contatosResult) => {
                        db.get('SELECT COUNT(*) as pendentes FROM contatos WHERE status = ?', ['pendente'], (err, contatosPendentesResult) => {
                          res.json({
                            consultores: {
                              total: consultoresResult.total,
                              aprovados: aprovadosResult.aprovados,
                              pendentes: pendentesResult.pendentes
                            },
                            usuarios: {
                              total: usuariosResult.total,
                              ativos: ativosResult.ativos,
                              bloqueados: bloqueadosResult.bloqueados
                            },
                            consultas: {
                              total: consultasResult.total,
                              pendentes: consultasPendentesResult.pendentes
                            },
                            receita: receitaResult.receita || 0,
                            pagamentos: {
                              total: pagamentosResult.total
                            },
                            contatos: {
                              total: contatosResult.total,
                              pendentes: contatosPendentesResult.pendentes
                            }
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

module.exports = router;

