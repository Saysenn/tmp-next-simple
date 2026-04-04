"use client";

import { useState, FormEvent } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactFormMinimal() {
  const { showPhone, requireCaptcha } = formsConfig.contactForm;
  const { isV3, setWidgetToken, getToken } = useCaptcha();

  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fields, setFields] = useState({ name: "", email: "", phone: "", message: "" });

  function set(field: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    let captchaToken: string | null = null;
    if (requireCaptcha) {
      captchaToken = await getToken("contact_form");
      if (!captchaToken) {
        setErrorMsg("Please complete the CAPTCHA before submitting.");
        setState("error");
        return;
      }
    }

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, captchaToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setState("error");
      } else {
        setState("success");
        setFields({ name: "", email: "", phone: "", message: "" });
        setWidgetToken(null);
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="form-success">
        <div className="form-success-icon">✓</div>
        <h3 className="text-xl font-semibold" style={{ color: "var(--section-heading, var(--text-heading))" }}>
          Message sent
        </h3>
        <p style={{ color: "var(--section-muted, var(--text-muted))" }}>
          Thanks for reaching out. We&apos;ll get back to you shortly.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-2 text-sm font-medium underline underline-offset-4"
          style={{ color: "var(--section-accent, var(--accent))" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-min-name" className="form-label">
            Full name <span className="text-red-500">*</span>
          </label>
          <input id="cf-min-name" type="text" required value={fields.name} onChange={set("name")} placeholder="Jane Smith" className="form-input" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-min-email" className="form-label">
            Email address <span className="text-red-500">*</span>
          </label>
          <input id="cf-min-email" type="email" required value={fields.email} onChange={set("email")} placeholder="jane@company.com" className="form-input" />
        </div>
      </div>

      {showPhone && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-min-phone" className="form-label">
            Phone number <span className="text-red-500">*</span>
          </label>
          <input id="cf-min-phone" type="tel" required value={fields.phone} onChange={set("phone")} placeholder="+44 7700 900000" className="form-input" />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-min-message" className="form-label">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea id="cf-min-message" required rows={5} value={fields.message} onChange={set("message")} placeholder="Tell us how we can help…" className="form-input resize-none" />
      </div>

      {requireCaptcha && !isV3 && (
        <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />
      )}

      {state === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{errorMsg}</p>
      )}

      <button type="submit" disabled={state === "loading"} className="form-btn mt-2">
        {state === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
