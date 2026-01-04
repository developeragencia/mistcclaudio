# 🏗️ Instruções para Executar o Build

## ⚠️ NPM não encontrado no PATH

O npm não foi encontrado no sistema. Para executar o build, você precisa:

## Opção 1: Instalar Node.js (se não tiver)

1. Baixe Node.js em: https://nodejs.org/
2. Instale a versão LTS (recomendado)
3. Reinicie o terminal/PowerShell
4. Execute: `npm run build`

## Opção 2: Usar Node.js já instalado

Se o Node.js já está instalado:

1. Abra um novo terminal/PowerShell
2. Navegue até a pasta do projeto:
   ```bash
   cd "D:\CONSELHOS ESOTERICO10"
   ```
3. Execute o build:
   ```bash
   npm run build
   ```

## Opção 3: Usar caminho completo do npm

Se souber onde o Node.js está instalado (geralmente em `C:\Program Files\nodejs\`):

```bash
"C:\Program Files\nodejs\npm.cmd" run build
```

## O que o build faz:

1. Instala dependências do frontend (se necessário)
2. Compila o React para arquivos estáticos
3. Cria a pasta `client/dist/` com os arquivos prontos para produção

## Após o build:

Os arquivos estarão em `client/dist/` e podem ser servidos pelo backend ou uploadados para o servidor.

## ✅ Checklist:

- [ ] Node.js instalado
- [ ] Terminal aberto na pasta do projeto
- [ ] Executar: `npm run build`
- [ ] Verificar pasta `client/dist/` criada

