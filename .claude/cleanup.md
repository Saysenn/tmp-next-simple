# Codebase Cleanup Protocol

Run this when the user says "clean up the codebase", "remove unused code", or "trim the template".

The goal: delete every component, template, and layout that is not wired to the current config.
Less dead code = smaller builds, less confusion, fewer files to maintain.

---

## Step 1 — Read the Current Config Before Touching Anything

Check these 5 files first. They control which variants are active:

```
configs/header.ts         → headerType, mobileMenuType, logoType
configs/footer.ts         → footerLayout
configs/forms.ts          → contactFormType, subscribeFormType, enabled flags
configs/email-templates.ts → contactTemplate, subscribeTemplate
configs/cookies.ts        → cookieBannerVariant
```

Write down the active values. Only delete what is NOT in the active set.

---

## Step 2 — Header Components

**Keep always:**
- `components/header/Header.tsx` — main wrapper, always needed
- `components/header/Logo.tsx` — shared by all header types

**Keep based on `headerType`:**
| Config value | File to keep |
|---|---|
| `"nav"` | (handled inside Header.tsx — no separate file) |
| `"floating-nav"` | `FloatingNavHeader.tsx` |
| `"split-nav"` | `SplitNavHeader.tsx` |
| `"stacked"` | `StackedHeader.tsx` |
| `"cta"` | `CTAHeader.tsx` |
| `"menu-only"` | `MenuOnlyHeader.tsx` |
| `"centered-logo"` | `CenteredLogoHeader.tsx` |

**Keep based on `mobileMenuType`:**
| Config value | File to keep |
|---|---|
| `"drawer"` | `DrawerHeader.tsx` |
| `"dropdown"` | `DropdownHeader.tsx` |
| `"fullscreen"` | `FullscreenHeader.tsx` |

Delete every header file not in the active set.

---

## Step 3 — Footer Components

**Keep always:**
- `components/footer/Footer.tsx` — dispatcher, always needed
- `components/footer/_social-icons.tsx` — shared utility

**Keep based on `footerLayout`:**
| Config value | File to keep |
|---|---|
| `"columns"` | `FooterColumns.tsx` |
| `"minimal"` | `FooterMinimal.tsx` |
| `"centered"` | `FooterCentered.tsx` |
| `"brand"` | `FooterBrand.tsx` |
| `"split"` | `FooterSplit.tsx` |
| `"recruit"` | `FooterRecruit.tsx` |
| `"stacked"` | `FooterStacked.tsx` |

Delete every footer file not in the active set.

---

## Step 4 — Cookie Banner Components

**Keep always:**
- `components/cookie/CookieBanner.tsx` — dispatcher, always needed

**Keep based on `cookieBannerVariant`:**
| Config value | File to keep |
|---|---|
| `"bar"` | `CookieBannerBar.tsx` |
| `"card"` | `CookieBannerCard.tsx` |
| `"modal"` | `CookieBannerModal.tsx` |
| `"drawer"` | `CookieBannerDrawer.tsx` |
| `"float"` | `CookieBannerFloat.tsx` |

Delete every cookie file not in the active set.

---

## Step 5 — Form Components

**Keep always:**
- `components/forms/CaptchaWidget.tsx`
- `components/forms/CaptchaProviderWrapper.tsx`

**Keep based on `contactFormType` (and which forms appear on active pages):**
| What | Keep if |
|---|---|
| `ContactFormMinimal.tsx` | `contactFormType: "minimal"` or page imports it directly |
| `ContactFormDetailed.tsx` | `contactFormType: "detailed"` |
| `ContactFormWithCV.tsx` | `enableContactCVForm: true` and page uses it |
| `ContactForm.tsx` | only if a page uses the auto-dispatch wrapper |
| `ApplicationForm.tsx` | `enableApplicationForm: true` and page uses it |

**Keep based on `subscribeFormType`:**
| What | Keep if |
|---|---|
| `SubscribeFormInline.tsx` | `subscribeFormType: "inline"` |
| `SubscribeFormCard.tsx` | `subscribeFormType: "card"` |
| `SubscribeFormWaitlist.tsx` | `subscribeFormType: "waitlist"` |
| `SubscribeForm.tsx` | only if a page uses the auto-dispatch wrapper |

Before deleting any form component: grep for its import across `app/` to confirm it is not used on a page directly.

---

## Step 6 — Email Templates

**Active route → template mapping** (check `configs/email-templates.ts`):

| Route | Template used |
|---|---|
| `/api/v1/contact` | `ContactEmail{Bold|Classic|Minimal}` — only the one matching `contactTemplate` |
| `/api/v1/subscribe` | `SubscribeEmail{Bold|Classic|Minimal}` — only the one matching `subscribeTemplate` |
| `/api/v1/contact-cv` | `ContactCVEmail` — always keep |
| `/api/v1/apply` | `ApplicationEmail` — always keep |

**Delete based on which template variant is NOT configured:**
| If `contactTemplate` is | Delete |
|---|---|
| `"minimal"` | `ContactEmailBold.tsx`, `ContactEmailClassic.tsx` |
| `"bold"` | `ContactEmailMinimal.tsx`, `ContactEmailClassic.tsx` |
| `"classic"` | `ContactEmailMinimal.tsx`, `ContactEmailBold.tsx` |

Apply same logic for `subscribeTemplate` → `SubscribeEmail{Bold|Classic|Minimal}.tsx`.

Also update `emails/index.ts` to remove exports for deleted files.

---

## Step 7 — API Routes

Check `configs/forms.ts` enabled flags. If a form type is disabled (`enableApplicationForm: false`, etc.), its API route can be deleted:

| Flag | Route to delete if false |
|---|---|
| `enableContactForm` | `app/api/v1/contact/route.ts` |
| `enableSubscribeForm` | `app/api/v1/subscribe/route.ts` |
| `enableApplicationForm` | `app/api/v1/apply/route.ts` |
| `enableContactCVForm` | `app/api/v1/contact-cv/route.ts` |

---

## Step 8 — Verify Nothing Is Broken

After all deletions:
1. Grep across `app/` and `components/` for any remaining imports of deleted files — fix any that appear
2. Check `emails/index.ts` exports — remove entries for deleted templates
3. Run `npm run build` to confirm no missing module errors

---

## Step 9 — Developer Files

Delete these folders — they are developer reference only and should not ship with client projects:

- `docs/` — documentation
- `.claude/` — AI rules and protocols

---

## What to Never Delete

- `lib/` — all utilities and services are shared
- `hooks/` — shared hooks
- `configs/` — configuration files
- `providers/` — context providers
- `app/layout.tsx`, `app/globals.css` — always needed
- `public/` — static assets
- The dispatcher components: `Header.tsx`, `Footer.tsx`, `CookieBanner.tsx`
- The shared sub-components: `Logo.tsx`, `_social-icons.tsx`, `CaptchaWidget.tsx`, `CaptchaProviderWrapper.tsx`
