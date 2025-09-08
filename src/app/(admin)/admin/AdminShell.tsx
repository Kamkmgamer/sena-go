"use client";

import { useEffect, useMemo, useRef, useState, type PropsWithChildren } from "react";
import AdminNav from "./AdminNav";

const MIN_W = 220;
const MAX_W = 420;
const KEY = "adminSidebarWidth";

export default function AdminShell({ children }: PropsWithChildren) {
  const [sidebarW, setSidebarW] = useState<number>(280);
  const [mobileOpen, setMobileOpen] = useState(false);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startWRef = useRef(0);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? Number(localStorage.getItem(KEY)) : 0;
    if (saved && !Number.isNaN(saved)) setSidebarW(Math.min(MAX_W, Math.max(MIN_W, saved)));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, String(sidebarW));
  }, [sidebarW]);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!draggingRef.current) return;
      const delta = startXRef.current - e.clientX; // handle sits on left edge of sidebar (RTL side)
      const next = Math.min(MAX_W, Math.max(MIN_W, startWRef.current + delta));
      setSidebarW(next);
    }
    function onUp() {
      draggingRef.current = false;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    startXRef.current = e.clientX;
    startWRef.current = sidebarW;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
  };

  const gridStyle = useMemo(() => ({ gridTemplateColumns: `1fr ${sidebarW}px` }), [sidebarW]);

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      {/* Mobile header with hamburger */}
      <div className="md:hidden sticky top-0 z-30 admin-sidebar border-b px-3 py-2 flex items-center justify-between">
        <button
          type="button"
          aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="btn btn-ghost px-3 py-2 rounded-lg"
        >
          {/* Hamburger icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="text-base font-semibold">لوحة التحكم</div>
        {/* Spacer to balance flex in RTL */}
        <div className="w-[40px]" />
      </div>
      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden admin-sidebar border-b px-3 pb-3 ${mobileOpen ? "block" : "hidden"}`}
      >
        <AdminNav variant="vertical" />
      </div>
      {/* Desktop grid with resizable sidebar on the right (RTL) */}
      <div className="hidden md:grid" style={gridStyle}>
        <main className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
        <aside className="admin-sidebar border-s p-4 space-y-4 sticky top-0 h-screen relative">
          <div className="text-xl font-semibold">لوحة التحكم</div>
          <AdminNav />
          {/* Drag handle at the left edge of the sidebar */}
          <div
            onMouseDown={startDrag}
            role="separator"
            aria-orientation="vertical"
            aria-label="تغيير حجم الشريط الجانبي"
            className="absolute start-0 top-0 h-full w-1 cursor-col-resize hover:bg-[var(--card-border)] active:bg-[var(--card-border)]"
          />
        </aside>
      </div>
    </div>
  );
}
