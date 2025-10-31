# 🚀 Guia de Deploy - Vercel

Este guia explica como configurar o deploy automático na Vercel com diferentes ambientes (Produção e Homologação).

## 📋 Pré-requisitos

1. Conta na Vercel (https://vercel.com)
2. Conta no Supabase (https://supabase.com)
3. Dois projetos Supabase criados:
   - **Projeto de Produção** (para branch `main`)
   - **Projeto de Homologação** (para branch `develop`)

## 🔧 Passo 1: Configurar Projetos no Supabase

### Criar Projeto de Homologação

1. Acesse https://supabase.com/dashboard
2. Clique em **New Project**
3. Preencha os dados:
   - **Name:** `integra-prontuario-homologacao` (ou o nome que preferir)
   - **Database Password:** Crie uma senha forte
   - **Region:** Escolha a região mais próxima
4. Clique em **Create new project**
5. Aguarde a criação do projeto (pode levar alguns minutos)

### Obter Credenciais

Para cada projeto (Produção e Homologação):

1. No dashboard do Supabase, selecione o projeto
2. Vá em **Settings** → **API**
3. Anote as seguintes informações:
   - **Project URL:** `https://[project-id].supabase.co`
   - **anon public key:** (na seção Project API keys)

**⚠️ IMPORTANTE:** Use a **anon public** key, nunca a **service_role** key!

## 🔗 Passo 2: Conectar Repositório na Vercel

1. Acesse https://vercel.com/dashboard
2. Clique em **Add New...** → **Project**
3. Selecione seu repositório (GitHub/GitLab/Bitbucket)
4. Configure o projeto:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (ou deixe em branco se está na raiz)
   - **Build Command:** `yarn build` (ou `npm run build`)
   - **Output Directory:** `dist`
   - **Install Command:** `yarn install` (ou `npm install`)

5. Clique em **Deploy** (não configure variáveis ainda, faremos isso depois)

## ⚙️ Passo 3: Configurar Variáveis de Ambiente

### 3.1 Variáveis de Produção

1. No projeto Vercel, vá em **Settings** → **Environment Variables**
2. Configure as variáveis para **Production**:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `VITE_SUPABASE_URL` | `https://[projeto-producao].supabase.co` | Production |
| `VITE_SUPABASE_ANON_KEY` | `[chave-anon-producao]` | Production |
| `VITE_ENVIRONMENT` | `production` | Production |

3. Clique em **Save**

### 3.2 Variáveis de Preview/Homologação

Na mesma página, configure as variáveis para **Preview**:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `VITE_SUPABASE_URL` | `https://[projeto-homologacao].supabase.co` | Preview |
| `VITE_SUPABASE_ANON_KEY` | `[chave-anon-homologacao]` | Preview |
| `VITE_ENVIRONMENT` | `preview` | Preview |

### 3.3 Variáveis de Development

Configure também para **Development** (usado em PRs individuais):

| Nome | Valor | Ambiente |
|------|-------|----------|
| `VITE_SUPABASE_URL` | `https://[projeto-homologacao].supabase.co` | Development |
| `VITE_SUPABASE_ANON_KEY` | `[chave-anon-homologacao]` | Development |
| `VITE_ENVIRONMENT` | `development` | Development |

**💡 Dica:** Você pode selecionar múltiplos ambientes ao criar uma variável clicando nas checkboxes.

## 🌿 Passo 4: Configurar Deploy Automático por Branch

### 4.1 Configurar Branch `main` → Production

1. No projeto Vercel, vá em **Settings** → **Git**
2. Na seção **Production Branch**, certifique-se de que está configurado como `main`
3. O deploy automático já está habilitado por padrão para a branch `main`

**Resultado:** Todo merge na branch `main` fará deploy automático usando as variáveis de **Production**.

### 4.2 Configurar Branch `develop` → Preview

1. Ainda em **Settings** → **Git**
2. Na seção **Ignored Build Step**, deixe em branco (ou configure se necessário)
3. O deploy automático para branches diferentes de `main` já está habilitado por padrão

**Resultado:** Todo merge na branch `develop` fará deploy automático usando as variáveis de **Preview**.

### 4.3 Configurar Branch Protection (Opcional mas Recomendado)

No GitHub/GitLab:

1. Vá nas configurações do repositório → **Branches**
2. Adicione regra de proteção para a branch `main`:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging

## 📝 Passo 5: Configurar Ambiente Local

Para desenvolvimento local, crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://[projeto-homologacao].supabase.co
VITE_SUPABASE_ANON_KEY=[chave-anon-homologacao]
VITE_ENVIRONMENT=development
```

**⚠️ IMPORTANTE:** 
- O arquivo `.env.local` está no `.gitignore` e NÃO deve ser commitado
- Use sempre o projeto de HOMOLOGAÇÃO para desenvolvimento local

## ✅ Passo 6: Verificar Configuração

### Testar Deploy de Produção

1. Faça merge de uma branch para `main`
2. Acompanhe o deploy na Vercel Dashboard
3. Verifique se o deploy usa as variáveis de Production
4. Teste a aplicação em produção

### Testar Deploy de Homologação

1. Faça merge de uma branch para `develop`
2. Acompanhe o deploy na Vercel Dashboard
3. Verifique se o deploy usa as variáveis de Preview
4. Teste a aplicação em homologação

### Verificar Ambiente no Console

No console do navegador (apenas em desenvolvimento/preview, não em produção), você verá:
```
[Supabase] Ambiente: preview
[Supabase] URL: https://[projeto-homologacao].supabase.co
```

## 🔍 Troubleshooting

### Deploy está usando variáveis erradas

1. Verifique se as variáveis estão configuradas no ambiente correto na Vercel
2. Verifique se o ambiente está sendo detectado corretamente (veja logs do build)
3. Certifique-se de que `VITE_ENVIRONMENT` está configurado corretamente

### Erro: "Config do Supabase ausente ou inválida"

1. Verifique se todas as variáveis estão configuradas na Vercel
2. Verifique se as variáveis estão no ambiente correto (Production/Preview/Development)
3. Verifique se os valores estão corretos (sem espaços extras, URLs completas)

### Ambiente não está sendo detectado corretamente

O código detecta o ambiente na seguinte ordem:
1. `VITE_ENVIRONMENT` (se configurado)
2. `VERCEL_ENV` (fornecido automaticamente pela Vercel)
3. `MODE` (modo do Vite)

Certifique-se de que `VITE_ENVIRONMENT` está configurado ou confie na detecção automática da Vercel.

## 📊 Resumo da Configuração

| Branch | Ambiente Vercel | Projeto Supabase | Deploy Automático |
|--------|----------------|------------------|-------------------|
| `main` | Production | Produção | ✅ Sim |
| `develop` | Preview | Homologação | ✅ Sim |
| `feature/*` | Preview | Homologação | ✅ Sim (PRs) |
| Local | Development | Homologação | Manual (`yarn dev`) |

## 🎯 Próximos Passos

1. ✅ Configure os projetos no Supabase
2. ✅ Configure as variáveis na Vercel
3. ✅ Teste o deploy em cada ambiente
4. ✅ Configure políticas RLS no Supabase conforme necessário
5. ✅ Configure autenticação no Supabase se necessário

## 📚 Referências

- [Documentação Vercel - Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Documentação Vercel - Git Integration](https://vercel.com/docs/concepts/git)
- [Documentação Supabase - Getting Started](https://supabase.com/docs/guides/getting-started)

