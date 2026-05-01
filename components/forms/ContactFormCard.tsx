// Batch 2 — ContactFormCard
// Layout: minimal centered card, underline-only inputs, no border boxes
// Style: no labels (placeholders as prompts), send icon CTA, 0px radius inputs
// API: /api/v1/contact
"use client";

import { useState, FormEvent } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

// ─── Config ──────────────────────────────────────────────────────────────────
const SERVICE_OPTIONS = ["Recruitment", "Payroll Services", "Compliance", "General Enquiry", "Partnership", "Other"];

type FormState = "idle" | "loading" | "success" | "error";

function UnderlineField({
  children, focused,
}: { children: React.ReactNode; focused: boolean }) {
  return (
    <div
      style={{
        borderBottom: `1px solid ${focused ? "var(--section-accent, var(--accent))" : "var(--section-border, var(--border))"}`,
        transition: "border-color 0.25s",
        paddingBottom: 10,
      }}
    >
      {children}
    </div>
  );
}

export default function ContactFormCard() {
  const { requireCaptcha } = formsConfig.contactForm;
  const { isV3, setWidgetToken, getToken } = useCaptcha();

  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [fields, setFields] = useState({ name: "", email: "", service: "", message: "" });

  function set(field: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    fontSize: "0.9375rem",
    color: "var(--section-heading, var(--text-heading))",
    fontFamily: "inherit",
    padding: "6px 0 0",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.6875rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--section-muted, var(--text-muted))",
    marginBottom: 2,
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState("loading"); setErrorMsg("");

    let captchaToken: string | null = null;
    if (requireCaptcha) {
      captchaToken = await getToken("contact_card");
      if (!captchaToken) { setErrorMsg("Please complete the CAPTCHA."); setState("error"); return; }
    }

    const combinedMessage = [
      fields.service ? `Interested in: ${fields.service}` : "",
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
      else { setState("success"); setFields({ name: "", email: "", service: "", message: "" }); setWidgetToken(null); }
    } catch {
      setErrorMsg("Network error. Please try again."); setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="form-success">
        <div className="form-success-icon">✓</div>
        <h3 className="text-xl font-semibold" style={{ color: "var(--section-heading, var(--text-heading))" }}>Sent.</h3>
        <p style={{ color: "var(--section-muted, var(--text-muted))" }}>We&apos;ll be in touch shortly.</p>
        <button onClick={() => setState("idle")} className="mt-2 text-sm font-medium underline underline-offset-4" style={{ color: "var(--section-accent, var(--accent))" }}>Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7" noValidate>
      <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <UnderlineField focused={focused === "name"}>
          <label style={labelStyle}>Name</label>
          <input type="text" required value={fields.name} onChange={set("name")} placeholder="Sean Murphy" style={inputStyle} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
        </UnderlineField>
        <UnderlineField focused={focused === "email"}>
          <label style={labelStyle}>Email</label>
          <input type="email" required value={fields.email} onChange={set("email")} placeholder="sean@company.co.uk" style={inputStyle} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
        </UnderlineField>
      </div>

      <UnderlineField focused={focused === "service"}>
        <label style={labelStyle}>Interested in</label>
        <select value={fields.service} onChange={set("service")} onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}
          style={{ ...inputStyle, color: fields.service ? "var(--section-heading, var(--text-heading))" : "var(--section-muted, var(--text-muted))" }}>
          <option value="">Select a service…</option>
          {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </UnderlineField>

      <UnderlineField focused={focused === "message"}>
        <label style={labelStyle}>Message</label>
        <textarea required rows={4} value={fields.message} onChange={set("message")} placeholder="Write your message here…" onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
          style={{ ...inputStyle, resize: "none" }} />
      </UnderlineField>

      {requireCaptcha && !isV3 && <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />}
      {state === "error" && <p className="text-sm text-red-500">{errorMsg}</p>}

      {/* CTA row — text + icon button (attachment 8 reference) */}
      <div className="flex items-center justify-end gap-4 pt-2">
        <span className="text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: "var(--section-muted, var(--text-muted))" }}>
          {state === "loading" ? "Sending…" : "Send"}
        </span>
        <button
          type="submit"
          disabled={state === "loading"}
          aria-label="Send message"
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: "var(--section-accent, var(--accent))",
            color: "#ffffff",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.2s",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </form>
  );
}
