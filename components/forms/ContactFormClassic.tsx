// Batch 2 — ContactFormClassic
// Layout: 2-col split — accent info panel left (40%), boxed inputs right (60%)
// Style: sharp 2px borders, formal B2B tone, icon contact details in panel
// API: /api/v1/contact
"use client";

import { useState, FormEvent } from "react";
import { formsConfig } from "@/configs/forms";
import { companyInfo } from "@/configs/footer";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

// ─── Config ──────────────────────────────────────────────────────────────────
const ENQUIRY_TYPES = ["General Enquiry", "Recruitment", "Payroll Services", "Compliance", "Partnership", "Other"];

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactFormClassic() {
  const { requireCaptcha } = formsConfig.contactForm;
  const { isV3, setWidgetToken, getToken } = useCaptcha();

  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fields, setFields] = useState({ name: "", email: "", phone: "", company: "", enquiryType: "", message: "" });

  function set(field: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    let captchaToken: string | null = null;
    if (requireCaptcha) {
      captchaToken = await getToken("contact_classic");
      if (!captchaToken) { setErrorMsg("Please complete the CAPTCHA."); setState("error"); return; }
    }

    const combinedMessage = [
      fields.company ? `Company: ${fields.company}` : "",
      fields.enquiryType ? `Enquiry type: ${fields.enquiryType}` : "",
      fields.message,
    ].filter(Boolean).join("\n\n");

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fields.name, email: fields.email, phone: fields.phone, message: combinedMessage, captchaToken }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error || "Something went wrong."); setState("error"); }
      else { setState("success"); setFields({ name: "", email: "", phone: "", company: "", enquiryType: "", message: "" }); setWidgetToken(null); }
    } catch {
      setErrorMsg("Network error. Please try again."); setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="form-success">
        <div className="form-success-icon">✓</div>
        <h3 className="text-xl font-semibold" style={{ color: "var(--section-heading, var(--text-heading))" }}>Message sent</h3>
        <p style={{ color: "var(--section-muted, var(--text-muted))" }}>We&apos;ll be in touch shortly.</p>
        <button onClick={() => setState("idle")} className="mt-2 text-sm font-medium underline underline-offset-4" style={{ color: "var(--section-accent, var(--accent))" }}>Send another</button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 overflow-hidden" style={{ border: "1px solid var(--section-border, var(--border))", borderRadius: 2 }}>
      {/* Left — info panel */}
      <div className="lg:col-span-2 flex flex-col justify-between p-8 gap-8" style={{ backgroundColor: "var(--section-accent, var(--accent))" }}>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>Contact us</p>
          <h2 className="text-2xl font-bold leading-tight" style={{ color: "#ffffff" }}>
            Let&apos;s start a conversation
          </h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
            Reach out and we&apos;ll get back to you within one business day.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {companyInfo.phone && (
            <a href={`tel:${companyInfo.phone}`} className="flex items-start gap-3 group">
              <span className="mt-0.5 shrink-0" style={{ color: "rgba(255,255,255,0.7)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.49-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              </span>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>{companyInfo.phone}</span>
            </a>
          )}
          {companyInfo.email && (
            <a href={`mailto:${companyInfo.email}`} className="flex items-start gap-3 group">
              <span className="mt-0.5 shrink-0" style={{ color: "rgba(255,255,255,0.7)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
              </span>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>{companyInfo.email}</span>
            </a>
          )}
          {companyInfo.address && (
            <div className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0" style={{ color: "rgba(255,255,255,0.7)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21C12 21 5 13.5 5 8.5a7 7 0 0114 0c0 5-7 12.5-7 12.5z"/><circle cx="12" cy="8.5" r="2.5"/></svg>
              </span>
              <span className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.9)" }}>{companyInfo.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Right — form */}
      <form onSubmit={handleSubmit} className="lg:col-span-3 flex flex-col gap-5 p-8" noValidate>
        <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="form-label">Full name <span className="text-red-500">*</span></label>
            <input type="text" required value={fields.name} onChange={set("name")} placeholder="Oliver James Smith" className="form-input" style={{ borderRadius: 2 }} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="form-label">Email address <span className="text-red-500">*</span></label>
            <input type="email" required value={fields.email} onChange={set("email")} placeholder="oliver@company.co.uk" className="form-input" style={{ borderRadius: 2 }} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="form-label">Phone number</label>
            <input type="tel" value={fields.phone} onChange={set("phone")} placeholder="+44 7700 900123" className="form-input" style={{ borderRadius: 2 }} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="form-label">Company</label>
            <input type="text" value={fields.company} onChange={set("company")} placeholder="Walker & Co Ltd" className="form-input" style={{ borderRadius: 2 }} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="form-label">Enquiry type</label>
          <select value={fields.enquiryType} onChange={set("enquiryType")} className="form-input" style={{ borderRadius: 2 }}>
            <option value="">Select enquiry type…</option>
            {ENQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="form-label">Message <span className="text-red-500">*</span></label>
          <textarea required rows={5} value={fields.message} onChange={set("message")} placeholder="Tell us how we can help…" className="form-input resize-none" style={{ borderRadius: 2 }} />
        </div>

        {requireCaptcha && !isV3 && <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />}
        {state === "error" && <p className="rounded-sm bg-red-50 px-4 py-3 text-sm text-red-600">{errorMsg}</p>}

        <button type="submit" disabled={state === "loading"} className="form-btn mt-2" style={{ borderRadius: 2 }}>
          {state === "loading" ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}
