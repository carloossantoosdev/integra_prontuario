create extension if not exists pgcrypto;

create table if not exists public.pacientes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  data_nascimento date null,
  inicio_atendimento date null,
  valor numeric(12,2) null,
  area_atendimento text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_pacientes_updated_at on public.pacientes;
create trigger set_pacientes_updated_at
before update on public.pacientes
for each row execute function public.set_updated_at();

alter table public.pacientes enable row level security;

drop policy if exists "pacientes_read" on public.pacientes;
create policy "pacientes_read" on public.pacientes
for select using (auth.role() = 'authenticated');

drop policy if exists "pacientes_write" on public.pacientes;
create policy "pacientes_write" on public.pacientes
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');


