# Migrating Email Templates to Older Versions

Steps to copy the redesigned email templates from this version into an older project using the same template base.

## Files to Copy

Copy these into the old project, overwriting existing files:

- `emails/*.tsx` — all email templates
- `configs/email-templates.ts` — variant config

## API Route Changes

In the old project, update the two API routes below.

### `app/api/v1/contact/route.ts`

Update the import:
```ts
import { ContactFormEmail, ContactEmailBold, ContactEmailClassic, ContactEmailMinimal } from "@/emails";
```

Update the template map:
```ts
const contactTemplates = {
  default: ContactFormEmail,
  bold: ContactEmailBold,
  classic: ContactEmailClassic,
  minimal: ContactEmailMinimal,
};
```

### `app/api/v1/subscribe/route.ts`

Update the import:
```ts
import { SubscribeEmail, SubscribeEmailBold, SubscribeEmailClassic, SubscribeEmailMinimal } from "@/emails";
```

Update the template map:
```ts
const subscribeTemplates = {
  default: SubscribeEmail,
  bold: SubscribeEmailBold,
  classic: SubscribeEmailClassic,
  minimal: SubscribeEmailMinimal,
};
```

## Done

That's all. The active template is controlled by `configs/email-templates.ts` — both are set to `"default"` out of the box.
