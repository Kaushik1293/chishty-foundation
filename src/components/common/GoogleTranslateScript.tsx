"use client";

import Script from "next/script";
import { useEffect } from "react";
import { getSavedLanguage, setGoogleTranslateLanguage } from "@/src/utils/translate";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function GoogleTranslateScript() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,ar,ur",
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout?.SIMPLE,
          },
          "google_translate_element"
        );

        // Apply saved language if not English
        const saved = getSavedLanguage();
        if (saved && saved !== "EN") {
          setTimeout(() => {
            const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
            if (combo && combo.value !== (saved === "AR" ? "ar" : "ur")) {
              combo.value = saved === "AR" ? "ar" : "ur";
              combo.dispatchEvent(new Event("change"));
            }
          }, 300);
        }
      }
    };
  }, []);

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }} aria-hidden="true" />
      <Script
        id="google-translate-script"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
