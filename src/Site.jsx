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
  Handshake,
  Menu,
  Sparkles,
  Users2,
  X,
} from "lucide-react";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";
import ApplyForm from "./ApplyForm";
import heroImage from "./assets/Rev_case_study.png"; 

// ---------- helpers ----------
const formatPrice = (amount, currency, USD_TO_MNT) => {
  if (amount == null) return "";
  if (typeof amount === "object" && amount.usd != null) {
    return currency === "USD"
      ? `$${amount.usd.toLocaleString()} / mo`
      : `${Math.round(amount.usd * USD_TO_MNT).toLocaleString()} MNT / mo`;
  }
  return currency === "USD"
    ? `$${Math.round(amount / USD_TO_MNT).toLocaleString()} / mo`
    : `${amount.toLocaleString()} MNT / mo`;
};

const OFFER_TRACKS = [
  { key: "service", labelEn: "Service-Based", labelMn: "Үйлчилгээний бизнес" },
  { key: "ecom", labelEn: "E-Commerce (Shopify)", labelMn: "E-коммерс" },
];

// ---------- offerings ----------
const OFFERING = {
  ecom: [
    {
      name: "Starter Growth",
      tagline: "Хамгийн эрэлттэй",
      highlight: true,
      price: {usd: 700}, // MNT / mo
      // adSpendNote: "1.5M+ MNT",
      features: [
        "Онлайн дэлгүүрийн тохиргоо",
        "Pixel + GA4 + Meta CAPI tracking",
        "Meta Ads менежмент — 6–8 creatives/сард",
        "Community менежмент (сэтгэгдэл, inbox удирдлага)",
        "3 flow (Email & SMS): Угтах, Урамшуулал, Орхигдсон сагс",
        "Messenger/IG chatbot 24/7 (FAQs, Захиалга баталгаажуулалт)",
        "Долоо хоног болгон KPI тайлан: Зарлага, Захиалга, Худалдан авалт, ROAS",
      ],
      promise: null,
    },
    {
      name: "Scaling OS",
      tagline: "Structured growth",
      price: {usd: 1100}, // MNT / mo
      // adSpendNote: "6M+ MNT",
      features: [
        "Meta Ads (Facebook, IG scale)",
        "Google Ads ба TikTok Ads",
        "15–20 creatives/сард",
        "6–8 flow: Худалдан авалтын дараах урсгал, Сэтгэгдэл, Winbacks, Хямдрал, Урамшуулал",
        "Advanced chatbot (Бүтээгдэхүүн хайлт, Дагалдах/нэмэлт санал өгөх)",
        "CRO: Landing/Checkout A/B тест (сар бүр 1–2 удаа)",
        "Долоо хоног болгон KPI тайлангийн дуудлага + Live dashboard",
      ],
      // promise: "Improve ROAS/MER by 30% within 90 days",
    },
    {
      name: "Market Dominator (Prestige)",
      tagline: "Category ownership",
      price: { usd: 2100 }, // USD / mo
      // adSpendNote: "20M+ MNT",
      features: [
        "Agency Backend Setup",
        "40+ creatives/сар (UGC, Боловсруулсан зар, Сэтгэгдэл)",
        "Бүтэн funnel Ads: Meta, TikTok, Google, YouTube",
        "Сар бүрийн CRO туршилт: Шинэ LP, A/B тест, Санал, урамшуулал/Багц бүтээгдэхүүн",
        "Email/SMS менежмент (2–3 campaign/7 хоногт)",
        "Full Email/SMS management (2–3 campaigns/week)",
        "Loyalty програм + Сэтгэгдэл автоматжуулалтын тохиргоо",
        "7 хоног тутмын стратегийн дуудлага + Улирлын төлөвлөгөө",
        "Бидэнтэй стратегийн дуудлага хийснээр энд бичигдээгүй нэмэлт мэдээллийг авах боломжтой"
      ],
      // promise: "Double monthly online revenue within 90 days (with agreed ad budget)",
    },
  ],
  service: [
    {
      name: "Lead Engine Starter",
      tagline: "Хамгийн эрэлттэй",
      highlight: true,
      price: { usd: 1350 }, // USD / mo
      // adSpendNote: "1M+ MNT (~$300–$1,500)",
      features: [
        "Landing page funnel (форм + календарь захиалга)",
        "Facebook/Instagram Ads (Системтэй campaigns)",
        "Хэрэглэгчийн мэдээллийг цуглуулах: Email, Утас",
        "SMS/Email маркетинг (5-touch sequence)",
        "Messenger/IG chatbot (Автомат хариулагч + Захиалга авах)",
        "Долоо хоног болгон  Стратегийн тайлан: Зарлага, CPL, Захиалга",
      ],
      // promise: "Generate consistent weekly leads (min. 20–30 leads/mo)",
    },
    {
      name: "Growth Engine",
      tagline: "Steady monthly lead flow",
      price: { usd: 1900 }, // USD / mo
      // adSpendNote: "Client ad spend $1,500–$3,000",
      features: [
        "Google Ad-ын Website бүтээх",
        "Google хайлтын Ads (Байршилд суурилсан хайлтын campaigns)",
        "10–15 creatives/сард + LP хувилбарууд",
        "CRO: Landing/Checkout тест (сар бүр 1–2 удаа)",
        "⁠Email/SMS маркетинг: Сэтгэгдэл, Урамшуулал, Winbacks",
        "Advanced chatbot: Цаг товлох, Боломжит харилцагчийг тодорхойлох",
        "⁠Долоо хоног болгон гүйцэтгэлийн тайлан + Dashboard access",
      ],
      // promise: "Reduce CPL by 25% and increase bookings by 50% within 90 days",
    },
    {
      name: "Category Leader (Prestige)",
      tagline: "Dominate your country",
      price: { usd: 3800 }, // USD / mo
      // adSpendNote: "$3,000–$6,000",
      features: [
        "TikTok campaigns + SEO",
        "Боломжит харилцагчийн удирдлагын систем: Шуурхай SMS + Автомат эргэн холбогдох < 5 мин",
        "CRM тохиргоо (HubSpot/Pipedrive) + Pipeline Автоматжуулалт",
        "Branded microsite (Үйлчилгээ, Хэрэглэгчийн үнэлгээ, Цаг захиалах)",
        "CRM setup (HubSpot/Pipedrive) + full pipeline automation",
        "Сар бүрийн стратегийн workshop",
        "Facebook/Instagram Ads (UGC creatives)",
        "KPI баталгаа: Сард хамгийн багадаа 100+ чанартай lead",
        "KPI Guarantee: Сард хамгийн багадаа X чанартай lead",
        "Бидэнтэй стратегийн дуудлага хийснээр энд бичигдээгүй нэмэлт мэдээллийг авах боломжтой"
      ],
      // promise: "Become #1 in city searches and lead volume within 90 days",
    },
  ],
};

// ---------- main ----------
export default function Site() {
  const [lang, setLang] = useState("mn");
  const [currency, setCurrency] = useState("MNT");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [elevateHeader, setElevateHeader] = useState(false);
  const [dark, setDark] = useState(() => {
    return true;    
  });
  const [track, setTrack] = useState("service"); // "ecom" | "service"

  // Persist & apply dark mode to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
    localStorage.setItem("theme", dark ? "dark" : "dark");
  }, [dark]);

  // Header elevation on scroll
  useEffect(() => {
    const onScroll = () => setElevateHeader(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const brand = "Scaledy";
  const USD_TO_MNT = 3450;
  const nav = [
    // { id: "#work", en: "Work", mn: "Төслүүд" },
    { id: "#services", en: "Services", mn: "Үйлчилгээ" },
    { id: "#results", en: "Results", mn: "Үр дүн" },
    // { id: "#process", en: "Process", mn: "Процесс" },
    { id: "#pricing", en: "Pricing", mn: "Үнэ" },
    { id: "\apply", en: "Contact", mn: "Холбогдох" },
  ];
  const t = (obj) => obj[lang];

  const counters = [
    { key: "brands", end: 20, suffix: "+", label: { en: "+ brands supported", mn: "брэнд хамтран ажилласан" } },
    { key: "ad", end: 510000000, suffix: "+", label: { en: "$ managed ad/mo*", mn: "үүсгэсэн орлого*" } },
    { key: "roas", end: 4.8, suffix: "", decimals: 1, label: { en: "avg. ROAS on scale*", mn: "дундаж ROAS*" } },
  ];

  // Motion presets
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };
  const stagger = { show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } } };

  // Compute ordered plans (highlight centered) for the current track
  const plans = OFFERING[track];
  let orderedPlans = plans;
  const hi = plans.findIndex((p) => p.highlight);
  if (hi !== -1 && hi !== 1 && plans.length === 3) {
    // Put the highlighted one in the middle (index 1)
    const others = plans.filter((_, idx) => idx !== hi);
    orderedPlans = [others[0], plans[hi], others[1]];
  }

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

        /* Thin scrollbar for feature lists */
        .features-scroll::-webkit-scrollbar { width: 6px; }
        .features-scroll::-webkit-scrollbar-thumb { background: rgba(100,116,139,.35); border-radius: 9999px; }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 relative">
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
            {/* Background orbs */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 -left-16 h-80 w-80 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-indigo-400 to-cyan-300" />
              <div className="absolute bottom-[-4rem] right-[-2rem] h-96 w-96 rounded-full blur-3xl opacity-15 dark:opacity-15 bg-gradient-to-br from-fuchsia-400 to-purple-300" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 md:px-8 py-20 md:py-28">
              <div className="grid md:grid-cols-12 gap-10 items-center">
                <motion.div className="md:col-span-6" variants={stagger} initial="hidden" animate="show">
                  <motion.div
                    variants={fadeUp}
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs mb-6 backdrop-blur supports-[backdrop-filter]:bg-slate-900/40"
                  >
                    <Sparkles className="h-3.5 w-3.5" />{" "}
                    {lang === "en" ? "Direct-to-Consumer growth systems" : "Хэрэглэгч рүү чиглэсэн өсөлтийн систем"}
                  </motion.div>
                  <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-400 to-white bg-[length:200%_auto] animate-[floaty_6s_ease-in-out_infinite]">
                      {lang === "en"
                        ? "We build, launch, and scale profitable ad systems."
                        : "Бид брэндийг өргөжүүлж, орлогыг нэмэх шийдлийг бий болгодог."}
                    </span>
                  </motion.h1>
                  <motion.p variants={fadeUp} className="mt-5 text-lg text-slate-300 max-w-2xl">
                    {lang === "en"
                      ? "Done-for-you media buying, conversion, and creative for e-commerce & service brands in Mongolia and beyond."
                      : "Брэндийн өсөлтөд хэрэгтэй бүхнийг нэгтгэн, e-commerce ба үйлчилгээний бизнесийг шинэ түвшинд гаргана."}
                  </motion.p>
                  <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Magnetic>
                      <a
                        href="/apply"
                        className="group relative inline-flex items-center justify-center rounded-2xl bg-white dark:bg:white text-black px-5 py-3 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                      >
                        {lang === "en" ? "Get a proposal" : "Санал авахаар холбогдох"}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                          <span className="absolute inset-y-0 -left-1/2 w-1/3 translate-x-[-120%] bg-white/20 dark:bg-black/10 blur-sm animate-[sheen_1.2s_ease-in-out_infinite]" />
                        </span>
                      </a>
                    </Magnetic>
                    {/* <a
                      href="#work"
                      className="inline-flex items-center justify-center rounded-2xl border px-5 py-3 font-medium hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                      {lang === "en" ? "See our work" : "Төслүүдийг харах"}
                    </a> */}
                
                  </motion.div>
                </motion.div>

                {/* <motion.div
                  className="md:col-span-5"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 10, scale: reduceMotion ? 1 : 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                >
                  <div className="relative rounded-3xl border overflow-hidden aspect-video bg-gradient-to-br from-slate-800 to-slate-900">
                    <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(255,255,255,.08),transparent)]" />
                    <motion.div
                      className="h-full w-full grid place-items-center text-sm opacity-80"
                      initial={{ y: 10 }}
                      animate={{ y: reduceMotion ? 0 : [0, -6, 0] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {lang === "en" ? "Your case study video / image" : "Танай кейс видеo / зураг"}
                    </motion.div>
                  </div>
                </motion.div> */}
                <motion.div
                  className="md:col-span-6"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 10, scale: reduceMotion ? 1 : 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                >
                  <div className="relative rounded-3xl border overflow-hidden bg-slate-900">
                    <img src={heroImage} alt="…" className="block w-full h-auto" />
                  </div>

                </motion.div>



              </div>
            </div>
          </section>

          {/* TRUST BAR / MARQUEE */}
          <section className="border-y border-slate-800">
            <div className="mx-auto max-w-7xl px-6 md:px-8 py-6 md:flex md:items-center md:gap-8">
              <span className="block text-xs uppercase tracking-widest opacity-60 mb-3 md:mb-0 md:mr-2 md:whitespace-nowrap md:shrink-0">
                {lang === "en" ? "Trusted by" : "Дараах брэндүүд итгэдэг"}
              </span>
              <div
                className="relative overflow-hidden md:flex-1"
                style={{
                  WebkitMaskImage: "linear-gradient(90deg, rgba(0,0,0,0), #000 6%, #000 94%, rgba(0,0,0,0))",
                  maskImage: "linear-gradient(90deg, rgba(0,0,0,0), #000 6%, #000 94%, rgba(0,0,0,0))",
                }}
              >
                <div className="flex gap-10 w-max animate-[marquee_32s_linear_infinite] will-change-transform">
                  {["Park Lex 60 Dental", "Maui Nui Venison", "The Folklore Shop", "Park Lex 60 Dental", "Maui Nui Venison", "The Folklore Shop"]
                    .concat(["Park Lex 60 Dental", "Maui Nui Venison", "The Folklore Shop", "Park Lex 60 Dental", "Maui Nui Venison", "The Folklore Shop"])
                    .map((name, i) => (
                      <div
                        key={i}
                        className="h-8 w-28 rounded-xl border border-slate-800/60 bg-slate-900/50 backdrop-blur grid place-items-center text-[11px] opacity-80"
                      >
                        {name}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>

          {/* RESULTS */}
          <section id="results" className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
            <motion.div
              className="grid md:grid-cols-3 gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              {counters.map((c) => (
                <motion.div key={c.key} variants={fadeUp}>
                  <Counter end={c.end} decimals={c.decimals} suffix={c.suffix} label={t(c.label)} />
                </motion.div>
              ))}
            </motion.div>
            {/* <p className="text-xs text-slate-400 mt-3">
              {lang === "en" ? "*Placeholders. Replace with your real metrics." : "*Оошоохгуюу."}
            </p> */}
          </section>

          {/* SERVICES */}
          <section id="services" className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
            <div className="flex items-center gap-2 mb-6">
              <Blocks className="h-5 w-5" />
              <h2 className="text-2xl md:text-3xl font-bold">{lang === "en" ? "What we do" : "Бид юу хийдэг вэ"}</h2>
            </div>
            <motion.div
              className="grid md:grid-cols-3 gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.div variants={fadeUp}>
                <ServiceCard
                  icon={<BarChart3 className="h-5 w-5" />}
                  title={lang === "en" ? "Performance Media Buying" : "Growth engine & Scale"}
                  bullets={
                    lang === "en"
                      ? ["Meta, TikTok, Google", "Offer + audience testing", "Daily optimization"]
                      : ["Shopify дэлгүүрийн тохиргоо, оновчлол", "Meta, TikTok, Google зар", "Tracking систем: Pixel + GA4 + CAPI", "KPI тайлан, өсөлтийн баталгаа"]
                  }
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <ServiceCard
                  icon={<Building2 className="h-5 w-5" />}
                  title={lang === "en" ? "CRO & Landing Pages" : "Conversion Ecosystem"}
                  bullets={
                    lang === "en"
                      ? ["On-page experiments", "A/B testing", "Speed & tracking"]
                      : ["Боломжит харилцагч татах: funnel + календарь бүртгэл", "Автомат имэйл & SMS урсгал", "Chatbot — 24/7 захиалга, асуулт хариулт", "CRO: Landing/checkout тест, хэрэглэгчийн flow сайжруулалт"]
                  }
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <ServiceCard
                  icon={<Users2 className="h-5 w-5" />}
                  title={lang === "en" ? "UGC & Creatives" : "Brand Strategy"}
                  bullets={
                    lang === "en"
                      ? ["Briefs & hooks", "Editing guidance", "Content calendar"]
                      : ["Бүтээлч контент: видео, зураг", "Контентийн зөвлөмж, roadmap + стратегийн дуудлага", "Хэрэглэгчийн дата цуглуулалт + CRM автоматжуулалт", "Брэндийн байр суурь + нэр хүнд өсгөх"]
                  }
                />
              </motion.div>
            </motion.div>
          </section>

          {/* WORK */}
          {/* SELECTED WORK */}
          {/* <section id="work" className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {lang === "en" ? "Selected Work" : "Сонгосон төслүүд"}
            </h2>
            <motion.div
              className="grid md:grid-cols-3 gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              {[
                { name: "NomadTea", result: "+212% AOV", desc: "New hooks + CRO sprint" },
                { name: "SteppeFit", result: "3.9x ROAS", desc: "Cold to warm funnel" },
                { name: "KhatanBeauty", result: "-42% CPA", desc: "Creative angles test" },
              ].map((cs, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <CaseCard brand={cs.name} result={cs.result} desc={cs.desc} lang={lang} />
                </motion.div>
              ))}
            </motion.div>
          </section> */}

          {/* PROCESS */}
          {/* HOW WE WORK */}
          {/* <section id="process" className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
            <div className="flex items-center gap-2 mb-6">
              <Handshake className="h-5 w-5" />
              <h2 className="text-2xl md:text-3xl font-bold">{lang === "en" ? "How we work" : "Бид хэрхэн ажилладаг"}</h2>
            </div>
            <motion.ol
              className="grid md:grid-cols-3 gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              {[
                { t: { en: "Audit & plan", mn: "Аудит, төлөвлөгөө" }, d: { en: "Account + store audit, targets, KPI model.", mn: "Данс, дэлгүүрийн аудит, зорилго, KPI." } },
                { t: { en: "Build systems", mn: "Систем бүтээх" }, d: { en: "Tracking, offers, creative briefs, pages.", mn: "Хэмжилт, санал, креатив бриф, лэндинг." } },
                { t: { en: "Launch & learn", mn: "Нэвтрүүлж тестлэх" }, d: { en: "Structured tests to find winners fast.", mn: "Ялагч креатив/саналыг хурдан олох тест." } },
                { t: { en: "Scale", mn: "Тэлэх" }, d: { en: "Budget ramp, LTV plays, new channels.", mn: "Төсөв нэмэгдүүлэлт, LTV, шинэ суваг." } },
                { t: { en: "Optimize", mn: "Оновчлох" }, d: { en: "CRO sprints, feed + catalog hygiene.", mn: "CRO спринт, фийд/каталог цэвэрлэгээ." } },
                { t: { en: "Report & repeat", mn: "Тайлан, давтах" }, d: { en: "Weekly insights, next tests.", mn: "7 хоногийн тайлан, дараагийн тест." } },
              ].map((s, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  className="rounded-2xl border p-6 bg-slate-900/40 backdrop-blur hover:shadow-xl transition"
                >
                  <div className="flex items-center gap-2 text-sm opacity-70 mb-1">{i + 1}.</div>
                  <div className="font-semibold text-lg">{t(s.t)}</div>
                  <p className="text-sm text-slate-300 mt-1">{t(s.d)}</p>
                </motion.li>
              ))}
            </motion.ol>
          </section> */}

          {/* PRICING */}
          <section id="pricing" className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
            <div className="flex items-center gap-2 mb-6">
              <BadgeCheck className="h-5 w-5" />
              <h2 className="text-2xl md:text-3xl font-bold">
                {lang === "en" ? "Pricing" : "Үнийн санал"}
              </h2>
            </div>

            {/* Controls: track left, currency right */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {/* Track toggle (left) */}
              <div className="inline-flex rounded-2xl border overflow-hidden">
                {OFFER_TRACKS.map((o) => {
                  const label = lang === "en" ? o.labelEn : o.labelMn;
                  const active = track === o.key;
                  return (
                    <button
                      key={o.key}
                      onClick={() => setTrack(o.key)}
                      className={`px-4 py-2 text-sm ${active ? "bg-white text-black" : "hover:bg-slate-900"}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Currency toggle (right) */}
              <div className="inline-flex rounded-2xl border overflow-hidden ml-auto">
                <button
                  onClick={() => setCurrency("MNT")}
                  className={`px-4 py-2 text-sm ${currency === "MNT" ? "bg-white text-black" : "hover:bg-slate-900"}`}
                >
                  MNT
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-4 py-2 text-sm ${currency === "USD" ? "bg-white text-black" : "hover:bg-slate-50 hover:bg-slate-900"}`}
                >
                  USD
                </button>
              </div>
            </div>

            <motion.div
              className="grid md:grid-cols-3 gap-6 items-stretch"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              {orderedPlans.map((p, i) => (
                <motion.div key={i} variants={fadeUp} className="h-full">
                  <Plan
                    name={p.name}
                    tagline={p.tagline}
                    features={p.features}
                    highlight={p.highlight}
                    rawPrice={p.price}
                    adSpendNote={p.adSpendNote}
                    promise={p.promise}
                    currency={currency}
                    USD_TO_MNT={USD_TO_MNT}
                    lang={lang}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* <p className="text-xs text-slate-400 mt-4">
              {lang === "en"
                ? "Includes monthly management. Ad budgets listed are separate client spend; adjustable. No long-term lock-ins."
                : "Сарын менежмент багтсан. Дурдсан зарын төсөв нь харилцагчийн тусдаа зардал; өөрчилж болно. Урт хугацааны гэрээ шаардлагагүй."}
            </p> */}
          </section>

          {/* TESTIMONIALS */}
          <section className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {lang === "en" ? "What clients say" : "Харилцагчдын сэтгэгдэл"}
            </h2>
            <motion.div
              className="grid md:grid-cols-3 gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              {[
                { n: "Park Lex 60 Dental - Dr. Stephanie Dumanian", q: "Scaledy агентлагтай хамтран ажилласнаар бидний онлайн үйл ажиллагаа бүхэлдээ өөрчлөгдсөн. Тэдний тодорхой стратеги, бүтээлч гүйцэтгэл, тасралтгүй харилцаа нь алхам бүрт бидэнд итгэл төрүүлсэн. Бид тоон үзүүлэлтээр батлагдсан  өсөлтөө харсан бөгөөд бидний амжилтад өөрсдийнх юм шиг хөрөнгө оруулж байгаа хамтран ажиллагч байгууллагатай болсондоо баяртай байна." },
                { n: "Maui Nui Venison - Jake Muise", q: "Эхнээсээ л багийнхан асар их эрч хүч, мэргэжлийн ур чадвараа бидний төсөлд зориулсан. Манай зорилгыг ойлгож, тэдгээрийг хэрэгжүүлж болохуйц үр дүн болгож чадсан нь үнэхээр гайхалтай. Аливаа campaign хүлээлтээс давж байсан бөгөөд урт хугацааны үнэ цэнийг бий болгоход чин сэтгэлээсээ ханддаг нь илт харагддаг." },
                { n: "The Folklore Shop - Amira Rasool", q: "Энэ хамт олонтой ажилласнаар үнэхээр шинэхэн, таатай туршлагыг мэдэрлээ. Тэд мэргэжлийн ур чадвараа чин сэтгэлээсэй, хүсэл тэмүүлэлтэйгээ хослуулдаг бөгөөд энэ нь үр дүнд нь илт харагддаг. Тэдний санал, түргэн шуурхай байдал, бүтээлч байдал нь бидний бизнесийг төсөөлснөөс ч хурдан өсгөх боломжийг нээж өгсөн." },
              ].map((r, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="rounded-2xl border p-6 bg-slate-900/40 backdrop-blur hover:shadow-xl transition"
                >
                  <div className="text-sm opacity-70" style={{ color: "#FFD700" }}>★ ★ ★ ★ ★</div>
                  <p className="mt-3">{r.q}</p>
                  <div className="mt-4 text-sm opacity-70">— {r.n}</div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* FAQ */}
          <section className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">FAQ</h2>
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              {faq(lang).map((f, i) => (
                <motion.div key={i} variants={fadeUp} className="rounded-2xl border p-6">
                  <div className="font-semibold">{f.q}</div>
                  <p className="text-sm text-slate-300 mt-2">{f.a}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* CONTACT (hook up ApplyForm if desired)
          <section id="contact" className="mx-auto max-w-3xl px-6 md:px-8 py-16 md:py-20">
            <ApplyForm />
          </section>
          */}

          {/* FOOTER */}
          <footer className="border-t border-slate-800">
            <div className="mx-auto max-w-7xl px-6 md:px-8 py-10 text-sm flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="opacity-80">
                © {new Date().getFullYear()} {brand}. {lang === "en" ? "All rights reserved." : "Бүх эрх хуулиар хамгаалагдсан."}
              </div>
              <div className="hidden md:flex items-center gap-6 md:gap-8 opacity-80">
                {nav.map((n) => (
                  <a key={n.id} href={`${n.id}`} className="hover:opacity-100">
                    {t({ en: n.en, mn: n.mn })}
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

// ---------- components ----------
function Header({ brand, nav, lang, setLang, currency, setCurrency, dark, setDark, mobileOpen, setMobileOpen, elevate }) {
  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-slate-800/60 transition-shadow ${
        elevate ? "shadow-md shadow-black/20" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-4 flex items-center justify-between">
        <a href="/" className="font-bold text-lg tracking-tight flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-5 w-auto" />
          {brand}
        </a>
        <nav className="hidden md:flex gap-6 text-sm">
          {nav.map((n) => (
            <a key={n.id} href={`${n.id}`} className="hover:opacity-80 font-medium">
              {lang === "en" ? n.en : n.mn}
            </a>
          ))}
        </nav>
        {/* nemeh */}
        {/* <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setLang((p) => (p === "en" ? "mn" : "en"))}
            className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs hover:bg-slate-900"
            aria-label="Toggle language"
          >
            {lang.toUpperCase()}
          </button>
        </div> */}
        {/* nemeh */}
        {/* Mobile */}
        <button className="md:hidden rounded-xl border p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", stiffness: 220, damping: 30 }}
              className="fixed right-0 top-0 h-[calc(100vh)] z-[50] w-80 border-l border-white/10 bg-slate-900 shadow-black/20 rounded-l-lg p-6 overflow-y-auto"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-white/90">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-3">
                {nav.map((n) => (
                  <a
                    key={n.id}
                    href={`${n.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-2 py-2 text-sm text-white/80 transition-all duration-500 hover:bg-white/5 hover:text:white font-semibold"
                  >
                    {lang === "en" ? n.en : n.mn}
                  </a>
                ))}

                <a
                  href="/apply"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-2 text-sm font-medium text-black transition-all duration-300 hover:shadow-xl"
                >
                  Get Proposal <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function Counter({ end, label, decimals = 0, suffix = "" }) {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const dur = 900;
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = end * eased;
      setValue(current);
      if (p < 1) requestAnimationFrame(step);
      else setDone(true); // when finished
    };
    requestAnimationFrame(step);
  }, [visible, end]);

  const fmt = (n) => {
    if (decimals) return n.toFixed(decimals);
    if (n >= 1_000_000) return Math.round(n / 100_000) / 10 + "M";
    if (n >= 1_000) return Math.round(n / 100) / 10 + "k";
    return Math.round(n).toString();
  };

  return (
    <div
      ref={ref}
      className="rounded-2xl border p-6 flex items-center gap-6 md:gap-8 bg-slate-900/40 backdrop-blur hover:shadow-xl transition"
    >
      <CircleCheck className="h-5 w-5" />
      <div>
        <div className="text-3xl font-extrabold">
          {fmt(value)}
          {done && suffix && <span className="ml-1">{suffix}</span>}
        </div>
        <div className="text-sm opacity-70">{label}</div>
      </div>
    </div>
  );
}



function ServiceCard({ icon, title, bullets }) {
  return (
    <div className="group rounded-2xl border p-6 bg-slate-900/40 backdrop-blur hover:shadow-2xl hover:-translate-y-0.5 transition duration-500 ease-in-out will-change-transform">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <div className="font-semibold text-lg">{title}</div>
      </div>
      <ul className="space-y-2 text-sm text-slate-300">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="h-4 w-4 mt-0.5" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaseCard({ brand, result, desc, lang }) {
  return (
    <div className="group rounded-2xl border p-6 bg-slate-900/40 backdrop-blur hover:shadow-2xl hover:-translate-y-0.5 transition duration-500 ease-in-out will-change-transform">
      <div className="aspect-video rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 mb-4" />
      <div className="font-semibold">{brand}</div>
      <div className="text-sm opacity-70 mt-1">{result}</div>
      <p className="text-sm text-slate-300 mt-2">{desc}</p>
      <a href="/apply" className="mt-3 inline-flex items-center text-indigo-600 group-hover:opacity-100 opacity-90">
        {lang === "en" ? "Request full case" : "Дэлгэрэнгүй үзэх"} <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

function Plan({
  name,
  tagline,
  features,
  highlight,
  rawPrice,     // number (MNT) or { usd: number }
  adSpendNote,  // string
  promise,      // string | null
  currency,
  USD_TO_MNT,
  lang,
}) {
  const price = formatPrice(rawPrice, currency, USD_TO_MNT);

  return (
    <div className={`h-full rounded-2xl border p-6 flex flex-col bg-slate-900/40 backdrop-blur hover:shadow-2xl hover:-translate-y-0.5 transition duration-500 ease-in-out ${highlight ? "ring-2 ring-indigo-600" : ""}`}>
      <div className="mb-1 text-xs uppercase tracking-wider opacity-70">{tagline}</div>
      <div className="text-2xl font-bold">{name}</div>
      <div className="mt-3 text-3xl font-extrabold">{price}</div>

      {adSpendNote && (
        <div className="mt-1 text-xs opacity-70">
          {lang === "en" ? "Ad spend:" : "Зарын төсөв:"} {adSpendNote}
        </div>
      )}

      {promise && (
        <div className="mt-3 text-sm rounded-xl border px-3 py-2 bg-white/5">
          <span className="font-semibold">{lang === "en" ? "Deliverable Promise:" : "Амлалт:"}</span>{" "}
          {promise}
        </div>
      )}

      {/* Scrollable features area; fills remaining space */}
      <div className="mt-5 flex-1 min-h-0 overflow-auto pr-1 features-scroll">
        <ul className="space-y-2 text-sm text-slate-300">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="h-4 w-4 mt-0.5" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        to="/apply"
        className={`mt-6 relative inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium ${highlight ? "bg-white text-black" : "border"}`}
      >
        {lang === "en" ? "Apply Now" : "Хүсэлт гаргах"}
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <span className="absolute inset-y-0 -left-1/2 w-1/3 translate-x-[-120%] bg-black/10 blur-sm animate-[sheen_1.2s_ease-in-out_infinite]" />
        </span>
      </Link>
    </div>
  );
}

function faq(lang) {
  return [
    {
      q: lang === "en" ? "How fast can we launch?" : "Та бүхэнтэй хэрхэн харилцах вэ, тогтмол тайлан, дуудлага хийдэг үү?",
      a: lang === "en" ? "Most brands launch within 7–10 days after audit and setup." : "Бид 7 хоног тутамд KPI тайлан илгээж, стратегийн дуудлага хийдэг. Өдөр тутмын асуулт, лавлагаа чат болон имэйлээр шуурхай хариулна.",
    },
    {
      q: lang === "en" ? "Do you need long-term contracts?" : "Хэрэв манай бизнес шинээр эхэлж байгаа бол та бүхэн хамтран ажиллах уу?",
      a: lang === "en" ? "No. Month-to-month with clear KPIs." : "Тийм ээ. Шинээр эхэлж буй брэндүүдэд зориулсан Starter Growth багц бий. Энэ нь зөв системийг эхнээс нь суурилуулж, борлуулалтыг тогтвортой болгоход тусална.",
    },
    {
      q: lang === "en" ? "Can you work with my existing creatives?" : "Бидний Facebook/Instagram account дээр шууд ажиллах уу, эсвэл шинэ account нээх үү?",
      a: lang === "en" ? "Yes — we test your assets and supply new angles if needed." : "Хэрэв танай social account-ууд бэлэн бол бид шууд ажиллаж эхэлнэ. Хэрэвээ дутуу байвал бид дутагдаж буй хэсгийг нөхөж, бүрэн бэлтгэсний дараа эхлүүлнэ",
    },
    {
      q: lang === "en" ? "Which industries do you support?" : "Монголын зах зээлд л чиглэдэг үү, эсвэл олон улсад зар явуулж болох уу?",
      a: lang === "en" ? "E-commerce and local services (beauty, fitness, education, food, more)." : "Энэ нь танай бизнесийн fulfillment-ээс хамаарна. Хэрэв зөвхөн Монголд хүргэлт хийдэг бол бид Монголын зах зээлд төвлөрнө. Харин олон улсад хүргэх боломжтой бол тухайн улсын зах зээлд зориулж зар сурталчилгаа, стратеги боловсруулж өгнө.",
    },
  ];
}

// --- Background: Starfield & Shooting stars ---
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
          className="absolute rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,.45)]"
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

function Magnetic({ strength = 10, className = "", children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0,
      tx = 0,
      ty = 0,
      vx = 0,
      vy = 0;
    const damp = 0.18;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width - 0.5;
      const my = (e.clientY - r.top) / r.height - 0.5;
      vx = mx * strength;
      vy = my * strength;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      vx = 0;
      vy = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

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

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  );
}
