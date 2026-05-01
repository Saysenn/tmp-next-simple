// Batch 1 — SubscribeFormInline (horizontal: email input + button in one row)
"use client";

import { useState, FormEvent } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

type FormState = "idle" | "loading" | "success" | "error";

export default function SubscribeFormInline() {
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
      <div className="py-4 text-center">
        <p className="font-semibold text-lg" style={{ color: "var(--section-accent, var(--accent))" }}>
          You&apos;re on the list!
        </p>
        <p className="text-sm mt-1" style={{ color: "var(--section-muted, var(--text-muted))" }}>
          We&apos;ll notify you as soon as we launch.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} noValidate>
        <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} />
        <div className="flex flex-col sm:flex-row gap-3">
          {showNameField && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="form-input flex-1 min-w-0"
            />
          )}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="form-input flex-1 min-w-0"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="form-btn shrink-0 sm:w-auto whitespace-nowrap"
            style={{ width: "auto", padding: "0.75rem 1.5rem" }}
          >
            {state === "loading" ? "Joining…" : "Get early access"}
          </button>
        </div>
      </form>

      {requireCaptcha && !isV3 && (
        <div className="mt-3">
          <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />
        </div>
      )}

      {state === "error" && (
        <p className="mt-3 text-sm text-red-500">{errorMsg}</p>
      )}

    </div>
  );
}
