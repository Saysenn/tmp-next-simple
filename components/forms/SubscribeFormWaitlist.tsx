"use client";

import { useState, FormEvent } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

type FormState = "idle" | "loading" | "success" | "error";

const benefits = [
  "Exclusive early access before public launch",
  "Founding member pricing — locked in forever",
  "Direct line to the team to shape the product",
];

export default function SubscribeFormWaitlist() {
  const { showNameField, showRoleField, subscriberCount, roleOptions, requireCaptcha } = formsConfig.subscribeForm;
  const { isV3, setWidgetToken, getToken } = useCaptcha();

  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    let captchaToken: string | null = null;
    if (requireCaptcha) {
      captchaToken = await getToken("subscribe_form");
      if (!captchaToken) {
        setErrorMsg("Please complete the CAPTCHA before submitting.");
        setState("error");
        return;
      }
    }

    try {
      const res = await fetch("/api/v1/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...(showNameField ? { name } : {}), ...(showRoleField && role ? { role } : {}), captchaToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setState("error");
      } else {
        setState("success");
        setEmail(""); setName(""); setRole("");
        setWidgetToken(null);
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="form-success" style={{ minHeight: "400px" }}>
        <div className="form-success-icon" style={{ width: "5rem", height: "5rem", fontSize: "2rem" }}>🎉</div>
        <div>
          <h3 className="text-2xl font-bold" style={{ color: "var(--section-heading, var(--text-heading))" }}>
            You&apos;re on the waitlist!
          </h3>
          <p className="mt-2 text-sm" style={{ color: "var(--section-muted, var(--text-muted))" }}>
            We&apos;ll be in touch soon. Share with friends to move up the list.
          </p>
        </div>
        <ul className="flex flex-col gap-2 text-sm text-left">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2" style={{ color: "var(--section-body, var(--text-body))" }}>
              <span style={{ color: "var(--section-accent, var(--accent))" }} className="mt-0.5">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      {/* Heading */}
      <div className="text-center max-w-xl">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--section-accent, var(--accent))" }}>
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "var(--section-accent, var(--accent))", opacity: 0.4 }} />
          Limited early access
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "var(--section-accent, var(--accent))", opacity: 0.4 }} />
        </span>
        <h2 className="text-4xl font-extrabold leading-tight" style={{ color: "var(--section-heading, var(--text-heading))" }}>
          Join the waitlist
        </h2>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--section-muted, var(--text-muted))" }}>
          We&apos;re building something new. Be among the first to experience it and help shape what it becomes.
        </p>
      </div>

      {/* Social proof */}
      {subscriberCount > 0 && (
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {["A", "B", "C", "D"].map((letter, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: i % 2 === 0 ? "var(--accent)" : "var(--accent-muted)",
                  borderColor: "var(--section-bg, var(--bg-base))",
                  color: "var(--bg-pure)",
                }}
              >
                {letter}
              </div>
            ))}
          </div>
          <p className="text-sm" style={{ color: "var(--section-body, var(--text-body))" }}>
            <span className="font-semibold" style={{ color: "var(--section-heading, var(--text-heading))" }}>
              {subscriberCount.toLocaleString()}+
            </span>{" "}
            people already signed up
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4" noValidate>
        <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} />

        {showNameField && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sf-wl-name" className="form-label">Full name</label>
            <input id="sf-wl-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" className="form-input" />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="sf-wl-email" className="form-label">Email address <span className="text-red-500">*</span></label>
          <input id="sf-wl-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="form-input" />
        </div>

        {showRoleField && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sf-wl-role" className="form-label">I am a…</label>
            <select id="sf-wl-role" value={role} onChange={(e) => setRole(e.target.value)} className="form-input appearance-none">
              <option value="">Select your role (optional)</option>
              {roleOptions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        )}

        {requireCaptcha && !isV3 && (
          <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />
        )}

        {state === "error" && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{errorMsg}</p>
        )}

        <button type="submit" disabled={state === "loading"} className="form-btn" style={{ padding: "1rem 1.5rem" }}>
          {state === "loading" ? "Joining waitlist…" : "Reserve my spot →"}
        </button>
      </form>

      {/* Benefits */}
      <ul className="flex flex-col sm:flex-row gap-4 text-xs">
        {benefits.map((b) => (
          <li key={b} className="flex items-center gap-1.5" style={{ color: "var(--section-muted, var(--text-muted))" }}>
            <span style={{ color: "var(--section-accent, var(--accent))" }}>✓</span>
            {b}
          </li>
        ))}
      </ul>

      <p className="text-xs" style={{ color: "var(--section-muted, var(--text-muted))" }}>
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
