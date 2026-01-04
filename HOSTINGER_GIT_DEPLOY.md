# 🚀 Deploy na Hostinger via Git

## ✅ Configuração Completa para Hostinger

Este projeto foi configurado para funcionar na Hostinger usando Git deployment.

## 📋 Pré-requisitos

1. Conta Hostinger com Node.js habilitado
2. Repositório Git configurado (GitHub, GitLab, etc.)
3. Banco de dados MySQL criado na Hostinger

## 🔧 Configuração do Banco de Dados

### Credenciais MySQL (já configuradas):
- **Host:** localhost
- **Usuário:** u812652203_mistic1
- **Senha:** Conselhos955566
- **Database:** u812652203_mistic

## 📝 Passos para Deploy

### 1. Conectar Repositório Git no Hostinger

1. Acesse o **hPanel** da Hostinger
2. Vá em **Sites** → Seu site → **Git**
3. Conecte seu repositório Git
4. A Hostinger detectará automaticamente:
   - ✅ React (frontend)
   - ✅ Vite (build tool)
   - ✅ Express (backend)
   - ✅ Node.js

### 2. Configurar Variáveis de Ambiente

No hPanel, configure as seguintes variáveis de ambiente:

```
NODE_ENV=production
PORT=5000
DB_HOST=localhost
DB_USER=u812652203_mistic1
DB_PASSWORD=Conselhos955566
DB_NAME=u812652203_mistic
JWT_SECRET=seu_jwt_secret_super_seguro_aqui
DOMAIN=https://conselhosesotericos.com.br
```

### 3. Estrutura do Projeto

O projeto está configurado com:
- **Frontend:** React + Vite (`client/`)
- **Backend:** Express.js (`server/`)
- **Build:** Automático via `postinstall` script
- **Start:** `node server/index.js`

### 4. Scripts Automáticos

O `package.json` raiz está configurado com:
- `start`: Inicia o servidor Node.js
- `postinstall`: Instala dependências e faz build automático
- `build`: Build do frontend

A Hostinger executará automaticamente:
1. `npm install` (que executa `postinstall`)
2. `npm start` (inicia o servidor)

### 5. Estrutura de Pastas no Servidor

```
public_html/
├── server/          # Backend Express
│   ├── index.js     # Entry point
│   ├── routes/
│   ├── middleware/
│   └── uploads/
├── client/          # Frontend React
│   ├── dist/        # Build do frontend (gerado automaticamente)
│   └── src/
├── package.json     # Root package.json
└── .env             # Variáveis de ambiente (criar no hPanel)
```

### 6. Configuração do Node.js no hPanel

1. Acesse **Node.js** no hPanel
2. Configure:
   - **Node.js Version:** 18.x ou superior
   - **App Mode:** Production
   - **App Root Directory:** (deixe padrão ou configure conforme necessário)
   - **App Start File:** server/index.js
   - **App Port:** 5000 (ou a porta definida no .env)

### 7. Primeiro Deploy

Após conectar o repositório Git:

1. A Hostinger fará o clone automático
2. Executará `npm install` (que fará o build)
3. Executará `npm start`
4. O servidor estará rodando na porta configurada

### 8. Verificar Deploy

1. Acesse `https://conselhosesotericos.com.br`
2. Verifique o health check: `https://conselhosesotericos.com.br/api/health`
3. Deve retornar: `{"status":"ok","message":"API funcionando"}`

## ⚠️ Importante

### Banco de Dados MySQL

O projeto está configurado para usar **MySQL em produção**. O servidor detecta automaticamente quando está em produção e usa MySQL.

### Build Automático

O script `postinstall` no `package.json` raiz garante que:
- Dependências do servidor sejam instaladas
- Dependências do cliente sejam instaladas
- Build do frontend seja executado automaticamente

### Uploads

A pasta `server/uploads/` será criada automaticamente. Certifique-se de que as permissões estão corretas no servidor.

## 🔍 Troubleshooting

### Erro: "Cannot find module"
- Verifique se todas as dependências estão no `package.json`
- Verifique os logs no hPanel

### Erro: "Database connection failed"
- Verifique as credenciais do MySQL no `.env`
- Certifique-se de que o banco de dados existe
- Verifique se o usuário tem permissões corretas

### Frontend não carrega
- Verifique se o build foi executado (`client/dist/` existe)
- Verifique os logs do servidor
- Verifique se o servidor está servindo arquivos estáticos corretamente

## 📞 Suporte

Para mais informações sobre deploy na Hostinger:
- [Documentação Hostinger](https://support.hostinger.com/)
- [Node.js na Hostinger](https://support.hostinger.com/pt/articles/1583661-o-node-js-e-compativel-com-a-hostinger)

