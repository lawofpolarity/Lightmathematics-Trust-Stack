-- LM Trust Stack additive schema.
-- Does not modify existing Sigma population tables.
create schema if not exists trust;
revoke all on schema trust from public, anon, authenticated;

create table if not exists trust.artifacts (
  artifact_id text primary key,
  version text not null,
  artifact_type text not null,
  canonical_digest text not null,
  subject jsonb not null default '{}'::jsonb,
  source_ref text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists trust.reliance_states (
  artifact_id text not null references trust.artifacts(artifact_id) on delete cascade,
  operation_scope text not null,
  reliance_status text not null check (reliance_status in ('ALLOW','REVIEW','REFUSE','STALE','UNRESOLVED','NOT_EVALUATED')),
  currentness jsonb not null default '{}'::jsonb,
  evidence jsonb not null default '[]'::jsonb,
  authority jsonb not null default '[]'::jsonb,
  unresolved_conditions jsonb not null default '[]'::jsonb,
  losses jsonb not null default '[]'::jsonb,
  evaluated_at timestamptz,
  primary key (artifact_id, operation_scope)
);

create table if not exists trust.dependencies (
  artifact_id text not null references trust.artifacts(artifact_id) on delete cascade,
  dependency_id text not null,
  dependency_type text not null default 'semantic',
  decision_relevant boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  primary key (artifact_id, dependency_id, dependency_type)
);

create table if not exists trust.transitions (
  receipt_id text primary key,
  artifact_id text not null references trust.artifacts(artifact_id) on delete cascade,
  from_version text,
  to_version text not null,
  transition_type text not null,
  predecessor_digest text,
  successor_digest text not null,
  authority_event jsonb,
  evidence_event jsonb,
  disposition text not null,
  unresolved_before jsonb not null default '[]'::jsonb,
  unresolved_after jsonb not null default '[]'::jsonb,
  recoverable_history boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists trust.proofs (
  proof_id text primary key,
  artifact_id text not null references trust.artifacts(artifact_id) on delete cascade,
  proof_type text not null,
  issuer_system text not null,
  verification_status text not null default 'NOT_EVALUATED',
  external_ref text,
  proof_data jsonb,
  limitations text,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists trust.runtime_events (
  event_id bigint generated always as identity primary key,
  artifact_id text,
  trace_ref text,
  event_type text not null,
  safe_attributes jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists trust.payment_receipts (
  receipt_id text primary key,
  artifact_id text,
  protocol text not null check (protocol in ('x402','ap2')),
  authorization_status text not null,
  verification_status text not null,
  settlement_status text not null,
  external_ref text,
  testnet boolean not null default false,
  created_at timestamptz not null default now()
);

comment on schema trust is 'Private operational schema for LM Trust Stack. Not exposed to anon/authenticated by default.';
