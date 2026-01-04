# Migração SQLite para MySQL - INSTRUÇÕES

## ⚠️ IMPORTANTE

O código atual está usando SQLite, mas a Hostinger usa MySQL. 

**Opções:**

1. **Opção 1: Adaptar código para MySQL (RECOMENDADO)**
   - Criar novo arquivo `database-mysql.js`
   - Adaptar todas as rotas para usar MySQL
   - Usar `mysql2` ao invés de `sqlite3`

2. **Opção 2: Manter SQLite e usar apenas localmente**
   - Hostinger suporta MySQL apenas
   - SQLite não é suportado em hospedagem compartilhada

## 🔄 Processo de Migração

### Passo 1: Instalar mysql2
```bash
cd server
npm install mysql2
```

### Passo 2: Configurar .env
```env
DB_HOST=localhost
DB_USER=u812652203_mistic1
DB_PASSWORD=Conselhos955566
DB_NAME=u812652203_mistic
```

### Passo 3: Adaptar database.js
- Criar versão MySQL do database.js
- Manter compatibilidade com código existente

### Passo 4: Adaptar todas as rotas
- SQLite usa callbacks: `db.get(sql, params, callback)`
- MySQL usa promises: `await query(sql, params)`
- Precisa converter todas as rotas

## ⚡ SOLUÇÃO RÁPIDA

Criei arquivos:
- `server/database-mysql.js` - Versão MySQL
- `server/db-adapter.js` - Adaptador para compatibilidade

**MAS** todas as rotas precisam ser adaptadas de callbacks para async/await.

