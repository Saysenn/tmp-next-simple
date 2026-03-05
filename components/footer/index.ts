/**
 * Footer variants — import whichever layout suits your project.
 *
 * All variants share the same props interface:
 *   brand: Pick<HeaderConfig, "logo">
 *   config: FooterConfig
 *
 * To switch, just swap the import in app/page.tsx:
 *
 *   import FooterMinimal  from "@/components/footer"  // or use named import
 *   import { FooterColumns } from "@/components/footer"
 *
 * Layouts at a glance:
 *   FooterMinimal  — single compact bar (logo · legal · socials)
 *   FooterColumns  — 3-column grid: brand | links | connect
 *   FooterCentered — centered stacked: logo → tagline → socials → legal
 *   FooterBrand    — bold statement with gradient accent, card background
 *   FooterSplit    — two-tone zones: upper (brand+links) / lower (copyright+socials)
 */

export { default as FooterMinimal } from "./FooterMinimal";
export { default as FooterColumns } from "./FooterColumns";
export { default as FooterCentered } from "./FooterCentered";
export { default as FooterBrand } from "./FooterBrand";
export { default as FooterSplit } from "./FooterSplit";
