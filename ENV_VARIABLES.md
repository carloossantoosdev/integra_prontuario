# Variáveis de Ambiente

Este documento descreve todas as variáveis de ambiente necessárias para o projeto **Integra Prontuário**.

## 📋 Índice

- [Variáveis Necessárias](#variáveis-necessárias)
- [Configuração por Ambiente](#configuração-por-ambiente)
- [Configuração Local](#configuração-local)
- [Configuração na Vercel](#configuração-na-vercel)
- [Como Obter as Credenciais](#como-obter-as-credenciais)

---

## Variáveis Necessárias

### `VITE_SUPABASE_URL`
**Obrigatória** | Tipo: `string`

URL do projeto Supabase.

- **Produção**: `https://ssxdmbojuvqkkkujakdk.supabase.co`
- **Homologação**: `https://kmrvojpqauwnzsygsmck.supabase.co`

### `VITE_SUPABASE_ANON_KEY`
**Obrigatória** | Tipo: `string`

Chave anônima (pública) do projeto Supabase para autenticação client-side.

- **Produção**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzeGRtYm9qdXZxa2trdWpha2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1OTQ1MDksImV4cCI6MjA3MzE3MDUwOX0.43oP8PkWk3Rr-TewGWEiHiX7oYF-VI_g0EvA4h8B_rM`
- **Homologação**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcnZvanBxYXV3bnpzeWdzbWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTY5NTAsImV4cCI6MjA3ODE5Mjk1MH0.sKrSEVsoqyYxNsY24PysyC_GwhUOR2ThpLZUuj2xHC8`

### `VITE_ENVIRONMENT` (Opcional)
Tipo: `development` | `preview` | `production`

Define explicitamente o ambiente. Se não definida, será detectada automaticamente:
- Local (Vite): `development`
- Vercel Preview: `preview`
- Vercel Production: `production`

---

## Configuração por Ambiente

### 🔴 Produção (Branch `main`)

**Projeto Supabase**: `integra-prontuario-prod`

```env
VITE_SUPABASE_URL=https://ssxdmbojuvqkkkujakdk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzeGRtYm9qdXZxa2trdWpha2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1OTQ1MDksImV4cCI6MjA3MzE3MDUwOX0.43oP8PkWk3Rr-TewGWEiHiX7oYF-VI_g0EvA4h8B_rM
```

### 🟡 Homologação (Branch `develop` e outras)

**Projeto Supabase**: `integra-prontuario-staging`

```env
VITE_SUPABASE_URL=https://kmrvojpqauwnzsygsmck.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcnZvanBxYXV3bnpzeWdzbWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTY5NTAsImV4cCI6MjA3ODE5Mjk1MH0.sKrSEVsoqyYxNsY24PysyC_GwhUOR2ThpLZUuj2xHC8
```

### 💻 Desenvolvimento Local

Use as credenciais de **Homologação** (staging).

---

## Configuração Local

### 1. Copiar o arquivo de exemplo

```bash
cp .env.example .env.local
```

### 2. Editar `.env.local`

O arquivo `.env.local` já está pré-configurado com as credenciais de homologação:

```env
VITE_SUPABASE_URL=https://kmrvojpqauwnzsygsmck.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcnZvanBxYXV3bnpzeWdzbWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTY5NTAsImV4cCI6MjA3ODE5Mjk1MH0.sKrSEVsoqyYxNsY24PysyC_GwhUOR2ThpLZUuj2xHC8
VITE_ENVIRONMENT=development
```

### 3. Iniciar o servidor de desenvolvimento

```bash
yarn dev
```

O console mostrará qual ambiente está sendo usado:
```
[Supabase] Ambiente: development
[Supabase] URL: https://kmrvojpqauwnzsygsmck.supabase.co
```

---

## Configuração na Vercel

### Passo a Passo

1. **Acesse o Dashboard da Vercel**
   - Vá para: https://vercel.com/dashboard
   - Selecione seu projeto

2. **Acesse Environment Variables**
   - Settings → Environment Variables

3. **Configure as Variáveis de PRODUÇÃO**

   | Variable Name | Value | Environments |
   |--------------|-------|--------------|
   | `VITE_SUPABASE_URL` | `https://ssxdmbojuvqkkkujakdk.supabase.co` | ✅ Production |
   | `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzeGRtYm9qdXZxa2trdWpha2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1OTQ1MDksImV4cCI6MjA3MzE3MDUwOX0.43oP8PkWk3Rr-TewGWEiHiX7oYF-VI_g0EvA4h8B_rM` | ✅ Production |

4. **Configure as Variáveis de HOMOLOGAÇÃO**

   | Variable Name | Value | Environments |
   |--------------|-------|--------------|
   | `VITE_SUPABASE_URL` | `https://kmrvojpqauwnzsygsmck.supabase.co` | ✅ Preview, ✅ Development |
   | `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcnZvanBxYXV3bnpzeWdzbWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTY5NTAsImV4cCI6MjA3ODE5Mjk1MH0.sKrSEVsoqyYxNsY24PysyC_GwhUOR2ThpLZUuj2xHC8` | ✅ Preview, ✅ Development |

5. **Confirme a configuração**
   - Clique em "Save" para cada variável

6. **Configure a Branch de Produção**
   - Settings → Git → Production Branch
   - Defina como: `main`

### Resultado

- **Push para `main`** → Deploy de produção com banco de produção
- **Push para `develop` ou outras branches** → Deploy preview com banco de homologação
- **Desenvolvimento local** → Usa banco de homologação

---

## Como Obter as Credenciais

### No Supabase Dashboard

1. Acesse: https://app.supabase.com/
2. Selecione o projeto desejado
3. Vá em: **Settings** → **API**
4. Copie:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Project API keys** → `anon` `public` → `VITE_SUPABASE_ANON_KEY`

### Projetos Configurados

- **Produção**: `integra-prontuario-prod` → `ssxdmbojuvqkkkujakdk`
- **Homologação**: `integra-prontuario-staging` → `kmrvojpqauwnzsygsmck`

---

## 🔒 Segurança

### ⚠️ IMPORTANTE

- **NUNCA** commite o arquivo `.env.local` no git
- O `.gitignore` já está configurado para ignorar `*.local`
- A `ANON_KEY` é segura para uso público (client-side)
- A `SERVICE_ROLE_KEY` NUNCA deve ser exposta no frontend

### Verificação

Para verificar se o arquivo está sendo ignorado:

```bash
git status
# .env.local não deve aparecer
```

---

## 📚 Referências

- [Supabase Environment Variables](https://supabase.com/docs/guides/getting-started/local-development#environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

## 🆘 Troubleshooting

### Erro: "Config do Supabase ausente ou inválida"

**Causa**: Variável `VITE_SUPABASE_ANON_KEY` não está definida.

**Solução**:
- Local: Verifique se o arquivo `.env.local` existe e está correto
- Vercel: Verifique se as variáveis estão configuradas no dashboard

### Ambiente errado está sendo usado

**Verificar qual ambiente está ativo**:
- Abra o console do navegador
- Em desenvolvimento/preview, verá: `[Supabase] Ambiente: development` ou `preview`
- Em produção, não verá logs (por segurança)

**Forçar ambiente específico**:
```env
VITE_ENVIRONMENT=development
```

---

**Última atualização**: Janeiro 2025

