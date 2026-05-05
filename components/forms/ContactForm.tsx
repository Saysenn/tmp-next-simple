// components/forms/ContactForm.tsx — dispatcher
// Switch variant: update contactFormType in configs/forms.ts
//
//   "classic"         → ContactFormClassic         (accent panel left, boxed inputs right)
//   "conversational"  → ContactFormConversational  (sentence-driven inline inputs)
//   "card"            → ContactFormCard            (underline inputs, circular send button)
//   "asymmetric"      → ContactFormAsymmetric      (serif headline, 2-col grid, dark CTA)
//   "progressive"     → ContactFormProgressive     (start CTA → 3 guided steps)

import { formsConfig } from "@/configs/forms";
import ContactFormClassic        from "./ContactFormClassic";
import ContactFormConversational from "./ContactFormConversational";
import ContactFormCard           from "./ContactFormCard";
import ContactFormAsymmetric     from "./ContactFormAsymmetric";
import ContactFormProgressive    from "./ContactFormProgressive";

export default function ContactForm() {
  switch (formsConfig.contactFormType) {
    case "conversational": return <ContactFormConversational />;
    case "card":           return <ContactFormCard />;
    case "asymmetric":     return <ContactFormAsymmetric />;
    case "progressive":    return <ContactFormProgressive />;
    case "classic":
    default:               return <ContactFormClassic />;
  }
}
