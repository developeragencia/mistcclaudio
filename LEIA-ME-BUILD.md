# 🚀 EXECUTAR BUILD - INSTRUÇÕES RÁPIDAS

## ⚡ FORMA MAIS RÁPIDA:

### Opção 1: Duplo clique
**Duplo clique no arquivo `build.bat`** na pasta do projeto.

### Opção 2: PowerShell
Abra PowerShell na pasta do projeto e execute:
```powershell
.\build.ps1
```

### Opção 3: Terminal manual
```bash
cd "D:\CONSELHOS ESOTERICO10"
cd client
npm run build
```

## ⚠️ Se der erro:

**"npm não é reconhecido"** ou **"node não é reconhecido"**

→ Você precisa instalar o Node.js:
1. Acesse: https://nodejs.org/
2. Baixe e instale a versão LTS
3. Reinicie o computador (ou pelo menos feche e abra o terminal)
4. Tente novamente

## ✅ Após o build:

A pasta `client/dist/` será criada com os arquivos prontos para produção.

## 📋 Checklist:

- [ ] Node.js instalado (https://nodejs.org/)
- [ ] Terminal reiniciado após instalar Node.js
- [ ] Executar build (duplo clique em build.bat ou comando manual)
- [ ] Verificar pasta `client/dist/` criada

---

**Scripts criados:**
- `build.bat` - Script para Windows CMD
- `build.ps1` - Script para PowerShell

Ambos verificam automaticamente se Node.js/npm estão instalados!

