"use client";
import Link from "next/link";
import { useI18n } from "../i18n";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-16">
      <div className="backdrop-blur bg-[var(--footer-bg)] text-white/95">
        <div className="max-w-6xl mx-auto px-6 py-10 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h4 className="font-semibold text-white">{t.common.brand}</h4>
            <p className="text-sm text-white/80">{t.footer.tagline}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-white">{t.footer.links}</h4>
            <ul className="space-y-1 text-sm">
              <li><Link className="link-underline" href={t.route.home}>{t.nav.home}</Link></li>
              <li><Link className="link-underline" href={t.route.destinations}>{t.nav.destinations}</Link></li>
              <li><Link className="link-underline" href={t.route.services}>{t.nav.services}</Link></li>
              <li><Link className="link-underline" href={t.route.contact}>{t.nav.contact}</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-white">{t.footer.contact}</h4>
            <p className="text-sm">{t.footer.email}</p>
            <p className="text-sm">{t.footer.phone}</p>
            <div className="flex gap-4 text-sm pt-2">
              <a href="#" className="link-underline">{t.footer.facebook}</a>
              <a href="#" className="link-underline">{t.footer.instagram}</a>
              <a href="#" className="link-underline">{t.footer.twitter}</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20">
          <div className="max-w-6xl mx-auto px-6 py-4 text-xs text-white/80 text-center">
            {new Date().getFullYear()} {t.common.brand}. {t.footer.rights}
          </div>
        </div>
      </div>
    </footer>
  );
}
