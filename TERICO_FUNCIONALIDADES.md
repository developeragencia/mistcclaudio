# TERICO FUNCIONALIDADES - Conselhos Esotérico

## 📋 ÍNDICE
1. [Home Page](#home-page)
2. [Páginas Públicas](#páginas-públicas)
3. [Página de Cadastro](#página-de-cadastro)
4. [Painel do Cliente](#painel-do-cliente)
5. [Painel do Consultor](#painel-do-consultor)
6. [Painel do Admin](#painel-do-admin)

---

## 🏠 HOME PAGE

### Funcionalidades Principais

#### 1. Banner Rotativo
- **Carrossel de banners** com transição automática (5 segundos)
- **Indicadores clicáveis** para navegação manual
- **Imagens de fundo** com overlay gradiente roxo
- **Título e subtítulo** configuráveis
- **Botões de ação**: "Começar Agora" e "Cadastre-se Grátis"
- **Links personalizáveis** para cada banner
- **Design responsivo** para mobile, tablet e desktop

#### 2. Consultores em Destaque
- **Grid de consultores** (máximo 6 exibidos)
- **Cards com imagem de capa** e foto de perfil
- **Informações exibidas**:
  - Nome artístico
  - Especialidade
  - Categoria
  - Rating (estrelas + nota)
  - Preço por minuto
  - Status online/offline
- **Botão "Consultar Agora"** em cada card
- **Link "Ver Todos os Consultores"** (se houver mais de 6)

#### 3. Seção de Serviços
- **4 cards de serviços**:
  - Consultas (link: `/servicos/consultas-avulsas`)
  - Pacotes (link: `/servicos/pacotes`)
  - Créditos (link: `/servicos/creditos`)
  - Planos (link: `/servicos/planos-mensais`)
- **Ícones e gradientes** personalizados por serviço
- **Efeitos hover** com animações

#### 4. Como Funciona
- **3 passos explicativos**:
  1. Escolha seu Consultor
  2. Agende sua Consulta
  3. Receba Orientação
- **Cards informativos** com ícones e descrições

#### 5. CTA Final
- **Call-to-action** com gradiente roxo/rosa
- **Botões**: "Cadastre-se Grátis" e "Ver Consultores"

---

## 📄 PÁGINAS PÚBLICAS

### 1. Login (`/login`)
- **Formulário de login** para clientes e consultores
- **Campos**: Email e Senha
- **Link para cadastro** e recuperação de senha
- **Validação de campos** obrigatórios

### 2. Sobre Nós (`/sobre`)
- **Hero section** com título e descrição
- **Seções**:
  - Missão
  - Visão
  - Valores (4 cards: Transparência, Qualidade, Respeito, Confiança)
  - História
- **CTA** para cadastro e visualização de consultores

### 3. Como Funciona (`/como-funciona`)
- **Hero section** explicativa
- **3 passos do processo**:
  1. Escolha seu Consultor
  2. Agende sua Consulta
  3. Realize sua Consulta
- **Informações adicionais**:
  - Para Clientes (cadastro gratuito, escolha de consultor, agendamento, consultas online, avaliações, histórico)
  - Para Consultores (perfil personalizado, recebimento de consultas, definição de preços, histórico financeiro, avaliações)
- **CTA** para cadastro e visualização de consultores

### 4. Contato (`/contato`)
- **Hero section** com badge "Fale Conosco"
- **Informações de contato** (cards):
  - Email (com link mailto)
  - Telefone
  - Endereço
  - Redes sociais (Facebook, Instagram, WhatsApp, YouTube, Twitter, LinkedIn)
- **Formulário de contato**:
  - Nome Completo (obrigatório)
  - Email (obrigatório)
  - Telefone (opcional)
  - Assunto (select: Geral, Suporte Técnico, Tornar-se Consultor, Parcerias, Dúvidas sobre Pagamento, Outro)
  - Mensagem (obrigatório, mínimo 10 caracteres)
- **Mensagens de sucesso/erro** após envio

### 5. FAQ (`/faq`)
- **Hero section** com badge "Dúvidas Frequentes"
- **Accordion de perguntas e respostas**
- **Primeira pergunta aberta por padrão**
- **Animações de abertura/fechamento**
- **CTA** para página de contato

### 6. Consultores (`/consultores`)
- **Hero section** com título e descrição
- **Sistema de filtros**:
  - Busca por texto (nome, especialidade)
  - Filtro por categoria (Tarot, Astrologia, Numerologia, Runas, Cristais)
  - Filtro por status (Online, Offline)
- **Grid de consultores** (responsivo: 1-4 colunas)
- **Cards de consultor** com:
  - Imagem de capa
  - Foto de perfil
  - Nome artístico
  - Especialidade
  - Categoria
  - Rating e nota
  - Preço por minuto
  - Status online/offline
  - Botão "Consultar Agora"

### 7. Detalhes do Consultor (`/consultores/{id}`)
- **Hero section** com:
  - Imagem de capa (ou gradiente)
  - Avatar grande
  - Nome artístico
  - Status online/offline
  - Especialidade
  - Categoria
  - Rating e total de avaliações
- **Informações do consultor**:
  - Biografia
  - Anos de experiência
  - Preço por minuto
  - Métodos de consulta (Áudio/Chat, Telefone/WhatsApp, Vídeo)
- **Sidebar de agendamento** (se logado):
  - Seleção de duração (15, 30, 45, 60, 90, 120 minutos)
  - Cálculo automático do valor total
  - Botão "Agendar Consulta"
- **Consultores relacionados** (grid de cards similares)

### 8. Blog (`/blog`)
- **Hero section** com badge "Conhecimento Espiritual"
- **Grid de artigos** (3 colunas no desktop)
- **Cards de artigo** com:
  - Imagem de capa
  - Categoria
  - Data de publicação
  - Título
  - Resumo (truncado)
  - Link "Ler mais"
- **Estado vazio** quando não há artigos

### 9. Post do Blog (`/blog/{id}`)
- **Hero section** com imagem de capa
- **Conteúdo do artigo**:
  - Título
  - Categoria
  - Data de publicação
  - Conteúdo completo (HTML)
- **Posts relacionados** (grid de cards)

### 10. Páginas de Serviços

#### 10.1. Créditos (`/servicos/creditos`)
- **Hero section** explicativa
- **Como funciona** (3 passos)
- **Benefícios** do sistema de créditos
- **Pacotes de créditos** (cards com valores e bônus)
- **CTA** para adicionar créditos

#### 10.2. Consultas Avulsas (`/servicos/consultas-avulsas`)
- **Hero section** explicativa
- **Como funciona** (3 passos)
- **Benefícios** das consultas avulsas
- **CTA** para agendar consulta

#### 10.3. Pacotes (`/servicos/pacotes`)
- **Hero section** explicativa
- **Grid de pacotes** com:
  - Nome do pacote
  - Descrição
  - Preço
  - Benefícios
  - Botão de compra

#### 10.4. Planos Mensais (`/servicos/planos-mensais`)
- **Hero section** explicativa
- **Grid de planos** com:
  - Nome do plano
  - Preço mensal
  - Benefícios inclusos
  - Botão de assinatura

#### 10.5. Assinaturas (`/servicos/assinaturas`)
- **Hero section** explicativa
- **Benefícios** das assinaturas
- **Planos disponíveis**

#### 10.6. Promoções (`/servicos/promocoes`)
- **Hero section** explicativa
- **Grid de promoções** ativas
- **Cards de promoção** com:
  - Título
  - Descrição
  - Desconto
  - Validade
  - Botão de aproveitar

#### 10.7. Loja (`/servicos/loja`)
- **Hero section** explicativa
- **Grid de produtos** esotéricos
- **Cards de produto** com:
  - Imagem
  - Nome
  - Descrição
  - Preço
  - Botão de compra

### 11. Página de Créditos (`/creditos`)
- **Hero section** explicativa
- **Como funciona** (3 passos)
- **Benefícios** do sistema
- **CTA** para adicionar créditos

### 12. Welcome (`/welcome`)
- **Página de boas-vindas** (PWA)
- **Banner de instalação** do app
- **Informações sobre o app**

### 13. 404 (`/404`)
- **Página de erro 404**
- **Mensagem de página não encontrada**
- **Link para voltar à home**

---

## 📝 PÁGINA DE CADASTRO

### Rota: `/register`

#### Fluxo de Cadastro (2 Etapas)

##### Etapa 1: Seleção de Tipo
- **2 cards de seleção**:
  - **Cliente**:
    - Ícone de usuário
    - Benefícios: Agendar consultas online, Acessar créditos e histórico, Avaliar consultores
  - **Consultor**:
    - Ícone de usuários
    - Benefícios: Gerenciar perfil profissional, Receber consultas de clientes, Ganhar com suas consultas
- **Barra de progresso** (50%)
- **Botão "Continuar"** (habilitado após seleção)

##### Etapa 2: Formulário de Cadastro

###### Formulário Cliente
- **Campos obrigatórios**:
  - Nome Completo
  - CPF (com máscara automática)
  - Email
  - Senha (mínimo 6 caracteres)
- **Validação de CPF** (formato)
- **Link para login** ("Já tem conta? Faça login")

###### Formulário Consultor
- **Campos obrigatórios**:
  - Nome Completo
  - CPF (com máscara automática)
  - Email
  - Senha (mínimo 6 caracteres)
- **Informações Profissionais** (seção separada):
  - Nome Artístico (obrigatório)
  - Especialidade (obrigatório)
  - Categoria (obrigatório)
  - Preço por Minuto (obrigatório, número decimal)
  - Biografia (obrigatório, mínimo 50 caracteres)
  - Anos de Experiência (opcional, número)
  - Foto de Perfil (obrigatório, arquivo de imagem)
  - Imagem de Capa (opcional, arquivo de imagem)
- **Validação de campos**
- **Upload de imagens** (formato e tamanho)
- **Link para login** ("Já tem conta? Faça login")

#### Funcionalidades Gerais
- **Barra de progresso** visual
- **Botão "Voltar"** na etapa 2
- **Mensagens de erro** exibidas em alertas
- **Validação em tempo real** de CPF
- **Design responsivo**
- **Animações de transição** entre etapas

---

## 👤 PAINEL DO CLIENTE

### Dashboard (`/cliente`)

#### Header de Boas-vindas
- **Mensagem personalizada** com nome do cliente
- **Botão "Nova Consulta"**

#### Cards de Estatísticas (4 cards)
1. **Total de Consultas** (número)
2. **Consultas Pendentes** (número)
3. **Consultas Finalizadas** (número)
4. **Total Gasto** (valor formatado)

#### Carteira e Acesso Rápido
- **Card de Carteira**:
  - Saldo Disponível (valor formatado)
  - Link "Ver Carteira Completa"
  - Link "+ Adicionar Créditos"
- **Grid de Acesso Rápido** (10 cards):
  1. Agendar
  2. Consultas
  3. Carteira
  4. Pacotes
  5. Créditos
  6. Planos
  7. Assinaturas
  8. Promoções
  9. Loja
  10. Consultores
  11. Perfil
  12. Pagamentos

#### Últimas Consultas
- **Lista de consultas recentes** com:
  - Foto do consultor
  - Nome do consultor
  - Especialidade
  - Status (badge colorido)
  - Duração
  - Valor total
  - Data
  - Link "Ver detalhes"
- **Estado vazio** com mensagem e botão para agendar

#### Histórico de Pagamentos
- **Lista de pagamentos recentes** com:
  - Ícone do tipo de pagamento (PIX ou cartão)
  - Forma de pagamento
  - Data e hora
  - Valor
  - Status (badge colorido)
- **Link "Ver todos"**
- **Estado vazio** com mensagem

### Agendar Consulta (`/cliente/agendar`)

#### Seleção de Consultor
- **Lista de consultores disponíveis** (se nenhum consultor selecionado)
- **Cards de consultor** com:
  - Foto de perfil
  - Nome artístico
  - Especialidade
  - Rating
  - Preço por minuto
  - Botão "Escolher"
- **Estado vazio** se não houver consultores

#### Formulário de Agendamento (se consultor selecionado)
- **Informações do consultor**:
  - Foto de perfil
  - Nome artístico
  - Especialidade
  - Rating
- **Campos do formulário**:
  - Duração da Consulta (select: 15, 30, 45, 60, 90, 120 minutos)
  - Cálculo automático do valor total (preço por minuto × duração)
- **Botões**:
  - "Confirmar Agendamento"
  - "Escolher Outro"
- **Mensagens de sucesso/erro**

### Detalhes da Consulta (`/cliente/consulta/{id}`)

#### Informações da Consulta
- **Card do Consultor**:
  - Foto de perfil
  - Nome artístico
  - Especialidade
- **Card de Detalhes**:
  - Status (badge colorido)
  - Duração (minutos)
  - Valor Total
  - Método de consulta
  - Data de criação
  - Última atualização (se houver)
- **Botão "Cancelar Consulta"** (se status permitir)

#### Sidebar de Pagamento
- **Status do Pagamento** (badge colorido)
- **Valor pago**
- **Forma de pagamento**
- **Data do pagamento**
- **Link para ver detalhes do pagamento** (se houver)

### Carteira (`/cliente/carteira`)

#### Header
- **Saldo Disponível** (valor formatado grande)
- **Descrição**: "Créditos para usar em consultas"

#### Ações Rápidas (3 cards)
1. **Adicionar Créditos** (link para `/servicos/creditos`)
2. **Histórico** (link para `/cliente/pagamentos`)
3. **Agendar Consulta** (link para `/cliente/agendar`)

#### Estatísticas (3 cards)
1. **Total Gasto** (valor formatado)
2. **Créditos Adicionados** (valor formatado)
3. **Transações** (número total)

#### Histórico de Transações
- **Tabela de transações** com:
  - Ícone (verde para créditos, vermelho para consultas)
  - Descrição
  - Data e hora
  - Valor (positivo para créditos, negativo para consultas)
  - Status (badge colorido)
- **Estado vazio** com mensagem e botão para adicionar créditos

### Créditos (`/cliente/creditos`)

#### Header
- **Saldo Disponível** (valor formatado grande)
- **Botão "+ Adicionar Créditos"**

#### Histórico de Transações
- **Lista de transações** com:
  - Ícone (verde para créditos, vermelho para consultas)
  - Descrição
  - Data e hora
  - Valor (positivo para créditos, negativo para consultas)
  - Status (badge colorido)
- **Estado vazio** com mensagem e botão para adicionar créditos

### Perfil (`/cliente/perfil`)

#### Formulário de Edição
- **Campos editáveis**:
  - Nome Completo (obrigatório)
  - Email (obrigatório)
  - Nova Senha (opcional, mínimo 6 caracteres)
- **Campos somente leitura**:
  - CPF (não pode ser alterado)
  - Tipo de Conta
- **Botões**:
  - "Salvar Alterações"
  - "Cancelar"
- **Mensagens de sucesso/erro**

### Pagamentos (`/cliente/pagamentos`)

#### Tabela de Pagamentos
- **Colunas**:
  - Data (data e hora)
  - Tipo (Consulta ou Créditos)
  - Forma de Pagamento (PIX ou Cartão)
  - Valor (formatado)
  - Status (badge colorido)
  - Ações (link "Ver Consulta" se for consulta)
- **Estado vazio** com mensagem

---

## 🔮 PAINEL DO CONSULTOR

### Dashboard (`/consultor`)

#### Banner de Boas-vindas
- **Mensagem personalizada** com nome artístico
- **Botões**:
  - "Editar Perfil"
  - "Ver Consultas Pendentes"

#### Estatísticas (4 cards)
1. **Total de Consultas** (número)
2. **Pendentes** (número, badge amarelo)
3. **Em Andamento** (número, badge azul)
4. **Total Recebido** (valor formatado, badge verde)

#### Ações Rápidas (3 cards clicáveis)
1. **Consultas Pendentes** (link para `/consultor/consultas?status=pendente`)
2. **Em Andamento** (link para `/consultor/consultas?status=em_andamento`)
3. **Meu Perfil** (link para `/consultor/perfil`)

#### Consultas Pendentes (Urgentes)
- **Lista de consultas pendentes** com:
  - Avatar do cliente (inicial)
  - Nome do cliente
  - Data e hora da solicitação
  - Duração (minutos)
  - Valor total
  - Botões de ação:
    - "Aceitar" (verde)
    - "Recusar" (vermelho, com confirmação)
- **Mensagem**: "Ação necessária - Aguardando sua aprovação"
- **Link "Ver todas"**

#### Últimas Consultas
- **Lista de consultas recentes** com:
  - Avatar do cliente (inicial)
  - Nome do cliente
  - Data e hora
  - Duração (minutos)
  - Valor total
  - Status (badge colorido)
  - Link "Ver detalhes"
- **Estado vazio** com mensagem e botão para completar perfil
- **Link "Ver todas"**

### Consultas (`/consultor/consultas`)

#### Filtros
- **Botões de filtro**:
  - Todas
  - Pendentes
  - Em Andamento
  - Finalizadas
  - Canceladas
- **Filtro ativo** destacado

#### Tabela de Consultas
- **Colunas**:
  - Cliente (avatar, nome, email)
  - Data/Hora (oculto no mobile)
  - Duração (oculto no mobile/tablet)
  - Método (oculto no mobile/tablet)
  - Valor (formatado)
  - Status (badge colorido)
  - Ações (botões de ação conforme status)
- **Ações disponíveis**:
  - Aceitar (para pendentes)
  - Recusar (para pendentes, com confirmação)
  - Iniciar (para pendentes)
  - Finalizar (para em andamento)
  - Ver detalhes (sempre disponível)
- **Estado vazio** com mensagem

### Perfil (`/consultor/perfil`)

#### Alerta de Perfil Incompleto
- **Mensagem amarela** se perfil incompleto: "Complete seu perfil para começar a receber consultas!"

#### Formulário de Edição
- **Informações Profissionais**:
  - Nome Artístico (obrigatório)
  - Especialidade (obrigatório)
  - Categoria (obrigatório, com capitalização automática)
  - Preço por Minuto (obrigatório, número decimal)
  - Anos de Experiência (opcional, número)
  - Status (select: Online, Ocupado, Offline, Indisponível)
- **Foto de Perfil** (obrigatório):
  - Preview da imagem atual
  - Upload de nova imagem
  - Formatos aceitos: JPG, PNG, GIF, WebP (máx. 5MB)
- **Imagem de Capa** (opcional):
  - Preview da imagem atual
  - Upload de nova imagem
  - Formatos aceitos: JPG, PNG, GIF, WebP (máx. 10MB)
- **Biografia** (obrigatório, textarea, mínimo 50 caracteres)
- **Métodos de Consulta** (checkboxes):
  - Áudio/Chat
  - Telefone ou WhatsApp
  - Vídeo
  - E-mail/Gravação
- **Botões**:
  - "Salvar Alterações"
  - "Cancelar"
- **Mensagens de sucesso/erro**

### PIX e Pagamentos (`/consultor/pix`)

#### Formulário de Cadastro PIX
- **Tipo de Chave PIX** (select obrigatório):
  - CPF
  - E-mail
  - Telefone
  - Chave Aleatória
- **Chave PIX** (obrigatório, com validação conforme tipo)
- **Nome Completo** (obrigatório, como está no banco)
- **CPF** (obrigatório, com máscara automática)
- **Alerta informativo** sobre importância dos dados corretos
- **Botão "Salvar Chave PIX"**

#### Resumo Financeiro
- **Total Pendente** (valor formatado, badge amarelo)
- **Total Recebido** (valor formatado, badge verde)
- **Total de Intermediações** (número)

#### Histórico de Pagamentos
- **Lista de intermediações** com:
  - Data
  - Valor do Consultor
  - Status (Pendente, Pago)
  - Botão "Ver Detalhes" (se pendente)
- **Estado vazio** com mensagem

---

## 👨‍💼 PAINEL DO ADMIN

### Dashboard (`/admin`)

#### Estatísticas Principais (4 cards)
1. **Total Consultores**:
   - Número total
   - Aprovados | Pendentes
2. **Total Usuários**:
   - Número total
   - Ativos | Bloqueados
3. **Total Consultas**:
   - Número total
   - Pendentes
4. **Receita Total**:
   - Valor formatado
   - Pagamentos aprovados

#### Estatísticas Secundárias (3 cards)
1. **Pagamentos**:
   - Total de transações
   - Link "Ver todos"
2. **Contatos**:
   - Total de contatos
   - Pendentes
   - Link "Ver todos"
3. **Aprovações**:
   - Consultores pendentes
   - Link "Ver pendentes"

#### Dados Recentes
- **Consultores Recentes** (últimos 5):
  - Nome artístico
  - Especialidade
  - Status de aprovação (badge)
  - Status geral (badge)
- **Consultas Recentes** (últimas 5):
  - Nome do usuário
  - Nome do consultor
  - Valor total
  - Status (badge)
- **Pagamentos Recentes** (últimos 5):
  - Nome do usuário
  - Forma de pagamento
  - Valor
  - Status (badge)
- **Contatos Recentes** (últimos 5):
  - Nome
  - Email
  - Assunto
  - Status (badge)

### Gerenciar Consultores (`/admin/consultores`)

#### Header
- **Título e descrição**
- **Botão "Novo Consultor"**

#### Cards de Estatísticas (4 cards clicáveis)
1. **Total** (filtro: todos)
2. **Aprovados** (filtro: aprovados, badge verde)
3. **Pendentes** (filtro: pendentes, badge amarelo)
4. **Rejeitados** (filtro: rejeitados, badge vermelho)
- **Filtro ativo** destacado com ring

#### Tabela de Consultores
- **Colunas**:
  - Foto de perfil (ou avatar)
  - Nome Artístico
  - Especialidade
  - Categoria
  - Preço por Minuto
  - Status de Aprovação (badge)
  - Status Geral (badge)
  - Ações (ícones)
- **Ações disponíveis**:
  - Ver detalhes
  - Editar
  - Aprovar/Rejeitar
  - Deletar (com confirmação)
- **Filtros**:
  - Por status de aprovação (todos, aprovados, pendentes, rejeitados)
  - Por status geral (todos, online, offline, ocupado, indisponível)
  - Busca por texto (nome, especialidade, categoria)

#### Formulário Criar/Editar Consultor
- **Informações Básicas**:
  - Nome Completo (obrigatório)
  - CPF (obrigatório, com máscara)
  - Email (obrigatório)
  - Senha (obrigatório no criar, opcional no editar)
- **Informações Profissionais**:
  - Nome Artístico (obrigatório)
  - Especialidade (obrigatório)
  - Categoria (obrigatório)
  - Preço por Minuto (obrigatório)
  - Anos de Experiência (opcional)
  - Status (select)
  - Biografia (obrigatório)
  - Métodos de Consulta (checkboxes)
  - Foto de Perfil (upload)
  - Imagem de Capa (upload)
- **Status de Aprovação** (select: pendente, aprovado, rejeitado)
- **Botões**: Salvar, Cancelar

### Gerenciar Usuários (`/admin/usuarios`)

#### Header
- **Título e descrição**
- **Botão "Novo Usuário"**

#### Tabela de Usuários
- **Colunas**:
  - Avatar (inicial)
  - Nome
  - Email
  - Tipo (Cliente, Consultor, Admin)
  - Status (Ativo, Bloqueado, Banido)
  - Saldo/Créditos (para clientes)
  - Ações (dropdown)
- **Ações disponíveis**:
  - Ver detalhes
  - Editar
  - Bloquear/Desbloquear
  - Banir (com modal de motivo)
  - Desbanir
  - Adicionar/Remover/Definir Créditos (para clientes)
  - Deletar (com confirmação, não pode deletar próprio usuário)

#### Formulário Criar/Editar Usuário
- **Informações Básicas**:
  - Nome Completo (obrigatório)
  - CPF (obrigatório, com máscara)
  - Email (obrigatório, validação de duplicata)
  - Senha (obrigatório no criar, opcional no editar)
  - Tipo (select: Cliente, Consultor, Admin)
- **Status** (select: ativo, bloqueado, banido)
- **Botões**: Salvar, Cancelar

#### Modal de Banimento
- **Campo de motivo** (textarea obrigatório)
- **Botões**: Confirmar Banimento, Cancelar

#### Modal de Créditos
- **Tipo de operação** (select: Adicionar, Remover, Definir)
- **Valor** (número decimal, obrigatório)
- **Observação** (textarea opcional)
- **Botões**: Confirmar, Cancelar

### Gerenciar Consultas (`/admin/consultas`)

#### Estatísticas (4 cards)
1. **Pendentes** (número, badge amarelo)
2. **Em Andamento** (número, badge azul)
3. **Finalizadas** (número, badge verde)
4. **Total** (número, badge roxo)

#### Usuários com Créditos na Carteira
- **Grid de cards** com:
  - Avatar do usuário
  - Nome
  - Email
  - Saldo disponível
  - Link "Ver detalhes"

#### Tabela de Consultas
- **Colunas**:
  - ID
  - Cliente (nome, email)
  - Consultor (nome artístico)
  - Data/Hora
  - Duração
  - Valor Total
  - Status (badge)
  - Ações (dropdown)
- **Ações disponíveis**:
  - Ver detalhes
  - Editar status
  - Cancelar (com confirmação)
  - Deletar (com confirmação)
- **Filtros**:
  - Por status (todos, pendente, em_andamento, finalizada, cancelada)
  - Por período (data início, data fim)
  - Busca por texto (nome do cliente ou consultor)

### Gerenciar Pagamentos (`/admin/pagamentos`)

#### Filtros
- **Status** (select: todos, pendente, processando, aprovado, rejeitado, cancelado, reembolsado)
- **Forma de Pagamento** (select: todas, pix, cartao_credito, cartao_debito)
- **Botões**: Filtrar, Limpar

#### Tabela de Pagamentos
- **Colunas**:
  - ID
  - Usuário (nome)
  - Valor (formatado)
  - Forma (badge, oculto no mobile)
  - Status (badge)
  - Data (oculto no mobile/tablet)
  - Ações (dropdown)
- **Ações disponíveis**:
  - Ver detalhes
  - Aprovar (com confirmação)
  - Rejeitar (com confirmação e motivo)
  - Cancelar (com confirmação)
  - Reembolsar (com confirmação)
- **Estado vazio** com mensagem

### Gerenciar Banners (`/admin/banners`)

#### Header
- **Título e descrição**
- **Botão "Novo Banner"**

#### Grid de Banners
- **Cards de banner** com:
  - Preview da imagem
  - Título
  - Subtítulo
  - Link (se houver)
  - Ordem de exibição
  - Status (ativo/inativo)
  - Ações (editar, deletar, toggle status)

#### Formulário Criar/Editar Banner
- **Título** (obrigatório)
- **Subtítulo** (opcional)
- **Link** (opcional, URL)
- **Ordem de Exibição** (número, 0 = primeiro)
- **Imagem do Banner** (obrigatório):
  - Upload de arquivo (máx. 10MB)
  - Ou URL da imagem
  - Preview da imagem atual (se editar)
- **Status** (checkbox: ativo/inativo)
- **Botões**: Salvar, Cancelar

### Gerenciar Posts (`/admin/posts`)

#### Header
- **Título e descrição**
- **Botão "Novo Post"**

#### Tabela de Posts
- **Colunas**:
  - Imagem de capa (thumbnail)
  - Título
  - Categoria
  - Status (badge: rascunho, publicado, arquivado)
  - Data de publicação
  - Ações (editar, deletar)
- **Filtros**:
  - Por status
  - Busca por texto (título, categoria)

#### Formulário Criar/Editar Post
- **Título** (obrigatório)
- **Categoria** (texto)
- **Status** (select: rascunho, publicado, arquivado)
- **Data de Publicação** (datetime-local)
- **Resumo** (textarea)
- **Conteúdo** (textarea grande, aceita HTML básico)
- **Imagem de Capa** (upload, máx. 5MB)
- **Botões**: Salvar, Cancelar

### Configurações (`/admin/configuracoes`)

#### Tabs
1. **Geral**
2. **Integrações**
3. **Pagamentos**
4. **Manutenção**

#### Tab: Geral
- **Nome do Site** (obrigatório)
- **Email de Contato**
- **Descrição do Site** (textarea)
- **Logo do Site** (upload, preview da atual)
- **Telefone**
- **Endereço**
- **Botão "Salvar Configurações Gerais"**

#### Tab: Integrações
- **API Keys** de serviços externos
- **Configurações de integração** (varia conforme serviços)

#### Tab: Pagamentos
- **Configurações de gateway de pagamento**
- **Taxas e comissões**
- **Configurações de PIX**

#### Tab: Manutenção
- **Modo de Manutenção** (checkbox)
- **Mensagem de Manutenção** (textarea)
- **Botão "Salvar Configurações de Manutenção"**

### Relatórios (`/admin/relatorios`)

#### Filtros de Período
- **Data Início** (date picker)
- **Data Fim** (date picker)
- **Botões**: Filtrar, Limpar

#### Estatísticas Gerais (4 cards)
1. **Total de Usuários**:
   - Número total
   - Clientes | Consultores
2. **Consultores Aprovados** (número)
3. **Total de Consultas**:
   - Número total
   - Finalizadas | Pendentes
4. **Receita Total**:
   - Valor formatado
   - Total de transações

#### Gráficos e Tabelas
- **Gráfico de consultas por período**
- **Gráfico de receita por período**
- **Tabela de consultores mais procurados**
- **Tabela de clientes mais ativos**
- **Exportação de relatórios** (PDF, Excel)

### Gerenciar Créditos (`/admin/creditos`)

#### Header
- **Título e descrição**
- **Botão "Adicionar Crédito"**

#### Tabela de Créditos
- **Colunas**:
  - Cliente (nome, email)
  - Valor
  - Data
  - Observação
  - Ações (editar, deletar)

#### Formulário Adicionar/Editar Crédito
- **Cliente** (select, obrigatório, apenas clientes)
- **Valor** (número decimal, obrigatório)
- **Observação** (textarea opcional, apenas no criar)
- **Botões**: Salvar, Cancelar

### Intermediação de Pagamentos (`/admin/intermediacao`)

#### Estatísticas (3 cards)
1. **Total Pendente** (valor formatado, badge amarelo)
2. **Total Pago** (valor formatado, badge verde)
3. **Total de Intermediações** (número, badge roxo)

#### Filtros
- **Status** (select: todos, pendente, pago)
- **Consultor** (select: todos ou consultor específico)
- **Botões**: Filtrar, Limpar

#### Tabela de Intermediações
- **Colunas**:
  - Consultor (nome artístico)
  - Valor do Consultor (formatado)
  - Valor da Plataforma (formatado)
  - Valor Total (formatado)
  - Status (badge)
  - Data
  - Ações (pagar, ver detalhes)

#### Modal de Pagamento
- **Informações do consultor**
- **Valor a Pagar** (formatado)
- **ID do PIX** (opcional, número)
- **Botões**: Confirmar Pagamento, Cancelar

### Gerenciar Contatos (`/admin/contatos`)

#### Filtros
- **Status** (select: todos, pendente, lida, respondida, arquivada)
- **Botões**: Filtrar, Limpar

#### Lista de Contatos
- **Cards de contato** com:
  - Avatar (inicial)
  - Nome
  - Email
  - Telefone (se houver)
  - Assunto (badge)
  - Mensagem (texto completo)
  - Data e hora
  - ID do usuário (se logado)
  - Status (badge colorido)
  - Ações (dropdown)
- **Ações disponíveis**:
  - Marcar como Lida
  - Marcar como Respondida
  - Arquivar
  - Deletar (com confirmação)
- **Estado vazio** com mensagem

### Configurações do Rodapé (`/admin/rodape`)

#### Descrição e Informações
- **Descrição do Site** (textarea)
- **Texto de Copyright** (texto)

#### Redes Sociais
- **URLs** (opcional):
  - Facebook
  - Instagram
  - WhatsApp
  - YouTube
  - Twitter
  - LinkedIn

#### Links Rápidos
- **Gerenciamento de links**:
  - Adicionar link (título, URL)
  - Editar link
  - Deletar link
  - Ordenar links

#### Categorias
- **Gerenciamento de categorias**:
  - Adicionar categoria (nome, ícone, URL)
  - Editar categoria
  - Deletar categoria
  - Ordenar categorias

#### Botão "Salvar Configurações do Rodapé"

### Login Admin (`/admin/login`)
- **Formulário de login** específico para administradores
- **Campos**: Email e Senha
- **Validação de permissões** de admin
- **Redirecionamento** para dashboard após login

---

## 🔐 FUNCIONALIDADES GERAIS

### Autenticação
- **Login** para clientes, consultores e admins
- **Cadastro** de novos usuários (clientes e consultores)
- **Recuperação de senha** (se implementado)
- **Sessões** com controle de acesso
- **Logout** em todas as áreas

### Validações
- **CPF** (formato e validação)
- **Email** (formato e duplicatas)
- **Senha** (mínimo 6 caracteres)
- **Upload de imagens** (formato, tamanho)
- **Campos obrigatórios** em todos os formulários

### Mensagens
- **Sucesso** (verde, com ícone)
- **Erro** (vermelho, com ícone)
- **Aviso** (amarelo, com ícone)
- **Info** (azul, com ícone)

### Design
- **Tema branco místico** com gradientes sutis
- **Responsivo** (mobile, tablet, desktop)
- **Animações** suaves
- **Ícones Font Awesome**
- **Tipografia** (Marcellus para títulos, Poppins para texto)

### Navegação
- **Header** com menu responsivo
- **Footer** com links e informações
- **Breadcrumbs** (em algumas páginas)
- **Links de navegação rápida** nos dashboards

---

## 📊 RESUMO DE FUNCIONALIDADES POR ÁREA

### Cliente
- ✅ Dashboard com estatísticas
- ✅ Agendar consultas
- ✅ Ver detalhes de consultas
- ✅ Gerenciar carteira e créditos
- ✅ Ver histórico de pagamentos
- ✅ Editar perfil
- ✅ Acesso rápido a serviços

### Consultor
- ✅ Dashboard com estatísticas
- ✅ Gerenciar consultas (aceitar, recusar, iniciar, finalizar)
- ✅ Editar perfil profissional
- ✅ Cadastrar chave PIX
- ✅ Ver resumo financeiro
- ✅ Ver histórico de pagamentos

### Admin
- ✅ Dashboard completo com todas as estatísticas
- ✅ Gerenciar consultores (criar, editar, aprovar, rejeitar, deletar)
- ✅ Gerenciar usuários (criar, editar, bloquear, banir, gerenciar créditos)
- ✅ Gerenciar consultas (ver, editar status, cancelar, deletar)
- ✅ Gerenciar pagamentos (aprovar, rejeitar, cancelar, reembolsar)
- ✅ Gerenciar banners rotativos
- ✅ Gerenciar posts do blog
- ✅ Configurações gerais do site
- ✅ Relatórios e estatísticas
- ✅ Gerenciar créditos dos clientes
- ✅ Intermediação de pagamentos para consultores
- ✅ Gerenciar mensagens de contato
- ✅ Configurar rodapé do site

---

**Documento criado em:** <?= date('d/m/Y H:i') ?>
**Versão:** 1.0
**Sistema:** Conselhos Esotérico

