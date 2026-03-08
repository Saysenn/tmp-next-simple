"use client";

import { useState, useEffect, useCallback } from "react";

export type ConsentValue = "accepted" | "declined" | null;

const STORAGE_KEY = "cookie-consent";

function readConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === "accepted" || raw === "declined") return raw;
  return null;
}

function writeConsent(value: ConsentValue) {
  if (typeof window === "undefined") return;
  if (value === null) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, value);
  }
}

export function useCookieConsent() {
  // Start null (unknown) — resolved after mount to avoid SSR hydration mismatch
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setMounted(true);
  }, []);

  const accept = useCallback(() => {
    writeConsent("accepted");
    setConsent("accepted");
  }, []);

  const decline = useCallback(() => {
    writeConsent("declined");
    setConsent("declined");
  }, []);

  /** Clear stored consent — banner will reappear on next render */
  const reset = useCallback(() => {
    writeConsent(null);
    setConsent(null);
  }, []);

  return { consent, accept, decline, reset, mounted };
}
