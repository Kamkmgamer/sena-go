"use client";

import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SiteChrome({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    // Do not render site navigation chrome for admin area
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
