-- Disposable-only LM-TRANSACTION-001C schema. Do not apply to production.
CREATE SCHEMA IF NOT EXISTS lm_rehearsal;
CREATE TABLE lm_rehearsal.issuers (
  issuer_id text PRIMARY KEY,
  public_jwk jsonb NOT NULL,
  revoked boolean NOT NULL DEFAULT false
);
CREATE TABLE lm_rehearsal.nonces (
  issuer_id text NOT NULL REFERENCES lm_rehearsal.issuers(issuer_id),
  nonce text NOT NULL,
  consumed_at timestamptz,
  PRIMARY KEY (issuer_id, nonce)
);
CREATE TABLE lm_rehearsal.receipts (
  request_id text PRIMARY KEY,
  issuer_id text NOT NULL,
  nonce text NOT NULL,
  decision text NOT NULL CHECK (decision IN ('REVIEW','REFUSE','STALE','UNRESOLVED')),
  payment_state text NOT NULL CHECK (payment_state = 'NO_FUNDS'),
  created_at timestamptz NOT NULL DEFAULT now()
);
REVOKE ALL ON SCHEMA lm_rehearsal FROM PUBLIC;
REVOKE ALL ON ALL TABLES IN SCHEMA lm_rehearsal FROM PUBLIC;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'lm_rehearsal_app') THEN
    CREATE ROLE lm_rehearsal_app LOGIN PASSWORD 'disposable-only';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'lm_rehearsal_untrusted') THEN
    CREATE ROLE lm_rehearsal_untrusted LOGIN PASSWORD 'disposable-only';
  END IF;
END $$;
GRANT USAGE ON SCHEMA lm_rehearsal TO lm_rehearsal_app;
GRANT SELECT ON lm_rehearsal.issuers TO lm_rehearsal_app;
GRANT SELECT, UPDATE ON lm_rehearsal.nonces TO lm_rehearsal_app;
GRANT INSERT, SELECT ON lm_rehearsal.receipts TO lm_rehearsal_app;
