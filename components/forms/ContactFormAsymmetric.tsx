// Batch 2 — ContactFormAsymmetric
// Layout: left = large serif heading + brand stats, right = 2-col grid inputs + full-width textarea
// Style: placeholder-only (no field labels), sharp 0px inputs, dark wide CTA
// API: /api/v1/contact
"use client";

import { useState, FormEvent } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

// ─── Config ──────────────────────────────────────────────────────────────────
const SERVICE_OPTIONS = ["Recruitment", "Payroll Services", "Compliance", "General Enquiry", "Partnership"];
const BUDGET_OPTIONS  = ["Under £5k", "£5k–£10k", "£10k–£25k", "£25k–£50k", "£50k+", "Not applicable"];

// ─── Colours — change any value here to retheme this form independently ──────
const c = {
  accent:  "var(--section-accent, var(--accent))",
  heading: "var(--section-heading, var(--text-heading))",
  body:    "var(--section-body, var(--text-body))",
  muted:   "var(--section-muted, var(--text-muted))",
  border:  "var(--section-border, var(--border))",
  ctaBg:   "var(--section-heading, var(--text-heading))",
  ctaText: "var(--section-bg, #ffffff)",
  serif:   "var(--font-cormorant, Georgia, serif)",
  radius:  "0px",   // sharp/editorial
};

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactFormAsymmetric() {
  const { requireCaptcha } = formsConfig.contactForm;
  const { isV3, setWidgetToken, getToken } = useCaptcha();

  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fields, setFields] = useState({ name: "", email: "", service: "", budget: "", message: "" });

  function set(field: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState("loading"); setErrorMsg("");

    let captchaToken: string | null = null;
    if (requireCaptcha) {
      captchaToken = await getToken("contact_asym");
      if (!captchaToken) { setErrorMsg("Please complete the CAPTCHA."); setState("error"); return; }
    }

    const combinedMessage = [
      fields.service ? `Service: ${fields.service}` : "",
      fields.budget  ? `Budget: ${fields.budget}` : "",
      fields.message,
    ].filter(Boolean).join("\n\n") || "No message provided";

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fields.name, email: fields.email, phone: "", message: combinedMessage, captchaToken }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error || "Something went wrong."); setState("error"); }
      else { setState("success"); setFields({ name: "", email: "", service: "", budget: "", message: "" }); setWidgetToken(null); }
    } catch {
      setErrorMsg("Network error. Please try again."); setState("error");
    }
  }

  const r = { borderRadius: c.radius };

  // ── Success — keep 2-col layout, serif "Received." on right ──
  if (state === "success") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1]" style={{ color: c.heading, fontFamily: c.serif }}>
            Love to hear<br />from you,<br />Get in touch.
          </h2>
        </div>
        <div className="flex flex-col gap-4 py-6">
          <p style={{ fontSize: "3.5rem", fontWeight: 700, color: c.heading, fontFamily: c.serif, lineHeight: 1 }}>Received.</p>
          <div style={{ width: 40, height: 2, backgroundColor: c.accent }} />
          <p className="text-sm" style={{ color: c.muted }}>We&apos;ll get back to you within one business day.</p>
          <button
            onClick={() => setState("idle")}
            className="text-sm underline underline-offset-4 self-start mt-2"
            style={{ color: c.accent }}
          >
            Send another →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      {/* Left — editorial headline */}
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1]" style={{ color: c.heading, fontFamily: c.serif }}>
            Love to hear<br />from you,<br />Get in touch.
          </h2>
          <p className="mt-5 text-base leading-relaxed" style={{ color: c.body }}>
            Whether you&apos;re looking to grow your team, streamline payroll, or simply explore what&apos;s possible — we&apos;re here.
          </p>
        </div>
        <div className="flex flex-col gap-3 pt-2">
          {[
            "Every enquiry is reviewed personally by our team",
            "We aim to respond within one working day",
            "Your details are always handled with discretion",
          ].map((point) => (
            <div key={point} className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-xs font-bold" style={{ color: c.accent }}>—</span>
              <span className="text-sm leading-snug" style={{ color: c.muted }}>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form, placeholder-only (no field labels) */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} />

        <div className="grid grid-cols-2 gap-4">
          <input type="text" required value={fields.name} onChange={set("name")} placeholder="Your name *" className="form-input" style={r} />
          <input type="email" required value={fields.email} onChange={set("email")} placeholder="Your email *" className="form-input" style={r} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select value={fields.service} onChange={set("service")} className="form-input" style={r}>
            <option value="">Service interested in…</option>
            {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={fields.budget} onChange={set("budget")} className="form-input" style={r}>
            <option value="">Project budget…</option>
            {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        <textarea required rows={5} value={fields.message} onChange={set("message")} placeholder="Tell us about your project… *" className="form-input resize-none" style={r} />

        {requireCaptcha && !isV3 && <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />}
        {state === "error" && <p className="px-4 py-3 text-sm text-red-600 bg-red-50">{errorMsg}</p>}

        <button
          type="submit"
          disabled={state === "loading"}
          className="w-full mt-2 py-4 text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-3 transition-opacity hover:opacity-80"
          style={{ backgroundColor: c.ctaBg, color: c.ctaText, border: "none", cursor: "pointer", borderRadius: c.radius }}
        >
          {state === "loading" ? "Sending…" : <>Just send <span style={{ fontSize: "1rem" }}>↗</span></>}
        </button>
      </form>
    </div>
  );
}
