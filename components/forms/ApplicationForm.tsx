// components/forms/ApplicationForm.tsx — dispatcher
// Switch variant: update applicationFormType in configs/forms.ts
//
//   "corporate"   → ApplicationFormCorporate   (60/40 split, compliance-heavy, sticky info panel)
//   "steps"       → ApplicationFormSteps       (multi-step with progress bar)
//   "editorial"   → ApplicationFormEditorial   (luxury serif headline, underline-only inputs)
//   "modular"     → ApplicationFormModular     (card grid, free-order, skill chips)
//   "progressive" → ApplicationFormProgressive (start CTA → 3 guided steps)

import { formsConfig } from "@/configs/forms";
import ApplicationFormCorporate   from "./ApplicationFormCorporate";
import ApplicationFormSteps       from "./ApplicationFormSteps";
import ApplicationFormEditorial   from "./ApplicationFormEditorial";
import ApplicationFormModular     from "./ApplicationFormModular";
import ApplicationFormProgressive from "./ApplicationFormProgressive";

export default function ApplicationForm() {
  switch (formsConfig.applicationFormType) {
    case "steps":       return <ApplicationFormSteps />;
    case "editorial":   return <ApplicationFormEditorial />;
    case "modular":     return <ApplicationFormModular />;
    case "progressive": return <ApplicationFormProgressive />;
    case "corporate":
    default:            return <ApplicationFormCorporate />;
  }
}
