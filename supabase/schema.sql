-- Autopiloto — schema do Supabase (plano free) para captura de leads do funil
--
-- Como aplicar:
--   1. Crie um projeto em https://supabase.com (plano Free).
--   2. Abra "SQL Editor" no painel do projeto, cole este arquivo inteiro e rode.
--   3. Em "Project Settings > API", copie a "Project URL" e a chave "anon public".
--   4. Cole os dois valores em assets/config.js (veja os comentários naquele arquivo).
--
-- A chave "anon public" é feita para ficar exposta no HTML/JS do site — a segurança
-- vem das políticas de RLS abaixo, que só permitem INSERT (nunca leitura) para o
-- público. NUNCA coloque a chave "service_role" no site: ela ignora RLS por completo.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Campos do formulário (etapa final / VSL)
  nome text not null,
  email text not null,
  whatsapp text not null,
  localizacao text not null,
  tipo_clinica text not null,
  tipo_clinica_outro text,
  ticket_medio text not null,
  capacidade_ociosa text not null,

  -- Atribuição / contexto de origem, capturados automaticamente pelo funil
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  landing_page text,
  landing_at timestamptz,
  page_url text,
  user_agent text
);

comment on table public.leads is 'Leads capturados no formulário final do funil Autopiloto.';

alter table public.leads enable row level security;

-- Permite que o site (chave anon) insira novos leads, mas nunca leia, atualize
-- ou apague dados existentes — evita que qualquer visitante veja leads de outros.
drop policy if exists "leads_insert_publico" on public.leads;
create policy "leads_insert_publico"
  on public.leads
  for insert
  to anon
  with check (true);

-- Nenhuma policy de select/update/delete é criada para "anon" de propósito:
-- por padrão, com RLS ativo e sem policy, o acesso é negado. Para consultar os
-- leads, use o SQL Editor do Supabase (autenticado como dono do projeto) ou
-- crie um usuário autenticado + policy própria caso monte um painel interno.

create index if not exists leads_created_at_idx on public.leads (created_at desc);
