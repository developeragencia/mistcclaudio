# ❌ ITENS FALTANDO NO PROJETO

## 🔴 BACKEND - Rotas Faltando

### 1. Rotas do Consultor (server/routes/consultor.js - NÃO EXISTE)

O arquivo `server/routes/consultor.js` precisa ser criado com as seguintes rotas:

- [ ] `GET /api/consultor/perfil` - Buscar perfil do consultor
- [ ] `PUT /api/consultor/perfil` - Atualizar perfil do consultor
- [ ] `POST /api/consultor/pix` - Cadastrar/Atualizar chave PIX
- [ ] `GET /api/consultor/financeiro` - Resumo financeiro (pendente, recebido, total)
- [ ] `GET /api/consultor/pagamentos` - Histórico de intermediações de pagamento
- [ ] `GET /api/consultor/dashboard` - Estatísticas do consultor

**Arquivo necessário:** `server/routes/consultor.js`

**Registro no server/index.js:**
```javascript
app.use('/api/consultor', require('./routes/consultor'));
```

---

### 2. Rotas do Admin - Gerenciar Consultores (server/routes/admin.js)

Faltam as seguintes rotas em `server/routes/admin.js`:

- [ ] `GET /api/admin/consultores` - Listar todos consultores (com filtros)
- [ ] `GET /api/admin/consultores/:id` - Buscar consultor específico
- [ ] `POST /api/admin/consultores` - Criar novo consultor
- [ ] `PUT /api/admin/consultores/:id` - Editar consultor
- [ ] `DELETE /api/admin/consultores/:id` - Deletar consultor
- [ ] `PATCH /api/admin/consultores/:id/aprovar` - Aprovar consultor
- [ ] `PATCH /api/admin/consultores/:id/rejeitar` - Rejeitar consultor

---

### 3. Rotas do Admin - Gerenciar Usuários (server/routes/admin.js)

Faltam as seguintes rotas:

- [ ] `GET /api/admin/usuarios` - Listar todos usuários (com filtros)
- [ ] `GET /api/admin/usuarios/:id` - Buscar usuário específico
- [ ] `POST /api/admin/usuarios` - Criar novo usuário
- [ ] `PUT /api/admin/usuarios/:id` - Editar usuário
- [ ] `DELETE /api/admin/usuarios/:id` - Deletar usuário
- [ ] `PATCH /api/admin/usuarios/:id/bloquear` - Bloquear/Desbloquear usuário
- [ ] `PATCH /api/admin/usuarios/:id/banir` - Banir usuário (com motivo)
- [ ] `PATCH /api/admin/usuarios/:id/desbanir` - Desbanir usuário
- [ ] `POST /api/admin/usuarios/:id/creditos` - Gerenciar créditos (adicionar/remover/definir)

---

### 4. Rotas do Admin - Gerenciar Consultas (server/routes/admin.js)

Faltam as seguintes rotas:

- [ ] `GET /api/admin/consultas` - Listar todas consultas (com filtros)
- [ ] `GET /api/admin/consultas/:id` - Buscar consulta específica
- [ ] `PATCH /api/admin/consultas/:id/status` - Editar status da consulta
- [ ] `DELETE /api/admin/consultas/:id` - Deletar consulta
- [ ] `GET /api/admin/consultas/creditos` - Listar usuários com créditos na carteira

---

### 5. Rotas do Admin - Intermediação de Pagamentos (server/routes/admin.js)

Faltam as seguintes rotas:

- [ ] `GET /api/admin/intermediacao` - Listar intermediações (com filtros)
- [ ] `GET /api/admin/intermediacao/:id` - Buscar intermediação específica
- [ ] `POST /api/admin/intermediacao/:id/pagar` - Pagar consultor (marcar como pago)

---

### 6. Rotas do Admin - Gerenciar Créditos (server/routes/admin.js)

Faltam as seguintes rotas:

- [ ] `GET /api/admin/creditos` - Listar histórico de créditos
- [ ] `POST /api/admin/creditos` - Adicionar crédito manualmente
- [ ] `PUT /api/admin/creditos/:id` - Editar crédito
- [ ] `DELETE /api/admin/creditos/:id` - Deletar crédito

---

### 7. Rotas do Admin - Configurações do Rodapé (server/routes/admin.js ou config.js)

Faltam as seguintes rotas:

- [ ] `GET /api/admin/rodape` - Buscar configurações do rodapé
- [ ] `PUT /api/admin/rodape` - Atualizar configurações do rodapé
- [ ] Rotas para gerenciar links do rodapé (CRUD)
- [ ] Rotas para gerenciar categorias do rodapé (CRUD)

---

### 8. Rotas do Admin - Relatórios (server/routes/admin.js)

Faltam as seguintes rotas:

- [ ] `GET /api/admin/relatorios` - Gerar relatórios (com filtros de período)
- [ ] `GET /api/admin/relatorios/consultas` - Relatório de consultas
- [ ] `GET /api/admin/relatorios/receita` - Relatório de receita
- [ ] `GET /api/admin/relatorios/consultores` - Consultores mais procurados
- [ ] `GET /api/admin/relatorios/clientes` - Clientes mais ativos

---

### 9. Sistema de Avaliações (server/routes/avaliacoes.js - NÃO EXISTE)

O arquivo `server/routes/avaliacoes.js` precisa ser criado:

- [ ] `POST /api/avaliacoes` - Criar avaliação (após consulta finalizada)
- [ ] `GET /api/avaliacoes/consultor/:id` - Listar avaliações de um consultor
- [ ] `GET /api/avaliacoes/:id` - Buscar avaliação específica
- [ ] `PUT /api/avaliacoes/:id` - Editar avaliação (apenas o autor)
- [ ] `DELETE /api/avaliacoes/:id` - Deletar avaliação (apenas o autor ou admin)

**Arquivo necessário:** `server/routes/avaliacoes.js`

**Registro no server/index.js:**
```javascript
app.use('/api/avaliacoes', require('./routes/avaliacoes'));
```

---

## 🟡 CONFIGURAÇÕES FALTANDO

### 1. Arquivo .env.example

- [ ] Criar `server/.env.example` com template das variáveis de ambiente

---

## 🟠 FRONTEND - Páginas Faltando Implementação Completa

Todas as páginas abaixo estão criadas como **placeholders** e precisam ser implementadas completamente:

### Painel Cliente
- [ ] `/cliente/agendar` - Formulário completo de agendamento
- [ ] `/cliente/consultas` - Lista completa de consultas com filtros
- [ ] `/cliente/consulta/:id` - Detalhes completos da consulta
- [ ] `/cliente/carteira` - Página completa da carteira com histórico
- [ ] `/cliente/perfil` - Formulário completo de edição de perfil
- [ ] `/cliente/pagamentos` - Lista completa de pagamentos

### Painel Consultor
- [ ] `/consultor` - Dashboard completo com estatísticas
- [ ] `/consultor/consultas` - Lista completa de consultas com ações
- [ ] `/consultor/perfil` - Formulário completo de edição de perfil
- [ ] `/consultor/pix` - Formulário de cadastro PIX e resumo financeiro

### Painel Admin
- [ ] `/admin` - Dashboard completo
- [ ] `/admin/consultores` - CRUD completo de consultores
- [ ] `/admin/usuarios` - CRUD completo de usuários
- [ ] `/admin/consultas` - Lista e gerenciamento de consultas
- [ ] `/admin/pagamentos` - Gerenciamento de pagamentos
- [ ] `/admin/banners` - CRUD completo de banners
- [ ] `/admin/posts` - CRUD completo de posts
- [ ] `/admin/contatos` - Gerenciamento de contatos
- [ ] `/admin/configuracoes` - Configurações gerais
- [ ] `/admin/intermediacao` - Intermediação de pagamentos (FALTANDO ROTA NO APP.JSX)
- [ ] `/admin/creditos` - Gerenciamento de créditos (FALTANDO ROTA NO APP.JSX)
- [ ] `/admin/rodape` - Configurações do rodapé (FALTANDO ROTA NO APP.JSX)
- [ ] `/admin/relatorios` - Relatórios (FALTANDO ROTA NO APP.JSX)

---

## 🔵 FUNCIONALIDADES ADICIONAIS FALTANDO

### 1. Validação de CPF no Backend
- [ ] Implementar validação de CPF no backend (atualmente só no frontend)

### 2. Sistema de Recuperação de Senha
- [ ] Rotas de recuperação de senha (esqueci minha senha)
- [ ] Sistema de tokens de recuperação
- [ ] Página de recuperação de senha no frontend

### 3. Sistema de Notificações
- [ ] Tabela de notificações no banco de dados
- [ ] Rotas para buscar notificações
- [ ] Sistema de notificações em tempo real (opcional)

### 4. Upload de Imagens Melhorado
- [ ] Validação de tamanho de arquivo no backend
- [ ] Redimensionamento automático de imagens
- [ ] Preview de imagens antes do upload no frontend

---

## 📋 RESUMO POR PRIORIDADE

### 🔴 ALTA PRIORIDADE (Para funcionamento básico)

1. **Rotas do Consultor** - Sem isso, consultores não conseguem gerenciar perfil
2. **Rotas do Admin - Consultores** - Admin não consegue gerenciar consultores
3. **Rotas do Admin - Usuários** - Admin não consegue gerenciar usuários
4. **Frontend - Páginas dos Painéis** - Usuários não conseguem usar o sistema

### 🟡 MÉDIA PRIORIDADE (Funcionalidades importantes)

1. **Rotas do Admin - Consultas** - Gerenciamento completo
2. **Rotas do Admin - Intermediação** - Pagamento de consultores
3. **Sistema de Avaliações** - Funcionalidade importante do sistema
4. **Rotas do Admin - Créditos** - Gerenciamento manual de créditos

### 🟢 BAIXA PRIORIDADE (Melhorias)

1. **Rotas do Admin - Rodapé** - Configuração do rodapé
2. **Rotas do Admin - Relatórios** - Análises e relatórios
3. **Recuperação de Senha** - Funcionalidade adicional
4. **Notificações** - Sistema de notificações

---

## 📝 NOTAS IMPORTANTES

- Todas as rotas devem seguir o padrão REST
- Todas as rotas autenticadas devem usar os middlewares apropriados
- Todas as rotas devem ter validação de entrada
- Todas as rotas devem retornar erros apropriados
- O frontend precisa ser implementado completamente para todas as funcionalidades

---

**Última atualização:** 2024-01-03

