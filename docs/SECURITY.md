# Security Audit Checklist — Forms & API Routes

Scanned: `app/api/v1/contact/route.ts`, `app/api/v1/subscribe/route.ts`, `lib/services/mail.ts`, `lib/services/captcha.ts`, form components.

---

## Already Implemented

- [x] **Rate limiting** — Contact: 5 req/min, Subscribe: 3 req/min per IP via in-memory store
- [x] **Honeypot field** — `website` field silently absorbs bot submissions without alerting them
- [x] **HTML entity escaping** — `sanitizeInput()` encodes `&`, `<`, `>`, `"`, `'` before rendering into email
- [x] **Email header injection prevention** — newlines stripped from `name` before use in subject line
- [x] **Strict email validation** — regex + blocklist of 38+ disposable and 18+ test domains
- [x] **Field length caps** — name ≤100, phone ≤30, message ≤5000, role ≤100
- [x] **Field minimum lengths** — name ≥2, message ≥5
- [x] **CAPTCHA support** — Turnstile, reCAPTCHA v2/v3 (optional via config)
- [x] **CONTACT_EMAIL guard** — returns 503 before touching email logic if env var is unset
- [x] **ReplyTo isolation** — admin inbox is never exposed; replies go to the user's email
- [x] **Disposable email blocking** — mail.ts blocklist prevents spam via temp-mail services
- [x] **Rate limit store cleanup** — map is pruned when it exceeds 1000 entries to prevent memory leak

---

## Vulnerabilities & Gaps to Address

### High Priority

- [ ] **Rate limit bypass via IP spoofing** — `x-forwarded-for` is trusted as-is. A bot can rotate IPs or forge the header. **Fix:** Validate the IP against a known proxy list, or use a CDN-level rate limiter (Cloudflare, Vercel Edge) instead of the in-memory store.
- [ ] **In-memory rate limit resets on redeploy** — The `Map` is process-local. Every cold start or serverless invocation may get a fresh store. **Fix:** Use Redis or an edge KV store (e.g., Vercel KV, Upstash) for persistent rate limiting.
- [ ] **CAPTCHA disabled by default** — `requireCaptcha: false` in `configs/forms.ts` means any bot that avoids the honeypot can spam freely. **Fix:** Enable CAPTCHA (`requireCaptcha: true`) in production, or enforce Turnstile at the CDN/middleware level.
- [ ] **Error message leaks internal detail** — `{ error: \`Email failed: ${msg}\` }` in the catch block exposes stack/service errors to callers. **Fix:** Log `msg` server-side only; return a generic `"Failed to send message. Please try again."` to the client.

### Medium Priority

- [ ] **No Content-Type enforcement** — Routes accept any body that `request.json()` can parse. A malformed or unexpectedly large body could cause parse errors. **Fix:** Add a `Content-Type: application/json` header check and a body size guard (`Content-Length` header or middleware).
- [ ] **No origin/CSRF check** — API routes are open to cross-origin POST from any domain. **Fix:** Check `Origin` / `Referer` header against your site's domain, or require a CSRF token on state-changing routes.
- [ ] **Subscribe route has no plain-text fallback** — Only HTML is sent; some mail clients fall back to raw HTML. **Fix:** Add a `text` field to `sendEmail()` call (same pattern as the contact route).
- [ ] **Role field is free-text despite having a fixed option list** — Frontend shows a dropdown, but the API accepts any string. **Fix:** Validate `role` against `formsConfig.subscribeForm.roleOptions` server-side.
- [ ] **Suspicious email patterns could be improved** — Current regex checks (`test123@`, `fake\d@`) may miss variations. Consider integrating a service like Abstract API or ZeroBounce for production email verification.

### Low Priority

- [ ] **No request logging / audit trail** — Successful submissions are only logged via `console.log`. **Fix:** Persist submissions to a database or structured log (e.g., Axiom, Logtail) for audit/replay if email delivery fails.
- [ ] **`X-RateLimit-Remaining` exposed on success** — Reveals rate limit state to callers, which could help bots time their requests. Minor — acceptable trade-off for transparency, but worth noting.
- [ ] **No bot behavior scoring** — Honeypot + CAPTCHA are binary. **Fix:** Log submission timing (time-to-fill < 2s is suspicious) and add a server-side timestamp field to detect instant submissions.
- [ ] **Resend/SMTP credentials in env only** — Good, but ensure `.env` is in `.gitignore` and secrets are not committed. Verify with `git log --all -- .env`.

---

## Quick Wins (do these first)

1. Set `requireCaptcha: true` in `configs/forms.ts` for production
2. Replace the `error: \`Email failed: ${msg}\`` response with a generic string
3. Add a `Content-Type` check at the top of each route handler
4. Add server-side `role` validation against the allowed options list
