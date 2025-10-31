# Configuração de Variáveis de Ambiente

Este arquivo documenta todas as variáveis de ambiente necessárias para o projeto.

## Variáveis Obrigatórias

### VITE_SUPABASE_URL
URL do projeto Supabase. Formato: `https://[project-id].supabase.co`

**Exemplos:**
- Produção: `https://abc123xyz.supabase.co`
- Homologação: `https://def456uvw.supabase.co`

### VITE_SUPABASE_ANON_KEY
Chave pública (anon) do Supabase. Pode ser encontrada em:
- Dashboard Supabase → Settings → API → Project API keys → anon public

**IMPORTANTE:** Esta é uma chave pública que pode ser exposta no cliente. NUNCA use a service_role key aqui.

### VITE_ENVIRONMENT (Opcional)
Define explicitamente o ambiente. Valores aceitos:
- `production` - Ambiente de produção
- `preview` - Ambiente de preview/homologação
- `development` - Ambiente de desenvolvimento local

**Nota:** Se não especificado, o sistema detecta automaticamente baseado em:
1. `VERCEL_ENV` (fornecido automaticamente pela Vercel)
2. `MODE` (modo do Vite)

## Configuração por Ambiente

### 🏠 Desenvolvimento Local (.env.local)

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Desenvolvimento Local - Use projeto de HOMOLOGAÇÃO
VITE_SUPABASE_URL=https://[projeto-homologacao].supabase.co
VITE_SUPABASE_ANON_KEY=[chave-anon-homologacao]
VITE_ENVIRONMENT=development
```

**⚠️ IMPORTANTE:** 
- O arquivo `.env.local` está no `.gitignore` e NÃO deve ser commitado
- Use sempre o projeto de HOMOLOGAÇÃO para desenvolvimento local

### 🚀 Vercel - Production (Branch: main)

Configure na Vercel Dashboard → Settings → Environment Variables → Production:

```env
VITE_SUPABASE_URL=https://[projeto-producao].supabase.co
VITE_SUPABASE_ANON_KEY=[chave-anon-producao]
VITE_ENVIRONMENT=production
```

**Branch:** `main`  
**Quando usar:** Deploy automático quando houver merge na branch `main`

### 🧪 Vercel - Preview (Branch: develop)

Configure na Vercel Dashboard → Settings → Environment Variables → Preview:

```env
VITE_SUPABASE_URL=https://[projeto-homologacao].supabase.co
VITE_SUPABASE_ANON_KEY=[chave-anon-homologacao]
VITE_ENVIRONMENT=preview
```

**Branch:** `develop`  
**Quando usar:** Deploy automático quando houver merge na branch `develop`

### 🔧 Vercel - Development

Configure na Vercel Dashboard → Settings → Environment Variables → Development:

```env
VITE_SUPABASE_URL=https://[projeto-homologacao].supabase.co
VITE_SUPABASE_ANON_KEY=[chave-anon-homologacao]
VITE_ENVIRONMENT=development
```

**Quando usar:** Deploy de previews de PRs individuais

## Como Obter as Credenciais do Supabase

### 1. Acesse o Dashboard Supabase
- https://supabase.com/dashboard
- Faça login na sua conta

### 2. Selecione o Projeto
- Para **Produção**: Selecione o projeto de produção
- Para **Homologação**: Selecione o projeto de homologação

### 3. Obtenha as Credenciais
- Vá em **Settings** → **API**
- Encontre a seção **Project API keys**
- Copie a **anon public** key (NÃO a service_role key!)

### 4. Obtenha a URL
- Na mesma página, encontre a seção **Project URL**
- A URL está no formato: `https://[project-id].supabase.co`

## Verificação

Após configurar as variáveis, você pode verificar se estão corretas:

1. **Local:** Execute `yarn dev` e verifique o console do navegador
2. **Vercel:** Verifique os logs do deploy na Vercel Dashboard

## Troubleshooting

### Erro: "Config do Supabase ausente ou inválida"
- Verifique se todas as variáveis estão configuradas
- Verifique se a ANON_KEY está correta (anon public, não service_role)
- Verifique se a URL está no formato correto

### Ambiente incorreto detectado
- Verifique se `VITE_ENVIRONMENT` está configurado corretamente
- Na Vercel, verifique se as variáveis estão no ambiente correto (Production/Preview/Development)

### Não consegue conectar ao Supabase
- Verifique se o projeto Supabase está ativo
- Verifique se as políticas RLS (Row Level Security) estão configuradas corretamente
- Verifique se a URL e a key correspondem ao mesmo projeto

