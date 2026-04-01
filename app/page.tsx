import { siteConfig } from "@/configs/site";
import MaintenancePage from "@/components/modes/MaintenancePage";
import ComingSoonPage from "@/components/modes/ComingSoonPage";

export default function Home() {
  if (siteConfig.mode === "maintenance") return <MaintenancePage />;
  if (siteConfig.mode === "coming-soon") return <ComingSoonPage />;

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="section-hero relative flex items-center justify-center">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <p className="hero-brand text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
            Scroll effect test
          </p>
          <h1 className="hero-headline font-bold leading-tight mb-6" style={{ color: "var(--text-heading)" }}>
            Header Scroll<br />Effect Active
          </h1>
          <p className="hero-sub text-lg sm:text-xl mb-10" style={{ color: "var(--text-muted)" }}>
            Scroll down to see the header transition from transparent to solid. The logo swaps between the inverted and default version.
          </p>
          <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a
              href="#content"
              className="px-8 py-3.5 rounded-lg text-sm font-semibold transition-all"
              style={{ background: "var(--accent)", color: "var(--bg-pure)" }}
            >
              Scroll Down
            </a>
            <a
              href="#content"
              className="px-8 py-3.5 rounded-lg text-sm font-semibold transition-all border"
              style={{ borderColor: "var(--accent-muted)", color: "var(--text-heading)" }}
            >
              See More
            </a>
          </div>
        </div>

        {/* Down arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--accent-muted)" }} />
          </svg>
        </div>
      </section>

      {/* ── After scroll ─────────────────────────────────────────── */}
      <section id="content" className="section-dark py-32 px-4">
        <div className="max-w-3xl mx-auto text-center" data-animate="stagger">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--section-accent)" }}>
            After scrolling
          </p>
          <h2 className="mb-5" style={{ color: "var(--section-heading)" }}>
            Header is now solid
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: "var(--section-body)" }}>
            The header background transitioned to solid and the logo swapped from the inverted version back to the default. Scroll back to the top to see it reverse.
          </p>
        </div>
      </section>

      {/* ── More content ─────────────────────────────────────────── */}
      <section className="section-light py-32 px-4">
        <div className="max-w-3xl mx-auto text-center" data-animate="stagger">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--section-accent)" }}>
            Light section
          </p>
          <h2 className="mb-5" style={{ color: "var(--section-heading)" }}>
            More Content
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: "var(--section-body)" }}>
            Additional section to give more room to scroll and test the sticky header behaviour at different scroll depths.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="inline-flex px-8 py-3.5 rounded-lg text-sm font-semibold transition-all"
              style={{ background: "var(--section-btn-bg)", color: "var(--section-btn-text)" }}
            >
              Call to Action
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
