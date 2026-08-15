alter table public.responses
  add column if not exists dimension_scores jsonb not null default '[]'::jsonb,
  add column if not exists is_close_secondary boolean not null default false,
  add column if not exists assessment_version text not null default '1.0';

comment on column public.responses.dimension_scores is 'Per-room overall, inner-story, strategy, shadow, and normalized scores.';
comment on column public.responses.assessment_version is 'Version of the assessment question bank and scoring model.';
