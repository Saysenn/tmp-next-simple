// Batch 2 — ContactFormAsymmetric
// Layout: left = large serif heading + brand stats, right = 2-col grid inputs + full-width textarea
// Style: bold editorial left, clean inputs right, wide dark CTA at bottom
// API: /api/v1/contact
"use client";

import { useState, FormEvent } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

// ─── Config ──────────────────────────────────────────────────────────────────
const SERVICE_OPTIONS = ["Recruitment", "Payroll Services", "Compliance", "General Enquiry", "Partnership"];
const BUDGET_OPTIONS  = ["Under £5k", "£5k–£10k", "£10k–£25k", "£25k–£50k", "£50k+", "Not applicable"];

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
    ].filter(Boolean).join("\n\n");

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

  if (state === "success") {
    return (
      <div className="form-success">
        <div className="form-success-icon">✓</div>
        <h3 className="text-xl font-semibold" style={{ color: "var(--section-heading, var(--text-heading))" }}>Message sent.</h3>
        <p style={{ color: "var(--section-muted, var(--text-muted))" }}>We&apos;ll get back to you shortly.</p>
        <button onClick={() => setState("idle")} className="mt-2 text-sm font-medium underline underline-offset-4" style={{ color: "var(--section-accent, var(--accent))" }}>Send another</button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      {/* Left — editorial headline */}
      <div className="flex flex-col gap-8">
        <div>
          <h2
            className="text-4xl sm:text-5xl font-bold leading-[1.1]"
            style={{ color: "var(--section-heading, var(--text-heading))", fontFamily: "var(--font-cormorant, Georgia, serif)" }}
          >
            Love to hear<br />from you,<br />Get in touch.
          </h2>
          <p className="mt-5 text-base leading-relaxed" style={{ color: "var(--section-body, var(--text-body))" }}>
            Whether you&apos;re looking to grow your team, streamline payroll, or simply explore what&apos;s possible — we&apos;re here.
          </p>
        </div>

        {/* Brand stats */}
        <div className="flex flex-col gap-4 pt-2">
          {[
            { stat: "50+", label: "Clients served" },
            { stat: "10+", label: "Years of experience" },
            { stat: "24h", label: "Average response time" },
          ].map(({ stat, label }) => (
            <div key={label} className="flex items-baseline gap-3">
              <span className="text-2xl font-bold" style={{ color: "var(--section-accent, var(--accent))" }}>{stat}</span>
              <span className="text-sm" style={{ color: "var(--section-muted, var(--text-muted))" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} />

        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="form-label">Your name <span className="text-red-500">*</span></label>
            <input type="text" required value={fields.name} onChange={set("name")} placeholder="Edward Snowden" className="form-input" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="form-label">Your email <span className="text-red-500">*</span></label>
            <input type="email" required value={fields.email} onChange={set("email")} placeholder="edward@company.co.uk" className="form-input" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="form-label">What you are interested in</label>
            <select value={fields.service} onChange={set("service")} className="form-input">
              <option value="">Select service…</option>
              {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="form-label">Project budget</label>
            <select value={fields.budget} onChange={set("budget")} className="form-input">
              <option value="">Select budget…</option>
              {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="form-label">Message <span className="text-red-500">*</span></label>
          <textarea required rows={5} value={fields.message} onChange={set("message")} placeholder="Tell us about your project…" className="form-input resize-none" />
        </div>

        {requireCaptcha && !isV3 && <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />}
        {state === "error" && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{errorMsg}</p>}

        <button
          type="submit"
          disabled={state === "loading"}
          className="w-full mt-2 py-4 text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-3 transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "var(--section-heading, #111827)",
            color: "var(--section-bg, #ffffff)",
            border: "none",
            cursor: "pointer",
          }}
        >
          {state === "loading" ? "Sending…" : <>Just send <span style={{ fontSize: "1rem" }}>↗</span></>}
        </button>
      </form>
    </div>
  );
}
