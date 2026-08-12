create extension if not exists pgcrypto;

create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  answers jsonb not null,
  scores jsonb not null,
  primary_room text not null,
  secondary_room text not null,
  third_room text not null,
  forced_choice text not null,
  open_reflection text not null default '',
  consent_given boolean not null default false,
  safety_flag boolean not null default false,
  ai_result jsonb,
  constraint responses_primary_room_check check (primary_room in ('lost', 'scarcity', 'control', 'stalled', 'boundary', 'settling', 'delay', 'distraction')),
  constraint responses_secondary_room_check check (secondary_room in ('lost', 'scarcity', 'control', 'stalled', 'boundary', 'settling', 'delay', 'distraction')),
  constraint responses_third_room_check check (third_room in ('lost', 'scarcity', 'control', 'stalled', 'boundary', 'settling', 'delay', 'distraction')),
  constraint responses_forced_choice_check check (forced_choice in ('lost', 'scarcity', 'control', 'stalled', 'boundary', 'settling', 'delay', 'distraction'))
);

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  response_id uuid not null references public.responses(id) on delete cascade,
  created_at timestamp with time zone not null default now(),
  accuracy_score integer not null check (accuracy_score between 1 and 5),
  parable_helpfulness_score integer not null check (parable_helpfulness_score between 1 and 5),
  repentance_reframing_score integer not null check (repentance_reframing_score between 1 and 5),
  next_step_usefulness_score integer not null check (next_step_usefulness_score between 1 and 5),
  tone_score integer not null check (tone_score between 1 and 5),
  helpful_text text not null default '',
  unclear_text text not null default ''
);

create index if not exists feedback_response_id_idx on public.feedback(response_id);

alter table public.responses enable row level security;
alter table public.feedback enable row level security;

-- No anon/authenticated policies are created. Writes are performed only by
-- server routes using the service-role key, which must never reach the browser.
grant insert, update on public.responses to service_role;
grant insert, update on public.feedback to service_role;
