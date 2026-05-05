// components/forms/ApplicationForm.tsx — dispatcher
// Switch variant: update applicationFormType in configs/forms.ts
//
//   "standard"    → ApplicationFormStandard    (Batch 1 — single column)
//   "corporate"   → ApplicationFormCorporate   (Batch 2 — 60/40 split, compliance-heavy)
//   "steps"       → ApplicationFormSteps       (Batch 2 — multi-step progress bar)
//   "editorial"   → ApplicationFormEditorial   (Batch 2 — luxury serif, underline inputs)
//   "modular"     → ApplicationFormModular     (Batch 2 — card grid, free-order)
//   "progressive" → ApplicationFormProgressive (Batch 2 — start CTA → 3 guided steps)

import { formsConfig } from "@/configs/forms";
import ApplicationFormStandard    from "./ApplicationFormStandard";
import ApplicationFormCorporate   from "./ApplicationFormCorporate";
import ApplicationFormSteps       from "./ApplicationFormSteps";
import ApplicationFormEditorial   from "./ApplicationFormEditorial";
import ApplicationFormModular     from "./ApplicationFormModular";
import ApplicationFormProgressive from "./ApplicationFormProgressive";

export default function ApplicationForm() {
  switch (formsConfig.applicationFormType) {
    case "corporate":   return <ApplicationFormCorporate />;
    case "steps":       return <ApplicationFormSteps />;
    case "editorial":   return <ApplicationFormEditorial />;
    case "modular":     return <ApplicationFormModular />;
    case "progressive": return <ApplicationFormProgressive />;
    case "standard":
    default:            return <ApplicationFormStandard />;
  }
}
