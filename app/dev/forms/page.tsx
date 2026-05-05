// Dev-only showcase — all Batch 2 form variants
// Remove this page before shipping to production (delete app/dev/ folder)

import ContactFormClassic        from "@/components/forms/ContactFormClassic";
import ContactFormConversational from "@/components/forms/ContactFormConversational";
import ContactFormCard           from "@/components/forms/ContactFormCard";
import ContactFormAsymmetric     from "@/components/forms/ContactFormAsymmetric";
import ContactFormProgressive    from "@/components/forms/ContactFormProgressive";
import ApplicationFormCorporate  from "@/components/forms/ApplicationFormCorporate";
import ApplicationFormSteps      from "@/components/forms/ApplicationFormSteps";
import ApplicationFormEditorial  from "@/components/forms/ApplicationFormEditorial";
import ApplicationFormModular    from "@/components/forms/ApplicationFormModular";
import ApplicationFormProgressive from "@/components/forms/ApplicationFormProgressive";

function ShowcaseBlock({ label, batch, children }: { label: string; batch: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase px-2 py-0.5 rounded" style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}>{batch}</span>
        <h2 className="text-lg font-semibold" style={{ color: "var(--text-heading)" }}>{label}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function FormsShowcasePage() {
  return (
    <main className="min-h-screen py-20 px-4" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="mx-auto" style={{ maxWidth: 960 }}>

        {/* Header */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--text-muted)" }}>Dev preview</p>
          <h1 className="text-4xl font-bold mb-3" style={{ color: "var(--text-heading)" }}>Form Variants</h1>
          <p className="text-base" style={{ color: "var(--text-body)" }}>
            All Batch 2 forms. Switch active variant in <code className="text-sm px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--bg-soft)", color: "var(--accent)" }}>configs/forms.ts</code>
          </p>

          {/* Quick reference */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg" style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-soft)" }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--text-muted)" }}>Contact form</p>
              {["minimal", "detailed", "classic", "conversational", "card", "asymmetric", "progressive"].map((v) => (
                <p key={v} className="text-sm font-mono" style={{ color: "var(--text-body)" }}>contactFormType: &quot;{v}&quot;</p>
              ))}
            </div>
            <div className="p-4 rounded-lg" style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-soft)" }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--text-muted)" }}>Application form</p>
              {["standard", "corporate", "steps", "editorial", "modular", "progressive"].map((v) => (
                <p key={v} className="text-sm font-mono" style={{ color: "var(--text-body)" }}>applicationFormType: &quot;{v}&quot;</p>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Contact Forms ─── */}
        <div className="flex flex-col gap-20">
          <div>
            <div className="mb-12 pb-4" style={{ borderBottom: "2px solid var(--border)" }}>
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-heading)" }}>Contact Forms</h2>
            </div>
            <div className="flex flex-col gap-20">

              <ShowcaseBlock label="Classic — accent panel + boxed inputs" batch="Batch 2">
                <div className="section-light p-8 rounded-xl">
                  <ContactFormClassic />
                </div>
              </ShowcaseBlock>

              <ShowcaseBlock label="Conversational — sentence-driven" batch="Batch 2">
                <div className="section-light p-8 rounded-xl">
                  <ContactFormConversational />
                </div>
              </ShowcaseBlock>

              <ShowcaseBlock label="Card — underline inputs, circular send" batch="Batch 2">
                <div className="section-light p-8 rounded-xl" style={{ maxWidth: 520 }}>
                  <ContactFormCard />
                </div>
              </ShowcaseBlock>

              <ShowcaseBlock label="Asymmetric — serif headline, 2-col grid" batch="Batch 2">
                <div className="section-light p-8 rounded-xl">
                  <ContactFormAsymmetric />
                </div>
              </ShowcaseBlock>

              <ShowcaseBlock label="Progressive — start CTA, 3 guided steps" batch="Batch 2">
                <div className="section-light p-8 rounded-xl">
                  <ContactFormProgressive />
                </div>
              </ShowcaseBlock>

            </div>
          </div>

          {/* ─── Application Forms ─── */}
          <div>
            <div className="mb-12 pb-4" style={{ borderBottom: "2px solid var(--border)" }}>
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-heading)" }}>Application Forms</h2>
            </div>
            <div className="flex flex-col gap-20">

              <ShowcaseBlock label="Corporate — 60/40 split, compliance-heavy" batch="Batch 2">
                <div className="section-light p-8 rounded-xl">
                  <ApplicationFormCorporate />
                </div>
              </ShowcaseBlock>

              <ShowcaseBlock label="Steps — multi-step progress bar" batch="Batch 2">
                <div className="section-light p-8 rounded-xl">
                  <ApplicationFormSteps />
                </div>
              </ShowcaseBlock>

              <ShowcaseBlock label="Editorial — luxury serif, underline inputs" batch="Batch 2">
                <div className="section-light p-8 rounded-xl">
                  <ApplicationFormEditorial />
                </div>
              </ShowcaseBlock>

              <ShowcaseBlock label="Modular — card grid, free-order" batch="Batch 2">
                <div className="section-light p-8 rounded-xl">
                  <ApplicationFormModular />
                </div>
              </ShowcaseBlock>

              <ShowcaseBlock label="Progressive — start CTA, 3 guided steps" batch="Batch 2">
                <div className="section-light p-8 rounded-xl">
                  <ApplicationFormProgressive />
                </div>
              </ShowcaseBlock>

            </div>
          </div>
        </div>

        <p className="mt-20 text-xs text-center" style={{ color: "var(--text-faint)" }}>
          Delete <code>app/dev/</code> before shipping to production.
        </p>
      </div>
    </main>
  );
}
