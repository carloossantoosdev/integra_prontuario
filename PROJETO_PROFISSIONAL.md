# 💼 Guia: Projeto Profissional - Domínio e Infraestrutura

Guia completo sobre como tornar o projeto **Integra Prontuário** profissional para uso comercial com 4 fisioterapeutas.

---

## 📊 Resumo Executivo

### ✅ O que você JÁ TEM (Gratuito):

- ✅ **Backend completo**: Supabase (banco de dados + autenticação)
- ✅ **Hospedagem**: Vercel (deploy automático)
- ✅ **Ambientes separados**: Produção + Homologação
- ✅ **SSL/HTTPS**: Certificado gratuito automático
- ✅ **CDN global**: Velocidade em qualquer lugar
- ✅ **Deploy automático**: Push → Deploy

### 🎯 O que você PODE adicionar:

- 🌐 **Domínio personalizado**: `integra.seudominio.com.br` (R$ 40/ano)
- 📧 **Email profissional**: `contato@seudominio.com.br` (gratuito com Google Workspace trial)

---

## 🤔 Preciso de Domínio Personalizado?

### ❌ NÃO é obrigatório

Você pode usar **gratuitamente**:
```
https://integra-prontuario.vercel.app
```

**Funciona perfeitamente para:**
- ✅ Aplicação interna da clínica
- ✅ 4 fisioterapeutas usando
- ✅ Acesso seguro (HTTPS)
- ✅ Performance profissional

### ✅ É RECOMENDADO se:

| Situação | Recomendação |
|----------|--------------|
| Uso interno da clínica | Domínio Vercel OK |
| Mostrar para clientes | **Domínio próprio** |
| Marketing/Divulgação | **Domínio próprio** |
| Cobrar pelo serviço | **Domínio próprio** |
| Múltiplas clínicas | **Domínio próprio** |

---

## 💰 Custos: Gratuito vs Profissional

### 🎉 Opção 1: 100% Gratuito (Recomendado para começar)

| Item | Custo | Limites |
|------|-------|---------|
| **Vercel** | R$ 0 | 100GB bandwidth/mês |
| **Supabase** | R$ 0 | 500MB DB + 1GB storage |
| **Domínio** | R$ 0 | `integra-prontuario.vercel.app` |
| **SSL/HTTPS** | R$ 0 | Incluído |
| **Total/mês** | **R$ 0** | Suficiente para 4 pessoas |

**✅ Recomendado**: Comece assim e só upgrade se necessário!

### 💼 Opção 2: Profissional Básico

| Item | Custo | Benefício |
|------|-------|-----------|
| **Vercel** | R$ 0 | Mesmo plano gratuito |
| **Supabase** | R$ 0 | Mesmo plano gratuito |
| **Domínio .com.br** | R$ 40/ano | `integra.clinica.com.br` |
| **SSL/HTTPS** | R$ 0 | Incluído |
| **Total/ano** | **R$ 40** | **R$ 3,33/mês** |

**✅ Recomendado**: Se for mostrar para clientes ou divulgar.

### 🚀 Opção 3: Profissional Completo

| Item | Custo | Benefício |
|------|-------|-----------|
| **Vercel Pro** | USD 20/mês | Mais bandwidth + analytics |
| **Supabase Pro** | USD 25/mês | Mais storage + daily backups |
| **Domínio .com.br** | R$ 40/ano | Marca própria |
| **Google Workspace** | R$ 24/mês | Email profissional |
| **Total/mês** | **~R$ 273** | Empresa grande |

**⚠️ Só necessário**: Se tiver centenas de usuários.

---

## 🌐 Como Funciona o Supabase (Já em Produção)

### ❓ Pergunta: "Preciso subir o Supabase para produção?"

**Resposta**: **NÃO!** O Supabase já está em produção.

### Como funciona:

```
┌─────────────────────────────────────────┐
│         SEU COMPUTADOR LOCAL            │
│  yarn dev → .env.local                  │
│  ↓                                      │
│  Conecta em: staging.supabase.co        │
│  (Banco de HOMOLOGAÇÃO)                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         VERCEL (Preview/Develop)        │
│  git push develop                       │
│  ↓                                      │
│  Variáveis de Preview                   │
│  ↓                                      │
│  Conecta em: staging.supabase.co        │
│  (Banco de HOMOLOGAÇÃO)                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         VERCEL (Production/Main)        │
│  git push main                          │
│  ↓                                      │
│  Variáveis de Production                │
│  ↓                                      │
│  Conecta em: production.supabase.co     │
│  (Banco de PRODUÇÃO) ← USUÁRIOS AQUI    │
└─────────────────────────────────────────┘
```

### O Supabase é um SaaS (Software as a Service):

- ✅ **Hospedado na nuvem** pela equipe do Supabase
- ✅ **Sempre online** (99.9% uptime)
- ✅ **Backups automáticos** diários
- ✅ **Escalável** automaticamente
- ✅ **Seguro** (firewall, encryption)

**Você só precisa**:
1. Criar o projeto no dashboard
2. Copiar as credenciais
3. Usar no seu app

**Não precisa**:
- ❌ Servidor próprio
- ❌ Instalar PostgreSQL
- ❌ Configurar backup
- ❌ Manutenção

---

## 👥 Como 4 Pessoas Vão Usar

### Cenário: 4 Fisioterapeutas em 1 Clínica

#### 1️⃣ Cada fisioterapeuta tem login próprio

**No Supabase (Produção)**:
```
fisio1@clinica.com.br → Senha123
fisio2@clinica.com.br → Senha123
fisio3@clinica.com.br → Senha123
fisio4@clinica.com.br → Senha123
```

#### 2️⃣ Todos acessam a mesma URL

```
https://integra-prontuario.vercel.app
```

Ou com domínio próprio:
```
https://integra.clinicasaude.com.br
```

#### 3️⃣ Cada um vê todos os pacientes (ou não)

**Opção A: Compartilhado** (Padrão atual)
- Todos veem todos os pacientes
- Útil para clínicas pequenas
- Trabalho em equipe

**Opção B: Individual** (Requer customização)
- Cada fisio vê apenas seus pacientes
- Mais privacidade
- Precisa adicionar filtro por usuário

#### 4️⃣ Fluxo de trabalho típico

```
08:00 → Fisio1 faz login
     → Abre lista de pacientes
     → Adiciona evolução do paciente João
     
09:00 → Fisio2 faz login
     → Vê o mesmo paciente João
     → Adiciona nova evolução
     
10:00 → Fisio3 acessa de outro computador
     → Vê todas as evoluções atualizadas
```

---

## 🔒 Segurança e Privacidade

### Dados Sensíveis (LGPD/HIPAA)

✅ **Já protegido por padrão**:
- HTTPS (criptografia em trânsito)
- Supabase criptografa dados em repouso
- Autenticação obrigatória
- Não há acesso público aos dados

⚠️ **Você deve**:
- Usar senhas fortes
- Não compartilhar senhas
- Fazer logout em computadores compartilhados
- Não expor anon_key publicamente (mas pode estar no frontend)

### Backup

**Supabase Free**:
- Backup diário automático (7 dias)
- Não é possível fazer restore via dashboard
- Entre em contato com suporte se necessário

**Supabase Pro** (USD 25/mês):
- Backup diário automático
- Restore via dashboard
- Point-in-time recovery

**Alternativa gratuita**:
```bash
# Fazer backup manual mensal
pg_dump "sua_connection_string" > backup_202501.sql
```

---

## 📈 Escalabilidade

### Quando fazer upgrade?

#### Vercel (upgrade para Pro - USD 20/mês)

Só se exceder **algum** limite:
- ✅ 100 GB bandwidth/mês → **Você usará ~5GB com 4 pessoas**
- ✅ 6.000 build minutos → **Você usará ~100 minutos**

**Conclusão**: Não precisa por enquanto.

#### Supabase (upgrade para Pro - USD 25/mês)

Só se exceder **algum** limite:
- ✅ 500 MB database → **~50MB com 100 pacientes**
- ✅ 1 GB file storage → **Se não usar upload de fotos, 0MB**
- ✅ 2 GB bandwidth/mês → **~500MB com 4 pessoas**

**Conclusão**: Não precisa por enquanto.

### Projeção de Crescimento

| Pacientes | Evoluções/mês | Espaço DB | Bandwidth | Plano |
|-----------|---------------|-----------|-----------|-------|
| 50 | 200 | ~25 MB | ~500 MB | **Free** ✅ |
| 100 | 400 | ~50 MB | ~1 GB | **Free** ✅ |
| 500 | 2000 | ~250 MB | ~5 GB | **Free** ✅ |
| 1000 | 4000 | ~500 MB | ~10 GB | **Pro** 💰 |

---

## 🎯 Recomendação Final

### Para o seu caso (4 fisioterapeutas, 1 clínica):

#### ✅ Fase 1: Começar (Agora)

```
✅ Vercel Free
✅ Supabase Free
✅ Domínio Vercel (integra-prontuario.vercel.app)
✅ 4 usuários criados
= R$ 0/mês
```

**Use assim por 1-3 meses** para validar o sistema.

#### 💼 Fase 2: Profissionalizar (Depois)

```
✅ Vercel Free (ainda suficiente)
✅ Supabase Free (ainda suficiente)
✅ Domínio próprio .com.br
= R$ 40/ano = R$ 3,33/mês
```

Só quando:
- Quiser divulgar o sistema
- Mostrar para outras clínicas
- Adicionar logo/marca

#### 🚀 Fase 3: Escalar (Se crescer muito)

```
✅ Vercel Pro (se exceder 100GB)
✅ Supabase Pro (se exceder 500MB)
✅ Domínio próprio
= ~R$ 270/mês
```

Só quando tiver:
- Dezenas de clínicas usando
- Milhares de pacientes
- Muitas evoluções por dia

---

## 📝 Checklist de Deploy

### Agora (Essencial)

- [ ] Configurar variáveis na Vercel
- [ ] Fazer primeiro deploy (main)
- [ ] Criar 4 usuários no Supabase produção
- [ ] Testar login dos 4 usuários
- [ ] Cadastrar 1 paciente de teste
- [ ] Deletar paciente de teste

### Opcional (Profissionalização)

- [ ] Comprar domínio .com.br
- [ ] Configurar DNS
- [ ] Adicionar logo personalizada
- [ ] Configurar email profissional
- [ ] Treinar os 4 fisioterapeutas

### Futuro (Melhorias)

- [ ] Adicionar filtro por fisioterapeuta
- [ ] Adicionar relatórios
- [ ] Adicionar gráficos de KPIs
- [ ] Adicionar backup automático local
- [ ] Adicionar impressão de evoluções

---

## 🆘 Suporte

### Gratuito
- Documentação Vercel
- Documentação Supabase
- Comunidade Discord do Supabase

### Pago
- Vercel Pro: Suporte por email
- Supabase Pro: Suporte prioritário

---

## 💡 Dicas Profissionais

### 1. Sempre teste em homologação primeiro
```bash
git push develop  # Testa aqui primeiro
# Validou? Só então:
git push main     # Deploy em produção
```

### 2. Mantenha backup manual mensal
```bash
# Uma vez por mês, baixe backup
```

### 3. Monitore uso de recursos
- Vercel Dashboard → Analytics
- Supabase Dashboard → Usage

### 4. Documente processos
- Como fazer login
- Como cadastrar paciente
- Como criar evolução
- O que fazer se der erro

### 5. Treine a equipe
- Faça um vídeo tutorial
- Crie um PDF com prints
- Faça sessão de treinamento ao vivo

---

**Resumindo**: Você tem uma infraestrutura profissional, gratuita e escalável. Domínio personalizado é opcional mas recomendado para profissionalismo. O Supabase já está "em produção" (é cloud), você só usa.

**Próximo passo**: Configure a Vercel seguindo o **DEPLOY_VERCEL.md** e faça o primeiro deploy! 🚀

