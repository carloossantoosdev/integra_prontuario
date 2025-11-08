# 🚀 Deploy na Vercel - Guia Completo

Guia completo para configurar e fazer deploy do projeto **Integra Prontuário** na Vercel com ambientes separados.

## 📋 Pré-requisitos

- ✅ Conta na Vercel (gratuita)
- ✅ Repositório Git (GitHub, GitLab ou Bitbucket)
- ✅ Projetos no Supabase configurados (produção e homologação)

---

## 🎯 Passo 1: Conectar Repositório na Vercel

### 1.1 Acessar Vercel

1. Acesse: https://vercel.com
2. Faça login (ou crie uma conta gratuita)
3. Clique em **"Add New..."** → **"Project"**

### 1.2 Importar Repositório Git

1. Selecione seu provedor Git (GitHub, GitLab, Bitbucket)
2. Autorize a Vercel a acessar seus repositórios
3. Encontre o repositório **integra_prontuario**
4. Clique em **"Import"**

### 1.3 Configurar Projeto

Na tela de configuração:

**Project Name**: `integra-prontuario` (ou o nome que preferir)

**Framework Preset**: Vite (deve detectar automaticamente)

**Root Directory**: `./` (raiz do projeto)

**Build Command**: `yarn build` (ou `npm run build`)

**Output Directory**: `dist`

**⚠️ NÃO clique em Deploy ainda!** Primeiro vamos configurar as variáveis de ambiente.

---

## 🎯 Passo 2: Configurar Variáveis de Ambiente

### 2.1 Acessar Environment Variables

1. Na tela de configuração do projeto, role até **"Environment Variables"**
2. Ou após criar o projeto: **Settings** → **Environment Variables**

### 2.2 Configurar Variáveis de PRODUÇÃO

**Adicione a primeira variável:**

| Campo | Valor |
|-------|-------|
| **Key** | `VITE_SUPABASE_URL` |
| **Value** | `https://ssxdmbojuvqkkkujakdk.supabase.co` |
| **Environments** | ✅ Production APENAS |

Clique em **"Add"**

**Adicione a segunda variável:**

| Campo | Valor |
|-------|-------|
| **Key** | `VITE_SUPABASE_ANON_KEY` |
| **Value** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzeGRtYm9qdXZxa2trdWpha2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1OTQ1MDksImV4cCI6MjA3MzE3MDUwOX0.43oP8PkWk3Rr-TewGWEiHiX7oYF-VI_g0EvA4h8B_rM` |
| **Environments** | ✅ Production APENAS |

Clique em **"Add"**

### 2.3 Configurar Variáveis de HOMOLOGAÇÃO

**Adicione a terceira variável:**

| Campo | Valor |
|-------|-------|
| **Key** | `VITE_SUPABASE_URL` |
| **Value** | `https://kmrvojpqauwnzsygsmck.supabase.co` |
| **Environments** | ✅ Preview + ✅ Development |

Clique em **"Add"**

**Adicione a quarta variável:**

| Campo | Valor |
|-------|-------|
| **Key** | `VITE_SUPABASE_ANON_KEY` |
| **Value** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcnZvanBxYXV3bnpzeWdzbWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTY5NTAsImV4cCI6MjA3ODE5Mjk1MH0.sKrSEVsoqyYxNsY24PysyC_GwhUOR2ThpLZUuj2xHC8` |
| **Environments** | ✅ Preview + ✅ Development |

Clique em **"Add"**

### 2.4 Verificar Configuração

Você deve ter **4 variáveis** no total:

```
VITE_SUPABASE_URL (Production)
VITE_SUPABASE_ANON_KEY (Production)
VITE_SUPABASE_URL (Preview + Development)
VITE_SUPABASE_ANON_KEY (Preview + Development)
```

---

## 🎯 Passo 3: Configurar Git e Branches

### 3.1 Definir Production Branch

1. Vá em **Settings** → **Git**
2. Em **"Production Branch"**, defina: **`main`**
3. Salve

### 3.2 Entender os Ambientes

A Vercel funciona assim:

| Branch | Tipo de Deploy | Banco Usado | URL |
|--------|---------------|-------------|-----|
| `main` | **Production** | Produção | `integra-prontuario.vercel.app` |
| `develop` | **Preview** | Homologação | `integra-prontuario-git-develop-xxx.vercel.app` |
| Outras branches | **Preview** | Homologação | `integra-prontuario-git-feature-xxx.vercel.app` |

---

## 🎯 Passo 4: Fazer o Deploy

### 4.1 Deploy Inicial

1. Se ainda está na tela de configuração inicial, clique em **"Deploy"**
2. Se já criou o projeto, vá em **Deployments** → **"Redeploy"**

A Vercel vai:
- ✅ Fazer checkout do código
- ✅ Instalar dependências (`yarn install`)
- ✅ Fazer build (`yarn build`)
- ✅ Deploy dos arquivos estáticos

### 4.2 Acompanhar Deploy

- Você verá o log do build em tempo real
- Aguarde até aparecer **"✓ Build completed"**
- Depois: **"✓ Deployment ready"**

### 4.3 Acessar o Site

Após o deploy, clique em **"Visit"** ou copie a URL:

```
https://integra-prontuario.vercel.app
```

---

## 🎯 Passo 5: Configurar Domínio Personalizado (Opcional)

### Por que usar domínio personalizado?

✅ **Profissionalismo**: `integra.seudominio.com.br`  
✅ **Confiança**: Clientes confiam mais  
✅ **Branding**: Seu nome/marca  
✅ **SEO**: Melhor para mecanismos de busca  

### 5.1 Comprar Domínio

**Opções no Brasil:**
- **Registro.br**: Domínios .com.br (R$ 40/ano)
- **Hostgator**: Domínios .com (R$ 40-60/ano)
- **GoDaddy**: Domínios .com (USD 10-15/ano)
- **Namecheap**: Domínios .com (USD 8-12/ano)

### 5.2 Adicionar Domínio na Vercel

1. No projeto, vá em **Settings** → **Domains**
2. Clique em **"Add"**
3. Digite seu domínio: `integra.seudominio.com.br`
4. A Vercel vai te dar instruções de DNS

### 5.3 Configurar DNS

No painel do seu provedor de domínio, adicione:

**Registro CNAME:**
```
Nome: integra
Tipo: CNAME
Valor: cname.vercel-dns.com
```

**Ou registro A (alternativa):**
```
Nome: integra
Tipo: A
Valor: 76.76.21.21
```

### 5.4 Aguardar Propagação

- Leva de 5 minutos a 24 horas
- A Vercel configura SSL (HTTPS) automaticamente

---

## 🎯 Passo 6: Gerenciar Múltiplos Usuários

### 6.1 Autenticação no Supabase

O projeto já usa Supabase Auth. Para adicionar usuários:

#### No Supabase Dashboard:

1. Selecione o projeto de **produção**
2. Menu → **Authentication** → **Users**
3. Clique em **"Add user"**

**Para cada fisioterapeuta, adicione:**
- Email: `fisio1@seudominio.com.br`
- Password: (senha temporária)
- ✅ Marcar "Send email confirmation" (se configurado)

#### Criar 4 usuários:
```
fisio1@seudominio.com.br
fisio2@seudominio.com.br
fisio3@seudominio.com.br
fisio4@seudominio.com.br
```

### 6.2 Controle de Acesso (Opcional - Futuro)

Se quiser que cada fisio veja apenas seus pacientes:

**Adicionar coluna à tabela pacientes:**
```sql
ALTER TABLE pacientes 
ADD COLUMN fisioterapeuta_id UUID REFERENCES auth.users(id);
```

**Habilitar Row Level Security (RLS):**
```sql
ALTER TABLE pacientes ENABLE ROW LEVEL SECURITY;

-- Política: usuário só vê seus pacientes
CREATE POLICY "Fisio vê apenas seus pacientes"
ON pacientes
FOR SELECT
USING (fisioterapeuta_id = auth.uid());
```

### 6.3 Gerenciar Equipe na Vercel (Opcional)

Se quiser dar acesso à Vercel para outros membros:

1. **Settings** → **Members**
2. **"Invite"**
3. Digite o email
4. Escolha permissão:
   - **Viewer**: Só visualizar
   - **Developer**: Deploy e configurações
   - **Owner**: Acesso total

---

## 🎯 Passo 7: Fluxo de Trabalho

### 7.1 Desenvolvimento

```bash
# Criar nova funcionalidade
git checkout develop
git checkout -b feature/nova-funcionalidade

# Desenvolver localmente (usa banco de homologação)
yarn dev

# Fazer commit
git add .
git commit -m "feat: nova funcionalidade"

# Push
git push origin feature/nova-funcionalidade
```

### 7.2 Homologação

```bash
# Merge para develop
git checkout develop
git merge feature/nova-funcionalidade
git push origin develop
```

- Vercel faz deploy automático (Preview)
- URL: `integra-prontuario-git-develop-xxx.vercel.app`
- Usa banco de **homologação**
- Teste tudo!

### 7.3 Produção

```bash
# Merge para main
git checkout main
git merge develop
git push origin main
```

- Vercel faz deploy automático (Production)
- URL: `integra-prontuario.vercel.app` (ou seu domínio)
- Usa banco de **produção**
- Usuários acessam!

---

## ✅ Checklist Final

### Vercel
- [ ] Repositório conectado
- [ ] 4 variáveis de ambiente configuradas
- [ ] Production branch = `main`
- [ ] Deploy de produção funcionando
- [ ] Deploy de preview funcionando

### Supabase
- [ ] Projeto de produção com dados reais
- [ ] Projeto de homologação com dados de teste
- [ ] 4 usuários criados no projeto de produção
- [ ] Tabelas criadas em ambos os projetos

### Domínio (Opcional)
- [ ] Domínio comprado
- [ ] DNS configurado
- [ ] SSL ativo (HTTPS)

### Equipe
- [ ] 4 fisioterapeutas com acesso
- [ ] Senhas enviadas/configuradas
- [ ] Teste de login realizado

---

## 💰 Custos

### Gratuito (Plano Free)
- ✅ Vercel: 100GB bandwidth/mês
- ✅ Supabase: 500MB database + 1GB file storage + 2GB bandwidth
- ✅ Domínio Vercel: `projeto.vercel.app`

### Pago (Se precisar)
- 💵 Domínio personalizado: R$ 40-60/ano
- 💵 Vercel Pro: USD 20/mês (se exceder limites)
- 💵 Supabase Pro: USD 25/mês (se exceder limites)

**Para 4 usuários, o plano Free é suficiente!**

---

## 🆘 Troubleshooting

### Deploy falhou

**Erro**: "Build failed"

**Solução**:
1. Vá em **Deployments** → Clique no deploy
2. Veja os logs
3. Verifique se as variáveis estão configuradas
4. Tente **"Redeploy"**

### Banco errado sendo usado

**Solução**:
1. **Settings** → **Environment Variables**
2. Verifique os ambientes marcados
3. Production deve ter variáveis de produção
4. Preview deve ter variáveis de homologação

### Erro de CORS

**Solução no Supabase**:
1. Dashboard → **Settings** → **API**
2. Em **"CORS allowed origins"**, adicione:
   - `https://integra-prontuario.vercel.app`
   - `https://seu-dominio.com.br`

---

## 📚 Recursos Adicionais

- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Supabase](https://supabase.com/docs)
- [Configurar domínio na Vercel](https://vercel.com/docs/concepts/projects/domains)

---

**Criado**: Janeiro 2025  
**Projeto**: Integra Prontuário

