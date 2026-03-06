# Site Modes

Config file: **`configs/site.ts`**

```ts
mode: "coming-soon",  // subscribe form + optional countdown
mode: "maintenance",  // maintenance page, no forms
mode: "full",         // full site
```

---

## `"coming-soon"`

```ts
comingSoon: {
  headline: "Something great\nis coming soon",  // \n = line break
  subline:  "Sign up to be the first to know.",
  showCountdown: true,
  launchDate: "2026-06-01T00:00:00Z",  // ISO 8601
},
```

Subscribe form variant is controlled by `configs/forms.ts → subscribeFormType`.

## `"maintenance"`

```ts
maintenance: {
  heading:      "We'll be back soon",
  message:      "Performing scheduled maintenance...",
  expectedBack: "a few hours",     // optional
  contactEmail: "hello@myapp.com", // optional fallback link
},
```

## `"full"`

Renders the full site. Which forms are visible is controlled by `configs/forms.ts`.

---

## File structure

```
configs/site.ts                ← mode + options (edit this)
components/modes/
  MaintenancePage.tsx          ← rendered when mode === "maintenance"
  ComingSoonPage.tsx           ← rendered when mode === "coming-soon"
app/page.tsx                   ← reads mode and switches
```
