alter table public.responses
  add column if not exists source_domain text;

comment on column public.responses.source_domain is
  'Hostname that served the assessment submission, such as parablepath.com or parablepath.app.';
