# 🚀 PASSO A PASSO - Deploy do PocketBase no Fly.io

## ✅ Situação Atual:

- **Frontend:** Na Vercel ✅ (não mexer!)
- **PocketBase:** Local (precisa ir pro Fly.io)

## 🎯 O que vamos fazer:

Subir **SOMENTE** o PocketBase para o Fly.io, mantendo o frontend na Vercel.

---

## 📋 PASSO 1: Instalar Fly CLI (uma vez só)

Abra o Terminal e execute:

```bash
# Instalar
curl -L https://fly.io/install.sh | sh

# Adicionar ao PATH (copie a linha que aparecer no terminal)
export PATH="$HOME/.fly/bin:$PATH"

# Recarregar terminal
source ~/.zshrc

# Verificar
flyctl version
```

---

## 📋 PASSO 2: Fazer Login no Fly.io

```bash
# Vai abrir o navegador para autorizar
flyctl auth login
```

Se não tiver conta, crie em: https://fly.io/app/sign-up

---

## 📋 PASSO 3: Ir para a pasta do projeto

```bash
cd /Users/carlos.esilva/Documents/projetos/prontuario-atendimentos
```

---

## 📋 PASSO 4: Criar o app no Fly.io

```bash
# Criar app (responda as perguntas)
flyctl launch --dockerfile deploy/Dockerfile.pocketbase --config deploy/fly.toml --no-deploy
```

**Perguntas que vão aparecer:**

1. **App name?**

   - Sugestão: `prontuario-pocketbase` (ou o que você quiser)
   - Anote o nome!

2. **Region?**

   - Digite: `gru` (São Paulo, Brasil)

3. **Setup PostgreSQL?**

   - Digite: `N` (não)

4. **Setup Redis?**

   - Digite: `N` (não)

5. **Deploy now?**
   - Digite: `N` (não ainda)

---

## 📋 PASSO 5: Criar volume para os dados

```bash
# Criar volume de 1GB (seus dados ficam aqui)
flyctl volumes create pb_data --region gru --size 1 --app prontuario-pocketbase
```

**Troque `prontuario-pocketbase` pelo nome que você escolheu no passo 4!**

---

## 📋 PASSO 6: Fazer o primeiro deploy

```bash
# Deploy! (leva 2-3 minutos)
flyctl deploy --dockerfile deploy/Dockerfile.pocketbase --config deploy/fly.toml --app prontuario-pocketbase
```

**O que vai acontecer:**

- 📦 Build do Docker
- ⬆️ Upload da imagem
- 🚀 Inicia o PocketBase
- ✅ Mostra a URL: `https://prontuario-pocketbase.fly.dev`

---

## 📋 PASSO 7: Verificar se está funcionando

### Testar a API:

```bash
# Substituir pela sua URL
curl https://prontuario-pocketbase.fly.dev/api/health
```

**Deve retornar:**

```json
{ "message": "API is healthy.", "code": 200, "data": {} }
```

### Acessar o Admin:

Abra no navegador:

```
https://prontuario-pocketbase.fly.dev/_/
```

**Primeira vez:**

- Crie seu usuário admin
- Senha forte!

---

## 📋 PASSO 8: Configurar domínio personalizado (opcional)

Se você quiser usar `api.seudominio.com.br`:

```bash
# Adicionar certificado SSL
flyctl certs create api.seudominio.com.br --app prontuario-pocketbase
```

**Depois:**

1. Acesse o painel do Registro.br
2. Adicione um registro A:
   - Nome: `api`
   - Tipo: `A`
   - Valor: (IP que o Fly.io mostrou)
   - TTL: `3600`

**Aguarde 10-30 minutos** para propagar.

---

## 📋 PASSO 9: Atualizar frontend na Vercel

### 9.1 - Adicionar variável de ambiente:

1. Acesse: https://vercel.com/seu-usuario/seu-projeto
2. Vá em: **Settings → Environment Variables**
3. **Edite** a variável existente `VITE_POCKETBASE_URL`:

   **Se usou domínio personalizado:**

   ```
   VITE_POCKETBASE_URL=https://api.seudominio.com.br
   ```

   **Se usou a URL do Fly.io:**

   ```
   VITE_POCKETBASE_URL=https://prontuario-pocketbase.fly.dev
   ```

4. Marque: **Production**, **Preview**, **Development**
5. Clique em: **Save**

### 9.2 - Fazer redeploy:

Na página do projeto na Vercel:

1. Vá em **Deployments**
2. Clique nos 3 pontinhos do último deploy
3. Clique em **Redeploy**
4. Aguarde o build (1-2 min)

---

## 📋 PASSO 10: Testar tudo funcionando

1. **Abra seu frontend** (URL da Vercel)
2. **Tente criar um paciente**
3. **Deve funcionar!** 🎉

Se aparecer erro 403, verifique se aplicou as migrations de permissões (já fizemos isso antes).

---

## ✅ PRONTO! Sua arquitetura:

```
┌────────────────────────────────────────┐
│ FRONTEND (Vercel)                      │
│ https://seuapp.vercel.app              │
│ • Interface React                      │
│ • CDN global                           │
└──────────────┬─────────────────────────┘
               │ HTTP/HTTPS
               ▼
┌────────────────────────────────────────┐
│ BACKEND (Fly.io)                       │
│ https://prontuario-pocketbase.fly.dev  │
│ • PocketBase API                       │
│ • SQLite + Volume                      │
└────────────────────────────────────────┘
```

---

## 🔧 Comandos úteis do dia a dia:

### Ver logs em tempo real:

```bash
flyctl logs --app prontuario-pocketbase
```

### Ver status:

```bash
flyctl status --app prontuario-pocketbase
```

### Fazer redeploy (depois de mudar algo):

```bash
flyctl deploy --dockerfile deploy/Dockerfile.pocketbase --config deploy/fly.toml --app prontuario-pocketbase
```

### SSH no servidor (se precisar debugar):

```bash
flyctl ssh console --app prontuario-pocketbase
```

### Abrir dashboard web:

```bash
flyctl dashboard --app prontuario-pocketbase
```

---

## 🆘 Troubleshooting:

### Deploy falha:

```bash
# Ver logs do erro
flyctl logs --app prontuario-pocketbase

# Tentar novamente
flyctl deploy --dockerfile deploy/Dockerfile.pocketbase --config deploy/fly.toml --app prontuario-pocketbase
```

### App não responde:

```bash
# Verificar status
flyctl status --app prontuario-pocketbase

# Reiniciar
flyctl apps restart prontuario-pocketbase
```

### Frontend não conecta:

- Verifique a variável `VITE_POCKETBASE_URL` na Vercel
- Verifique se fez redeploy depois de mudar
- Teste a URL diretamente no navegador

---

## 💡 IMPORTANTE:

1. **Volume é crítico** - Seus dados estão em `pb_data`
2. **Não delete** o volume sem fazer backup
3. **Anote o nome do app** para usar nos comandos
4. **Guarde as credenciais** do admin do PocketBase

---

**Dúvidas?** Me chame! Estou aqui para ajudar! 🚀
