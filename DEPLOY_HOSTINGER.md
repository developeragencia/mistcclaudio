# 🚀 Guia de Deploy para Hostinger

## Configuração do Banco de Dados MySQL

### Dados do Banco (já configurados no Hostinger):
- **Host:** localhost
- **Usuário:** u812652203_mistic1
- **Senha:** Conselhos955566
- **Nome do Banco:** u812652203_mistic

### Configuração no .env:
```env
DB_HOST=localhost
DB_USER=u812652203_mistic1
DB_PASSWORD=Conselhos955566
DB_NAME=u812652203_mistic
```

## Passos para Deploy

### 1. Preparar Arquivos

1. **Build do Frontend:**
```bash
npm run build
```

2. **Instalar Dependências:**
```bash
cd server
npm install --production
```

### 2. Upload para Hostinger

1. Acesse o File Manager no hPanel
2. Vá para `public_html` ou `domains/conselhosesotericos.com.br`
3. Faça upload de:
   - Pasta `server/` (todo o conteúdo)
   - Pasta `client/dist/` (build do frontend)

### 3. Estrutura de Pastas no Servidor

```
public_html/
├── index.js (server/index.js renomeado ou ajustado)
├── package.json
├── .env (com as configurações de produção)
├── routes/
├── middleware/
├── uploads/
└── dist/ (client/dist/)
```

### 4. Configurar Node.js no Hostinger

1. Acesse "Node.js" no hPanel
2. Configure:
   - **Node.js Version:** 18.x ou superior
   - **App Mode:** Production
   - **App Root Directory:** public_html
   - **App Start File:** index.js (ou server/index.js)
   - **App Port:** 5000
   - **App URL:** conselhosesotericos.com.br

### 5. Variáveis de Ambiente

Crie arquivo `.env` na raiz do projeto:

```env
NODE_ENV=production
PORT=5000
DB_HOST=localhost
DB_USER=u812652203_mistic1
DB_PASSWORD=Conselhos955566
DB_NAME=u812652203_mistic
JWT_SECRET=seu_secret_super_seguro_aqui
DOMAIN=https://conselhosesotericos.com.br
```

### 6. Executar Inicialização do Banco

Após o primeiro deploy, o banco será inicializado automaticamente ao iniciar o servidor.

### 7. Configurar Domínio

No hPanel:
1. Vá em "Domínios"
2. Configure conselhosesotericos.com.br
3. Aponte para o diretório correto

## ⚠️ NOTA IMPORTANTE

**O código atual está usando SQLite, mas precisa ser migrado para MySQL!**

Veja o arquivo `MIGRATION_SQLITE_TO_MYSQL.md` para instruções de migração.

## Checklist Final

- [ ] Build do frontend executado
- [ ] Dependências instaladas
- [ ] Arquivos uploadados para Hostinger
- [ ] .env configurado com dados do MySQL
- [ ] Node.js configurado no hPanel
- [ ] Domínio configurado
- [ ] Banco de dados inicializado
- [ ] Site acessível em conselhosesotericos.com.br

