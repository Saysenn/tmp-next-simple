// components/forms/ContactForm.tsx — dispatcher
// Switch variant: update contactFormType in configs/forms.ts
//
//   "minimal"         → ContactFormMinimal        (Batch 1 — single centered column)
//   "detailed"        → ContactFormDetailed        (Batch 1 — two-column with info panel)
//   "classic"         → ContactFormClassic         (Batch 2 — accent panel left, boxed inputs right)
//   "conversational"  → ContactFormConversational  (Batch 2 — sentence-driven inline inputs)
//   "card"            → ContactFormCard            (Batch 2 — underline inputs, circular send button)
//   "asymmetric"      → ContactFormAsymmetric      (Batch 2 — serif headline, 2-col grid, dark CTA)
//   "progressive"     → ContactFormProgressive     (Batch 2 — start CTA → 3 guided steps)

import { formsConfig } from "@/configs/forms";
import ContactFormMinimal        from "./ContactFormMinimal";
import ContactFormDetailed       from "./ContactFormDetailed";
import ContactFormClassic        from "./ContactFormClassic";
import ContactFormConversational from "./ContactFormConversational";
import ContactFormCard           from "./ContactFormCard";
import ContactFormAsymmetric     from "./ContactFormAsymmetric";
import ContactFormProgressive    from "./ContactFormProgressive";

export default function ContactForm() {
  switch (formsConfig.contactFormType) {
    case "detailed":       return <ContactFormDetailed />;
    case "classic":        return <ContactFormClassic />;
    case "conversational": return <ContactFormConversational />;
    case "card":           return <ContactFormCard />;
    case "asymmetric":     return <ContactFormAsymmetric />;
    case "progressive":    return <ContactFormProgressive />;
    case "minimal":
    default:               return <ContactFormMinimal />;
  }
}
