#!/usr/bin/env python3
"""LM-TRANSACTION-001C: no-funds Trust API HTTP contract smoke.
Runs against an explicitly supplied disposable LOCAL endpoint only.
No credentials, payments, deposits, or production mutations.
Usage: python3 tests/no_funds_trust_api_smoke.py --url http://127.0.0.1:54321/functions/v1/trust-api
"""
import argparse
import json
import sys
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit

def request(base, path, payload=None):
    data = None if payload is None else json.dumps(payload).encode()
    headers = {"Accept": "application/json"}
    if data is not None: headers["Content-Type"] = "application/json"
    req = Request(base.rstrip("/") + path, data=data, headers=headers, method="GET" if data is None else "POST")
    try:
        with urlopen(req, timeout=8) as res:
            return res.status, json.loads(res.read(1_000_000))
    except HTTPError as e:
        return e.code, json.loads(e.read(1_000_000))

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--url", required=True, help="Disposable localhost Trust API function base URL")
    a = p.parse_args()
    u = urlsplit(a.url)
    if u.scheme != "http" or u.hostname not in ("127.0.0.1", "localhost", "::1"):
        p.error("Default-deny: only local disposable HTTP endpoints are allowed")
    checks = [
        ("capability discovery", "/v1/capabilities", None, 200),
        ("missing reliance inputs", "/v1/reliance/qualify", {}, 400),
        ("missing VRA inputs", "/v1/vra/verify", {}, 400),
        ("missing transition inputs", "/v1/transitions/verify", {}, 400),
        ("unknown route", "/v1/no-such-route", None, 404),
    ]
    failures = 0
    for name, path, payload, expected in checks:
        try:
            status, body = request(a.url, path, payload)
            passed = status == expected
            if name == "missing VRA inputs":
                passed = passed and body.get("valid") is False
            if name == "missing transition inputs":
                passed = passed and body.get("valid") is False
            if name == "capability discovery":
                passed = passed and isinstance(body.get("capabilities"), dict)
            print(("PASS" if passed else "FAIL"), name, "HTTP", status, "expected", expected)
            failures += not passed
        except (URLError, ValueError, TimeoutError) as e:
            print("FAIL", name, type(e).__name__)
            failures += 1
    print(json.dumps({"checks":len(checks),"failures":failures,"payment_attempted":False,"production_access":False}))
    return 1 if failures else 0

if __name__ == "__main__":
    sys.exit(main())
