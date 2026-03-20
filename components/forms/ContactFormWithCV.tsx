"use client";

import { useState, FormEvent, useRef } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

type FormState = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100";

export default function ContactFormWithCV() {
  const { showPhone, requireCaptcha, maxFileSizeMb, allowedFileTypes } =
    formsConfig.contactCVForm;
  const { isV3, setWidgetToken, getToken } = useCaptcha();

  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  function set(field: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function validateFile(file: File): string | null {
    const maxBytes = maxFileSizeMb * 1024 * 1024;
    if (file.size > maxBytes) return `File must be under ${maxFileSizeMb}MB.`;
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!allowedFileTypes.includes(ext as "pdf" | "doc" | "docx"))
      return `Accepted formats: ${allowedFileTypes.join(", ").toUpperCase()}.`;
    return null;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setCvError("");
    if (!file) { setCvFile(null); return; }
    const err = validateFile(file);
    if (err) {
      setCvError(err);
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setCvFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    if (!file) return;
    setCvError("");
    const err = validateFile(file);
    if (err) { setCvError(err); return; }
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
      captchaToken = await getToken("contact_cv_form");
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
      body.append("message", fields.message);
      if (captchaToken) body.append("captchaToken", captchaToken);
      if (cvFile) body.append("cv", cvFile);
      body.append("website", ""); // honeypot

      const res = await fetch("/api/v1/contact-cv", { method: "POST", body });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setState("error");
      } else {
        setState("success");
        setFields({ name: "", email: "", phone: "", message: "" });
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
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Message sent!</h3>
        <p className="text-gray-500 text-sm">We&apos;ll get back to you as soon as possible.</p>
        <button onClick={() => setState("idle")} className="mt-2 text-sm text-indigo-600 hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  const acceptAttr = allowedFileTypes.map((t) => `.${t}`).join(",");

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Honeypot */}
      <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} />

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ccv-name" className="text-sm font-medium text-gray-700">
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            id="ccv-name"
            type="text"
            required
            value={fields.name}
            onChange={set("name")}
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ccv-email" className="text-sm font-medium text-gray-700">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            id="ccv-email"
            type="email"
            required
            value={fields.email}
            onChange={set("email")}
            placeholder="jane@company.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Phone */}
      {showPhone && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ccv-phone" className="text-sm font-medium text-gray-700">
            Phone number <span className="text-red-500">*</span>
          </label>
          <input
            id="ccv-phone"
            type="tel"
            required
            value={fields.phone}
            onChange={set("phone")}
            placeholder="020 1234 5678"
            className={inputClass}
          />
        </div>
      )}

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="ccv-message" className="text-sm font-medium text-gray-700">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="ccv-message"
          rows={5}
          required
          value={fields.message}
          onChange={set("message")}
          placeholder="Tell us how we can help."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* CV upload */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Attach your CV{" "}
          <span className="text-gray-400 font-normal">
            (optional, {allowedFileTypes.join(", ").toUpperCase()} or DOC, max {maxFileSizeMb} MB)
          </span>
        </label>

        {!cvFile ? (
          <label
            htmlFor="ccv-cv"
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center cursor-pointer transition ${
              isDragOver
                ? "border-indigo-400 bg-indigo-50"
                : "border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/40"
            }`}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="text-sm text-gray-600">
              Click to upload or drag and drop
            </span>
            <span className="text-xs text-gray-400">
              {allowedFileTypes.join(", ").toUpperCase()} up to {maxFileSizeMb} MB
            </span>
            <input
              id="ccv-cv"
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500 shrink-0">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="text-sm font-medium text-indigo-700 truncate">{cvFile.name}</span>
              <span className="text-xs text-indigo-400 shrink-0">
                {(cvFile.size / 1024 / 1024).toFixed(1)} MB
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

        {cvError && <p className="text-xs text-red-500 mt-1">{cvError}</p>}
      </div>

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
        {state === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
