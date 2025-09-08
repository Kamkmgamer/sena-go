"use client";

import React from "react";
import dynamic from "next/dynamic";
import { I18nProvider } from "../i18n";
import { TRPCReactProvider } from "~/trpc/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const DynamicClerkProvider = dynamic(async () => {
    const mod = await import("@clerk/nextjs");
    return (mod.ClerkProvider as unknown) as React.ComponentType<{
      children: React.ReactNode;
    }>;
  }, { ssr: false });

  return (
    <DynamicClerkProvider>
      <I18nProvider>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </I18nProvider>
    </DynamicClerkProvider>
  );
}
