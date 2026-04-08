# API Route Security

Fixes applied to all Next.js API route handlers (`app/api/v1/*/route.ts`).

## Quick start

Copy the three patterns below into every new API route handler.

```ts
// 1 — IP (rate limiting key)
function getRateLimitKey(request: NextRequest): string {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown"
  );
}

// 2 — Content-Type (JSON routes)
if (!request.headers.get("content-type")?.includes("application/json")) {
  return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
}

// 2 — Content-Type (multipart/form-data routes)
const contentType = request.headers.get("content-type") ?? "";
if (!contentType.includes("multipart/form-data")) {
  return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
}

// 3 — Honeypot (silent accept — never log)
if (body.website) {
  return NextResponse.json({ success: true, message: "..." });
}
```

## Fixes

### 1. IP spoofing in rate limiting

| | Detail |
|---|---|
| **Vulnerability** | `x-forwarded-for` is a client-controlled header. Any client can set it to any value, bypassing per-IP rate limits entirely. |
| **Fix** | Prioritise trusted server-set headers: `x-real-ip` (Nginx) → `cf-connecting-ip` (Cloudflare) → `x-forwarded-for[0]` (last resort) → `"unknown"`. |
| **Affected routes** | `apply`, `contact`, `contact-cv`, `subscribe` |

```ts
// Before (spoofable)
function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

// After (trusted priority chain)
function getRateLimitKey(request: NextRequest): string {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown"
  );
}
```

**Note:** This only applies when your infrastructure sets `x-real-ip` or `cf-connecting-ip`. If running behind a plain Node server with no proxy, all three headers are client-controlled — use a proper IP extraction library (`@vercel/functions`, `ipaddr.js`) or enforce IP trust at the infrastructure level.

---

### 2. Content-Type exact string match

| | Detail |
|---|---|
| **Vulnerability** | `=== "application/json"` rejects valid requests where browsers send `application/json; charset=utf-8`. The route silently drops legitimate form submissions. |
| **Fix** | Use `.includes("application/json")` to match the media type regardless of parameters. |
| **Affected routes** | `contact`, `subscribe` (`apply` and `contact-cv` already used `.includes` for multipart) |

```ts
// Before (breaks charset-suffixed requests)
if (request.headers.get("content-type") !== "application/json") { ... }

// After
if (!request.headers.get("content-type")?.includes("application/json")) { ... }
```

---

### 3. Honeypot — never log

| | Detail |
|---|---|
| **Vulnerability** | Logging `"[Security] Honeypot triggered"` (or any honeypot event) leaks the email/name/IP of the submitter to third-party log aggregators (Datadog, Sentry, Logtail, etc.). This is PII without consent. |
| **Fix** | Silently return a success response. No log, no metric, no event. Bots must not know the field exists or that it was caught. |
| **Affected routes** | All routes that use a honeypot field |

```ts
// Before (PII leak to log services)
if (body.website) {
  console.log("[Security] Honeypot triggered", { email: body.email, ip });
  return NextResponse.json({ success: true });
}

// After (silent — zero trace)
if (body.website) {
  return NextResponse.json({ success: true, message: "Your enquiry has been sent." });
}
```

---

### 4. Hardcoded domain in plain-text email

| | Detail |
|---|---|
| **Vulnerability** | A hardcoded domain in `generatePlainText` breaks when the template is reused across projects and creates a silent mismatch (emails say one domain, they come from another). |
| **Fix** | Remove the domain from the plain-text footer, or pull it from a config (`mailConfig.siteUrl`). |

```ts
// Before
function generatePlainText(...) {
  return `...
----
Sent from hardcoded-domain.co.uk
  `;
}

// After — config-driven or omit entirely
function generatePlainText(...) {
  return `...
----
Sent from the contact form.
  `;
}
```

---

## Checklist for new routes

- [ ] `getRateLimitKey` uses the trusted header priority chain
- [ ] Content-Type check uses `.includes()` not `===`
- [ ] Honeypot returns silent success — no `console.log`, no metrics
- [ ] No domain/URL hardcoded in email templates — use config or omit
- [ ] No PII (`email`, `name`, `phone`, `ip`) in any `console.log` or error response

## File structure

| File | Purpose |
|---|---|
| `app/api/v1/apply/route.ts` | CV application form — multipart, file upload |
| `app/api/v1/contact/route.ts` | Contact form — JSON |
| `app/api/v1/contact-cv/route.ts` | Contact + CV form — multipart |
| `app/api/v1/subscribe/route.ts` | Newsletter subscribe — JSON |
