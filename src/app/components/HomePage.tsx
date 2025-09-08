'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { useI18n } from '../i18n';

export default function HomePage() {
  const { t } = useI18n();
  return (
    <main className="flex flex-col gap-24 page-container">
      {/* Hero */}
      <section className="relative overflow-hidden text-center">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[var(--accent)]/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-10 w-96 h-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />
        <div className="relative card px-6 py-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--primary)] fade-in-up">
            {t.home.hero_title}
          </h1>
          <p
            className="max-w-2xl mx-auto mt-4 fade-in-up text-[var(--muted)]"
            style={{ animationDelay: '.08s' } as CSSProperties}
          >
            {t.home.hero_sub}
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <motion.a href={t.route.destinations} className="btn btn-primary" whileTap={{ scale: 0.98 }}>
              {t.common.discover}
            </motion.a>
            <motion.a href={t.route.contact} className="btn btn-accent" whileTap={{ scale: 0.98 }}>
              {t.common.book_now}
            </motion.a>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="space-y-8">
        <h2 className="section-title">{t.home.featured}</h2>
        <p className="section-subtitle">{t.home.featured_sub}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.home.sample_destinations.map((dest: string, i: number) => (
            <motion.div
              key={dest}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.04 * i }}
              whileHover={{ y: -4 }}
              className="card overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={`https://placehold.co/600x380/png?text=${dest}`}
                  alt={dest}
                  width={600}
                  height={380}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1 text-[var(--primary)]">{dest}</h3>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  {/* description intentionally generic per locale */}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section className="space-y-8 card p-8">
        <h2 className="section-title">{t.home.services}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {t.home.services_list.map(({ title, icon }: { title: string; icon: string }, i: number) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.03 * i }}
              className="card p-6 flex flex-col items-center text-center gap-3"
              whileHover={{ y: -3 }}
            >
              <span className="text-3xl">{icon}</span>
              <h3 className="font-semibold text-[var(--primary)]">{title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="space-y-8">
        <h2 className="section-title">{t.home.testimonials}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <motion.div key={i} className="card p-6 text-sm space-y-3" whileHover={{ scale: 1.01 }}>
              <p>{t.home.review_text}</p>
              <span className="block text-right font-medium text-[var(--accent)]">{t.home.reviewer}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
