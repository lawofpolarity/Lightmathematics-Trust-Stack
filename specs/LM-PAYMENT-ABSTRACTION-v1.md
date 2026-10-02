# LM Payment Abstraction v1

Status: **Draft**

## Objective

Keep payment rails outside semantic logic.

The LM service layer should ask whether service execution is economically
authorized, not whether a specific payment protocol happened to succeed.

## Interface

```text
PaymentAuthorization {
  protocol
  request_id
  payer_ref
  payee_ref
  asset_or_method
  amount
  authorization_status
  verification_status
  settlement_status
  receipt_ref
  testnet
}
```

Initial adapters:

- x402
- AP2

## Invariant

Payment purchases service execution where applicable.

Payment does not purchase:

- truth;
- scientific validity;
- evidence quality;
- authority;
- canonical admission;
- favorable semantic disposition.
