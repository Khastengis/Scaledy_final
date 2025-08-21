import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
  Check,
  Sparkles,
} from "lucide-react";
import logo from "./assets/logo.png";

// --------------------------- Motion helpers ---------------------------
const ease = [0.16, 1, 0.3, 1];
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

// --------------------------- Container ---------------------------
function Container({ children, className = "" }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

// --------------------------- Navbar ---------------------------
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#services", label: "Services" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-6" />
          <span className="text-white font-semibold">Scaledy</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-white/70 hover:text-white">
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:-translate-y-0.5 transition"
          >
            Get Proposal <ArrowRight className="h-4 w-4" />
          </a>
        </nav>

        <button
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10"
        >
          <Menu className="h-5 w-5 text-white" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.aside
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-72 bg-neutral-900 p-6 z-50"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-white font-semibold">Menu</span>
                <button onClick={() => setOpen(false)}>
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-white/80 hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#cta"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black"
                  onClick={() => setOpen(false)}
                >
                  Get Proposal <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}

// --------------------------- Hero ---------------------------
function Hero() {
  return (
    <section className="relative py-24 overflow-hidden">
      <Container className="text-center">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <Sparkles className="h-3.5 w-3.5" /> Omni‑channel growth
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl"
          >
            Scale ads. Grow revenue.
          </motion.h1>
          <motion.p variants={fadeIn} className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            We help brands unlock compounding growth with creative, paid media, and clear analytics.
          </motion.p>
          <motion.div variants={fadeIn} className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#cta"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black hover:-translate-y-0.5 transition"
            >
              Book a call <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm text-white/80 hover:text-white"
            >
              Our Services
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// --------------------------- Features ---------------------------
function Features() {
  const items = [
    { title: "Omni‑channel Media", desc: "Meta, Google, and YouTube under one plan." },
    { title: "Creative That Converts", desc: "Systematic testing to find winners fast." },
    { title: "Tracking & Attribution", desc: "Pixel, GA4, CAPI, deduped reporting." },
  ];
  return (
    <section id="services" className="py-20 border-t border-white/10">
      <Container className="grid gap-8 md:grid-cols-3">
        {items.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
          >
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-white/70">{item.desc}</p>
          </motion.div>
        ))}
      </Container>
    </section>
  );
}

// --------------------------- Pricing ---------------------------
function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "₮1.5M/mo",
      features: ["Pixel + GA4", "2 creatives/wk", "Weekly KPI"],
    },
    {
      name: "Growth",
      price: "₮3.9M/mo",
      features: ["CAPI via GTM", "Creative testing", "CRM automations"],
    },
  ];

  return (
    <section id="pricing" className="py-20 border-t border-white/10">
      <Container className="grid gap-8 md:grid-cols-2">
        {tiers.map((t) => (
          <motion.div
            key={t.name}
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
          >
            <h3 className="text-lg font-semibold text-white">{t.name}</h3>
            <p className="mt-2 text-2xl font-bold text-white">{t.price}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2 items-center">
                  <Check className="h-4 w-4" /> {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </Container>
    </section>
  );
}

// --------------------------- FAQ ---------------------------
function FAQ() {
  const items = [
    { q: "Do you take a rev share?", a: "No. We bill a flat retainer." },
    { q: "How fast is onboarding?", a: "Most stacks are live within 10 business days." },
  ];
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="py-20 border-t border-white/10">
      <Container>
        <h2 className="text-center text-3xl font-semibold text-white">FAQ</h2>
        <div className="mt-8 divide-y divide-white/10">
          {items.map((it) => (
            <div key={it.q} className="py-4">
              <button
                onClick={() => setOpen(open === it.q ? null : it.q)}
                className="w-full flex justify-between text-left text-white"
              >
                {it.q}
                <ArrowRight className={`h-4 w-4 transition-transform ${open === it.q ? "rotate-90" : ""}`} />
              </button>
              <AnimatePresence>
                {open === it.q && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-sm text-white/70"
                  >
                    {it.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// --------------------------- CTA ---------------------------
function CTA() {
  return (
    <section id="cta" className="py-20 border-t border-white/10">
      <Container className="text-center">
        <h3 className="text-2xl font-semibold text-white">Ready to scale?</h3>
        <p className="mt-2 text-white/70">Book a strategy call and unlock growth.</p>
        <a
          href="#contact"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black hover:-translate-y-0.5 transition"
        >
          Get a Proposal <ArrowRight className="h-4 w-4" />
        </a>
      </Container>
    </section>
  );
}

// --------------------------- Footer ---------------------------
function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-sm text-white/60">
      © {new Date().getFullYear()} Scaledy. All rights reserved.
    </footer>
  );
}

// --------------------------- Page ---------------------------
export default function Site() {
  return (
    <MotionConfig transition={{ ease, duration: 0.9 }}>
      <div className="bg-neutral-950 min-h-screen text-white">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Pricing />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
