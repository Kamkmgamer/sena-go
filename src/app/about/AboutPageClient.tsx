'use client';

import Image from 'next/image';
import { useI18n } from '../i18n';

export default function AboutPageClient() {
  const { t } = useI18n();
  return (
    <main className="page-container">
      <header className="mb-10 text-center">
        <h1 className="section-title">{t.about.title}</h1>
        <p className="section-subtitle mt-2">{t.about.subtitle}</p>
      </header>

      <section className="grid md:grid-cols-2 gap-8 items-start mb-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--primary)]">{t.about.story_title}</h2>
          <p style={{ color: 'var(--muted)' }}>{t.about.story_text}</p>
        </div>
        <div className="card overflow-hidden transition-transform hover:-translate-y-1">
          <Image
            src="https://placehold.co/800x500/png?text=Sana+Go"
            alt="Sana Go"
            width={800}
            height={500}
            className="w-full h-64 object-cover"
          />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="card p-6 transition-transform hover:-translate-y-1">
          <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">{t.about.mission_title}</h3>
          <p style={{ color: 'var(--muted)' }}>{t.about.mission_text}</p>
        </div>
        <div className="card p-6 transition-transform hover:-translate-y-1">
          <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">{t.about.vision_title}</h3>
          <p style={{ color: 'var(--muted)' }}>{t.about.vision_text}</p>
        </div>
      </section>

        <section className="card p-6 transition-transform hover:-translate-y-1 mb-12">
          <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">{t.about.values_title}</h3>
          <p style={{ color: 'var(--muted)' }}>{t.about.values_text}</p>
        </section>

      <section className="space-y-4">
        <h2 className="section-title">{t.about.team_title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Reem', role: t.about.founder_role },
            // Add more team members here
          ].map((m) => (
            <div key={m.name} className="card p-6 text-center transition-transform hover:-translate-y-1">
              <div
                className="mx-auto w-20 h-20 rounded-full mb-3"
                style={{ background: 'var(--card-border)' }}
              />
              <h4 className="font-semibold text-[var(--primary)]">{m.name}</h4>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                {m.role}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
