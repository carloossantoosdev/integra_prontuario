# Integra Prontuário

Sistema de gerenciamento de prontuários para fisioterapia desenvolvido com React, TypeScript, Vite e Supabase.

## 🚀 Tecnologias

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Estilização**: Tailwind CSS
- **Componentes UI**: Radix UI
- **Backend/Database**: Supabase
- **Gerenciamento de Estado**: React Query (TanStack Query)
- **Formulários**: React Hook Form + Zod
- **Roteamento**: React Router v6
- **Deploy**: Vercel

## 📋 Pré-requisitos

- Node.js 18+ 
- Yarn ou NPM
- Conta no Supabase (para configuração do banco de dados)
- Conta na Vercel (para deploy)

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd integra_prontuario
```

### 2. Instale as dependências

```bash
yarn install
# ou
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo e configure suas credenciais:

```bash
cp .env.example .env.local
```

O arquivo `.env.local` já vem pré-configurado com as credenciais do ambiente de **homologação**. Se necessário, ajuste as variáveis conforme a documentação em [`ENV_VARIABLES.md`](./ENV_VARIABLES.md).

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_anon_key
VITE_ENVIRONMENT=development
```

### 4. Inicie o servidor de desenvolvimento

```bash
yarn dev
# ou
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## 🏗️ Build para Produção

```bash
yarn build
# ou
npm run build
```

Os arquivos de build serão gerados na pasta `dist/`.

### Preview do build

```bash
yarn preview
# ou
npm run preview
```

## 🌍 Ambientes

Este projeto está configurado para trabalhar com **múltiplos ambientes**:

### 🔴 Produção (Branch `main`)
- Deploy automático na Vercel
- Usa banco de dados de **produção**
- URL: https://seu-dominio-producao.vercel.app

### 🟡 Homologação (Branch `develop`)
- Deploy preview na Vercel
- Usa banco de dados de **homologação/staging**
- URL: https://seu-dominio-preview.vercel.app

### 💻 Desenvolvimento Local
- Usa banco de dados de **homologação**
- Configurado via `.env.local`

Para mais detalhes sobre configuração de ambientes, consulte [`ENV_VARIABLES.md`](./ENV_VARIABLES.md).

## 📁 Estrutura do Projeto

```
integra_prontuario/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── crud/           # Componentes CRUD (DataTable, Forms)
│   │   ├── forms/          # Formulários específicos
│   │   ├── layout/         # Layout (Header, Sidebar)
│   │   └── ui/             # Componentes UI do Radix
│   ├── hooks/              # Custom hooks
│   │   ├── useSupabaseQuery.ts
│   │   └── useSupabaseMutation.ts
│   ├── providers/          # Context providers
│   │   ├── AuthProvider.tsx
│   │   ├── QueryProvider.tsx
│   │   └── ThemeProvider.tsx
│   ├── services/           # Serviços e APIs
│   ├── types/              # TypeScript types
│   ├── utils/              # Utilitários
│   │   └── supabaseClient.ts
│   ├── views/              # Páginas/Views
│   │   ├── Auth/
│   │   ├── Atendimentos/
│   │   ├── Home/
│   │   └── Kpis/
│   ├── App.tsx
│   ├── routes.tsx
│   └── index.tsx
├── public/                 # Arquivos estáticos
├── .env.example           # Template de variáveis de ambiente
├── .env.local             # Variáveis locais (não commitado)
├── ENV_VARIABLES.md       # Documentação completa das variáveis
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vercel.json
```

## 🗄️ Banco de Dados

O projeto utiliza **Supabase** como backend. As tabelas principais incluem:

- `pacientes` - Cadastro de pacientes
- `evolucao_rcp` - Evoluções de Reabilitação Cardiopulmonar
- `evolucao_dnm` - Evoluções de Desenvolvimento Neuropsicomotor
- `kpis` - Indicadores de performance

### Configuração do Banco

1. Crie um projeto no [Supabase](https://supabase.com)
2. Execute os scripts SQL necessários para criar as tabelas
3. Configure as variáveis de ambiente conforme [`ENV_VARIABLES.md`](./ENV_VARIABLES.md)

## 🔐 Autenticação

O projeto possui autenticação integrada usando Supabase Auth. As rotas são protegidas pelo componente `ProtectedRoute`.

## 📦 Scripts Disponíveis

- `yarn dev` - Inicia servidor de desenvolvimento
- `yarn build` - Build para produção
- `yarn preview` - Preview do build de produção

## 🚀 Deploy

### Vercel (Recomendado)

O projeto está configurado para deploy automático na Vercel:

1. Conecte seu repositório na Vercel
2. Configure as variáveis de ambiente (veja [`ENV_VARIABLES.md`](./ENV_VARIABLES.md))
3. Configure a branch de produção como `main`
4. Faça push para `main` (produção) ou `develop` (homologação)

### Configuração das Variáveis na Vercel

Acesse: **Vercel Dashboard → Seu Projeto → Settings → Environment Variables**

Consulte a documentação completa em [`ENV_VARIABLES.md`](./ENV_VARIABLES.md) para configurar corretamente as variáveis para cada ambiente.

## 🤝 Contribuindo

1. Crie uma branch a partir de `develop`:
   ```bash
   git checkout develop
   git checkout -b feature/nova-funcionalidade
   ```

2. Faça suas alterações e commit:
   ```bash
   git add .
   git commit -m "feat: adiciona nova funcionalidade"
   ```

3. Faça push para o repositório:
   ```bash
   git push origin feature/nova-funcionalidade
   ```

4. Abra um Pull Request para `develop`

### Fluxo de Branches

- `main` - Código em produção (estável)
- `develop` - Código em desenvolvimento/homologação
- `feature/*` - Novas funcionalidades
- `fix/*` - Correções de bugs

## 📝 Convenções de Código

- **Commits**: Seguir [Conventional Commits](https://www.conventionalcommits.org/)
  - `feat:` - Nova funcionalidade
  - `fix:` - Correção de bug
  - `docs:` - Documentação
  - `style:` - Formatação
  - `refactor:` - Refatoração
  - `test:` - Testes
  - `chore:` - Tarefas gerais

## 📄 Licença

Este projeto é privado e proprietário.

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.

---

**Última atualização**: Novembro 2025

