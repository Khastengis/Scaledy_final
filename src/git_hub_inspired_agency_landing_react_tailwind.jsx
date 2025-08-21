import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
  Shield,
  Sparkles,
  BarChart3,
  Check,
  Zap,
  LineChart,
  Mail,
  Play,
  Quote,
  ChevronDown,
  Instagram,
  Facebook,
  Globe,
} from "lucide-react";

/**
 * Refined Agency Landing (Apple‑like smoothness)
 * - Global buttery animations via MotionConfig + soft variants
 * - Responsive hero (clamped headline + full‑width CTAs on phones)
 * - Premium twin‑row marquee with edge fade
 * - Polished gradients & concise, premium copy
 * - Side drawer mobile nav
 * - Subtle, slow starfield background
 */

// --------------------------- Animation helpers ---------------------------
const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }, // buttery ease
  },
};

const stagger = { show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };

function useScrollShadow() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

function useTypewriter(lines, speed = 24, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [dir, setDir] = useState("typing"); // typing | pausing | deleting

  useEffect(() => {
    let t;
    const current = lines[i % lines.length];
    if (dir === "typing") {
      if (text.length < current.length) {
        t = setTimeout(() => setText(current.slice(0, text.length + 1)), 1000 / speed);
      } else {
        t = setTimeout(() => setDir("pausing"), pause);
      }
    } else if (dir === "pausing") {
      t = setTimeout(() => setDir("deleting"), 500);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(current.slice(0, text.length - 1)), 800 / speed);
      } else {
        setDir("typing");
        setI((v) => v + 1);
      }
    }
    return () => clearTimeout(t);
  }, [text, dir, i, lines, speed, pause]);

  return text + (dir === "typing" ? "_" : "");
}

function Container({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

function Section({ id, children, className = "" }) {
  return <section id={id} className={`relative ${className}`}>{children}</section>;
}

// --------------------------- Starfield background ---------------------------
function Starfield({ density = 100 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let raf;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const state = { w: 0, h: 0, stars: [] };

    function resize() {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state.w = innerWidth;
      state.h = innerHeight;
    }

    function resetStars() {
      const count = Math.max(60, Math.floor((state.w * state.h) / 26000));
      const target = Math.min(density, count);
      state.stars = new Array(target).fill(0).map(() => ({
        x: Math.random() * state.w,
        y: Math.random() * state.h,
        vx: (Math.random() - 0.5) * 0.02, // ultra smooth drift
        vy: (Math.random() - 0.5) * 0.02,
        r: Math.random() * 1.1 + 0.2,
        a: Math.random() * 0.7 + 0.2,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, state.w, state.h);
      for (const s of state.stars) {
        s.x += s.vx; s.y += s.vy;
        if (s.x < -4) s.x = state.w + 4;
        if (s.x > state.w + 4) s.x = -4;
        if (s.y < -4) s.y = state.h + 4;
        if (s.y > state.h + 4) s.y = -4;
        ctx.globalAlpha = s.a;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    function onResize() { resize(); resetStars(); }

    resize();
    resetStars();
    draw();

    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-50 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_85%,transparent)]"
    />
  );
}

// --------------------------- Navbar (side drawer) ---------------------------
function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollShadow();
  const links = [
    { href: "#features", label: "Services" },
    { href: "#process", label: "Process" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <div className="sticky top-0 z-40">
      <div className={`backdrop-blur supports-[backdrop-filter]:bg-black/40 ${scrolled ? "shadow-[0_1px_0_0_rgba(255,255,255,0.08)]" : ""}`}>
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a href="#home" className="group inline-flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-400 p-[1px]">
                <div className="grid h-full w-full place-items-center rounded-[0.6rem] bg-black">
                  <Sparkles className="h-4 w-4 opacity-90" />
                </div>
              </div>
              <span className="text-sm font-semibold tracking-wide text-white/90 group-hover:text-white">YourAgency</span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="text-sm text-white/70 hover:text-white transition-colors duration-500">
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a href="#contact" className="text-sm text-white/70 hover:text-white transition-colors duration-500">Contact</a>
              <a href="#cta" className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-2 text-sm font-medium text-black transition-all duration-500 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0">
                Get Proposal <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
              </a>
            </div>

            <button onClick={() => setOpen(true)} className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", stiffness: 220, damping: 30 }}
              className="
                fixed right-0 top-0 z-50 h-full w-80
                border-l border-white/10      /* primary border */
                bg-neutral-950 text-white      /* primary bg + text */
                p-6 md:hidden
                /* hard fallbacks if your Tailwind build strips the above: */
                border-l-[1px] border-l-[rgba(255,255,255,0.12)]
                bg-[rgb(10,10,10)]
              "
              /* final safety net if CSS is overridden elsewhere */
              style={{
                borderLeftColor: "rgba(255,255,255,0.12)",
                backgroundColor: "rgb(10,10,10)",
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-white/90">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2 py-2 text-sm text-white/80 transition-all duration-500 hover:bg-white/5 hover:text-white"
                  >
                    {l.label}
                  </a>
                ))}

                <a
                  href="#cta"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-2 text-sm font-medium text-black transition-all duration-500 hover:shadow-xl"
                >
                  Get Proposal <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

// --------------------------- Hero ---------------------------
function Hero() {
  const code = useTypewriter([
    "// Growth OS for DTC & services",
    "channels.launch(['Meta','Search','YouTube']).budgetGuardrails()",
    "creative.test().scale()",
    "tracking.verify(['Pixel','GA4','CAPI']).report('CAC','ROAS','AOV','LTV')",
  ]);

  return (
    <Section id="home" className="relative overflow-hidden">
      {/* Gradient ambience */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Apple‑like soft layered glows */}
        <div className="absolute -top-40 left-1/2 h-[48rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.20),transparent_70%)] blur-3xl" />
        <div className="absolute -bottom-40 right-1/2 h-[44rem] w-[44rem] translate-x-1/4 rounded-full bg-[radial-gradient(closest-side,rgba(236,72,153,0.18),transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_25%,transparent_75%,rgba(255,255,255,0.05))]" />
      </div>

      <Container className="pt-20 pb-12 sm:pt-24 sm:pb-20">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div variants={fadeIn}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <Sparkles className="h-3.5 w-3.5" /> Omni‑channel performance for modern brands
            </div>
            <h1 className="mt-5 text-balance leading-tight text-[clamp(1.9rem,6vw,3.5rem)] sm:text-[clamp(2.4rem,5vw,4rem)] font-semibold tracking-tight text-white max-w-[16ch]">
              Scale ads. Grow revenue. Keep control.
            </h1>
            <p className="mt-5 max-w-xl text-white/70">
              We run marketing that compounds: media buying across Meta, Search & YouTube, creative sprints, airtight tracking, and weekly reporting—so you scale with confidence.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#cta" className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition-all duration-500 [box-shadow:0_10px_30px_rgba(255,255,255,.08)] hover:-translate-y-0.5 active:translate-y-0">
                Book a strategy call <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
              </a>
              <a href="#process" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition-all duration-500 hover:bg-white/10 hover:-translate-y-0.5">
                See our process <Play className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="relative">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] p-4 shadow-2xl">
              <div className="rounded-xl border border-white/10 bg-black p-4">
                <div className="mb-3 flex items-center gap-2 text-[10px] text-white/50">
                  <div className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-rose-500" />
                    <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <span className="ml-2">campaigns.js</span>
                </div>
                <pre className="overflow-hidden rounded-lg bg-[#0a0a0a] p-4 text-xs leading-relaxed text-white/90">
{`// Marketing OS
`}<span className="text-white/50">{code}</span>
                </pre>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Marquee (elegant, twin‑row with soft edge fade) */}
        <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-16">
          <div className="text-xs uppercase tracking-widest text-white/40">Trusted by growing teams</div>
          <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <style>{`
              @keyframes marqueeL{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
              @keyframes marqueeR{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
            `}</style>
            <div className="space-y-4">
              {[0,1].map((row)=> (
                <div key={row} className={`flex w-[200%] ${row===0? 'animate-[marqueeL_28s_linear_infinite]':'animate-[marqueeR_32s_linear_infinite]'} hover:[animation-play-state:paused]`}>
                  {Array(2).fill(0).map((_,i)=> (
                    <div key={i} className="flex w-1/2 items-center gap-6 pr-6">
                      {["Atlas","Nimbus","Polar","Vanta","Quark","Helios","Nova","Astra","Pulse","Orbit"].map(brand => (
                        <div key={brand} className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.06]">
                          <div className="h-2.5 w-2.5 rounded-full bg-white/20 ring-1 ring-white/20 transition-all duration-500 group-hover:bg-white/40" />
                          <span className="text-sm text-white/70 group-hover:text-white">{brand}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

// --------------------------- Services (marketing vibe) ---------------------------
function Feature({ icon: Icon, title, desc }) {
  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:bg-white/[0.05] hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
    >
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{desc}</p>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 transition-all duration-500 group-hover:ring-white/10" />
    </motion.div>
  );
}

function Features() {
  const items = [
    { icon: LineChart, title: "Omni‑channel Media Buying", desc: "Meta, Google, and YouTube under one plan—budget guardrails, audiences, and incrementality checks." },
    { icon: Sparkles, title: "Creative That Converts", desc: "Concept sprints, hooks, UGC, and motion—systematic testing to find and scale winners fast." },
    { icon: Shield, title: "Tracking & Attribution", desc: "Pixel, GA4, CAPI, and server events—deduped and QA’d so reporting is actually trustworthy." },
    { icon: BarChart3, title: "Reporting & Insights", desc: "Weekly KPI dashboards with CAC, ROAS, AOV, and LTV—so decisions are clear and accountable." },
  ];
  return (
    <Section id="features" className="py-20 sm:py-28">
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeIn} className="text-center text-3xl font-semibold text-white sm:text-4xl">Performance marketing that compounds</motion.h2>
          <motion.p variants={fadeIn} className="mx-auto mt-3 max-w-2xl text-center text-white/70">
            ROI‑driven growth for DTC & services—media + creative + measurement working together.
          </motion.p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((it) => <Feature key={it.title} {...it} />)}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

// --------------------------- Process ---------------------------
function Process() {
  const steps = [
    { title: "Audit & Strategy", detail: "We map your funnel, unit economics, and channel mix. Clear gaps → clear plan." },
    { title: "Implement & Verify", detail: "Pixels, CAPI, GA4, server events. Creative backlog, QA with live traffic." },
    { title: "Launch & Learn", detail: "Creative sprints, budget guardrails, and daily checks. Early wins unlocked." },
    { title: "Scale & Systemize", detail: "Automations, reporting, and playbooks so growth compounds month after month." },
  ];

  return (
    <Section id="process" className="py-20 sm:py-28">
      <Container>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.h2 variants={fadeIn} className="text-center text-3xl font-semibold text-white sm:text-4xl">How we work</motion.h2>
          <motion.p variants={fadeIn} className="mx-auto mt-3 max-w-2xl text-center text-white/70">Transparent steps. No mystery—just results.</motion.p>

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeIn}
                whileHover={{ y: -4 }}
                className="relative rounded-2xl border border-white/[0.10] bg-white/[0.03] p-6 transition-all duration-500 hover:bg-white/[0.05] hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-sm text-white/70">{i + 1}</div>
                <h3 className="text-base font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-white/70">{s.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

// --------------------------- Pricing ---------------------------
function Pricing() {
  const tiers = [
    {
      name: "Launch",
      price: "₮1.5M / mo",
      blurb: "For new brands validating channel‑fit.",
      features: ["Pixel + GA4 setup", "CAPI via GTM", "2 creatives / wk", "Weekly KPI email"],
      cta: "Start Launch",
      popular: false,
    },
    {
      name: "Growth",
      price: "₮3.9M / mo",
      blurb: "For brands ready to scale consistently.",
      features: ["Server events + dedupe", "Creative testing sprints", "Search + Meta", "CRM automations"],
      cta: "Choose Growth",
      popular: true,
    },
    {
      name: "Scale",
      price: "Custom",
      blurb: "For teams pushing 8‑figure systems.",
      features: ["Multi‑country + multi‑store", "MMM‑ready tracking", "Data warehouse pipes", "Slack war‑room"],
      cta: "Talk to Sales",
      popular: false,
    },
  ];

  return (
    <Section id="pricing" className="py-20 sm:py-28">
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeIn} className="text-center text-3xl font-semibold text-white sm:text-4xl">Pricing that fits your stage</motion.h2>
          <motion.p variants={fadeIn} className="mx-auto mt-3 max-w-2xl text-center text-white/70">Transparent retainers. Ad spend billed in your ad accounts.</motion.p>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {tiers.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeIn}
                whileHover={{ y: -4 }}
                className={`relative rounded-2xl border ${t.popular ? "border-white/20 bg-white/[0.06]" : "border-white/10 bg-white/[0.03]"} p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]`}
              >
                {t.popular && (
                  <div className="absolute -top-3 left-6 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-white">Most Popular</div>
                )}
                <div className="text-sm text-white/60">{t.name}</div>
                <div className="mt-2 text-3xl font-semibold text-white">{t.price}</div>
                <p className="mt-2 text-sm text-white/70">{t.blurb}</p>
                <ul className="mt-4 space-y-2">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                      <Check className="mt-0.5 h-4 w-4 flex-none" /> {f}
                    </li>
                  ))}
                </ul>
                <a href="#cta" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-2 text-sm font-medium text-black transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                  {t.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

// --------------------------- Testimonials ---------------------------
function Testimonials() {
  const items = [
    { quote: "They untangled our tracking and turned guesswork into compounding growth.", name: "T. Enkh", role: "Founder, Atlas Skincare" },
    { quote: "Clean reporting, clean decisions. Growth feels controlled now.", name: "S. Bat", role: "CEO, Nimbus Learning" },
    { quote: "From boosted posts to a real media engine in three weeks.", name: "B. Gan", role: "CMO, Polar Wear" },
  ];

  return (
    <Section id="testimonials" className="py-16 sm:py-24">
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeIn} className="text-center text-3xl font-semibold text-white sm:text-4xl">Loved by lean teams</motion.h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {items.map((it) => (
              <motion.blockquote
                key={it.name}
                variants={fadeIn}
                whileHover={{ y: -4 }}
                className="relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                <Quote className="absolute -top-3 left-6 h-6 w-6 text-white/20" />
                <p className="text-sm text-white/80">“{it.quote}”</p>
                <footer className="mt-4 text-xs text-white/60">{it.name} • {it.role}</footer>
              </motion.blockquote>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

// --------------------------- FAQ ---------------------------
function FAQ() {
  const items = [
    { q: "Do you take a rev share?", a: "No. We bill a flat retainer. Ad spend remains in your own ad accounts for full transparency." },
    { q: "How fast is onboarding?", a: "Most stacks are live within 5–10 business days, depending on your current setup and access speed." },
    { q: "What if we already have tracking?", a: "Great. We’ll audit, keep what’s working, and rebuild the parts that leak. Migration plan included." },
    { q: "Which industries do you support?", a: "DTC and service businesses with clear unit economics and leadership buy‑in." },
  ];
  const [open, setOpen] = useState(items[0].q);

  return (
    <Section id="faq" className="py-16 sm:py-24">
      <Container>
        <h2 className="text-center text-3xl font-semibold text-white sm:text-4xl">Questions & answers</h2>
        <div className="mx-auto mt-8 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
          {items.map((it) => (
            <div key={it.q} className="px-6 py-4">
              <button onClick={() => setOpen((v) => (v === it.q ? null : it.q))} className="flex w-full items-center justify-between text-left text-sm font-medium text-white">
                {it.q}
                <ChevronDown className={`h-4 w-4 transition-transform duration-500 ${open === it.q ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === it.q && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-2 text-sm text-white/70">
                    {it.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// --------------------------- CTA ---------------------------
function CTA() {
  return (
    <Section id="cta" className="py-20 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 sm:p-12"
        >
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.35),transparent)] blur-xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(236,72,153,0.25),transparent)] blur-xl" />
          <div className="relative">
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">Ready to scale profitably?</h3>
            <p className="mt-2 max-w-xl text-white/70">Tell us about your goals. We’ll reply within one business day with next steps.</p>

            <form className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
              <input type="email" required placeholder="you@company.com" className="h-11 rounded-xl border border-white/10 bg-black/60 px-4 text-sm text-white placeholder-white/40 outline-none ring-0 focus:border-white/30" />
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-medium text-black transition-all duration-500 [box-shadow:0_10px_30px_rgba(255,255,255,.1)] hover:-translate-y-0.5 active:translate-y-0">
                Request consult <Mail className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-3 text-xs text-white/50">By submitting, you agree to our terms. We’ll never sell your data.</p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

// --------------------------- Footer ---------------------------
function Footer() {
  const links = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Website", icon: Globe, href: "#" },
  ];
  return (
    <footer className="border-t border-white/10 py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-cyan-400 p-[1px]">
              <div className="grid h-full w-full place-items-center rounded-[0.6rem] bg-black">
                <Sparkles className="h-4 w-4 opacity-90" />
              </div>
            </div>
            <span className="text-sm font-semibold tracking-wide text-white/80">YourAgency</span>
          </div>
          <p className="text-xs text-white/50">© {new Date().getFullYear()} YourAgency. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {links.map((l) => (
              <a key={l.name} href={l.href} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-all duration-500 hover:text-white hover:-translate-y-0.5">
                <l.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

// --------------------------- Page ---------------------------
export default function App() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { document.documentElement.classList.add("bg-black", "text-white"); setMounted(true); }, []);

  return (
    <MotionConfig transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }} reducedMotion="user">
      <div className="min-h-screen">
        {mounted && <Starfield />}
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Process />
          <Pricing />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
