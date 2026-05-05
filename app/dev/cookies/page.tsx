// Dev-only showcase — all cookie banner variants

const D = {
  title:        "We use cookies",
  description:  "We use cookies and similar technologies to improve your experience, analyse traffic, and personalise content.",
  acceptLabel:  "Accept all",
  declineLabel: "Decline",
};

// ── Bar — 0px radius, dark strip ──
function PreviewBar() {
  return (
    <div className="w-full" style={{ backgroundColor: "var(--text-heading)" }}>
      <div className="px-6 py-3 flex items-center gap-4 flex-wrap sm:flex-nowrap">
        <span className="shrink-0 text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1"
          style={{ backgroundColor: "var(--accent)", color: "#fff", borderRadius: 0 }}>
          Cookies
        </span>
        <p className="flex-1 min-w-0" style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
          {D.description}{" "}
          <a href="#" style={{ color: "var(--accent)", textDecoration: "underline" }}>Privacy</a>
          {" & "}
          <a href="#" style={{ color: "var(--accent)", textDecoration: "underline" }}>Terms</a>
        </p>
        <div className="flex shrink-0 items-center">
          <button style={{ color: "rgba(255,255,255,0.4)", background: "transparent", border: "none", padding: "10px 18px", fontSize: 13 }}>
            {D.declineLabel}
          </button>
          <button className="text-white" style={{ backgroundColor: "var(--accent)", borderRadius: 0, padding: "10px 22px", fontSize: 13, fontWeight: 700 }}>
            {D.acceptLabel} →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Card — 32px radius, pill button, serif heading ──
function PreviewCard() {
  return (
    <div className="w-[310px]" style={{
      backgroundColor: "var(--bg-base)",
      border: "1px solid var(--border)",
      borderRadius: 32,
      boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
    }}>
      <div className="p-7 flex flex-col gap-4">
        <div className="text-center">
          <div className="text-4xl mb-3 select-none">🍪</div>
          <h3 style={{ color: "var(--text-heading)", fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, lineHeight: 1.3 }}>
            {D.title}
          </h3>
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text-muted)", textAlign: "center" }}>
          {D.description}{" "}
          <a href="#" className="underline" style={{ color: "var(--accent)" }}>Privacy</a>
          {" & "}
          <a href="#" className="underline" style={{ color: "var(--accent)" }}>Terms</a>.
        </p>
        <button className="w-full text-white" style={{ backgroundColor: "var(--accent)", borderRadius: 999, padding: "12px 0", fontSize: 16, fontWeight: 700 }}>
          {D.acceptLabel}
        </button>
        <button className="w-full text-center" style={{ color: "var(--text-muted)", background: "none", border: "none", fontSize: 13 }}>
          {D.declineLabel}
        </button>
      </div>
    </div>
  );
}

// ── Modal — 4px radius, split dark/light ──
function PreviewModal() {
  return (
    <div className="w-full max-w-lg mx-auto overflow-hidden flex flex-col sm:flex-row"
      style={{ borderRadius: 4, boxShadow: "0 40px 100px rgba(0,0,0,0.3)" }}>
      <div className="sm:w-[160px] shrink-0 flex flex-col items-start justify-between p-7"
        style={{ backgroundColor: "var(--text-heading)" }}>
        <span className="text-3xl select-none">🍪</span>
        <div>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>Notice</p>
          <h2 style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, lineHeight: 1.3 }}>{D.title}</h2>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between p-7" style={{ backgroundColor: "var(--bg-base)" }}>
        <div>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-body)", marginBottom: 12 }}>{D.description}</p>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 24 }}>
            Read our{" "}
            <a href="#" className="underline" style={{ color: "var(--accent)" }}>Privacy Policy</a>
            {" and "}
            <a href="#" className="underline" style={{ color: "var(--accent)" }}>Terms</a>.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button className="w-full text-white" style={{ backgroundColor: "var(--accent)", borderRadius: 4, padding: "12px 0", fontSize: 14, fontWeight: 700 }}>
            {D.acceptLabel}
          </button>
          <button className="w-full" style={{ color: "var(--text-muted)", backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: 4, padding: "11px 0", fontSize: 14 }}>
            {D.declineLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Drawer — 20px top radius, icon box, pill buttons ──
function PreviewDrawer() {
  return (
    <div className="w-full" style={{
      backgroundColor: "var(--bg-base)",
      borderTop: "1px solid var(--border)",
      borderRadius: "20px 20px 0 0",
    }}>
      <div className="pt-3 pb-0 flex justify-center">
        <div className="h-1 w-8 rounded-full" style={{ backgroundColor: "var(--border-strong)" }} />
      </div>
      <div className="px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="flex-1 flex items-start gap-4">
          <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg text-base"
            style={{ backgroundColor: "var(--bg-soft)", border: "1px solid var(--border)" }}>
            🍪
          </div>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-heading)", marginBottom: 4 }}>{D.title}</h2>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--text-muted)" }}>
              {D.description}{" "}
              <a href="#" className="underline" style={{ color: "var(--accent)" }}>Privacy Policy</a>
              {" · "}
              <a href="#" className="underline" style={{ color: "var(--accent)" }}>Terms</a>
            </p>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col gap-2 shrink-0">
          <button className="flex-1 sm:flex-none sm:w-36 text-white"
            style={{ backgroundColor: "var(--accent)", borderRadius: 999, padding: "11px 20px", fontSize: 14, fontWeight: 600 }}>
            {D.acceptLabel}
          </button>
          <button className="flex-1 sm:flex-none sm:w-36"
            style={{ color: "var(--text-muted)", border: "1px solid var(--border)", borderRadius: 999, padding: "11px 20px", fontSize: 14, background: "transparent" }}>
            {D.declineLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Float — 20px radius panel, pill trigger ──
function PreviewFloat() {
  return (
    <div className="flex flex-col items-start gap-2.5">
      <div className="w-[280px]" style={{
        backgroundColor: "var(--bg-base)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        boxShadow: "0 16px 48px rgba(0,0,0,0.16)",
      }}>
        <div className="px-5 py-3.5 flex items-center justify-between"
          style={{ backgroundColor: "var(--bg-soft)", borderBottom: "1px solid var(--border)", borderRadius: "20px 20px 0 0" }}>
          <div className="flex items-center gap-2">
            <span>🍪</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-heading)" }}>{D.title}</span>
          </div>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>✕</span>
        </div>
        <div className="p-5">
          <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text-muted)", marginBottom: 16 }}>
            {D.description}{" "}
            <a href="#" className="underline" style={{ color: "var(--accent)" }}>Privacy</a>
            {" & "}
            <a href="#" className="underline" style={{ color: "var(--accent)" }}>Terms</a>.
          </p>
          <div className="flex gap-2">
            <button className="flex-1"
              style={{ color: "var(--text-muted)", backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: 10, padding: "9px 0", fontSize: 13 }}>
              {D.declineLabel}
            </button>
            <button className="flex-1 text-white"
              style={{ backgroundColor: "var(--accent)", borderRadius: 10, padding: "9px 0", fontSize: 13, fontWeight: 600 }}>
              {D.acceptLabel}
            </button>
          </div>
        </div>
      </div>
      <button className="flex items-center gap-2 text-white"
        style={{ backgroundColor: "var(--accent)", borderRadius: 999, padding: "10px 18px", fontSize: 13, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
        🍪 Cookies
      </button>
    </div>
  );
}

// ─── Block wrapper ────────────────────────────────────────────────────────────
function Block({ label, configValue, children, padded = true }: {
  label: string; configValue: string; children: React.ReactNode; padded?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 flex-wrap">
        <h2 className="text-lg font-semibold" style={{ color: "var(--text-heading)" }}>{label}</h2>
        <code className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "var(--bg-soft)", color: "var(--accent)" }}>
          &quot;{configValue}&quot;
        </code>
      </div>
      <div className={`overflow-hidden rounded-xl border${padded ? " p-8" : ""}`}
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-soft)" }}>
        <div className={padded ? "flex justify-center" : ""}>{children}</div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CookiesShowcasePage() {
  return (
    <main className="min-h-screen py-20 px-6" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="mx-auto" style={{ maxWidth: 960 }}>
        <div className="mb-16">
          <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--text-muted)" }}>Dev preview</p>
          <h1 className="text-4xl font-bold mb-3" style={{ color: "var(--text-heading)" }}>Cookie Banners</h1>
          <p className="text-base" style={{ color: "var(--text-body)" }}>
            5 variants. Set the active one in{" "}
            <code className="text-sm px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--bg-soft)", color: "var(--accent)" }}>configs/cookies.ts</code>
          </p>
        </div>

        <div className="flex flex-col gap-14">
          <Block label="Bar — 0px, dark, flat" configValue="bar" padded={false}>
            <PreviewBar />
          </Block>
          <Block label="Card — 32px, serif, pill button" configValue="card">
            <PreviewCard />
          </Block>
          <Block label="Modal — 4px, split dark/light" configValue="modal">
            <PreviewModal />
          </Block>
          <Block label="Drawer — 20px top, pill buttons" configValue="drawer" padded={false}>
            <PreviewDrawer />
          </Block>
          <Block label="Float — 20px panel, pill trigger" configValue="float">
            <PreviewFloat />
          </Block>
        </div>

        <p className="mt-20 text-xs text-center" style={{ color: "var(--text-faint)" }}>
          Delete <code>app/dev/</code> before shipping to production.
        </p>
      </div>
    </main>
  );
}
