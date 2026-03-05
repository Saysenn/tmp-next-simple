// ─────────────────────────────────────────────────────────────
// components/footer/Footer.tsx — entry point, switches on footerLayout
//
// "columns"  → FooterColumns  (3-col grid: brand | links | connect)
// "minimal"  → FooterMinimal  (single compact bar: logo · legal · socials)
// "centered" → FooterCentered (centered: logo → tagline → socials → legal)
// "brand"    → FooterBrand    (bold brand statement + gradient accent line)
// "split"    → FooterSplit    (two-tone zones: upper brand / lower copyright)
//
// To switch layout: change footerLayout in configs/footer.ts
// ─────────────────────────────────────────────────────────────

import { footerLayout } from "@/configs/footer";
import { headerConfig, footerConfig } from "@/lib/config";
import FooterColumns from "./FooterColumns";
import FooterMinimal from "./FooterMinimal";
import FooterCentered from "./FooterCentered";
import FooterBrand from "./FooterBrand";
import FooterSplit from "./FooterSplit";

const props = { brand: headerConfig, config: footerConfig };

export default function Footer() {
  if (footerLayout === "minimal")  return <FooterMinimal  {...props} />;
  if (footerLayout === "centered") return <FooterCentered {...props} />;
  if (footerLayout === "brand")    return <FooterBrand    {...props} />;
  if (footerLayout === "split")    return <FooterSplit    {...props} />;
  return <FooterColumns {...props} />;  // default: "columns"
}
