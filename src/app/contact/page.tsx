'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { useI18n } from '../i18n';

export const metadata: Metadata = {
  title: 'Contact Us | Sana Go',
  description: 'Get in touch with Sana Go via the form or WhatsApp. Our location and contact information.',
};

export default function ContactPage() {
  const { t } = useI18n();
  return (
    <main className="page-container">
      <header className="mb-10 text-center">
        <h1 className="section-title">{t.contact.title}</h1>
        <p className="section-subtitle mt-2">{t.contact.subtitle}</p>
      </header>

      <section className="grid md:grid-cols-2 gap-8 items-start">
        {/* Contact form (no backend) */}
        <form className="card p-6 grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm">{t.contact.name}</label>
              <input className="" placeholder={t.contact.name} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">{t.contact.email}</label>
              <input type="email" className="" placeholder="email@example.com" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">{t.contact.phone}</label>
            <input className="" placeholder="01xxxxxxxx" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">{t.contact.message}</label>
            <textarea className="" rows={5} placeholder="اكتب رسالتك هنا..."></textarea>
          </div>
          <button type="button" className="btn btn-accent w-fit active:scale-95 transition-transform">
            {t.contact.send}
          </button>
        </form>

        {/* Map / office */}
        <div className="space-y-4">
          <div
            className="h-64 rounded-xl flex items-center justify-center card"
            style={{ color: 'var(--muted)' }}
          >
            Location Map (Placeholder)
          </div>
          <div className="card p-6 text-sm transition-transform hover:-translate-y-1">
            <h3 className="text-[var(--primary)] font-semibold mb-2">Contact Information</h3>
            <p>{t.contact.location}</p>
            <p>Email: info@sanago.com</p>
            <p>Phone: +20 1212 895 723</p>
            <Link href="https://wa.me/+201212895723" className="inline-block mt-3 btn btn-ghost">
              {t.contact.whatsapp}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
