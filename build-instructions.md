# Instruções de Build para Produção

## Passo a Passo

### 1. Instalar dependências (se ainda não instalou)

No diretório raiz:
```bash
npm install
```

No servidor:
```bash
cd server
npm install
```

No cliente:
```bash
cd client
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` no diretório `server/`:
```bash
cd server
copy .env.example .env
```

Edite o `.env` e configure o `JWT_SECRET` para um valor seguro.

### 3. Build do frontend

No diretório raiz:
```bash
npm run build
```

Ou manualmente:
```bash
cd client
npm run build
```

Isso criará a pasta `client/dist` com os arquivos buildados.

### 4. Executar em produção

O backend já está configurado para servir os arquivos do frontend automaticamente.

Execute o servidor:
```bash
cd server
npm start
```

Ou do diretório raiz (após configurar script no package.json):
```bash
node server/index.js
```

### 5. Acessar

O site estará disponível em: http://localhost:5000

Todas as rotas da API continuam funcionando em: http://localhost:5000/api/...

## Estrutura após build

```
.
├── server/
│   ├── index.js (servidor configurado para servir frontend)
│   ├── database.sqlite
│   └── ...
├── client/
│   ├── dist/ (criado após build)
│   │   ├── index.html
│   │   └── assets/
│   └── ...
└── ...
```

O servidor serve automaticamente os arquivos de `client/dist` e redireciona todas as rotas não-API para o `index.html` do React Router.

