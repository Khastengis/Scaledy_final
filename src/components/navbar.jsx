import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";

// expects you already have these in your project:
/// import { Container } from "./Container";
/// import useScrollShadow from "./useScrollShadow";
/// import logo from "./assets/logo.png";

export default function Navbar({
  brand = "Scaledy",
  nav = [],
  lang,
  setLang,
  currency,
  setCurrency,
  dark,
  setDark,
}) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollShadow?.() ?? false;

  return (
    <div className="sticky top-0 z-40">
      <div
        className={`backdrop-blur supports-[backdrop-filter]:bg-black/40 ${
          scrolled ? "shadow-[0_1px_0_0_rgba(255,255,255,0.08)]" : ""
        }`}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <a href="#home" className="group inline-flex items-center gap-2">
              {/* If you prefer image logo, uncomment the next line and remove the gradient box */}
              {/* <img src={logo} alt={`${brand} logo`} className="h-5 w-auto" /> */}
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-400 p-[1px]">
                <div className="grid h-full w-full place-items-center rounded-[0.6rem] bg-black">
                  <Sparkles className="h-4 w-4 opacity-90" />
                </div>
              </div>
              <span className="text-sm font-semibold tracking-wide text-white/90 group-hover:text-white">
                {brand}
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {nav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm text-white/70 hover:text-white transition-colors duration-500"
                >
                  {lang === "en" ? item.en : item.mn}
                </a>
              ))}
            </nav>

            {/* Desktop actions: language/currency/theme + CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setLang?.((p) => (p === "en" ? "mn" : "en"))}
                className="text-xs rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle language"
                title="Toggle language"
              >
                {lang?.toUpperCase?.() ?? "EN"}
              </button>
              <button
                onClick={() => setCurrency?.((p) => (p === "MNT" ? "USD" : "MNT"))}
                className="text-xs rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle currency"
                title="Toggle currency"
              >
                {currency ?? "MNT"}
              </button>
              <button
                onClick={() => setDark?.((d) => !d)}
                className="text-xs rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                {dark ? "☀️" : "🌙"}
              </button>

              {/* Optional contact link, you can remove if not needed */}
              <a
                href="#contact"
                className="ml-1 text-sm text-white/70 hover:text-white transition-colors duration-500"
              >
                {lang === "en" ? "Contact" : "Холбогдох"}
              </a>

              <a
                href="#cta"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-2 text-sm font-medium text-black transition-all duration-500 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
              >
                {lang === "en" ? "Get Proposal" : "Саналаа авах"}
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Mobile trigger */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", stiffness: 220, damping: 30 }}
              className="fixed right-0 top-0 z-50 h-full w-80 border-l border-white/10 bg-neutral-950 p-6"
              aria-label="Mobile menu"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-white/90">
                  {lang === "en" ? "Menu" : "Цэс"}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Language/Currency/Theme toggles (mobile) */}
              <div className="mb-4 flex items-center gap-2">
                <button
                  onClick={() => setLang?.((p) => (p === "en" ? "mn" : "en"))}
                  className="text-xs rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 hover:text-white"
                  aria-label="Toggle language"
                >
                  {lang?.toUpperCase?.() ?? "EN"}
                </button>
                <button
                  onClick={() => setCurrency?.((p) => (p === "MNT" ? "USD" : "MNT"))}
                  className="text-xs rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 hover:text-white"
                  aria-label="Toggle currency"
                >
                  {currency ?? "MNT"}
                </button>
                <button
                  onClick={() => setDark?.((d) => !d)}
                  className="text-xs rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 hover:text-white"
                  aria-label="Toggle theme"
                >
                  {dark ? "☀️" : "🌙"}
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-3">
                {nav.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2 py-2 text-sm text-white/80 transition-all duration-500 hover:bg-white/5 hover:text-white"
                  >
                    {lang === "en" ? item.en : item.mn}
                  </a>
                ))}

                {/* Contact & CTA */}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2 text-sm text-white/80 transition-all duration-500 hover:bg-white/5 hover:text-white"
                >
                  {lang === "en" ? "Contact" : "Холбогдох"}
                </a>

                <a
                  href="#cta"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-2 text-sm font-medium text-black transition-all duration-500 hover:shadow-xl"
                >
                  {lang === "en" ? "Get Proposal" : "Саналаа авах"}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
