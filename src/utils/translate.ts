"use client";

export type LanguageCode = "EN" | "AR" | "UR";

export const SUPPORTED_LANGUAGES = [
  { code: "EN" as LanguageCode, label: "English", target: "en" },
  { code: "AR" as LanguageCode, label: "Arabic", target: "ar" },
  { code: "UR" as LanguageCode, label: "Urdu", target: "ur" },
];

export function getSavedLanguage(): LanguageCode {
  if (typeof window === "undefined") return "EN";

  const saved = localStorage.getItem("selected_language") as LanguageCode | null;
  if (saved && ["EN", "AR", "UR"].includes(saved)) {
    return saved;
  }

  // Check googtrans cookie: format is usually /en/ar or /auto/ar
  const match = document.cookie.match(/googtrans=\/[^/]+\/([a-zA-Z]+)/);
  if (match && match[1]) {
    const lang = match[1].toUpperCase();
    if (lang === "AR") return "AR";
    if (lang === "UR") return "UR";
    if (lang === "EN") return "EN";
  }

  return "EN";
}

export function setGoogleTranslateLanguage(langCode: LanguageCode) {
  if (typeof window === "undefined") return;

  const target = langCode === "EN" ? "en" : langCode === "AR" ? "ar" : "ur";
  localStorage.setItem("selected_language", langCode);

  const hostname = window.location.hostname;
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";

  // Clear existing translation cookies
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  if (!isLocalhost) {
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;
  }

  if (target === "en") {
    // Return to English (original)
    document.cookie = `googtrans=/en/en; path=/;`;
    if (!isLocalhost) {
      document.cookie = `googtrans=/en/en; path=/; domain=.${hostname};`;
    }
  } else {
    // Set target language
    document.cookie = `googtrans=/en/${target}; path=/;`;
    if (!isLocalhost) {
      document.cookie = `googtrans=/en/${target}; path=/; domain=.${hostname};`;
    }
  }

  // Trigger google translate select element if available
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (combo) {
    combo.value = target;
    combo.dispatchEvent(new Event("change"));
  } else {
    // If widget combo isn't yet in DOM or needs full cycle, reload to apply cookie
    window.location.reload();
  }

  // Dispatch custom event for UI updates
  window.dispatchEvent(
    new CustomEvent("languageChanged", {
      detail: { code: langCode, target },
    })
  );
}
