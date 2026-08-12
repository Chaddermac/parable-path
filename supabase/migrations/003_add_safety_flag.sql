alter table public.responses
add column if not exists safety_flag boolean not null default false;
