# ⚠️ IMPORTANTE: Configuração para Hostinger

## 🔍 Problema

A Hostinger precisa detectar automaticamente o tipo de projeto. Ela verifica:
1. `package.json` na raiz
2. Dependências (react, vite, express)
3. Scripts (build, start)

## ✅ Solução Aplicada

1. ✅ Dependências do servidor movidas para `package.json` raiz
2. ✅ Scripts configurados corretamente
3. ✅ Estrutura mantida (server/ e client/)

## 🚀 Estrutura Esperada pela Hostinger

```
.
├── package.json          # COM TODAS AS DEPENDÊNCIAS
├── server/
│   ├── index.js
│   └── ...
├── client/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
```

## 📋 Verificação

O `package.json` raiz agora inclui:
- express, cors, dotenv (backend)
- bcryptjs, jsonwebtoken (auth)
- mysql2 (banco de dados)
- multer, express-validator, moment

E os scripts:
- `start`: node server/index.js
- `build`: cd client && npm install && npm run build
- `postinstall`: cd client && npm install && npm run build

## ✅ Deve Funcionar Agora!

