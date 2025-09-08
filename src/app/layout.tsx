import "~/styles/globals.css";

import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { I18nProvider } from "./i18n";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "سنا جو | أفضل وكالة للسفر والسياحة",
  description: "اكتشف أجمل الوجهات السياحية واحجز رحلتك مع سنا جو بسهولة وأمان.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={`${cairo.variable} antialiased`}>
      <body>
        {/* Set initial theme before React hydration to avoid FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var s=localStorage.getItem('theme');var d=s? s==='dark' : window.matchMedia('(prefers-color-scheme: dark)').matches; if(d){document.documentElement.classList.add('dark');}}catch(e){}})();",
          }}
        />
        <I18nProvider>
          <TRPCReactProvider>
            <Navbar />
            {children}
            <Footer />
          </TRPCReactProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
