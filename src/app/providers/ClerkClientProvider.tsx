"use client";

import React from "react";

export default function ClerkClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // No-op wrapper; real ClerkProvider is used in app/layout.tsx
  return <>{children}</>;
}
