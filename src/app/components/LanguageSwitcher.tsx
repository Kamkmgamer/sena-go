"use client";

import { useI18n } from "../i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  const switchLocale = (l: "ar" | "en") => {
    setLocale(l);
    // Optional: redirect to home after switch to avoid RTL/LTR issues on current page
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      window.location.href = "/";
    }
  };

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => switchLocale("ar")}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
          locale === "ar"
            ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] lang-active"
            : "bg-transparent border border-[var(--primary)] text-[var(--muted)] hover:bg-[var(--primary-hover)] hover:text-white"
        }`}
      >
        عربي
      </button>
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
          locale === "en"
            ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] lang-active"
            : "bg-transparent border border-[var(--primary)] text-[var(--muted)] hover:bg-[var(--primary-hover)] hover:text-white"
        }`}
      >
        English
      </button>
    </div>
  );
}
