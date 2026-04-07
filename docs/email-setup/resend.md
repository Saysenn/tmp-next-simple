# Resend Email Setup

Send transactional emails via Resend with a verified domain.

## Quick Start

1. Sign up at [resend.com](https://resend.com)
2. Dashboard → Domains → Add Domain → enter your domain (e.g. `yourdomain.co.uk`)
3. Add the DNS records shown to your domain registrar — wait for verification
4. Dashboard → API Keys → Create API Key → copy it
5. Update `.env`:

```env
MAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.co.uk
MAIL_FROM_NAME="Your Company Name"
CONTACT_EMAIL=yourpersonal@email.com
```

6. Submit a form to test — email arrives at `CONTACT_EMAIL` from `RESEND_FROM_EMAIL`

## Options

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from Resend dashboard |
| `RESEND_FROM_EMAIL` | Sender address — must be on your verified domain |
| `MAIL_FROM_NAME` | Display name shown in the inbox (e.g. "Diverse Rec Payroll") |
| `CONTACT_EMAIL` | Where form submissions are delivered — any email address |

## Notes

- `RESEND_FROM_EMAIL` must use your verified domain — Gmail or personal addresses will be rejected
- `CONTACT_EMAIL` can be any address including Gmail
- Free tier allows 3,000 emails/month and 1 domain
- DNS verification usually takes a few minutes but can take up to 48 hours
