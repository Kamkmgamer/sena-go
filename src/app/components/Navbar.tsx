"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "../i18n";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useI18n();

  if (!t || !t.route) {
    // Avoid rendering until i18n is initialized on client
    return null;
  }

  const links: { href: string; label: string }[] = [
    { href: t.route.home, label: t.nav.home },
    { href: t.route.destinations, label: t.nav.destinations },
    { href: t.route.services, label: t.nav.services },
    { href: t.route.about, label: t.nav.about },
    { href: t.route.contact, label: t.nav.contact },
  ];

  return (
    <nav className="sticky top-0 w-full z-50" dir="ltr">
      <div className="nav-surface backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between text-[var(--foreground)]">
          {/* Logo */}
          <Link href={t.route.home} className="flex items-center gap-3 group" aria-label={t.nav.home}>
            <motion.div initial={{ rotate: -8, scale: 0.9 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
              {/* Light mode logo */}
              <Image
                src="/logo_light.png"
                alt={t.common.brand}
                width={36}
                height={36}
                priority
                className="h-9 w-9 float-slow logo-light"
              />
              {/* Dark mode logo */}
              <Image
                src="/logo_dark.png"
                alt={t.common.brand}
                width={36}
                height={36}
                priority
                className="h-9 w-9 float-slow logo-dark"
              />
            </motion.div>
            <span className="sr-only">{t.common.brand}</span>
          </Link>

          {/* Desktop links + controls */}
          <div className="hidden md:flex items-center gap-5 text-[15px] font-semibold">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={`link-underline ${pathname === href ? "text-[var(--primary)]" : "text-[var(--muted)] hover:text-[var(--primary)]"}`}
              >
                {label}
              </Link>
            ))}
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label={t.nav.toggle_menu}
            className="md:hidden p-2 rounded-lg hover:opacity-80 text-[var(--foreground)]"
            onClick={() => setOpen(!open)}
            title={t.nav.toggle_menu}
          >
            {/* Simple hamburger icon */}
            <span className="block w-6 h-0.5 bg-current mb-1"></span>
            <span className="block w-6 h-0.5 bg-current mb-1"></span>
            <span className="block w-6 h-0.5 bg-current"></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-[var(--card-bg)]/95 backdrop-blur border-t border-[var(--card-border)] text-[var(--foreground)]"
          >
            <ul className="flex flex-col py-4 px-6 gap-2 text-base font-medium">
              {links.map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-3 rounded-lg link-underline text-[var(--muted)] hover:text-[var(--primary)]"
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
              <li className="pt-2 flex items-center gap-3">
                <ThemeToggle />
                <LanguageSwitcher />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
