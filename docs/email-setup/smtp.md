# SMTP Email Setup

Send transactional emails via any SMTP provider (Gmail, Zoho, Brevo, your host, etc.).

## Quick Start

Update `.env`:

```env
MAIL_PROVIDER=smtp
SMTP_HOST=smtp.yourmailhost.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=noreply@yourdomain.co.uk
SMTP_PASS=yourpassword
SMTP_FROM_EMAIL=noreply@yourdomain.co.uk
MAIL_FROM_NAME="Your Company Name"
CONTACT_EMAIL=yourpersonal@email.com
```

## Options

| Variable | Description |
|---|---|
| `SMTP_HOST` | SMTP server hostname from your mail provider |
| `SMTP_PORT` | `465` for SSL, `587` for TLS/STARTTLS |
| `SMTP_SECURE` | `true` for port 465, `false` for port 587 |
| `SMTP_USER` | SMTP login username (usually the from address) |
| `SMTP_PASS` | SMTP password or app password |
| `SMTP_FROM_EMAIL` | Sender address — must match your SMTP account |
| `MAIL_FROM_NAME` | Display name shown in the inbox |
| `CONTACT_EMAIL` | Where form submissions are delivered |

## Common Providers

| Provider | Host | Port |
|---|---|---|
| Gmail | `smtp.gmail.com` | 587 |
| Zoho | `smtp.zoho.eu` | 465 |
| Brevo | `smtp-relay.brevo.com` | 587 |
| cPanel host | `mail.yourdomain.co.uk` | 465 |

## Gmail Note

Gmail requires an **App Password** — not your account password.
Go to Google Account → Security → 2-Step Verification → App Passwords → generate one.
Use that as `SMTP_PASS`. The `SMTP_USER` is your full Gmail address.
Gmail sender will still show as "me" if you receive on the same account — use a domain address instead.
