import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  School,
  BookOpen,
  Trophy,
  Check,
  X,
} from "lucide-react";
import { useApp } from "@/store/app";
import type { Lang } from "@/i18n/translations";
import { SpeakButton } from "@/components/SpeakButton";
import data from "@/data/lesson5.json";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lesson5")({ component: Lesson5 });

type L = Record<Lang, string>;
const tt = (s: L, lang: Lang) => s[lang] ?? s.en;

const YOUTUBE_ID = "MUQfKFzIOeU";
const SCHOOL_IMG = "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=70";
const CLASSROOM_IMG = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=70";
const LIBRARY_IMG = "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=70";
const NURSE_IMG = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=70";

function Lesson5() {
  const { lang } = useApp();
  const [slide, setSlide] = useState(0);
  const total = 8;

  const labels = {
    back: { kk: "Артқа", ru: "Назад", en: "Back" } as L,
    next: { kk: "Алға", ru: "Далее", en: "Next" } as L,
    page: { kk: "Слайд", ru: "Слайд", en: "Slide" } as L,
    goals: { kk: "Сен:", ru: "Ты:", en: "You will:" } as L,
    keywords: { kk: "Тірек сөздер", ru: "Ключевые слова", en: "Key words" } as L,
    questions: { kk: "Сұрақтар", ru: "Вопросы", en: "Questions" } as L,
    remember: { kk: "Есте сақта!", ru: "Запомни!", en: "Remember!" } as L,
    tasks: {
      kk: "Сұрақтар мен тапсырмалар",
      ru: "Вопросы и задания",
      en: "Questions & tasks",
    } as L,
    check: { kk: "Жауапты тексеру", ru: "Проверить", en: "Check answer" } as L,
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-10">
      <div className="rounded-3xl bg-gradient-to-r from-[oklch(0.92_0.08_220)] via-[oklch(0.93_0.07_180)] to-[oklch(0.9_0.08_140)] p-6 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-widest opacity-70">
          {tt(data.subject as L, lang)}
        </p>
        <h1 className="font-display text-2xl font-black sm:text-3xl">
          {tt(data.lesson_title as L, lang)}
        </h1>
      </div>

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
            {slide === 1 && <SlideOverview lang={lang} labels={labels} />}
            {slide === 2 && <SlideRule lang={lang} labels={labels} />}
            {slide === 3 && <SlideClassroom lang={lang} />}
            {slide === 4 && <SlideRooms lang={lang} labels={labels} />}
            {slide === 5 && <SlideAnswerTask lang={lang} />}
            {slide === 6 && <SlideRoleTask lang={lang} />}
            {slide === 7 && <SlideResearch lang={lang} labels={labels} />}
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
          className="flex items-center gap-1 rounded-2xl bg-primary px-5 py-3 font-bold text-primary-foreground shadow-glow transition hover:scale-105 disabled:opacity-40"
        >
          {tt(labels.next, lang)} <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function SlideIntro({ lang, labels }: { lang: Lang; labels: Record<string, L> }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-3xl bg-gradient-to-br from-[oklch(0.95_0.05_220)] to-[oklch(0.93_0.06_180)] p-6 shadow-soft">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[oklch(0.6_0.18_220)]" />
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
      <div className="rounded-3xl bg-gradient-to-br from-[oklch(0.93_0.06_30)] to-[oklch(0.9_0.08_60)] p-6 shadow-soft">
        <div className="mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[oklch(0.6_0.18_30)]" />
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

function SlideOverview({ lang, labels }: { lang: Lang; labels: Record<string, L> }) {
  const title = tt(data.overview.title as L, lang);
  return (
    <div className="space-y-5 rounded-3xl bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <School className="h-6 w-6 text-[oklch(0.6_0.18_220)]" />
        <SpeakButton id="ov-title" text={title} />
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-3">
          <img
            src={SCHOOL_IMG}
            alt="school"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
          />
          <div className="overflow-hidden rounded-2xl aspect-video bg-black shadow-soft">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
              title="school video"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div className="rounded-2xl bg-muted/60 p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <h3 className="font-display text-lg font-bold">{tt(labels.questions, lang)}</h3>
          </div>
          <ul className="space-y-2">
            {data.overview.questions.map((q, i) => {
              const text = tt(q as L, lang);
              return (
                <li key={i} className="flex items-start gap-2 rounded-xl bg-card p-2.5">
                  <SpeakButton id={`oq-${i}`} text={text} className="h-7 w-7" />
                  <p className="text-sm leading-relaxed">
                    <span className="mr-1 font-bold text-[oklch(0.6_0.18_220)]">{i + 1}.</span>
                    {text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SlideRule({ lang, labels }: { lang: Lang; labels: Record<string, L> }) {
  const [answer, setAnswer] = useState("");
  const rule = tt(data.rule_block.rule as L, lang);
  const task = tt(data.rule_block.task as L, lang);
  return (
    <div className="space-y-5 rounded-3xl bg-gradient-to-br from-[oklch(0.95_0.05_30)] to-[oklch(0.93_0.06_60)] p-6 shadow-soft">
      <div className="flex items-start gap-3 rounded-2xl border-2 border-[oklch(0.8_0.12_25)] bg-card p-5">
        <span className="text-2xl">⭐</span>
        <div className="flex-1">
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[oklch(0.55_0.18_25)]">
            {tt(labels.remember, lang)}
          </p>
          <div className="flex items-start gap-2">
            <SpeakButton id="r" text={rule} />
            <p className="text-lg font-semibold leading-relaxed">{rule}</p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-card p-5">
        <div className="mb-3 flex items-center gap-2">
          <SpeakButton id="t" text={task} />
          <h3 className="font-display text-lg font-bold">{task}</h3>
        </div>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={4}
          placeholder="..."
          className="w-full rounded-2xl border-2 border-border bg-background p-3 outline-none focus:border-primary"
        />
      </div>
    </div>
  );
}

function SlideClassroom({ lang }: { lang: Lang }) {
  const title = tt(data.classroom_block.title as L, lang);
  const q = tt(data.classroom_block.question as L, lang);
  return (
    <div className="space-y-5 rounded-3xl bg-gradient-to-br from-[oklch(0.94_0.06_220)] to-[oklch(0.92_0.05_180)] p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <SpeakButton id="ct" text={title} />
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src={CLASSROOM_IMG}
          alt="classroom"
          className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
        />
        <div className="flex items-center rounded-2xl bg-card p-5">
          <div className="flex items-start gap-2">
            <SpeakButton id="cq" text={q} />
            <p className="text-lg font-semibold leading-relaxed">{q}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideRooms({ lang, labels }: { lang: Lang; labels: Record<string, L> }) {
  const intro = tt(data.rooms_block.intro as L, lang);
  return (
    <div className="space-y-5 rounded-3xl bg-gradient-to-br from-[oklch(0.94_0.06_140)] to-[oklch(0.92_0.05_180)] p-6 shadow-soft">
      <div className="flex items-start gap-2 rounded-2xl bg-card p-4">
        <SpeakButton id="ri" text={intro} />
        <p className="text-base font-medium leading-relaxed">{intro}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src={LIBRARY_IMG}
          alt="library"
          className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
        />
        <div className="space-y-3">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <h3 className="font-display text-lg font-bold">{tt(labels.questions, lang)}</h3>
          </div>
          {data.rooms_block.questions.map((q, i) => {
            const text = tt(q as L, lang);
            return (
              <div key={i} className="flex items-start gap-2 rounded-xl bg-card p-3">
                <SpeakButton id={`rq-${i}`} text={text} className="h-7 w-7" />
                <p className="text-sm leading-relaxed">
                  <span className="mr-1 font-bold text-[oklch(0.55_0.18_140)]">{i + 1}.</span>
                  {text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SlideAnswerTask({ lang }: { lang: Lang }) {
  const [answer, setAnswer] = useState("");
  const title = tt(data.answer_task.title as L, lang);
  const prompt = tt(data.answer_task.prompt as L, lang);
  return (
    <div className="space-y-5 rounded-3xl bg-gradient-to-br from-[oklch(0.94_0.07_120)] to-[oklch(0.92_0.07_60)] p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-[oklch(0.65_0.18_140)] px-3 py-1 text-xs font-black uppercase tracking-wider text-white">
          {lang === "kk" ? "Тапсырма" : lang === "ru" ? "Задание" : "Task"}
        </span>
        <SpeakButton id="at" text={title} />
        <h2 className="font-display text-xl font-bold">{title}</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <motion.img
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src={NURSE_IMG}
          alt="nurse"
          className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
        />
        <div className="rounded-2xl bg-card p-4">
          <div className="mb-3 flex items-start gap-2">
            <SpeakButton id="ap" text={prompt} />
            <p className="text-base font-semibold leading-relaxed">{prompt}</p>
          </div>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={5}
            placeholder="..."
            className="w-full rounded-2xl border-2 border-border bg-background p-3 outline-none focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
}

function SlideRoleTask({ lang }: { lang: Lang }) {
  const title = tt(data.role_task.title as L, lang);
  const intro = tt(data.role_task.intro as L, lang);
  return (
    <div className="space-y-5 rounded-3xl bg-gradient-to-br from-[oklch(0.94_0.06_30)] to-[oklch(0.92_0.07_350)] p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <Heart className="h-6 w-6 text-[oklch(0.6_0.2_30)]" />
        <SpeakButton id="rt" text={title} />
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      <div className="flex items-start gap-2 rounded-2xl bg-card p-4">
        <SpeakButton id="ri" text={intro} />
        <p className="text-base font-semibold leading-relaxed">{intro}</p>
      </div>
      <ul className="grid gap-3 md:grid-cols-2">
        {data.role_task.rules.map((r, i) => {
          const text = tt(r as L, lang);
          return (
            <motion.li
              key={i}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-2 rounded-2xl bg-card p-4 shadow-soft"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[oklch(0.7_0.18_30)] text-sm font-bold text-white">
                {i + 1}
              </span>
              <SpeakButton id={`rr-${i}`} text={text} className="h-7 w-7" />
              <p className="text-sm leading-relaxed">{text}</p>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

function SlideResearch({ lang, labels }: { lang: Lang; labels: Record<string, L> }) {
  const title = tt(data.research_task.title as L, lang);
  const prompt = tt(data.research_task.prompt as L, lang);
  const [picked, setPicked] = useState<Set<number>>(new Set());
  const [checked, setChecked] = useState(false);

  const toggle = (i: number) => {
    if (checked) return;
    setPicked((p) => {
      const n = new Set(p);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });
  };

  const check = () => {
    setChecked(true);
    const allCorrect = data.research_task.options.every((o, i) => picked.has(i) === !o.atSchool);
    if (allCorrect) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.3 } });
    }
  };

  return (
    <div className="space-y-5 rounded-3xl bg-gradient-to-br from-[oklch(0.94_0.06_350)] to-[oklch(0.92_0.07_30)] p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <Trophy className="h-6 w-6 text-[oklch(0.7_0.18_85)]" />
        <SpeakButton id="rt2" text={title} />
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      <div className="flex items-start gap-2 rounded-2xl bg-card p-4">
        <SpeakButton id="rp" text={prompt} />
        <p className="text-base font-semibold leading-relaxed">{prompt}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {data.research_task.options.map((o, i) => {
          const isPicked = picked.has(i);
          const isCorrect = checked && isPicked === !o.atSchool;
          const isWrong = checked && isPicked === o.atSchool && (isPicked || !o.atSchool);
          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggle(i)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border-2 bg-card p-4 transition",
                checked && isCorrect
                  ? "border-[oklch(0.7_0.18_140)] bg-[oklch(0.95_0.08_140)]"
                  : checked && isWrong
                    ? "border-destructive bg-destructive/10"
                    : isPicked
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary",
              )}
            >
              <span className="font-bold">{tt(o.label as L, lang)}</span>
              {checked && isCorrect && <Check className="h-5 w-5 text-[oklch(0.6_0.2_140)]" />}
              {checked && isWrong && <X className="h-5 w-5 text-destructive" />}
            </motion.button>
          );
        })}
      </div>
      <div className="flex justify-end">
        <button
          onClick={check}
          disabled={checked}
          className="rounded-full bg-primary px-6 py-2.5 font-bold text-primary-foreground shadow-glow transition hover:scale-105 disabled:opacity-50"
        >
          {tt(labels.check, lang)}
        </button>
      </div>
    </div>
  );
}
