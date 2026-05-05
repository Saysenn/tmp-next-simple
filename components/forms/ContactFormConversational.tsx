// Batch 2 — ContactFormConversational
// Layout: single column, inputs embedded inline within sentence text
// Style: no labels, no boxes — inputs look like part of a typed sentence
// API: /api/v1/contact
"use client";

import { useState, FormEvent } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

// ─── Config ──────────────────────────────────────────────────────────────────
const SERVICE_OPTIONS = ["Recruitment", "Payroll Services", "Compliance", "General Enquiry", "Partnership"];

// ─── Colours — change any value here to retheme this form independently ──────
const c = {
  accent:  "var(--section-accent, var(--accent))",
  heading: "var(--section-heading, var(--text-heading))",
  body:    "var(--section-body, var(--text-body))",
  muted:   "var(--section-muted, var(--text-muted))",
  border:  "var(--section-border, var(--border))",
  radius:  "8px",   // standard rounded
};

type FormState = "idle" | "loading" | "success" | "error";

function InlineInput({
  value, onChange, placeholder, type = "text", width = "160px", focused, onFocus, onBlur,
}: {
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string; type?: string; width?: string;
  focused: boolean; onFocus: () => void; onBlur: () => void;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{
        display: "inline-block",
        width,
        background: "transparent",
        border: "none",
        borderBottom: `1.5px solid ${focused ? c.accent : c.border}`,
        color: c.heading,
        fontSize: "inherit",
        fontFamily: "inherit",
        outline: "none",
        padding: "2px 4px 4px",
        transition: "border-color 0.2s",
        minWidth: 60,
      }}
    />
  );
}

export default function ContactFormConversational() {
  const { requireCaptcha } = formsConfig.contactForm;
  const { isV3, setWidgetToken, getToken } = useCaptcha();

  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [fields, setFields] = useState({ name: "", city: "", service: "", email: "", message: "" });

  function set(field: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!fields.name || !fields.email) {
      setErrorMsg("Please fill in your name and email."); setState("error"); return;
    }
    setState("loading"); setErrorMsg("");

    let captchaToken: string | null = null;
    if (requireCaptcha) {
      captchaToken = await getToken("contact_conv");
      if (!captchaToken) { setErrorMsg("Please complete the CAPTCHA."); setState("error"); return; }
    }

    const combinedMessage = [
      fields.city    ? `Location: ${fields.city}` : "",
      fields.service ? `Interested in: ${fields.service}` : "",
      fields.message ? `Message: ${fields.message}` : "",
    ].filter(Boolean).join("\n") || "No message provided";

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fields.name, email: fields.email, phone: "", message: combinedMessage, captchaToken }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error || "Something went wrong."); setState("error"); }
      else { setState("success"); setFields({ name: "", city: "", service: "", email: "", message: "" }); setWidgetToken(null); }
    } catch {
      setErrorMsg("Network error. Please try again."); setState("error");
    }
  }

  // ── Success — large personalised text, no icon ──
  if (state === "success") {
    return (
      <div className="py-10 text-center flex flex-col items-center gap-4">
        <p style={{ fontSize: "2rem", fontWeight: 700, color: c.heading, lineHeight: 1.2 }}>
          Brilliant{fields.name ? `, ${fields.name.split(" ")[0]}` : ""}!
        </p>
        <p className="text-base" style={{ color: c.muted }}>We typically reply within 24 hours.</p>
        <button
          onClick={() => setState("idle")}
          className="mt-2 text-sm underline underline-offset-4"
          style={{ color: c.accent }}
        >
          Send another message
        </button>
      </div>
    );
  }

  const sentenceStyle: React.CSSProperties = {
    fontSize: "1.125rem",
    lineHeight: 2.2,
    color: c.body,
    flexWrap: "wrap",
    display: "flex",
    alignItems: "baseline",
    gap: "6px",
  };
  const wordStyle: React.CSSProperties = { whiteSpace: "nowrap", color: c.muted, fontSize: "1.125rem" };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
      <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} />

      <div className="flex flex-col gap-6">
        <div style={sentenceStyle}>
          <span style={wordStyle}>Hi, I&apos;m</span>
          <InlineInput value={fields.name} onChange={set("name")} placeholder="your name" width="140px" focused={focused === "name"} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
          <span style={wordStyle}>from</span>
          <InlineInput value={fields.city} onChange={set("city")} placeholder="your city" width="120px" focused={focused === "city"} onFocus={() => setFocused("city")} onBlur={() => setFocused(null)} />
          <span style={wordStyle}>and I need help with</span>
          <span style={{ display: "inline-block" }}>
            <select
              value={fields.service}
              onChange={set("service")}
              onFocus={() => setFocused("service")}
              onBlur={() => setFocused(null)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: `1.5px solid ${focused === "service" ? c.accent : c.border}`,
                color: fields.service ? c.heading : c.muted,
                fontSize: "1.125rem",
                fontFamily: "inherit",
                outline: "none",
                padding: "2px 4px 4px",
                transition: "border-color 0.2s",
                minWidth: 180,
              }}
            >
              <option value="">a service…</option>
              {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </span>
          <span style={wordStyle}>. You can reach me at</span>
          <InlineInput type="email" value={fields.email} onChange={set("email")} placeholder="your email" width="200px" focused={focused === "email"} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
          <span style={wordStyle}>.</span>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs tracking-widest uppercase" style={{ color: c.muted }}>
            Anything else to add? (optional)
          </label>
          <textarea
            rows={3}
            value={fields.message}
            onChange={set("message")}
            placeholder="A bit more context helps…"
            className="form-input resize-none"
            style={{ borderRadius: c.radius }}
          />
        </div>
      </div>

      {requireCaptcha && !isV3 && <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />}
      {state === "error" && <p className="px-4 py-3 text-sm text-red-600 bg-red-50 rounded-lg">{errorMsg}</p>}

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs" style={{ color: c.muted }}>We typically reply within 24 hours.</p>
        <button type="submit" disabled={state === "loading"} className="form-btn" style={{ borderRadius: c.radius }}>
          {state === "loading" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
