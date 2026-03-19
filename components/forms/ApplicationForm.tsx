"use client";

import { useState, FormEvent, useRef } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

type FormState = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100";

export default function ApplicationForm() {
  const { showPhone, showPosition, showCoverLetter, requireCaptcha, maxFileSizeMb, allowedFileTypes } =
    formsConfig.applicationForm;
  const { isV3, setWidgetToken, getToken } = useCaptcha();

  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    coverLetter: "",
  });

  function set(field: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setCvError("");

    if (!file) {
      setCvFile(null);
      return;
    }

    const maxBytes = maxFileSizeMb * 1024 * 1024;
    if (file.size > maxBytes) {
      setCvError(`File must be under ${maxFileSizeMb}MB.`);
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!allowedFileTypes.includes(ext as "pdf" | "doc" | "docx")) {
      setCvError(`Accepted formats: ${allowedFileTypes.join(", ").toUpperCase()}.`);
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setCvFile(file);
  }

  function removeFile() {
    setCvFile(null);
    setCvError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (cvError) return;

    setState("loading");
    setErrorMsg("");

    let captchaToken: string | null = null;
    if (requireCaptcha) {
      captchaToken = await getToken("application_form");
      if (!captchaToken) {
        setErrorMsg("Please complete the CAPTCHA before submitting.");
        setState("error");
        return;
      }
    }

    try {
      const body = new FormData();
      body.append("name", fields.name);
      body.append("email", fields.email);
      if (showPhone) body.append("phone", fields.phone);
      if (showPosition) body.append("position", fields.position);
      if (showCoverLetter) body.append("coverLetter", fields.coverLetter);
      if (captchaToken) body.append("captchaToken", captchaToken);
      if (cvFile) body.append("cv", cvFile);
      // Honeypot
      body.append("website", "");

      const res = await fetch("/api/v1/apply", { method: "POST", body });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setState("error");
      } else {
        setState("success");
        setFields({ name: "", email: "", phone: "", position: "", coverLetter: "" });
        setCvFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setWidgetToken(null);
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[340px] text-center gap-4 px-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">✓</div>
        <h3 className="text-xl font-semibold text-gray-900">Application submitted!</h3>
        <p className="text-gray-500 max-w-xs">
          Thank you for applying. We&apos;ll be in touch shortly.
        </p>
        <button onClick={() => setState("idle")} className="mt-2 text-sm text-indigo-600 hover:underline">
          Submit another application
        </button>
      </div>
    );
  }

  const acceptAttr = allowedFileTypes.map((t) => `.${t}`).join(",");

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Honeypot — hidden from real users */}
      <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="af-name" className="text-sm font-medium text-gray-700">
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            id="af-name"
            type="text"
            required
            value={fields.name}
            onChange={set("name")}
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="af-email" className="text-sm font-medium text-gray-700">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            id="af-email"
            type="email"
            required
            value={fields.email}
            onChange={set("email")}
            placeholder="jane@company.com"
            className={inputClass}
          />
        </div>
      </div>

      {(showPhone || showPosition) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {showPhone && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="af-phone" className="text-sm font-medium text-gray-700">
                Phone number <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="af-phone"
                type="tel"
                value={fields.phone}
                onChange={set("phone")}
                placeholder="+44 7700 900000"
                className={inputClass}
              />
            </div>
          )}

          {showPosition && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="af-position" className="text-sm font-medium text-gray-700">
                Position applied for <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="af-position"
                type="text"
                value={fields.position}
                onChange={set("position")}
                placeholder="e.g. Senior Designer"
                className={inputClass}
              />
            </div>
          )}
        </div>
      )}

      {/* CV upload */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          CV / Résumé <span className="text-gray-400 font-normal">(optional)</span>
        </label>

        {!cvFile ? (
          <label
            htmlFor="af-cv"
            className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-8 text-center cursor-pointer transition hover:border-indigo-300 hover:bg-indigo-50/40"
          >
            <span className="text-2xl">📄</span>
            <span className="text-sm text-gray-600">
              Drag & drop or <span className="text-indigo-600 font-medium">browse</span>
            </span>
            <span className="text-xs text-gray-400">
              {allowedFileTypes.join(", ").toUpperCase()} · Max {maxFileSizeMb}MB
            </span>
            <input
              id="af-cv"
              ref={fileInputRef}
              type="file"
              accept={acceptAttr}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        ) : (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-lg">📎</span>
              <span className="text-sm font-medium text-indigo-700 truncate">{cvFile.name}</span>
              <span className="text-xs text-indigo-400 shrink-0">
                {(cvFile.size / 1024 / 1024).toFixed(1)}MB
              </span>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="shrink-0 text-xs text-gray-400 hover:text-red-500 transition"
              aria-label="Remove file"
            >
              ✕ Remove
            </button>
          </div>
        )}

        {cvError && (
          <p className="text-xs text-red-500 mt-1">{cvError}</p>
        )}
      </div>

      {showCoverLetter && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="af-cover" className="text-sm font-medium text-gray-700">
            Cover letter <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="af-cover"
            rows={5}
            value={fields.coverLetter}
            onChange={set("coverLetter")}
            placeholder="Tell us why you'd be a great fit…"
            className={`${inputClass} resize-none`}
          />
        </div>
      )}

      {requireCaptcha && !isV3 && (
        <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />
      )}

      {state === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={state === "loading" || !!cvError}
        className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "loading" ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
