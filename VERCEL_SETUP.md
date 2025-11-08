# 📘 Guia de Configuração da Vercel

Este guia mostra passo a passo como configurar as variáveis de ambiente na Vercel para separar os ambientes de **Produção** e **Homologação**.

## 🎯 Objetivo

- **Branch `main`** → Deploy de **Produção** → Banco de dados de produção
- **Branch `develop`** e outras → Deploy de **Preview** → Banco de dados de homologação

---

## 📋 Passo a Passo

### 1️⃣ Acesse o Dashboard da Vercel

1. Vá para: https://vercel.com/dashboard
2. Faça login com sua conta
3. Selecione o projeto **integra_prontuario**

### 2️⃣ Acesse Environment Variables

1. Clique em **Settings** (no menu superior)
2. No menu lateral esquerdo, clique em **Environment Variables**

### 3️⃣ Configure as Variáveis de PRODUÇÃO

**Adicione a primeira variável:**

1. Clique no botão **"Add New"** ou **"New Variable"**
2. Preencha os campos:

   ```
   Key: VITE_SUPABASE_URL
   Value: https://ssxdmbojuvqkkkujakdk.supabase.co
   ```

3. **IMPORTANTE**: Em "Environments", marque **APENAS**:
   - ✅ **Production**
   - ❌ Preview (desmarcado)
   - ❌ Development (desmarcado)

4. Clique em **Save**

**Adicione a segunda variável:**

1. Clique novamente em **"Add New"** ou **"New Variable"**
2. Preencha os campos:

   ```
   Key: VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzeGRtYm9qdXZxa2trdWpha2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1OTQ1MDksImV4cCI6MjA3MzE3MDUwOX0.43oP8PkWk3Rr-TewGWEiHiX7oYF-VI_g0EvA4h8B_rM
   ```

3. **IMPORTANTE**: Em "Environments", marque **APENAS**:
   - ✅ **Production**
   - ❌ Preview (desmarcado)
   - ❌ Development (desmarcado)

4. Clique em **Save**

### 4️⃣ Configure as Variáveis de HOMOLOGAÇÃO

**Adicione a terceira variável:**

1. Clique em **"Add New"** ou **"New Variable"**
2. Preencha os campos:

   ```
   Key: VITE_SUPABASE_URL
   Value: https://kmrvojpqauwnzsygsmck.supabase.co
   ```

3. **IMPORTANTE**: Em "Environments", marque:
   - ❌ Production (desmarcado)
   - ✅ **Preview**
   - ✅ **Development**

4. Clique em **Save**

**Adicione a quarta variável:**

1. Clique em **"Add New"** ou **"New Variable"**
2. Preencha os campos:

   ```
   Key: VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcnZvanBxYXV3bnpzeWdzbWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTY5NTAsImV4cCI6MjA3ODE5Mjk1MH0.sKrSEVsoqyYxNsY24PysyC_GwhUOR2ThpLZUuj2xHC8
   ```

3. **IMPORTANTE**: Em "Environments", marque:
   - ❌ Production (desmarcado)
   - ✅ **Preview**
   - ✅ **Development**

4. Clique em **Save**

### 5️⃣ Configure a Branch de Produção

1. No menu lateral, clique em **Git**
2. Encontre a seção **"Production Branch"**
3. Certifique-se de que está configurado como: **`main`**
4. Se não estiver, altere para `main` e salve

### 6️⃣ Verificação Final

Após configurar tudo, você deve ter **4 variáveis**:

| Variable Name | Production | Preview | Development |
|--------------|------------|---------|-------------|
| `VITE_SUPABASE_URL` (prod) | ✅ | ❌ | ❌ |
| `VITE_SUPABASE_ANON_KEY` (prod) | ✅ | ❌ | ❌ |
| `VITE_SUPABASE_URL` (staging) | ❌ | ✅ | ✅ |
| `VITE_SUPABASE_ANON_KEY` (staging) | ❌ | ✅ | ✅ |

---

## 🧪 Testando a Configuração

### Testar Deploy de Homologação

```bash
git checkout develop
git add .
git commit -m "test: testando ambiente de homologação"
git push origin develop
```

- A Vercel fará deploy automático
- Acesse a URL do deploy preview
- Abra o console do navegador (F12)
- Você deve ver:
  ```
  [Supabase] Ambiente: preview
  [Supabase] URL: https://kmrvojpqauwnzsygsmck.supabase.co
  ```

### Testar Deploy de Produção

```bash
git checkout main
git merge develop
git push origin main
```

- A Vercel fará deploy automático em produção
- Acesse a URL de produção
- O console NÃO mostrará logs (por segurança)
- Mas estará usando: `https://ssxdmbojuvqkkkujakdk.supabase.co`

---

## ❓ Troubleshooting

### Problema: "Config do Supabase ausente ou inválida"

**Causa**: As variáveis de ambiente não foram configuradas corretamente.

**Solução**:
1. Verifique se as 4 variáveis estão criadas
2. Verifique se os ambientes estão marcados corretamente
3. Faça um novo deploy (Deployments → ... → Redeploy)

### Problema: Deploy usando banco errado

**Causa**: Variáveis configuradas nos ambientes errados.

**Solução**:
1. Vá em Settings → Environment Variables
2. Para cada variável, clique nos três pontos (...)
3. Selecione "Edit"
4. Verifique os ambientes marcados
5. Corrija se necessário

### Problema: Mudanças não aparecem no preview

**Causa**: Cache ou build antigo.

**Solução**:
1. Vá em Deployments
2. Encontre o deploy mais recente
3. Clique nos três pontos (...) → Redeploy
4. Marque a opção "Clear build cache"
5. Clique em Redeploy

---

## 📚 Documentação Adicional

- [ENV_VARIABLES.md](./ENV_VARIABLES.md) - Documentação completa das variáveis
- [README.md](./README.md) - Documentação geral do projeto
- [Vercel Docs - Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✅ Checklist de Configuração

Marque conforme for completando:

- [ ] Acessei o Dashboard da Vercel
- [ ] Criei `VITE_SUPABASE_URL` para Production
- [ ] Criei `VITE_SUPABASE_ANON_KEY` para Production
- [ ] Criei `VITE_SUPABASE_URL` para Preview + Development
- [ ] Criei `VITE_SUPABASE_ANON_KEY` para Preview + Development
- [ ] Configurei `main` como Production Branch
- [ ] Testei deploy em `develop` (preview)
- [ ] Testei deploy em `main` (production)
- [ ] Verifiquei os logs no console do navegador
- [ ] Confirmei que está usando o banco correto em cada ambiente

---

**Data de Criação**: Janeiro 2025
**Última Atualização**: Janeiro 2025

