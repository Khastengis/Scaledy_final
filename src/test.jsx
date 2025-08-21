import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Blocks,
  Building2,
  Check,
  ChevronRight,
  CircleCheck,
  Globe,
  Handshake,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Users2,
} from "lucide-react";

// Premier, animated agency landing page
// Apple-level polish × Google-level performance
// Improvements:
// - Fixed marquee overlap with "Trusted by" label on all breakpoints
// - Global dark mode toggle (persists in localStorage); works in v4 Tailwind
// - Motion system with reduced-motion safety & in-view stagger
// - Refined responsive layout, mobile nav sheet, glass cards, sheen buttons
// - A11y (aria labels, focus rings), smaller CLS, smooth interactions

export default function Site() {
  const [lang, setLang] = useState("en");
  const [currency, setCurrency] = useState("MNT");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [elevateHeader, setElevateHeader] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Read preference on mount (runs only on client)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  // Persist & apply dark mode to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark"); else root.classList.remove("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Header elevation on scroll
  useEffect(() => {
    const onScroll = () => setElevateHeader(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const brand = "Spark Growth"; // change brand
  const USD_TO_MNT = 3450;
  const nav = [
    { id: "work", en: "Work", mn: "Төслүүд" },
    { id: "services", en: "Services", mn: "Үйлчилгээ" },
    { id: "results", en: "Results", mn: "Үр дүн" },
    { id: "process", en: "Process", mn: "Процесс" },
    { id: "pricing", en: "Pricing", mn: "Үнэ" },
    { id: "contact", en: "Contact", mn: "Холбогдох" },
  ];
  const t = (obj) => obj[lang];

  const counters = [
    { key: "brands", end: 120, label: { en: "+ brands supported", mn: "+ брэнд хамтран ажилласан" } },
    { key: "ad", end: 1000000, label: { en: "$ managed ad/mo*", mn: "$/сар зарын менежмент*" } },
    { key: "roas", end: 4.8, decimals: 1, label: { en: "avg. ROAS on scale*", mn: "дундаж ROAS*" } },
  ];

  // Motion presets
  const reduceMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };
  const stagger = { show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } } };

  return (
    <div>
      {/* Local keyframes */}
      <style>{`
        @keyframes floaty { 0%{ transform: translateY(0)} 50%{ transform: translateY(-6px)} 100%{ transform: translateY(0)} }
        @keyframes sheen { 0%{ transform: translateX(-120%)} 100%{ transform: translateX(120%)} }
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        /* Starfield animations */
        @keyframes twinkle { from { opacity: .25; transform: scale(.9) } to { opacity: .95; transform: scale(1) } }
        @keyframes drift { 0% { transform: translate(0,0) } 50% { transform: translate(var(--dx,8px), var(--dy,-8px)) } 100% { transform: translate(0,0) } }
        /* Shooting stars (angle-aware) */
        @keyframes meteor {
        0%   { transform: rotate(var(--angle)) translateX(-12vw); opacity: 0; }
        8%   { opacity: 1; }
        100% { transform: rotate(var(--angle)) translateX(var(--dist)); opacity: 0; }
        }
      `}</style>

      <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 relative">
        {/* Global background across the whole page */}
        <GlobalBackground />
        {/* Content wrapper above background */}
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
          elevate={elevateHeader}
        />

        {/* HERO */}
        <section id="home" className="relative overflow-hidden">
          {/* Background orbs (content still has orbs; starfield is now global) */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-16 h-80 w-80 rounded-full blur-3xl opacity-30 dark:opacity-20 bg-gradient-to-br from-indigo-400 to-cyan-300" />
            <div className="absolute bottom-[-4rem] right-[-2rem] h-96 w-96 rounded-full blur-3xl opacity-25 dark:opacity-15 bg-gradient-to-br from-fuchsia-400 to-purple-300" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 md:px-8 py-20 md:py-28">
            <div className="grid md:grid-cols-12 gap-10 items-center">
              <motion.div className="md:col-span-7" variants={stagger} initial="hidden" animate="show">
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs mb-6 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/40">
                  <Sparkles className="h-3.5 w-3.5" /> {lang === "en" ? "Direct‑to‑Consumer growth systems" : "D2C өсөлтийн систем"}
                </motion.div>
                <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-indigo-600 to-black dark:from-white dark:via-indigo-400 dark:to-white bg-[length:200%_auto] animate-[floaty_6s_ease-in-out_infinite]">
                    {lang === "en" ? "We build, launch, and scale profitable ad systems." : "Бид ашигтай зарын систем бүтээж, нэвтрүүлж, тэлдэг."}
                  </span>
                </motion.h1>
                <motion.p variants={fadeUp} className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                  {lang === "en" ? "Done‑for‑you media buying, conversion, and creative for e‑commerce & service brands in Mongolia and beyond." : "Монгол болон гадаадын e‑коммерс, үйлчилгээний брэндүүдэд зориулсан медиа худалдан авалт, хөрвүүлэлт, креативын иж бүрэн үйлчилгээ."}
                </motion.p>
                <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Magnetic>
                        <a href="#contact" className="group relative inline-flex items-center justify-center rounded-2xl bg-black text-white dark:bg-white dark:text-black px-5 py-3 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                            {lang === "en" ? "Get a proposal" : "Санал авахаар холбогдох"}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                            <span className="absolute inset-y-0 -left-1/2 w-1/3 translate-x-[-120%] bg-white/20 dark:bg-black/10 blur-sm animate-[sheen_1.2s_ease-in-out_infinite]" />
                            </span>
                        </a>
                    </Magnetic>
                  <a href="#work" className="inline-flex items-center justify-center rounded-2xl border px-5 py-3 font-medium hover:bg-slate-50 dark:hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                    {lang === "en" ? "See our work" : "Төслүүдийг харах"}
                  </a>
                </motion.div>
              </motion.div>

              <motion.div className="md:col-span-5" initial={{ opacity: 0, y: reduceMotion ? 0 : 10, scale: reduceMotion ? 1 : 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}>
                <div className="relative rounded-3xl border overflow-hidden aspect-video bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                  <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(255,255,255,.08),transparent)]" />
                  <motion.div className="h-full w-full grid place-items-center text-sm opacity-80" initial={{ y: 10 }} animate={{ y: reduceMotion ? 0 : [0, -6, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
                    {lang === "en" ? "Your case study video / image" : "Танай кейс видеo / зураг"}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TRUST BAR / MARQUEE (fixed overlap) */}
        <section className="border-y border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-6 md:px-8 py-6 md:flex md:items-center md:gap-8">
            <span className="block text-xs uppercase tracking-widest opacity-60 mb-3 md:mb-0 md:mr-2 md:whitespace-nowrap md:shrink-0">
              {lang === "en" ? "Trusted by" : "Дараах брэндүүд итгэдэг"}
            </span>
            {/* Marquee container ensures the track never overlaps the label */}
            <div
              className="relative overflow-hidden md:flex-1"
              style={{ WebkitMaskImage: "linear-gradient(90deg, rgba(0,0,0,0), #000 6%, #000 94%, rgba(0,0,0,0))", maskImage: "linear-gradient(90deg, rgba(0,0,0,0), #000 6%, #000 94%, rgba(0,0,0,0))" }}
            >
              <div className="flex gap-10 w-max animate-[marquee_32s_linear_infinite] will-change-transform">
                {["BrandOne", "NomadTea", "SteppeFit", "UlaanStore", "SkyBakery", "AltanTech", "KhatanBeauty"]
                  .concat(["BrandOne", "NomadTea", "SteppeFit", "UlaanStore", "SkyBakery", "AltanTech", "KhatanBeauty"]) // duplicate for seamless loop
                  .map((name, i) => (
                    <div key={i} className="h-8 w-28 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/50 backdrop-blur grid place-items-center text-[11px] opacity-80">
                      {name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section id="results" className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
          <motion.div className="grid md:grid-cols-3 gap-6" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            {counters.map((c) => (
              <motion.div key={c.key} variants={fadeUp}>
                <Counter end={c.end} decimals={c.decimals} label={t(c.label)} />
              </motion.div>
            ))}
          </motion.div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">{lang === "en" ? "*Placeholders. Replace with your real metrics." : "*Түр тоо. Жинхэнэ үзүүлэлтээр солино уу."}</p>
        </section>

        {/* SERVICES */}
        <section id="services" className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
          <div className="flex items-center gap-2 mb-6">
            <Blocks className="h-5 w-5" />
            <h2 className="text-2xl md:text-3xl font-bold">{lang === "en" ? "What we do" : "Бид юу хийдэг вэ"}</h2>
          </div>
          <motion.div className="grid md:grid-cols-3 gap-6" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={fadeUp}><ServiceCard icon={<BarChart3 className="h-5 w-5" />} title={lang === "en" ? "Performance Media Buying" : "Гүйцэтгэлд суурилсан медиа"} bullets={lang === "en" ? ["Meta, TikTok, Google", "Offer + audience testing", "Daily optimization"] : ["Meta, TikTok, Google", "Санал/аудит тест", "Өдөр тутмын оновчлол"]} /></motion.div>
            <motion.div variants={fadeUp}><ServiceCard icon={<Building2 className="h-5 w-5" />} title={lang === "en" ? "CRO & Landing Pages" : "CRO ба Лэндинг"} bullets={lang === "en" ? ["On‑page experiments", "A/B testing", "Speed & tracking"] : ["Хуудас туршилт", "A/B тест", "Хурд & хэмжилт"]} /></motion.div>
            <motion.div variants={fadeUp}><ServiceCard icon={<Users2 className="h-5 w-5" />} title={lang === "en" ? "UGC & Creatives" : "UGC ба Креатив"} bullets={lang === "en" ? ["Briefs & hooks", "Editing guidance", "Content calendar"] : ["Бриф & hook", "Засварын чиглэл", "Контент календарь"]} /></motion.div>
          </motion.div>
        </section>

        {/* WORK */}
        <section id="work" className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{lang === "en" ? "Selected Work" : "Сонгосон төслүүд"}</h2>
          <motion.div className="grid md:grid-cols-3 gap-6" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            {[
              { name: "NomadTea", result: "+212% AOV", desc: "New hooks + CRO sprint" },
              { name: "SteppeFit", result: "3.9x ROAS", desc: "Cold to warm funnel" },
              { name: "KhatanBeauty", result: "-42% CPA", desc: "Creative angles test" },
            ].map((cs, i) => (
              <motion.div key={i} variants={fadeUp}><CaseCard brand={cs.name} result={cs.result} desc={cs.desc} lang={lang} /></motion.div>
            ))}
          </motion.div>
        </section>

        {/* PROCESS */}
        <section id="process" className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
          <div className="flex items-center gap-2 mb-6">
            <Handshake className="h-5 w-5" />
            <h2 className="text-2xl md:text-3xl font-bold">{lang === "en" ? "How we work" : "Бид хэрхэн ажилладаг"}</h2>
          </div>
          <motion.ol className="grid md:grid-cols-3 gap-6" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            {[
              { t: { en: "Audit & plan", mn: "Аудит, төлөвлөгөө" }, d: { en: "Account + store audit, targets, KPI model.", mn: "Данс, дэлгүүрийн аудит, зорилго, KPI." } },
              { t: { en: "Build systems", mn: "Систем бүтээх" }, d: { en: "Tracking, offers, creative briefs, pages.", mn: "Хэмжилт, санал, креатив бриф, лэндинг." } },
              { t: { en: "Launch & learn", mn: "Нэвтрүүлж тестлэх" }, d: { en: "Structured tests to find winners fast.", mn: "Ялагч креатив/саналыг хурдан олох тест." } },
              { t: { en: "Scale", mn: "Тэлэх" }, d: { en: "Budget ramp, LTV plays, new channels.", mn: "Төсөв нэмэгдүүлэлт, LTV, шинэ суваг." } },
              { t: { en: "Optimize", mn: "Оновчлох" }, d: { en: "CRO sprints, feed + catalog hygiene.", mn: "CRO спринт, фийд/каталог цэвэрлэгээ." } },
              { t: { en: "Report & repeat", mn: "Тайлан, давтах" }, d: { en: "Weekly insights, next tests.", mn: "7 хоногийн тайлан, дараагийн тест." } },
            ].map((s, i) => (
              <motion.li key={i} variants={fadeUp} className="rounded-2xl border p-6 bg-white/70 dark:bg-slate-900/40 backdrop-blur hover:shadow-xl transition">
                <div className="flex items-center gap-2 text-sm opacity-70 mb-1">{i + 1}.</div>
                <div className="font-semibold text-lg">{t(s.t)}</div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{t(s.d)}</p>
              </motion.li>
            ))}
          </motion.ol>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
          <div className="flex items-center gap-2 mb-6">
            <BadgeCheck className="h-5 w-5" />
            <h2 className="text-2xl md:text-3xl font-bold">{lang === "en" ? "Pricing" : "Үнийн санал"}</h2>
          </div>

          <div className="mb-6 inline-flex rounded-2xl border overflow-hidden">
            <button onClick={() => setCurrency("MNT")} className={`px-4 py-2 text-sm ${currency === "MNT" ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-slate-50 dark:hover:bg-slate-900"}`}>MNT</button>
            <button onClick={() => setCurrency("USD")} className={`px-4 py-2 text-sm ${currency === "USD" ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-slate-50 dark:hover:bg-slate-900"}`}>USD</button>
          </div>

          <motion.div className="grid md:grid-cols-3 gap-6" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            {pricingData().map((p, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Plan {...p} currency={currency} USD_TO_MNT={USD_TO_MNT} lang={lang} />
              </motion.div>
            ))}
          </motion.div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">{lang === "en" ? "Includes monthly management. Ad budget portions listed are included and adjustable. No long‑term lock‑ins." : "Сарын менежмент багтсан. Дурдсан зарын төсөв нь дагалдах бөгөөд өөрчилж болно. Урт хугацааны гэрээ шаардлагагүй."}</p>
        </section>

        {/* TESTIMONIALS */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{lang === "en" ? "What clients say" : "Харилцагчдын сэтгэгдэл"}</h2>
          <motion.div className="grid md:grid-cols-3 gap-6" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            {[
              { n: "Ariunaa, NomadTea", q: "They built us a predictable funnel in 3 weeks." },
              { n: "Bilguun, SteppeFit", q: "Creative testing finally clicked. Costs dropped fast." },
              { n: "Khaliun, KhatanBeauty", q: "The landing refresh doubled our conversion rate." },
            ].map((r, i) => (
              <motion.div key={i} variants={fadeUp} className="rounded-2xl border p-6 bg-white/70 dark:bg-slate-900/40 backdrop-blur hover:shadow-xl transition">
                <div className="text-sm opacity-70">★ ★ ★ ★ ★</div>
                <p className="mt-3">{r.q}</p>
                <div className="mt-4 text-sm opacity-70">— {r.n}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">FAQ</h2>
          <motion.div className="grid md:grid-cols-2 gap-6" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            {faq(lang).map((f, i) => (
              <motion.div key={i} variants={fadeUp} className="rounded-2xl border p-6">
                <div className="font-semibold">{f.q}</div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{f.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{lang === "en" ? "Contact" : "Холбогдох"}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <form
              className="rounded-2xl border p-6 bg-white/70 dark:bg-slate-900/40 backdrop-blur"
              onSubmit={(e) => {
                e.preventDefault();
                const data = Object.fromEntries(new FormData(e.currentTarget).entries());
                alert((lang === "en" ? "Thanks! We'll get back to you: " : "Баярлалаа! Танд эргэн холбогдоно: ") + (data.email || ""));
                e.currentTarget.reset();
              }}
            >
              <div className="grid gap-6 md:gap-8">
                <label className="grid gap-1">
                  <span className="text-sm">{lang === "en" ? "Name" : "Нэр"}</span>
                  <input name="name" required className="rounded-xl border px-3 py-2 bg-white dark:bg-slate-950" placeholder={lang === "en" ? "Your name" : "Таны нэр"} />
                </label>
                <label className="grid gap-1">
                  <span className="text-sm">Email</span>
                  <input name="email" type="email" required className="rounded-xl border px-3 py-2 bg-white dark:bg-slate-950" placeholder="you@example.com" />
                </label>
                <label className="grid gap-1">
                  <span className="text-sm">{lang === "en" ? "Business type" : "Бизнесийн төрөл"}</span>
                  <select name="type" className="rounded-xl border px-3 py-2 bg-white dark:bg-slate-950">
                    <option value="ecom">{lang === "en" ? "E‑commerce" : "E‑коммерс"}</option>
                    <option value="service">{lang === "en" ? "Service" : "Үйлчилгээ"}</option>
                  </select>
                </label>
                <label className="grid gap-1">
                  <span className="text-sm">{lang === "en" ? "Message" : "Захиа"}</span>
                  <textarea name="message" rows={5} className="rounded-xl border px-3 py-2 bg-white dark:bg-slate-950" placeholder={lang === "en" ? "Tell us about your goals" : "Зорилгоо бичнэ үү"} />
                </label>
                    <Magnetic>
                        <button className="group relative inline-flex items-center justify-center rounded-2xl bg-black text-white dark:bg-white dark:text-black px-5 py-3 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                        {lang === "en" ? "Send" : "Илгээх"}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                            <span className="absolute inset-y-0 -left-1/2 w-1/3 translate-x-[-120%] bg-white/20 dark:bg-black/10 blur-sm animate-[sheen_1.2s_ease-in-out_infinite]" />
                        </span>
                        </button>
                    </Magnetic>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === "en" ? "Tip: connect to Formspree or make this button link to your Google Form." : "Зөвлөмж: Formspree ашиглах эсвэл Google Form руу холбоно."}
                </p>
              </div>
            </form>
            <div className="rounded-2xl border p-6 bg-white/70 dark:bg-slate-900/40 backdrop-blur">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">{lang === "en" ? "Direct contact" : "Шууд холбогдох"}</h3>
                <div className="flex items-center gap-3"><Mail className="h-4 w-4" /><a href="mailto:hello@yourbrand.mn" className="hover:underline">hello@yourbrand.mn</a></div>
                <div className="flex items-center gap-3"><Phone className="h-4 w-4" /><a href="tel:+97600000000" className="hover:underline">+976 00 00 00 00</a></div>
                <div className="flex items-center gap-3"><MapPin className="h-4 w-4" /><span>Ulaanbaatar, Mongolia</span></div>
                <div className="pt-2 text-sm opacity-70">{lang === "en" ? "Prefer chat? DM us on IG/FB for faster replies." : "Чатаар бичих үү? IG/FB дээр хурдан хариулна."}</div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-6 md:px-8 py-10 text-sm flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="opacity-80">© {new Date().getFullYear()} {brand}. {lang === "en" ? "All rights reserved." : "Бүх эрх хуулиар хамгаалагдсан."}</div>
            <div className="flex items-center gap-6 md:gap-8 opacity-80">
              {nav.map((n) => (
                <a key={n.id} href={`#${n.id}`} className="hover:opacity-100">{t({ en: n.en, mn: n.mn })}</a>
              ))}
            </div>
          </div>
        </footer>
        </div>
      </div>
    </div>
  );
}

function Header({ brand, nav, lang, setLang, currency, setCurrency, dark, setDark, mobileOpen, setMobileOpen, elevate }) {
  return (
    <header className={`sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-950/60 border-b border-slate-200/60 dark:border-slate-800/60 transition-shadow ${elevate ? "shadow-md shadow-slate-200/40 dark:shadow-black/20" : ""}`}>
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-3 flex items-center justify-between">
        <a href="#home" className="font-bold text-lg tracking-tight flex items-center gap-2"><Globe className="h-5 w-5" />{brand}</a>
        <nav className="hidden md:flex gap-6 text-sm">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="hover:opacity-80">{lang === "en" ? n.en : n.mn}</a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <button onClick={() => setLang((p) => (p === "en" ? "mn" : "en"))} className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs hover:bg-slate-50 dark:hover:bg-slate-900" aria-label="Toggle language">{lang.toUpperCase()}</button>
          <button onClick={() => setCurrency((p) => (p === "MNT" ? "USD" : "MNT"))} className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs hover:bg-slate-50 dark:hover:bg-slate-900" aria-label="Toggle currency">{currency}</button>
          <button onClick={() => setDark((d) => !d)} className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs hover:bg-slate-50 dark:hover:bg-slate-900" aria-label="Toggle theme">{dark ? "☀️" : "🌙"}</button>
        </div>
        {/* Mobile */}
        <button className="md:hidden rounded-xl border p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden border-t overflow-hidden">
            <div className="px-4 py-3 flex flex-col gap-3">
              {nav.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setMobileOpen(false)} className="py-1">{lang === "en" ? n.en : n.mn}</a>
              ))}
              <div className="flex items-center gap-2 pt-2">
                <button onClick={() => setLang((p) => (p === "en" ? "mn" : "en"))} className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs" aria-label="Toggle language">{lang.toUpperCase()}</button>
                <button onClick={() => setCurrency((p) => (p === "MNT" ? "USD" : "MNT"))} className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs" aria-label="Toggle currency">{currency}</button>
                <button onClick={() => setDark((d) => !d)} className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs" aria-label="Toggle theme">{dark ? "☀️" : "🌙"}</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Counter({ end, label, decimals = 0 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const startTime = performance.now();
    const dur = 900;
    const step = (now) => {
      const p = Math.min((now - startTime) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = end * eased;
      setValue(current);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, end]);

  const fmt = (n) => {
    if (decimals) return n.toFixed(decimals);
    if (n >= 1000000) return Math.round(n / 100000) / 10 + "M";
    if (n >= 1000) return Math.round(n / 100) / 10 + "k";
    return Math.round(n).toString();
  };

  return (
    <div ref={ref} className="rounded-2xl border p-6 flex items-center gap-6 md:gap-8 bg-white/70 dark:bg-slate-900/40 backdrop-blur hover:shadow-xl transition">
      <CircleCheck className="h-5 w-5" />
      <div>
        <div className="text-3xl font-extrabold">{fmt(value)}</div>
        <div className="text-sm opacity-70">{label}</div>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, bullets }) {
  return (
    <div className="group rounded-2xl border p-6 bg-white/70 dark:bg-slate-900/40 backdrop-blur hover:shadow-2xl hover:-translate-y-0.5 transition will-change-transform">
      <div className="flex items-center gap-2 mb-2">{icon}<div className="font-semibold text-lg">{title}</div></div>
      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5" /><span>{b}</span></li>
        ))}
      </ul>
    </div>
  );
}

function CaseCard({ brand, result, desc, lang }) {
  return (
    <div className="group rounded-2xl border p-6 bg-white/70 dark:bg-slate-900/40 backdrop-blur hover:shadow-2xl hover:-translate-y-0.5 transition will-change-transform">
      <div className="aspect-video rounded-xl bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 mb-4" />
      <div className="font-semibold">{brand}</div>
      <div className="text-sm opacity-70 mt-1">{result}</div>
      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{desc}</p>
      <a href="#contact" className="mt-3 inline-flex items-center text-indigo-600 group-hover:opacity-100 opacity-90">
        {lang === "en" ? "Request full case" : "Дэлгэрэнгүй үзэх"} <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

function pricingData() {
  return [
    {
      name: "Starter",
      tagline: "Best for new brands",
      usd: 349,
      features: [
        "Ad account + pixel setup",
        "Meta/TikTok basic campaigns",
        "3 creatives/mo",
        "Monthly report",
        "Includes ~$100 ads budget",
      ],
    },
    {
      name: "Growth",
      tagline: "Most popular",
      usd: 799,
      highlight: true,
      features: [
        "Full‑funnel Meta + TikTok",
        "UGC guidance + hooks",
        "Landing page CRO",
        "Weekly report + call",
        "Includes ~$300 ads budget",
      ],
    },
    {
      name: "Elite",
      tagline: "Scale aggressively",
      usd: 1590,
      features: [
        "Meta/TikTok/Google multi‑channel",
        "Monthly creative batch (8‑12)",
        "Offer & price testing",
        "CRO sprints + A/B tests",
        "Includes ~$600 ads budget",
      ],
    },
  ];
}

function Plan({ name, tagline, usd, features, highlight, currency, USD_TO_MNT, lang }) {
  const price = currency === "USD" ? `$${usd.toLocaleString()} / mo` : `${(usd * USD_TO_MNT).toLocaleString()} MNT / mo`;
  return (
    <div className={`rounded-2xl border p-6 flex flex-col bg-white/70 dark:bg-slate-900/40 backdrop-blur hover:shadow-2xl hover:-translate-y-0.5 transition ${highlight ? "ring-2 ring-indigo-600" : ""}`}>
      <div className="mb-1 text-xs uppercase tracking-wider opacity-70">{tagline}</div>
      <div className="text-2xl font-bold">{name}</div>
      <div className="mt-3 text-3xl font-extrabold">{price}</div>
      <ul className="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5" /><span>{f}</span></li>
        ))}
      </ul>
      <a href="#contact" className={`mt-6 relative inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium ${highlight ? "bg-black text-white dark:bg-white dark:text-black" : "border"}`}>
        {lang === "en" ? "Choose plan" : "Сонгох"}
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <span className="absolute inset-y-0 -left-1/2 w-1/3 translate-x-[-120%] bg-white/20 dark:bg-black/10 blur-sm animate-[sheen_1.2s_ease-in-out_infinite]" />
        </span>
      </a>
    </div>
  );
}

function faq(lang) {
  return [
    {
      q: lang === "en" ? "How fast can we launch?" : "Хэзээ эхлэх вэ?",
      a: lang === "en" ? "Most brands launch within 7–10 days after audit and setup." : "Аудит, тохиргооны дараа ихэнх брэнд 7–10 хоногт эхэлдэг.",
    },
    {
      q: lang === "en" ? "Do you need long‑term contracts?" : "Урт хугацааны гэрээ хэрэгтэй юу?",
      a: lang === "en" ? "No. Month‑to‑month with clear KPIs." : "Үгүй. KPI тодорхой, сараар сунгана.",
    },
    {
      q: lang === "en" ? "Can you work with my existing creatives?" : "Одоо байгаа креатив ашиглаж болох уу?",
      a: lang === "en" ? "Yes — we test your assets and supply new angles if needed." : "Тийм — таны материалыг тестлээд, шаардлагатай бол шинэ өнцөг гаргана.",
    },
    {
      q: lang === "en" ? "Which industries do you support?" : "Ямар салбаруудтай ажилладаг вэ?",
      a: lang === "en" ? "E‑commerce and local services (beauty, fitness, education, food, more)." : "E‑коммерс болон үйлчилгээ (гоо сайхан, фитнес, боловсрол, хоол, бусад).",
    },
  ];
}


// --- Background: Starfield & Shooting stars ---
function Starfield({ count = 95, className = "" }) {
  const stars = useMemo(() => (
    Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() < 0.18 ? 2 : 1,
      delay: (Math.random() * 8).toFixed(2) + 's',
      // faster twinkle & drift; slightly larger excursion
      duration: (4.2 + Math.random() * 6.2).toFixed(2) + 's', // 4.2–10.4s
      dx: (Math.random() * 32 - 16).toFixed(1) + 'px',
      dy: (Math.random() * 32 - 16).toFixed(1) + 'px',
      drift: (10 + Math.random() * 8).toFixed(2) + 's', // 10–18s
    }))
  ), [count]);

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
            '--dx': s.dx,
            '--dy': s.dy,
          }}
        />
      ))}
    </div>
  );
}

function ShootingStars({ count = 7 }) {
  const trails = useMemo(() => (
    Array.from({ length: count }).map(() => ({
      top: Math.random() * 100,        // start Y (% of viewport)
      left: Math.random() * 100,       // start X (% of viewport)
      delay: (Math.random() * 8).toFixed(2) + 's',
      dur: (1.2 + Math.random() * 1.6).toFixed(2) + 's', // 1.2–2.8s
      blur: (Math.random() * 1.4).toFixed(1),
      length: (8 + Math.random() * 20).toFixed(0),       // vw
      angle: (-(15 + Math.random() * 60)).toFixed(0) + 'deg', // -15° to -75° (diagonal)
      dist: (110 + Math.random() * 40).toFixed(0) + 'vw',     // travel distance
    }))
  ), [count]);

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
            background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.95), rgba(255,255,255,0))',
            animation: `meteor ${t.dur} linear ${t.delay} infinite`,
            '--angle': t.angle,
            '--dist': t.dist,
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

function Magnetic({ strength = 10, className = "", children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0, tx = 0, ty = 0, vx = 0, vy = 0;
    const damp = 0.18;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width - 0.5;
      const my = (e.clientY - r.top) / r.height - 0.5;
      vx = mx * strength; vy = my * strength;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => { vx = 0; vy = 0; if (!raf) raf = requestAnimationFrame(tick); };

    const tick = () => {
      tx += (vx - tx) * damp;
      ty += (vy - ty) * damp;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      if (Math.abs(tx - vx) > 0.1 || Math.abs(ty - vy) > 0.1) {
        raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return <span ref={ref} className={`inline-block will-change-transform ${className}`}>{children}</span>;
}
