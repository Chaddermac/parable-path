alter table public.responses
add column if not exists ai_result jsonb;
