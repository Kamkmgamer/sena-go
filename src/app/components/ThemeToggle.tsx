"use client";

import { useEffect, useState } from "react";

function getPreferredTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  return mq.matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getPreferredTheme();
    setTheme(initial);
    const root = document.documentElement;
    root.classList.toggle("dark", initial === "dark");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const label = theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={toggle}
      className="btn btn-ghost px-3 py-2 rounded-xl text-sm"
    >
      {theme === "dark" ? (
        // Sun icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm10 7h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM3 12H2a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2Zm15.657 7.071-0.707-0.707a1 1 0 0 1 1.414-1.414l0.707 0.707a1 1 0 0 1-1.414 1.414ZM5.636 6.343 4.93 5.636A1 1 0 0 1 6.343 4.22l0.707 0.707A1 1 0 1 1 5.636 6.343Zm12.728-2.122-0.707 0.707A1 1 0 0 1 16.243 3.514l0.707-0.707A1 1 0 0 1 18.364 4.22ZM6.343 19.778l-0.707 0.707A1 1 0 0 1 4.22 19.07l0.707-0.707A1 1 0 0 1 6.343 19.778Z"/>
        </svg>
      ) : (
        // Moon icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z"/>
        </svg>
      )}
      <span className="sr-only">{label}</span>
    </button>
  );
}
