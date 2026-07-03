import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "@/store/app";
import type { Lang } from "@/i18n/translations";
import { SpeakButton } from "@/components/SpeakButton";
import data from "@/data/lesson7.json";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lesson7")({ component: Lesson7 });

type L = Record<Lang, string>;
const tt = (s: L, lang: Lang) => s[lang] ?? s.en;

const YOUTUBE_ID = "MUQfKFzIOeU";
const KIDS_IMG = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=70";
const RULE_IMG = "https://images.unsplash.com/photo-1588072432836-e10032774350?w=1200&q=70";

// Peach palette per prototype
const PEACH_BG = "bg-[oklch(0.92_0.05_40)]";
const PEACH_BG_SOFT = "bg-[oklch(0.95_0.035_40)]";
const SAGE_BG = "bg-[oklch(0.9_0.06_130)]";
const SAGE_TAG = "bg-[oklch(0.78_0.07_90)]";
const GREEN_BORDER = "border-[oklch(0.7_0.13_140)]";
const RED_BORDER = "border-[oklch(0.7_0.18_25)]";

// Decorative watercolor header with cartoon kid avatars
function HeaderBanner() {
  return (
    <div className="relative h-28 overflow-hidden rounded-3xl bg-gradient-to-b from-[oklch(0.88_0.06_220)] via-[oklch(0.93_0.05_140)] to-[oklch(0.96_0.04_100)] shadow-soft sm:h-36">
      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 pb-1">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex h-20 w-20 items-end justify-center rounded-full bg-gradient-to-b from-pink-200 to-pink-300 text-5xl shadow-soft sm:h-24 sm:w-24"
        >
          👧
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex h-20 w-20 items-end justify-center rounded-full bg-gradient-to-b from-blue-200 to-blue-300 text-5xl shadow-soft sm:h-24 sm:w-24"
        >
          👦
        </motion.div>
      </div>
    </div>
  );
}

function KidAvatar() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[oklch(0.7_0.13_140)] bg-gradient-to-br from-pink-100 to-blue-100 text-base shadow-soft">
      👫
    </div>
  );
}

function Lesson7() {
  const { lang } = useApp();
  const [slide, setSlide] = useState(0);
  const total = 5;

  const labels = {
    back: { kk: "Артқа", ru: "Назад", en: "Back" } as L,
    next: { kk: "Алға", ru: "Далее", en: "Next" } as L,
    page: { kk: "слайд", ru: "слайд", en: "slide" } as L,
    goals: { kk: "Сен:", ru: "Ты:", en: "You will:" } as L,
    keywords: { kk: "Тірек сөздер:", ru: "Ключевые слова:", en: "Key words:" } as L,
    remember: { kk: "Есте сақта!", ru: "Запомни!", en: "Remember!" } as L,
  };

  return (
    <div className="mx-auto max-w-5xl space-y-5 pb-10">
      <HeaderBanner />

      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={cn(
              "h-2 flex-1 rounded-full transition-all",
              i === slide
                ? "bg-[oklch(0.65_0.18_30)] shadow-glow"
                : i < slide
                  ? "bg-[oklch(0.75_0.12_30)]"
                  : "bg-muted",
            )}
            aria-label={`${i + 1} ${tt(labels.page, lang)}`}
          />
        ))}
      </div>
      <p className="text-center text-sm font-bold text-muted-foreground">
        {slide + 1} {tt(labels.page, lang)} / {total}
      </p>

      <div className="min-h-[460px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
          >
            {slide === 0 && <SlideIntro lang={lang} labels={labels} />}
            {slide === 1 && <SlideOverview lang={lang} />}
            {slide === 2 && <SlideQuestions lang={lang} />}
            {slide === 3 && <SlidePicture lang={lang} labels={labels} />}
            {slide === 4 && <SlideTasks lang={lang} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setSlide((s) => Math.max(0, s - 1))}
          disabled={slide === 0}
          className="flex items-center gap-1 rounded-2xl bg-card px-5 py-3 font-bold shadow-soft transition hover:scale-105 disabled:opacity-40"
        >
          <ChevronLeft className="h-5 w-5" /> {tt(labels.back, lang)}
        </button>
        <Link
          to="/chapters"
          className="text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          ✕
        </Link>
        <button
          onClick={() => setSlide((s) => Math.min(total - 1, s + 1))}
          disabled={slide === total - 1}
          className="flex items-center gap-1 rounded-2xl bg-[oklch(0.65_0.18_30)] px-5 py-3 font-bold text-white shadow-glow transition hover:scale-105 disabled:opacity-40"
        >
          {tt(labels.next, lang)} <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

/* ───────── Slide 1: Intro ───────── */
function SlideIntro({ lang, labels }: { lang: Lang; labels: Record<string, L> }) {
  const title = tt(data.lesson_title as L, lang);
  return (
    <div className={cn("rounded-3xl p-6 shadow-soft sm:p-8", PEACH_BG)}>
      <div className="mb-5 flex items-start gap-3">
        <SpeakButton id="lt" text={title} />
        <h1 className="font-display text-2xl font-black sm:text-3xl">{title}</h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="mb-2 text-lg font-bold">{tt(labels.goals, lang)}</h2>
          <ul className="space-y-2">
            {data.intro.goals.map((g, i) => {
              const text = tt(g as L, lang);
              return (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />
                  <SpeakButton id={`g-${i}`} text={text} className="h-6 w-6" />
                  <p className="text-sm leading-relaxed">{text}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-bold">{tt(labels.keywords, lang)}</h2>
          <ul className="space-y-2">
            {data.intro.keywords.map((k, i) => {
              const text = tt(k as L, lang);
              return (
                <li key={i} className="flex items-center gap-2">
                  <span className="mt-0 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />
                  <span className="font-semibold underline decoration-foreground/40 underline-offset-4">
                    {text}
                  </span>
                  <SpeakButton id={`k-${i}`} text={text} className="h-6 w-6" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ───────── Slide 2: Overview + Video ───────── */
function SlideOverview({ lang }: { lang: Lang }) {
  const title = tt(data.overview.title as L, lang);
  return (
    <div className={cn("rounded-3xl p-6 shadow-soft sm:p-8", PEACH_BG)}>
      <div className="mb-4 flex items-center gap-3">
        <SpeakButton id="ot" text={title} />
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-3">
          {data.overview.paragraphs.map((p, i) => {
            const text = tt(p as L, lang);
            return (
              <div key={i} className="flex items-start gap-2">
                <SpeakButton id={`op-${i}`} text={text} className="h-6 w-6" />
                <p className="text-[15px] leading-relaxed">{text}</p>
              </div>
            );
          })}
        </div>
        <div className="overflow-hidden self-start rounded-2xl bg-black shadow-soft aspect-video">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
            title="rules video"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

/* ───────── Slide 3: Questions + Image ───────── */
function SlideQuestions({ lang }: { lang: Lang }) {
  const conclusion = tt(data.questions_block.conclusion as L, lang);
  return (
    <div className={cn("space-y-4 rounded-3xl p-6 shadow-soft sm:p-8", PEACH_BG)}>
      <div
        className={cn(
          "relative rounded-2xl border-2 bg-[oklch(0.96_0.025_40)] p-4 pl-5 pt-6",
          GREEN_BORDER,
        )}
      >
        <div className="absolute -left-3 -top-3">
          <KidAvatar />
        </div>
        <ul className="space-y-2">
          {data.questions_block.questions.map((q, i) => {
            const text = tt(q as L, lang);
            return (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />
                <SpeakButton id={`qq-${i}`} text={text} className="h-6 w-6" />
                <p className="text-[15px] leading-relaxed">{text}</p>
              </li>
            );
          })}
        </ul>
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          src={KIDS_IMG}
          alt="kids"
          className="mt-4 aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
        />
      </div>
      <div className="flex items-start gap-2 rounded-2xl bg-card/70 p-4">
        <SpeakButton id="conc" text={conclusion} />
        <p className="text-[15px] font-medium leading-relaxed">{conclusion}</p>
      </div>
    </div>
  );
}

/* ───────── Slide 4: Picture + Remember ───────── */
function SlidePicture({ lang, labels }: { lang: Lang; labels: Record<string, L> }) {
  const q = tt(data.picture_block.question as L, lang);
  const remember = tt(data.picture_block.remember as L, lang);
  return (
    <div className={cn("space-y-4 rounded-3xl p-6 shadow-soft sm:p-8", PEACH_BG)}>
      <div
        className={cn(
          "relative rounded-2xl border-2 bg-[oklch(0.96_0.025_40)] p-4 pl-5 pt-6",
          GREEN_BORDER,
        )}
      >
        <div className="absolute -left-3 -top-3">
          <KidAvatar />
        </div>
        <div className="flex items-start gap-2">
          <SpeakButton id="pq" text={q} className="h-6 w-6" />
          <p className="text-[15px] leading-relaxed">{q}</p>
        </div>
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          src={RULE_IMG}
          alt="rule"
          className="mt-4 aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
        />
      </div>
      <div
        className={cn(
          "flex items-start gap-3 rounded-2xl border-2 bg-[oklch(0.96_0.025_40)] p-4",
          RED_BORDER,
        )}
      >
        <motion.span
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-2xl"
        >
          ⭐
        </motion.span>
        <div className="flex-1">
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[oklch(0.55_0.18_25)]">
            {tt(labels.remember, lang)}
          </p>
          <div className="flex items-start gap-2">
            <SpeakButton id="rem" text={remember} className="h-6 w-6" />
            <p className="font-semibold leading-relaxed">{remember}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Slide 5: Tasks (Analyze + Think) ───────── */
function SlideTasks({ lang }: { lang: Lang }) {
  const tasksTitle = tt(data.tasks.title as L, lang);
  const aTitle = tt(data.tasks.analyze.title as L, lang);
  const aPrompt = tt(data.tasks.analyze.prompt as L, lang);
  const tTitle = tt(data.tasks.think.title as L, lang);
  const tPrompt = tt(data.tasks.think.prompt as L, lang);
  const [a, setA] = useState("");
  const [t, setT] = useState("");

  const submit = () => {
    confetti({ particleCount: 130, spread: 80, origin: { y: 0.3 } });
  };

  return (
    <div className={cn("space-y-5 rounded-3xl p-6 shadow-soft sm:p-8", SAGE_BG)}>
      <div className="inline-flex">
        <div className={cn("rounded-xl px-5 py-2 shadow-soft", SAGE_TAG)}>
          <h2 className="font-display text-xl font-bold">{tasksTitle}</h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Analyze */}
        <div className={cn("rounded-2xl p-5", PEACH_BG_SOFT)}>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[oklch(0.65_0.18_30)] bg-white text-lg">
              💬
            </div>
            <SpeakButton id="at" text={aTitle} className="h-6 w-6" />
            <h3 className="font-display text-lg font-bold">{aTitle}</h3>
          </div>
          <div className={cn("rounded-2xl p-4", PEACH_BG)}>
            <div className="mb-2 flex items-start gap-2">
              <SpeakButton id="ap" text={aPrompt} className="h-6 w-6" />
              <p className="text-sm leading-relaxed">{aPrompt}</p>
            </div>
            <textarea
              value={a}
              onChange={(e) => setA(e.target.value)}
              rows={3}
              placeholder="..."
              className="mt-2 w-full rounded-xl border-2 border-border bg-background p-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Think */}
        <div className={cn("rounded-2xl p-5", PEACH_BG_SOFT)}>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[oklch(0.65_0.18_30)] bg-white text-lg">
              🤔
            </div>
            <SpeakButton id="tt2" text={tTitle} className="h-6 w-6" />
            <h3 className="font-display text-lg font-bold">{tTitle}</h3>
          </div>
          <div className={cn("rounded-2xl p-4", PEACH_BG)}>
            <div className="mb-2 flex items-start gap-2">
              <SpeakButton id="tp" text={tPrompt} className="h-6 w-6" />
              <p className="text-sm leading-relaxed">{tPrompt}</p>
            </div>
            <textarea
              value={t}
              onChange={(e) => setT(e.target.value)}
              rows={3}
              placeholder="..."
              className="mt-2 w-full rounded-xl border-2 border-border bg-background p-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={submit}
          className="rounded-full bg-[oklch(0.65_0.18_30)] px-6 py-2.5 font-bold text-white shadow-glow transition hover:scale-105"
        >
          {lang === "kk" ? "Жіберу" : lang === "ru" ? "Отправить" : "Submit"} 🎉
        </button>
      </div>
    </div>
  );
}
