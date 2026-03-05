# Header & Footer Usage

All customization lives in one file: **`configs/navigation.ts`**

---

## Site Settings

```ts
export const siteConfig: SiteConfig = {
  name: "MyApp",              // Brand name shown in header + footer
  description: "...",         // Tagline shown in footer brand column
  copyright: "© 2026 MyApp", // Footer bottom bar text

  logoType: "icon-text",      // "text" | "image-text" | "icon-text"
  logoImageSrc: "/logo.png",  // Only used when logoType is "image-text"

  mobileMenuType: "drawer",   // "drawer" | "dropdown" | "fullscreen"
  headerSticky: true,         // true = fixed to top on scroll
};
```

### Logo types

| Value | Result |
|---|---|
| `"text"` | Bold site name only |
| `"icon-text"` | Geometric icon + site name |
| `"image-text"` | Image from `logoImageSrc` + site name |

### Mobile menu types

| Value | Result |
|---|---|
| `"drawer"` | Slides in from the right |
| `"dropdown"` | Expands below the header bar |
| `"fullscreen"` | Full-screen overlay |

---

## Header Navigation

```ts
export const headerNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs", external: true }, // external: true → opens in new tab
];
```

Active link is highlighted automatically based on the current route.

---

## Footer Columns

```ts
export const footerSections: FooterSection[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
    ],
  },
  // Add more sections = more columns
];
```

---

## Social Links

```ts
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/you", icon: "github" },
];
```

Available icons: `"github"` `"twitter"` `"linkedin"` `"instagram"` `"youtube"` `"facebook"`

---

## File Structure

```
configs/
  navigation.ts        ← edit this only
components/
  layout/
    Header.tsx
    Footer.tsx
app/
  layout.tsx           ← Header + Footer already wired in
```
