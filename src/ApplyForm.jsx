// src/ApplyForm.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Widget } from "@typeform/embed-react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Mail, Phone, MapPin } from "lucide-react";
import logo from "./assets/logo.png";

// ---- Background: Starfield & Meteors (copied from Site) ----
function Starfield({ count = 95, className = "" }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() < 0.18 ? 2 : 1,
        delay: (Math.random() * 8).toFixed(2) + "s",
        duration: (4.2 + Math.random() * 6.2).toFixed(2) + "s",
        dx: (Math.random() * 32 - 16).toFixed(1) + "px",
        dy: (Math.random() * 32 - 16).toFixed(1) + "px",
        drift: (10 + Math.random() * 8).toFixed(2) + "s",
      })),
    [count]
  );

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 z-0 ${className}`}>
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/80 dark:bg-white/90 shadow-[0_0_6px_rgba(255,255,255,.45)]"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.duration} ease-in-out ${s.delay} infinite alternate, drift ${s.drift} linear ${s.delay} infinite`,
            "--dx": s.dx,
            "--dy": s.dy,
          }}
        />
      ))}
    </div>
  );
}
function ShootingStars({ count = 7 }) {
  const trails = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: (Math.random() * 8).toFixed(2) + "s",
        dur: (1.2 + Math.random() * 1.6).toFixed(2) + "s",
        blur: (Math.random() * 1.4).toFixed(1),
        length: (8 + Math.random() * 20).toFixed(0),
        angle: (-(15 + Math.random() * 60)).toFixed(0) + "deg",
        dist: (110 + Math.random() * 40).toFixed(0) + "vw",
      })),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {trails.map((t, i) => (
        <span
          key={i}
          className="absolute block h-px will-change-transform"
          style={{
            top: `${t.top}%`,
            left: `${t.left}%`,
            width: `${t.length}vw`,
            filter: `blur(${t.blur}px)`,
            background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.95), rgba(255,255,255,0))",
            animation: `meteor ${t.dur} linear ${t.delay} infinite`,
            "--angle": t.angle,
            "--dist": t.dist,
          }}
        />
      ))}
    </div>
  );
}
function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-0">
      <Starfield count={95} />
      <ShootingStars count={7} />
    </div>
  );
}

// ---- Header (same look & behavior) ----
function Header({ brand, nav, lang, setLang, currency, setCurrency, dark, setDark, mobileOpen, setMobileOpen }) {
  return (
    <header className={`sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-950/60 border-b border-slate-200/60 dark:border-slate-800/60`}>
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-3 flex items-center justify-between">
        <a href="/" className="font-bold text-lg tracking-tight flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-5 w-auto" />
          {brand}
        </a>
        <nav className="hidden md:flex gap-6 text-sm">
          {nav.map((n) => (
            <a key={n.id} href={`/#${n.id}`} className="hover:opacity-80">
              {lang === "en" ? n.en : n.mn}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <button onClick={() => setLang((p) => (p === "en" ? "mn" : "en"))} className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs hover:bg-slate-50 dark:hover:bg-slate-900" aria-label="Toggle language">
            {lang.toUpperCase()}
          </button>
          <button onClick={() => setCurrency((p) => (p === "MNT" ? "USD" : "MNT"))} className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs hover:bg-slate-50 dark:hover:bg-slate-900" aria-label="Toggle currency">
            {currency}
          </button>

        </div>
        <button className="md:hidden rounded-xl border p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden border-t overflow-hidden">
            <div className="px-4 py-3 flex flex-col gap-3">
              {nav.map((n) => (
                <a key={n.id} href={`/#${n.id}`} onClick={() => setMobileOpen(false)} className="py-1">
                  {lang === "en" ? n.en : n.mn}
                </a>
              ))}
              <div className="flex items-center gap-2 pt-2">
                <button onClick={() => setLang((p) => (p === "en" ? "mn" : "en"))} className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs" aria-label="Toggle language">
                  {lang.toUpperCase()}
                </button>
                <button onClick={() => setCurrency((p) => (p === "MNT" ? "USD" : "MNT"))} className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs" aria-label="Toggle currency">
                  {currency}
                </button>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default function ApplyForm() {
  // local UI state to mirror your Site header
  const [lang, setLang] = useState("en");
  const [currency, setCurrency] = useState("MNT");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // persist dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const brand = "Scaledy";
  const nav = [
    { id: "work", en: "Work", mn: "Төслүүд" },
    { id: "services", en: "Services", mn: "Үйлчилгээ" },
    { id: "results", en: "Results", mn: "Үр дүн" },
    { id: "process", en: "Process", mn: "Процесс" },
    { id: "pricing", en: "Pricing", mn: "Үнэ" },
    { id: "contact", en: "Contact", mn: "Холбогдох" },
  ];

  return (
    <div>
      {/* Local keyframes used by your site */}
      <style>{`
        @keyframes twinkle { from { opacity: .25; transform: scale(.9) } to { opacity: .95; transform: scale(1) } }
        @keyframes drift { 0% { transform: translate(0,0) } 50% { transform: translate(var(--dx,8px), var(--dy,-8px)) } 100% { transform: translate(0,0) } }
        @keyframes meteor {
          0%   { transform: rotate(var(--angle)) translateX(-12vw); opacity: 0; }
          8%   { opacity: 1; }
          100% { transform: rotate(var(--angle)) translateX(var(--dist)); opacity: 0; }
        }
        @keyframes sheen { 0%{ transform: translateX(-120%)} 100%{ transform: translateX(120%)} }
      `}</style>

      <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 relative">
        <GlobalBackground />

        {/* Content wrapper */}
        <div className="relative z-10">
          <Header
            brand={brand}
            nav={nav}
            lang={lang}
            setLang={setLang}
            currency={currency}
            setCurrency={setCurrency}
            dark={dark}
            setDark={setDark}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />

          {/* Typeform content */}
          <main className="mx-auto max-w-5xl px-6 md:px-8 py-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {lang === "en" ? "Apply to work with us" : "Хамтран ажиллах хүсэлт"}
            </h1>

            <div className="rounded-2xl border bg-white/70 dark:bg-slate-900/40 backdrop-blur p-3 md:p-4">
              <div className="w-full h-[78vh]">
                <Widget
                  id="KbaFkFON"
                  style={{ width: "100%", height: "100%" }}
                  autoFocus
                  hidden={{ source: "website" }}
                  onSubmit={() => {
                    window.location.href = "/thanks";
                  }}
                />
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
              {lang === "en"
                ? "Having trouble loading the form? "
                : "Форм ачааллахгүй байна уу? "}
              <a className="underline" href="https://form.typeform.com/to/KbaFkFON" target="_blank" rel="noreferrer">
                Open it in a new tab
              </a>
              .
            </p>
          </main>

          {/* Footer (copied to match your Site) */}
          <footer className="border-t border-slate-200 dark:border-slate-800">
            <div className="mx-auto max-w-7xl px-6 md:px-8 py-10 text-sm flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="opacity-80">
                © {new Date().getFullYear()} {brand}. {lang === "en" ? "All rights reserved." : "Бүх эрх хуулиар хамгаалагдсан."}
              </div>
              <div className="flex items-center gap-6 md:gap-8 opacity-80">
                {nav.map((n) => (
                  <a key={n.id} href={`/#${n.id}`} className="hover:opacity-100">
                    {lang === "en" ? n.en : n.mn}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
