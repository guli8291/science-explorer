import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ChevronLeft, ChevronRight, Sparkles, Heart, Home, Sun, Moon, Trophy } from "lucide-react";
import { useApp } from "@/store/app";
import type { Lang } from "@/i18n/translations";
import { SpeakButton } from "@/components/SpeakButton";
import data from "@/data/lesson4.json";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lesson4")({ component: Lesson4 });

type L = Record<Lang, string>;
const tt = (s: L, lang: Lang) => s[lang] ?? s.en;

const YOUTUBE_ID = "Pe8t2OFbcKg"; // placeholder family song
const FAMILY_IMG = "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=70";
const CARE_IMG = "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?w=1200&q=70";
const TASK_IMG = "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1200&q=70";
const DAY_IMG = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=70";
const NIGHT_IMG = "https://images.unsplash.com/photo-1532978879514-6cbe2ec9af2c?w=900&q=70";

function Lesson4() {
  const { lang } = useApp();
  const [slide, setSlide] = useState(0);
  const total = 7;

  const labels = {
    back: { kk: "Артқа", ru: "Назад", en: "Back" } as L,
    next: { kk: "Алға", ru: "Далее", en: "Next" } as L,
    page: { kk: "Слайд", ru: "Слайд", en: "Slide" } as L,
    goals: { kk: "Сен:", ru: "Ты:", en: "You will:" } as L,
    keywords: { kk: "Тірек сөздер", ru: "Ключевые слова", en: "Key words" } as L,
    questions: { kk: "Сұрақтар", ru: "Вопросы", en: "Questions" } as L,
    remember: { kk: "Есте сақта!", ru: "Запомни!", en: "Remember!" } as L,
    finish: { kk: "Жарайсың!", ru: "Молодец!", en: "Well done!" } as L,
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-10">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[oklch(0.92_0.08_30)] via-[oklch(0.9_0.1_60)] to-[oklch(0.88_0.1_350)] p-6 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-widest opacity-70">
          {tt(data.subject as L, lang)}
        </p>
        <h1 className="font-display text-2xl font-black sm:text-3xl">
          {tt(data.lesson_title as L, lang)}
        </h1>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={cn(
              "h-2 flex-1 rounded-full transition-all",
              i === slide ? "bg-primary shadow-glow" : i < slide ? "bg-primary/60" : "bg-muted",
            )}
            aria-label={`${tt(labels.page, lang)} ${i + 1}`}
          />
        ))}
      </div>
      <p className="text-center text-sm font-bold text-muted-foreground">
        {tt(labels.page, lang)} {slide + 1} / {total}
      </p>

      {/* Slides */}
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
            {slide === 2 && <SlideFamily lang={lang} labels={labels} />}
            {slide === 3 && <SlideCare lang={lang} labels={labels} />}
            {slide === 4 && <SlideValue lang={lang} labels={labels} />}
            {slide === 5 && <SlideTask lang={lang} />}
            {slide === 6 && <SlideRecap lang={lang} labels={labels} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
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
          className="flex items-center gap-1 rounded-2xl bg-primary px-5 py-3 font-bold text-primary-foreground shadow-glow transition hover:scale-105 disabled:opacity-40"
        >
          {tt(labels.next, lang)} <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

/* ---------- Slide 1: Intro (goals + keywords) ---------- */
function SlideIntro({ lang, labels }: { lang: Lang; labels: Record<string, L> }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-3xl bg-gradient-to-br from-[oklch(0.95_0.04_30)] to-[oklch(0.92_0.06_60)] p-6 shadow-soft">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[oklch(0.7_0.18_60)]" />
          <h2 className="font-display text-xl font-bold">{tt(labels.goals, lang)}</h2>
        </div>
        <ul className="space-y-3">
          {data.intro.goals.map((g, i) => {
            const text = tt(g as L, lang);
            return (
              <li key={i} className="flex items-start gap-2 rounded-2xl bg-card/70 p-3">
                <SpeakButton id={`g-${i}`} text={text} />
                <p className="text-sm leading-relaxed">{text}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="rounded-3xl bg-gradient-to-br from-[oklch(0.93_0.06_350)] to-[oklch(0.9_0.08_20)] p-6 shadow-soft">
        <div className="mb-3 flex items-center gap-2">
          <Heart className="h-5 w-5 text-[oklch(0.65_0.18_25)]" />
          <h2 className="font-display text-xl font-bold">{tt(labels.keywords, lang)}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.intro.keywords.map((k, i) => {
            const text = tt(k as L, lang);
            return (
              <div
                key={i}
                className="flex items-center gap-1.5 rounded-full bg-card px-4 py-2 shadow-soft"
              >
                <span className="font-bold">{text}</span>
                <SpeakButton id={`k-${i}`} text={text} className="h-6 w-6" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- Slide 2: How does a family live? (text + video) ---------- */
function SlideOverview({ lang }: { lang: Lang }) {
  const t = data.intro_text;
  const title = tt(t.title as L, lang);
  return (
    <div className="space-y-5 rounded-3xl bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <SpeakButton id="ov-title" text={title} />
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-3">
          {t.paragraphs.map((p, i) => {
            const text = tt(p as L, lang);
            return (
              <div key={i} className="flex items-start gap-2 rounded-2xl bg-muted/60 p-3">
                <SpeakButton id={`ov-${i}`} text={text} />
                <p className="text-base leading-relaxed">{text}</p>
              </div>
            );
          })}
        </div>
        <div className="overflow-hidden rounded-2xl aspect-video bg-black shadow-soft">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
            title="family video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Slide 3: Akmaral's family — image + questions ---------- */
function SlideFamily({ lang, labels }: { lang: Lang; labels: Record<string, L> }) {
  const f = data.family_questions;
  const title = tt(f.title as L, lang);
  return (
    <div className="space-y-5 rounded-3xl bg-gradient-to-br from-[oklch(0.95_0.04_20)] to-[oklch(0.93_0.05_350)] p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <Home className="h-6 w-6 text-[oklch(0.6_0.18_30)]" />
        <SpeakButton id="fam-title" text={title} />
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src={FAMILY_IMG}
          alt="family"
          className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
        />
        <div className="space-y-2 rounded-2xl bg-card/80 p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <h3 className="font-display text-lg font-bold">{tt(labels.questions, lang)}</h3>
          </div>
          <ul className="space-y-2">
            {f.questions.map((q, i) => {
              const text = tt(q as L, lang);
              return (
                <motion.li
                  key={i}
                  initial={{ x: 12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2 rounded-xl bg-muted/60 p-2.5"
                >
                  <SpeakButton id={`fq-${i}`} text={text} className="h-7 w-7" />
                  <p className="text-sm leading-relaxed">
                    <span className="mr-1 font-bold text-[oklch(0.6_0.18_30)]">{i + 1}.</span>
                    {text}
                  </p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- Slide 4: What is care? ---------- */
function SlideCare({ lang, labels }: { lang: Lang; labels: Record<string, L> }) {
  const c = data.care_block;
  const title = tt(c.title as L, lang);
  const def = tt(c.definition as L, lang);
  return (
    <div className="space-y-5 rounded-3xl bg-gradient-to-br from-[oklch(0.94_0.05_220)] to-[oklch(0.92_0.05_180)] p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <Heart className="h-6 w-6 text-[oklch(0.6_0.2_20)]" />
        <SpeakButton id="care-title" text={title} />
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src={CARE_IMG}
          alt="care"
          className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
        />
        <div className="space-y-2 rounded-2xl bg-card/80 p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <h3 className="font-display text-lg font-bold">{tt(labels.questions, lang)}</h3>
          </div>
          <ul className="space-y-2">
            {c.questions.map((q, i) => {
              const text = tt(q as L, lang);
              return (
                <li key={i} className="flex items-start gap-2 rounded-xl bg-muted/60 p-2.5">
                  <SpeakButton id={`cq-${i}`} text={text} className="h-7 w-7" />
                  <p className="text-sm leading-relaxed">
                    <span className="mr-1 font-bold text-[oklch(0.55_0.18_220)]">{i + 1}.</span>
                    {text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex items-start gap-3 rounded-2xl border-2 border-[oklch(0.85_0.12_25)] bg-[oklch(0.97_0.03_25)] p-4">
        <span className="text-2xl">⭐</span>
        <div className="flex-1">
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[oklch(0.55_0.18_25)]">
            {tt(labels.remember, lang)}
          </p>
          <div className="flex items-start gap-2">
            <SpeakButton id="def" text={def} />
            <p className="font-semibold leading-relaxed">{def}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Slide 5: Value (Есте сақта) ---------- */
function SlideValue({ lang, labels }: { lang: Lang; labels: Record<string, L> }) {
  const text = tt(data.value_block as L, lang);
  return (
    <div className="flex min-h-[420px] items-center justify-center rounded-3xl bg-gradient-to-br from-[oklch(0.95_0.06_30)] via-[oklch(0.93_0.08_350)] to-[oklch(0.91_0.08_320)] p-8 shadow-soft">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-2xl rounded-3xl border-2 border-[oklch(0.8_0.12_25)] bg-card p-8 shadow-glow"
      >
        <div className="mb-4 flex items-center justify-center gap-2">
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="text-4xl"
          >
            ⭐
          </motion.span>
          <h2 className="font-display text-2xl font-black text-[oklch(0.55_0.18_25)]">
            {tt(labels.remember, lang)}
          </h2>
        </div>
        <div className="flex items-start gap-3">
          <SpeakButton id="val" text={text} />
          <p className="text-lg leading-relaxed font-medium">{text}</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Slide 6: Task — tell about your family ---------- */
function SlideTask({ lang }: { lang: Lang }) {
  const t = data.task_block;
  const title = tt(t.title as L, lang);
  return (
    <div className="space-y-5 rounded-3xl bg-gradient-to-br from-[oklch(0.94_0.07_120)] to-[oklch(0.9_0.08_100)] p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-[oklch(0.7_0.18_120)] px-3 py-1 text-xs font-black uppercase tracking-wider text-white">
          {lang === "kk" ? "Тапсырма" : lang === "ru" ? "Задание" : "Task"}
        </span>
        <SpeakButton id="task-title" text={title} />
      </div>
      <div className="rounded-2xl bg-card p-5 shadow-soft">
        <div className="mb-4 flex items-start gap-2">
          <span className="text-2xl">💬</span>
          <h2 className="font-display text-xl font-bold">{title}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <motion.img
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={TASK_IMG}
            alt="family together"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
          />
          <ul className="space-y-2">
            {t.prompts.map((p, i) => {
              const text = tt(p as L, lang);
              return (
                <motion.li
                  key={i}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-start gap-2 rounded-xl bg-muted/60 p-3"
                >
                  <SpeakButton id={`tp-${i}`} text={text} className="h-7 w-7" />
                  <p className="text-sm leading-relaxed">{text}</p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- Slide 7: Recap — "About me" section ---------- */
function SlideRecap({ lang, labels }: { lang: Lang; labels: Record<string, L> }) {
  const r = data.recap_block;
  const title = tt(r.title as L, lang);
  const finalTask = tt(r.final_task as L, lang);

  useMemo(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => confetti({ particleCount: 100, spread: 80, origin: { y: 0.3 } }), 250);
    }
  }, []);

  return (
    <div className="space-y-5 rounded-3xl bg-gradient-to-br from-[oklch(0.94_0.06_350)] to-[oklch(0.92_0.07_30)] p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring" }}
        >
          <Trophy className="h-7 w-7 text-[oklch(0.7_0.18_85)]" />
        </motion.div>
        <SpeakButton id="rc-title" text={title} />
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-card/80 p-4">
          <h3 className="mb-2 font-display text-lg font-bold">
            {lang === "kk" ? "Сен білдің:" : lang === "ru" ? "Ты узнал:" : "You learned:"}
          </h3>
          <ul className="space-y-2">
            {r.you_learned.map((it, i) => {
              const text = tt(it as L, lang);
              return (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[oklch(0.6_0.18_30)]" />
                  <SpeakButton id={`yl-${i}`} text={text} className="h-6 w-6" />
                  <p className="text-sm leading-relaxed">{text}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="rounded-2xl bg-card/80 p-4">
          <h3 className="mb-2 font-display text-lg font-bold">
            {lang === "kk"
              ? "Сұрақтарға жауап бер"
              : lang === "ru"
                ? "Ответь на вопросы"
                : "Answer the questions"}
          </h3>
          <ul className="space-y-2">
            {r.questions.map((q, i) => {
              const text = tt(q as L, lang);
              return (
                <li key={i} className="flex items-start gap-2 rounded-xl bg-muted/50 p-2">
                  <SpeakButton id={`rq-${i}`} text={text} className="h-6 w-6" />
                  <p className="text-sm leading-relaxed">
                    <span className="mr-1 font-bold text-[oklch(0.6_0.18_30)]">{i + 1}.</span>
                    {text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Final task — day vs night */}
      <div className="rounded-2xl bg-card p-5 shadow-soft">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-[oklch(0.7_0.18_120)] px-3 py-1 text-xs font-black uppercase tracking-wider text-white">
            {lang === "kk"
              ? "Тапсырманы орында"
              : lang === "ru"
                ? "Выполни задание"
                : "Do the task"}
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="flex items-start gap-2">
            <SpeakButton id="rt" text={finalTask} />
            <p className="text-sm leading-relaxed">{finalTask}</p>
          </div>
          <div className="flex gap-2">
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl shadow-soft">
              <img src={DAY_IMG} alt="day" className="h-full w-full object-cover" />
              <div className="absolute left-1 top-1 rounded-full bg-white/80 p-1">
                <Sun className="h-4 w-4 text-[oklch(0.7_0.18_85)]" />
              </div>
            </div>
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl shadow-soft">
              <img src={NIGHT_IMG} alt="night" className="h-full w-full object-cover" />
              <div className="absolute left-1 top-1 rounded-full bg-white/80 p-1">
                <Moon className="h-4 w-4 text-[oklch(0.45_0.12_270)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 pt-2">
        {["⭐", "⭐", "⭐"].map((s, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
            className="text-4xl drop-shadow"
          >
            {s}
          </motion.span>
        ))}
        <span className="ml-2 font-display text-xl font-black text-[oklch(0.55_0.18_30)]">
          {tt(labels.finish, lang)}
        </span>
      </div>
    </div>
  );
}
