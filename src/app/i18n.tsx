"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "ar" | "en";

const dictionaries = {
  ar: {
    common: {
      brand: "سنا جو",
      discover: "اكتشف الوجهات",
      book_now: "احجز رحلتك الآن",
    },
    nav: {
      home: "الرئيسية",
      destinations: "الوجهات",
      services: "الخدمات",
      about: "من نحن",
      contact: "تواصل معنا",
      toggle_menu: "فتح القائمة",
      sign_in: "تسجيل الدخول",
      sign_up: "إنشاء حساب",
    },
    home: {
      hero_title: "استكشف العالم مع سنا جو",
      hero_sub: "نوفر لك أفضل العروض والرحلات إلى أشهر الوجهات السياحية حول العالم بكل احترافية وراحة.",
      featured: "وجهات مميزة",
      featured_sub: "مختارات تلهم رحلتك القادمة.",
      services: "خدماتنا",
      testimonials: "آراء المسافرين",
      sample_destinations: ["باريس", "المالديف", "إسطنبول"],
      review_text: "\"رحلتي مع سنا جو كانت مذهلة، التنظيم كان رائعاً والخدمة ممتازة!\"",
      reviewer: "مسافر سعيد",
      services_list: [
        { title: "حجوزات الطيران", icon: "✈️" },
        { title: "الفنادق", icon: "🏨" },
        { title: "التأشيرات", icon: "🛂" },
        { title: "الجولات السياحية", icon: "🗺️" },
        { title: "الحزم الشاملة", icon: "🎒" },
        { title: "خدمة العملاء 24/7", icon: "📞" },
      ],
    },
    about: {
      title: "من نحن",
      subtitle: "وكالة سفر عربية تقدم حلول سفر مبتكرة وتجارب لا تُنسى.",
      story_title: "قصتنا",
      story_text: "تم تأسيس سنا جو بواسطة ريم بحماس كبير للسفر وخدمة المسافرين العرب. بدأت رحلتنا بهدف تبسيط تخطيط السفر وتقديم أفضل العروض على الرحلات الجوية والفنادق والجولات.",
      mission_title: "رسالتنا",
      mission_text: "تقديم خدمات سفر موثوقة ومريحة لكل مسافر عربي.",
      vision_title: "رؤيتنا",
      vision_text: "أن نكون الخيار الأول للسفر والسياحة في المنطقة.",
      values_title: "قيمنا",
      values_text: "الشفافية، الجودة، والاهتمام بالتفاصيل.",
      team_title: "فريقنا",
      founder_role: "المؤسسة والرئيس التنفيذي",
    },
    contact: {
      title: "تواصل معنا",
      subtitle: "يسعدنا التواصل معك و الرد على استفساراتك.",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      message: "رسالتك",
      send: "إرسال",
      location: "الرياض، المملكة العربية السعودية",
      whatsapp: "الدردشة عبر واتساب",
    },
    footer: {
      links: "روابط",
      contact: "تواصل",
      rights: "جميع الحقوق محفوظة.",
      tagline: "رحلات مميزة وتجارب لا تُنسى حول العالم.",
      facebook: "فيسبوك",
      instagram: "إنستغرام",
      twitter: "تويتر",
      email: "info@sanago.com",
      phone: "+201212895723",
    },
    route: {
      home: "/",
      destinations: "/destinations",
      services: "/services",
      about: "/about",
      contact: "/contact",
    },
  },
  en: {
    common: {
      brand: "Sana Go",
      discover: "Explore Destinations",
      book_now: "Book Now",
    },
    nav: {
      home: "Home",
      destinations: "Destinations",
      services: "Services",
      about: "About",
      contact: "Contact",
      toggle_menu: "Toggle Menu",
      sign_in: "Sign in",
      sign_up: "Sign up",
    },
    home: {
      hero_title: "Explore the world with Sana Go",
      hero_sub: "We bring you the best deals and trips to the most popular destinations around the world, with comfort and professionalism.",
      featured: "Featured Destinations",
      featured_sub: "Handpicked ideas for your next trip.",
      services: "Our Services",
      testimonials: "Traveler Reviews",
      sample_destinations: ["Paris", "Maldives", "Istanbul"],
      review_text: "\"My trip with Sana Go was amazing – great organization and excellent service!\"",
      reviewer: "Happy Traveler",
      services_list: [
        { title: "Flight Bookings", icon: "✈️" },
        { title: "Hotels", icon: "🏨" },
        { title: "Visas", icon: "🛂" },
        { title: "Tours", icon: "🗺️" },
        { title: "All-inclusive Packages", icon: "🎒" },
        { title: "24/7 Support", icon: "📞" },
      ],
    },
    about: {
      title: "About Us",
      subtitle: "An Arab travel agency providing innovative travel solutions and unforgettable experiences.",
      story_title: "Our Story",
      story_text: "Sana Go was founded by Reem with great passion for travel and serving Arab travelers. Our journey began with the goal of simplifying travel planning and offering the best deals on flights, hotels and tours.",
      mission_title: "Our Mission",
      mission_text: "Provide reliable and comfortable travel services for every Arab traveler.",
      vision_title: "Our Vision",
      vision_text: "To be the first choice for travel and tourism in the region.",
      values_title: "Our Values",
      values_text: "Transparency, quality, and attention to detail.",
      team_title: "Our Team",
      founder_role: "Founder & CEO",
    },
    contact: {
      title: "Contact Us",
      subtitle: "We'd love to hear from you and answer your inquiries.",
      name: "Name",
      email: "Email",
      phone: "Phone Number",
      message: "Your Message",
      send: "Send",
      location: "Riyadh, Saudi Arabia",
      whatsapp: "Chat on WhatsApp",
    },
    footer: {
      links: "Links",
      contact: "Contact",
      rights: "All rights reserved.",
      tagline: "Exceptional trips and unforgettable experiences worldwide.",
      facebook: "Facebook",
      instagram: "Instagram",
      twitter: "Twitter",
      email: "info@sanago.com",
      phone: "+20 1212 895 723",
    },
    route: {
      home: "/",
      destinations: "/destinations",
      services: "/services",
      about: "/about",
      contact: "/contact",
    },
  },
};

const DEFAULT_LOCALE: Locale = "ar";

const I18nContext = createContext<{
  locale: Locale;
  dir: "rtl" | "ltr";
  t: typeof dictionaries["ar"] | typeof dictionaries["en"];
  setLocale: (l: Locale) => void;
}>({
  locale: DEFAULT_LOCALE,
  dir: "rtl",
  t: dictionaries[DEFAULT_LOCALE],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("locale") : null;
    const saved = raw === "ar" || raw === "en" ? (raw as Locale) : DEFAULT_LOCALE;
    setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("locale", l);
    } catch {}
  };

  const dir: "rtl" | "ltr" = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = dir;
    }
  }, [locale, dir]);

  const value = useMemo(() => {
    const dict = dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
    return {
      locale,
      dir,
      t: dict,
      setLocale,
    };
  }, [locale, dir]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
