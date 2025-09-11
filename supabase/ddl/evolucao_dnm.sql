create extension if not exists pgcrypto;

create table if not exists public.evolucao_dnm (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.pacientes(id) on delete cascade,
  ssvv_inicial jsonb not null,
  ssvv_final jsonb not null,
  ausculta_pulmonar jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop index if exists evolucao_dnm_patient_id_idx;
create index evolucao_dnm_patient_id_idx on public.evolucao_dnm(patient_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_evolucao_dnm_updated_at on public.evolucao_dnm;
create trigger set_evolucao_dnm_updated_at
before update on public.evolucao_dnm
for each row execute function public.set_updated_at();

alter table public.evolucao_dnm enable row level security;

drop policy if exists "evolucao_dnm_read" on public.evolucao_dnm;
create policy "evolucao_dnm_read" on public.evolucao_dnm
for select using (auth.role() = 'authenticated');

-- Leitura pública (ANON) para ambiente de desenvolvimento/visualização
drop policy if exists "evolucao_dnm_read_anon" on public.evolucao_dnm;
create policy "evolucao_dnm_read_anon" on public.evolucao_dnm
for select using (auth.role() = 'anon');

drop policy if exists "evolucao_dnm_write" on public.evolucao_dnm;
create policy "evolucao_dnm_write" on public.evolucao_dnm
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');


