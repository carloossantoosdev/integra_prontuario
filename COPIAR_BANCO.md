# 🗄️ Guia: Copiar Schema do Banco de Produção para Homologação

Este guia mostra como copiar a estrutura das tabelas (schema) do banco de **Produção** para **Homologação**.

## 📋 Tabelas do Projeto

- `pacientes` - Cadastro de pacientes
- `evolucao_rcp` - Evoluções de Reabilitação Cardiopulmonar
- `evolucao_dnm` - Evoluções de Desenvolvimento Neuropsicomotor
- `kpis` - Indicadores de performance

---

## 🎯 Método 1: Via SQL Editor (Mais Fácil - RECOMENDADO)

### Passo 1: Extrair o Schema de Produção

1. **Acesse o Supabase Dashboard**
   - Vá para: https://app.supabase.com/
   - Faça login

2. **Selecione o Projeto de PRODUÇÃO**
   - Clique no projeto: `integra-prontuario-prod` (ou `ssxdmbojuvqkkkujakdk`)

3. **Abra o SQL Editor**
   - No menu lateral esquerdo, clique em **SQL Editor**
   - Clique em **New query** ou **+ New Query**

4. **Execute este comando para gerar o DDL**
   
   Cole e execute este SQL:

   ```sql
   -- Gerar script de criação de todas as tabelas
   SELECT 
       'CREATE TABLE IF NOT EXISTS ' || tablename || ' (' || E'\n' ||
       string_agg(
           '  ' || column_name || ' ' || 
           udt_name || 
           CASE 
               WHEN character_maximum_length IS NOT NULL 
               THEN '(' || character_maximum_length || ')'
               ELSE ''
           END ||
           CASE 
               WHEN is_nullable = 'NO' 
               THEN ' NOT NULL'
               ELSE ''
           END,
           ',' || E'\n'
       ) || E'\n' || ');' as create_statement
   FROM information_schema.columns
   WHERE table_schema = 'public' 
       AND table_name IN ('pacientes', 'evolucao_rcp', 'evolucao_dnm', 'kpis')
   GROUP BY tablename;
   ```

5. **Copie o resultado**
   - Os scripts SQL aparecerão no resultado
   - Selecione TUDO e copie (Ctrl+C)

### Passo 2: Aplicar no Banco de Homologação

1. **Volte para o Dashboard**
   - Clique no ícone do Supabase no topo esquerdo

2. **Selecione o Projeto de HOMOLOGAÇÃO**
   - Clique no projeto: `integra-prontuario-staging` (ou `kmrvojpqauwnzsygsmck`)

3. **Abra o SQL Editor**
   - Menu lateral → **SQL Editor**
   - Clique em **+ New Query**

4. **Cole e Execute o Script**
   - Cole todo o SQL que você copiou do passo 1.5
   - Clique em **Run** ou aperte **Ctrl+Enter**

5. **Verifique as Tabelas**
   - Menu lateral → **Table Editor**
   - Você deve ver as 4 tabelas criadas

---

## 🎯 Método 2: Exportação Manual (Alternativa Simples)

Se o Método 1 não funcionar, use este método mais manual:

### Para cada tabela:

#### 1. No Projeto de PRODUÇÃO:

1. Acesse: https://app.supabase.com/
2. Selecione o projeto de produção
3. Menu lateral → **Table Editor**
4. Clique na tabela (ex: `pacientes`)
5. Clique nos **três pontos** (...) no topo direito
6. Selecione **View SQL Definition** ou **Copy as SQL**
7. Copie todo o SQL

#### 2. No Projeto de HOMOLOGAÇÃO:

1. Volte ao dashboard
2. Selecione o projeto de homologação
3. Menu lateral → **SQL Editor**
4. Cole o SQL copiado
5. Clique em **Run**

#### 3. Repita para todas as tabelas:
- `pacientes`
- `evolucao_rcp`
- `evolucao_dnm`
- `kpis`

---

## 🎯 Método 3: Script SQL Completo (Rápido)

Se você preferir, aqui está um template básico. **ATENÇÃO**: Este é um exemplo genérico, ajuste conforme sua estrutura real:

### Passo 1: Gerar SQL de Produção

No **SQL Editor do projeto de PRODUÇÃO**, execute:

```sql
-- Ver estrutura da tabela pacientes
\d pacientes;

-- Ver estrutura da tabela evolucao_rcp
\d evolucao_rcp;

-- Ver estrutura da tabela evolucao_dnm
\d evolucao_dnm;

-- Ver estrutura da tabela kpis
\d kpis;
```

Ou use este comando mais completo:

```sql
-- Exportar DDL de todas as tabelas
SELECT 
    'CREATE TABLE ' || tablename || ' (' || 
    string_agg(
        column_name || ' ' || data_type || 
        CASE 
            WHEN character_maximum_length IS NOT NULL 
            THEN '(' || character_maximum_length || ')'
            ELSE ''
        END,
        ', '
    ) || ');' as ddl
FROM (
    SELECT 
        c.table_name as tablename,
        c.column_name,
        c.data_type,
        c.character_maximum_length
    FROM information_schema.columns c
    WHERE c.table_schema = 'public'
        AND c.table_name IN ('pacientes', 'evolucao_rcp', 'evolucao_dnm', 'kpis')
    ORDER BY c.table_name, c.ordinal_position
) t
GROUP BY tablename;
```

### Passo 2: Copiar e Aplicar

1. Copie o resultado
2. Vá para o projeto de **homologação**
3. SQL Editor → Cole → Run

---

## 🎯 Método 4: Via Supabase CLI (Profissional)

Se você quer usar a linha de comando:

### 1. Instalar Supabase CLI

```bash
npm install -g supabase
```

### 2. Fazer Login no Supabase

```bash
supabase login
```

### 3. Obter Connection Strings

#### Produção:
1. Dashboard → Settings → Database
2. Copie a **Connection String** (Connection Pooling)
3. Substitua `[YOUR-PASSWORD]` pela senha do banco

#### Homologação:
- Mesma coisa, mas no projeto de homologação

### 4. Exportar Schema de Produção

```bash
# Formato do comando:
pg_dump "postgresql://postgres.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true" \
  --schema-only \
  --no-owner \
  --no-privileges \
  -t pacientes \
  -t evolucao_rcp \
  -t evolucao_dnm \
  -t kpis \
  > schema_producao.sql
```

**Substitua**:
- `[PROJECT-REF]` pelo ref do projeto (ex: `ssxdmbojuvqkkkujakdk`)
- Será pedida a senha

### 5. Importar para Homologação

```bash
psql "postgresql://postgres.[PROJECT-REF-STAGING].supabase.co:6543/postgres?pgbouncer=true" \
  < schema_producao.sql
```

**Substitua**:
- `[PROJECT-REF-STAGING]` pelo ref do projeto de staging (ex: `kmrvojpqauwnzsygsmck`)

---

## ✅ Verificação

Após copiar as tabelas, verifique se tudo está correto:

### 1. No Dashboard de Homologação

1. Menu lateral → **Table Editor**
2. Você deve ver:
   - ✅ `pacientes`
   - ✅ `evolucao_rcp`
   - ✅ `evolucao_dnm`
   - ✅ `kpis`

### 2. Verificar Estrutura

Para cada tabela, clique nela e verifique:
- ✅ Colunas corretas
- ✅ Tipos de dados corretos
- ✅ Chaves primárias (Primary Keys)
- ✅ Relações (Foreign Keys)
- ✅ Índices

### 3. Testar Localmente

```bash
# Certifique-se de que .env.local aponta para staging
yarn dev
```

Abra o app e tente:
- Criar um paciente de teste
- Verificar se salva corretamente
- Deletar o paciente de teste

---

## ⚠️ IMPORTANTE: Não Copiar Dados

Os métodos acima copiam apenas a **estrutura** (schema):
- ✅ Tabelas
- ✅ Colunas
- ✅ Tipos de dados
- ✅ Constraints
- ✅ Índices

Mas **NÃO** copiam os **dados** (registros). Isso é intencional porque:
- Homologação deve ter dados de teste, não dados reais
- Evita expor dados sensíveis de produção

Se você **realmente** precisar copiar alguns dados de teste, faça manualmente:

```sql
-- NO PROJETO DE HOMOLOGAÇÃO
-- Inserir um paciente de teste
INSERT INTO pacientes (nome, data_nascimento, inicio_atendimento, valor, area_atendimento)
VALUES ('Paciente Teste', '1990-01-01', '2024-01-01', 100.00, 'RCP');
```

---

## 🆘 Troubleshooting

### Erro: "permission denied for schema public"

**Solução**: Use `CREATE TABLE IF NOT EXISTS` em vez de `CREATE TABLE`

### Erro: "relation already exists"

**Causa**: A tabela já existe.

**Solução**: 
- Delete a tabela primeiro: `DROP TABLE nome_da_tabela;`
- Ou use: `CREATE TABLE IF NOT EXISTS ...`

### Tabelas não aparecem no Table Editor

**Solução**:
1. Atualize a página (F5)
2. Verifique se executou no schema `public`
3. SQL Editor → Execute: `SELECT * FROM information_schema.tables WHERE table_schema = 'public';`

---

## 📝 Checklist

- [ ] Conectei no projeto de **Produção**
- [ ] Abri o SQL Editor
- [ ] Executei comando para gerar DDL
- [ ] Copiei todo o SQL gerado
- [ ] Conectei no projeto de **Homologação**
- [ ] Colei e executei o SQL
- [ ] Verifiquei no Table Editor que as 4 tabelas existem
- [ ] Testei localmente criando um registro de teste
- [ ] Deletei o registro de teste

---

## 🎓 Dica Pro

Para manter os ambientes sincronizados no futuro:

1. **Sempre que alterar o schema em produção**:
   - Salve o SQL de alteração
   - Aplique também em homologação

2. **Use migrations (futuro)**:
   - Supabase CLI tem suporte a migrations
   - `supabase db diff` para ver diferenças
   - `supabase db push` para aplicar mudanças

---

**Criado**: Janeiro 2025
**Última Atualização**: Janeiro 2025

