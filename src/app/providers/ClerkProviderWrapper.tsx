"use client";

import dynamic from "next/dynamic";
import React from "react";

const DynamicClerkClientProvider = dynamic(() => import("./ClerkClientProvider"), {
  ssr: false,
});

export default function ClerkProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DynamicClerkClientProvider>
      {children}
    </DynamicClerkClientProvider>
  );
}
