# 🏗️ Como Executar o Build

## ⚠️ NPM não encontrado

O npm não está disponível no terminal atual. Você precisa executar manualmente.

## 📋 Passos:

### 1. Abra um novo Terminal/PowerShell/CMD

### 2. Navegue até a pasta do projeto:
```bash
cd "D:\CONSELHOS ESOTERICO10"
```

### 3. Verifique se o Node.js está instalado:
```bash
node --version
npm --version
```

Se não funcionar, instale o Node.js: https://nodejs.org/

### 4. Instale as dependências (se ainda não instalou):
```bash
npm run install-all
```

### 5. Execute o build:
```bash
npm run build
```

## ✅ O que vai acontecer:

1. O Vite irá compilar o React
2. Criará a pasta `client/dist/` com os arquivos buildados
3. Os arquivos estarão prontos para produção

## 📁 Após o build:

A pasta `client/dist/` será criada com:
- `index.html`
- `assets/` (JS e CSS compilados)

Esses arquivos serão servidos automaticamente pelo backend quando você executar `npm start`.

## 🔍 Verificar se funcionou:

Após executar `npm run build`, verifique se a pasta `client/dist/` foi criada.

## ⚠️ Possíveis Erros:

1. **"npm não é reconhecido"**
   - Instale Node.js: https://nodejs.org/
   - Reinicie o terminal

2. **"Cannot find module"**
   - Execute: `npm run install-all` primeiro

3. **Erros de compilação**
   - Verifique se todas as dependências estão instaladas
   - Verifique se há erros no código

## 📝 Comando completo:

```bash
cd "D:\CONSELHOS ESOTERICO10"
npm run install-all
npm run build
```

