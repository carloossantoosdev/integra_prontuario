-- Tabela para KPIs mensais
create table if not exists public.kpis_mensais (
  id uuid primary key default gen_random_uuid(),
  ref_date date not null unique,
  metrics jsonb not null,
  created_by uuid null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger para updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_kpis_mensais_updated_at on public.kpis_mensais;
create trigger set_kpis_mensais_updated_at
before update on public.kpis_mensais
for each row execute function public.set_updated_at();

-- Políticas (ajuste conforme seu auth)
alter table public.kpis_mensais enable row level security;

-- Leitura para usuários autenticados
drop policy if exists "kpis_mensais_read" on public.kpis_mensais;
create policy "kpis_mensais_read" on public.kpis_mensais
for select using (auth.role() = 'authenticated');

-- Upsert para usuários autenticados
drop policy if exists "kpis_mensais_upsert" on public.kpis_mensais;
create policy "kpis_mensais_upsert" on public.kpis_mensais
for insert with check (auth.role() = 'authenticated');

drop policy if exists "kpis_mensais_update" on public.kpis_mensais;
create policy "kpis_mensais_update" on public.kpis_mensais
for update using (auth.role() = 'authenticated');


