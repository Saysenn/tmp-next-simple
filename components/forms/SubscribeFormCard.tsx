"use client";

import { useState, FormEvent } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

type FormState = "idle" | "loading" | "success" | "error";

export default function SubscribeFormCard() {
  const { showNameField, subscriberCount, requireCaptcha } = formsConfig.subscribeForm;
  const { isV3, setWidgetToken, getToken } = useCaptcha();

  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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
        body: JSON.stringify({ email, ...(showNameField ? { name } : {}), captchaToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setState("error");
      } else {
        setState("success");
        setEmail("");
        setName("");
        setWidgetToken(null);
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="form-success" style={{ minHeight: "260px" }}>
        <div className="form-success-icon">✓</div>
        <h3 className="text-xl font-semibold" style={{ color: "var(--section-heading, var(--text-heading))" }}>
          You&apos;re on the list!
        </h3>
        <p className="text-sm" style={{ color: "var(--section-muted, var(--text-muted))" }}>
          We&apos;ll send you an email the moment we launch. Stay tuned!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--section-accent, var(--accent))" }}>
          Coming soon
        </p>
        <h2 className="text-2xl font-bold leading-tight" style={{ color: "var(--section-heading, var(--text-heading))" }}>
          Be the first to know
        </h2>
        <p className="text-sm mt-2" style={{ color: "var(--section-muted, var(--text-muted))" }}>
          We&apos;re working on something exciting. Sign up to get early access and exclusive updates.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} />

        {showNameField && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sf-card-name" className="form-label">Your name</label>
            <input id="sf-card-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" className="form-input" />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="sf-card-email" className="form-label">Email address <span className="text-red-500">*</span></label>
          <input id="sf-card-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="form-input" />
        </div>

        {requireCaptcha && !isV3 && (
          <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />
        )}

        {state === "error" && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{errorMsg}</p>
        )}

        <button type="submit" disabled={state === "loading"} className="form-btn">
          {state === "loading" ? "Joining…" : "Notify me"}
        </button>
      </form>

      <p className="text-center text-xs" style={{ color: "var(--section-muted, var(--text-muted))" }}>
        {subscriberCount > 0 ? `${subscriberCount.toLocaleString()} people already signed up · ` : ""}
        No spam. Unsubscribe at any time.
      </p>
    </div>
  );
}
