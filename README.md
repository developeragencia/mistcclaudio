# Conselhos Esotéricos - Plataforma de Consultas Online

Plataforma completa para consultas esotéricas online desenvolvida com Node.js, React e SQLite.

## 🚀 Tecnologias

- **Backend**: Node.js + Express
- **Frontend**: React + Vite
- **Banco de Dados**: SQLite
- **Autenticação**: JWT
- **Upload**: Multer

## 📋 Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm run install-all
```

Ou instale manualmente:

```bash
npm install
cd server && npm install
cd ../client && npm install
```

3. Configure o arquivo `.env` no servidor (copie `.env.example`):

```bash
cd server
cp .env.example .env
```

4. Inicialize o banco de dados (será criado automaticamente na primeira execução)

## ▶️ Execução

### Desenvolvimento

Para executar backend e frontend simultaneamente:

```bash
npm run dev
```

Ou execute separadamente:

**Backend:**
```bash
npm run server
```

**Frontend:**
```bash
npm run client
```

### Produção

1. Build do frontend:

```bash
npm run build
```

Isso criará a pasta `client/dist` com os arquivos buildados.

2. Execute o servidor (que serve tanto backend quanto frontend):

```bash
npm start
```

Ou:

```bash
cd server
npm start
```

O servidor está configurado para servir automaticamente os arquivos do frontend buildado. Todas as rotas serão servidas pelo backend (API em `/api/*`) e o frontend React será servido para todas as outras rotas.

**Acesse:** http://localhost:5000

## 📁 Estrutura do Projeto

```
.
├── server/                 # Backend
│   ├── routes/            # Rotas da API
│   ├── middleware/        # Middlewares
│   ├── uploads/           # Uploads de imagens
│   └── database.sqlite    # Banco de dados
├── client/                # Frontend
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas
│   │   ├── contexts/      # Contextos (Auth)
│   │   └── App.jsx        # App principal
│   └── public/            # Arquivos estáticos
└── README.md
```

## 👤 Credenciais Padrão

**Admin:**
- Email: admin@conselhosesotericos.com
- Senha: admin123

⚠️ **Altere a senha padrão em produção!**

## 🌐 Portas

- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## 📝 Funcionalidades

- ✅ Sistema de autenticação (Login/Registro)
- ✅ Cadastro de clientes e consultores
- ✅ Sistema de consultas online
- ✅ Gerenciamento de créditos/carteira
- ✅ Blog
- ✅ Sistema de banners
- ✅ Painel administrativo
- ✅ Upload de imagens
- ✅ Design responsivo

## 🎨 Design

- Cores da logo: Azul escuro, Roxo, Rosa, Dourado
- Fundo branco com efeitos místicos sutis
- Tipografia: Marcellus (títulos) + Poppins (texto)
- Design responsivo para mobile e desktop

## 📄 Licença

ISC

## 👥 Desenvolvido para

Plataforma completa conforme especificação do documento TERICO_FUNCIONALIDADES.md

