import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ChevronLeft, ChevronRight, Trophy, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { useApp } from "@/store/app";
import type { Lang } from "@/i18n/translations";
import { SpeakButton } from "@/components/SpeakButton";
import lessonData from "@/data/lesson3.json";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lesson3")({ component: Lesson3 });

type L = Record<Lang, string>;
const tt = (s: L, lang: Lang) => s[lang] ?? s.en;

const YOUTUBE_ID = "Pe8t2OFbcKg"; // placeholder days-of-the-week song
const UNSPLASH = {
  school: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=70",
  picnic: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200&q=70",
};

const SECTORS = [
  {
    key: "morning",
    emoji: "🌅",
    color: "oklch(0.88 0.12 75)",
    label: { kk: "Таң", ru: "Утро", en: "Morning" } as L,
    text: {
      kk: "Біз оянамыз, таңғы ас ішеміз.",
      ru: "Мы просыпаемся и завтракаем.",
      en: "We wake up and have breakfast.",
    } as L,
  },
  {
    key: "day",
    emoji: "☀️",
    color: "oklch(0.85 0.16 220)",
    label: { kk: "Күн", ru: "День", en: "Day" } as L,
    text: {
      kk: "Біз оқимыз, ойнаймыз, үйренеміз.",
      ru: "Мы учимся, играем и узнаём новое.",
      en: "We learn, play and study.",
    } as L,
  },
  {
    key: "evening",
    emoji: "🌇",
    color: "oklch(0.75 0.18 30)",
    label: { kk: "Кеш", ru: "Вечер", en: "Evening" } as L,
    text: {
      kk: "Отбасы үйде жиналады.",
      ru: "Семья собирается дома.",
      en: "The family gathers at home.",
    } as L,
  },
  {
    key: "night",
    emoji: "🌙",
    color: "oklch(0.45 0.12 270)",
    label: { kk: "Түн", ru: "Ночь", en: "Night" } as L,
    text: { kk: "Барлығы ұйықтайды.", ru: "Все спят.", en: "Everyone sleeps." } as L,
  },
];

const TRAIN_COLORS = [
  "oklch(0.72 0.18 25)",
  "oklch(0.78 0.16 60)",
  "oklch(0.82 0.16 100)",
  "oklch(0.72 0.18 160)",
  "oklch(0.7 0.18 220)",
  "oklch(0.65 0.2 290)",
  "oklch(0.68 0.22 340)",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Lesson3() {
  const { lang } = useApp();
  const [slide, setSlide] = useState(0);
  const total = 8;

  const labels = {
    back: { kk: "Артқа", ru: "Назад", en: "Back" } as L,
    next: { kk: "Алға", ru: "Далее", en: "Next" } as L,
    page: { kk: "Бет", ru: "Слайд", en: "Slide" } as L,
    goals: { kk: "Сабақтың мақсаты", ru: "Цели урока", en: "Goals" } as L,
    keywords: { kk: "Тірек сөздер", ru: "Ключевые слова", en: "Key words" } as L,
    check: { kk: "Жауапты тексеру", ru: "Проверить ответ", en: "Check answer" } as L,
    again: { kk: "Қайталау", ru: "Заново", en: "Try again" } as L,
    correct: { kk: "Жарайсың! 🎉", ru: "Молодец! 🎉", en: "Well done! 🎉" } as L,
    wrong: { kk: "Тағы көр", ru: "Попробуй ещё", en: "Try again" } as L,
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-10">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[oklch(0.85_0.12_220)] via-[oklch(0.88_0.1_180)] to-[oklch(0.85_0.14_140)] p-6 text-foreground shadow-soft">
        <p className="text-sm font-bold uppercase tracking-widest opacity-70">
          {tt(lessonData.subject as L, lang)}
        </p>
        <h1 className="font-display text-2xl font-black sm:text-3xl">
          {tt(lessonData.lesson_title as L, lang)}
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
      <div className="min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
          >
            {slide === 0 && <SlideIntro lang={lang} labels={labels} />}
            {slide === 1 && <SlideWheel lang={lang} />}
            {slide === 2 && <SlideTrain lang={lang} />}
            {slide === 3 && <SlideListBg lang={lang} pageIdx={2} bg={UNSPLASH.school} />}
            {slide === 4 && <SlideListBg lang={lang} pageIdx={3} bg={UNSPLASH.picnic} />}
            {slide === 5 && <SlideTimeWords lang={lang} />}
            {slide === 6 && <SlideReorderGame lang={lang} labels={labels} />}
            {slide === 7 && <SlideSummary lang={lang} />}
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

/* ---------- Slide 1: Intro ---------- */
function SlideIntro({ lang, labels }: { lang: Lang; labels: Record<string, L> }) {
  const intro = lessonData.intro_page;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-3xl bg-card p-6 shadow-soft">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[oklch(0.7_0.18_85)]" />
          <h2 className="font-display text-xl font-bold">{tt(labels.goals, lang)}</h2>
        </div>
        <ul className="space-y-3">
          {intro.goals.map((g, i) => {
            const text = tt(g as L, lang);
            return (
              <li key={i} className="flex items-start gap-2 rounded-2xl bg-muted/50 p-3">
                <SpeakButton id={`goal-${i}`} text={text} />
                <p className="text-sm leading-relaxed">{text}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="rounded-3xl bg-gradient-to-br from-[oklch(0.92_0.08_200)] to-[oklch(0.88_0.1_140)] p-6 shadow-soft">
        <h2 className="mb-3 font-display text-xl font-bold">{tt(labels.keywords, lang)}</h2>
        <div className="flex flex-wrap gap-2">
          {intro.keywords.map((k, i) => {
            const text = tt(k as L, lang);
            return (
              <div
                key={i}
                className="flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 shadow-soft"
              >
                <span className="font-bold">{text}</span>
                <SpeakButton id={`kw-${i}`} text={text} className="h-6 w-6" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- Slide 2: Interactive Wheel ---------- */
function SlideWheel({ lang }: { lang: Lang }) {
  const page = lessonData.theory_pages[0];
  const [selected, setSelected] = useState(0);
  const size = 320;
  const r = size / 2;
  // 4 sectors, each 90°
  const sector = (i: number) => {
    const start = (i * 90 - 90) * (Math.PI / 180);
    const end = ((i + 1) * 90 - 90) * (Math.PI / 180);
    const x1 = r + r * Math.cos(start);
    const y1 = r + r * Math.sin(start);
    const x2 = r + r * Math.cos(end);
    const y2 = r + r * Math.sin(end);
    return `M${r},${r} L${x1},${y1} A${r},${r} 0 0 1 ${x2},${y2} Z`;
  };
  const sel = SECTORS[selected];
  const title = tt(page.title as L, lang);
  return (
    <div className="rounded-3xl bg-card p-6 shadow-soft">
      <div className="mb-4 flex items-center gap-2">
        <SpeakButton id="wheel-title" text={title} />
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div className="flex justify-center">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="drop-shadow-xl"
          >
            {SECTORS.map((s, i) => {
              const active = i === selected;
              const mid = (i * 90 - 45) * (Math.PI / 180);
              const tx = r + r * 0.6 * Math.cos(mid);
              const ty = r + r * 0.6 * Math.sin(mid);
              return (
                <g key={s.key} onClick={() => setSelected(i)} className="cursor-pointer">
                  <path
                    d={sector(i)}
                    fill={s.color}
                    stroke="white"
                    strokeWidth={4}
                    opacity={active ? 1 : 0.55}
                    style={{
                      transition: "opacity .3s",
                      transformOrigin: `${r}px ${r}px`,
                      transform: active ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle" fontSize="42">
                    {s.emoji}
                  </text>
                </g>
              );
            })}
            <circle cx={r} cy={r} r={32} fill="white" />
            <text x={r} y={r + 6} textAnchor="middle" fontSize="28">
              ⏰
            </text>
          </svg>
        </div>
        <motion.div
          key={sel.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 shadow-soft"
          style={{ background: `color-mix(in oklch, ${sel.color} 25%, white)` }}
        >
          <div className="mb-2 text-5xl">{sel.emoji}</div>
          <div className="mb-2 flex items-center gap-2">
            <h3 className="font-display text-2xl font-bold">{tt(sel.label, lang)}</h3>
            <SpeakButton id={`sec-${sel.key}`} text={tt(sel.text, lang)} />
          </div>
          <p className="text-base leading-relaxed">{tt(sel.text, lang)}</p>
        </motion.div>
      </div>
      <div className="mt-5 space-y-2">
        {page.paragraphs.map((p, i) => {
          const text = tt(p as L, lang);
          return (
            <div key={i} className="flex items-start gap-2 rounded-2xl bg-muted/50 p-3">
              <SpeakButton id={`wp-${i}`} text={text} />
              <p className="text-sm leading-relaxed">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Slide 3: Train + Video ---------- */
function SlideTrain({ lang }: { lang: Lang }) {
  const page = lessonData.theory_pages[1];
  const title = tt(page.title as L, lang);
  return (
    <div className="space-y-5 rounded-3xl bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <SpeakButton id="train-title" text={title} />
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      <div className="overflow-hidden rounded-2xl aspect-video bg-black shadow-soft">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
          title="video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Train */}
      <div className="rounded-2xl bg-gradient-to-b from-[oklch(0.92_0.08_220)] to-[oklch(0.88_0.06_140)] p-4 overflow-x-auto">
        <div className="flex items-end gap-1 min-w-max">
          <motion.div
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-5xl"
          >
            🚂
          </motion.div>
          {TRAIN_COLORS.map((c, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex h-20 w-20 flex-col items-center justify-center rounded-xl shadow-soft"
              style={{ background: c }}
            >
              <span className="font-display text-3xl font-black text-white drop-shadow">
                {i + 1}
              </span>
              <div className="mt-1 flex gap-1">
                <span className="h-2 w-2 rounded-full bg-black/40" />
                <span className="h-2 w-2 rounded-full bg-black/40" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {page.paragraphs.map((p, i) => {
          const text = tt(p as L, lang);
          return (
            <div key={i} className="flex items-start gap-2 rounded-2xl bg-muted/50 p-3">
              <SpeakButton id={`tp-${i}`} text={text} />
              <p className="text-sm leading-relaxed">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Slides 4 & 5: List with bg image ---------- */
function SlideListBg({ lang, pageIdx, bg }: { lang: Lang; pageIdx: number; bg: string }) {
  const page = lessonData.theory_pages[pageIdx];
  const title = tt(page.title as L, lang);
  return (
    <div className="overflow-hidden rounded-3xl shadow-soft">
      <div className="relative h-40 bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
        <div className="absolute bottom-3 left-5 right-5 flex items-center gap-2">
          <SpeakButton id={`tbg-${pageIdx}`} text={title} />
          <h2 className="font-display text-2xl font-black drop-shadow-lg">{title}</h2>
        </div>
      </div>
      <div className="space-y-3 bg-card p-6">
        {page.paragraphs.map((p, i) => {
          const text = tt(p as L, lang);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 rounded-2xl bg-gradient-to-r from-muted/60 to-transparent p-4"
            >
              <SpeakButton id={`bgp-${pageIdx}-${i}`} text={text} />
              <p className="text-base leading-relaxed">{text}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Slide 6: yesterday / today / tomorrow ---------- */
function SlideTimeWords({ lang }: { lang: Lang }) {
  const page = lessonData.theory_pages[4];
  const title = tt(page.title as L, lang);
  const cards = [
    { e: "⬅️", c: "oklch(0.85 0.1 30)", label: { kk: "Кеше", ru: "Вчера", en: "Yesterday" } as L },
    { e: "⭐", c: "oklch(0.85 0.14 90)", label: { kk: "Бүгін", ru: "Сегодня", en: "Today" } as L },
    {
      e: "➡️",
      c: "oklch(0.85 0.12 180)",
      label: { kk: "Ертең", ru: "Завтра", en: "Tomorrow" } as L,
    },
  ];
  return (
    <div className="space-y-5 rounded-3xl bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <SpeakButton id="tw-title" text={title} />
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="flex flex-col items-center rounded-2xl p-5 shadow-soft"
            style={{ background: `color-mix(in oklch, ${c.c} 50%, white)` }}
          >
            <span className="text-5xl">{c.e}</span>
            <div className="mt-2 flex items-center gap-2">
              <p className="font-display text-xl font-bold">{tt(c.label, lang)}</p>
              <SpeakButton id={`twc-${i}`} text={tt(c.label, lang)} className="h-7 w-7" />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="space-y-2">
        {page.paragraphs.map((p, i) => {
          const text = tt(p as L, lang);
          return (
            <div key={i} className="flex items-start gap-2 rounded-2xl bg-muted/50 p-3">
              <SpeakButton id={`twp-${i}`} text={text} />
              <p className="text-sm leading-relaxed">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Slide 7: Reorder game ---------- */
function SlideReorderGame({ lang, labels }: { lang: Lang; labels: Record<string, L> }) {
  const q = lessonData.interactive_quiz.questions[0];
  const original = q.options as L[];
  const [order, setOrder] = useState<number[]>(() => shuffle(original.map((_, i) => i)));
  const [status, setStatus] = useState<"idle" | "ok" | "bad">("idle");
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const check = () => {
    const correct = order.every((v, i) => v === i);
    setStatus(correct ? "ok" : "bad");
    if (correct) {
      confetti({ particleCount: 160, spread: 90, origin: { y: 0.6 } });
    }
  };
  const reset = () => {
    setOrder(shuffle(original.map((_, i) => i)));
    setStatus("idle");
  };

  const move = (from: number, to: number) => {
    setOrder((o) => {
      const n = [...o];
      const [item] = n.splice(from, 1);
      n.splice(to, 0, item);
      return n;
    });
    setStatus("idle");
  };

  const instr = tt(lessonData.interactive_quiz.instruction as L, lang);
  const qText = tt(q.question_text as L, lang);

  return (
    <div className="space-y-5 rounded-3xl bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <SpeakButton id="qtitle" text={qText} />
        <h2 className="font-display text-2xl font-bold">{qText}</h2>
      </div>
      <div className="flex items-start gap-2 rounded-2xl bg-accent/30 p-3">
        <SpeakButton id="qinstr" text={instr} />
        <p className="text-sm font-semibold">{instr}</p>
      </div>

      <ul className="space-y-2">
        {order.map((idx, pos) => {
          const text = tt(original[idx], lang);
          const isCorrect = status === "ok";
          return (
            <li
              key={idx}
              draggable
              onDragStart={() => setDragIdx(pos)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragIdx !== null) move(dragIdx, pos);
                setDragIdx(null);
              }}
              className={cn(
                "flex cursor-grab items-center gap-3 rounded-2xl border-2 bg-gradient-to-r p-3 shadow-soft active:cursor-grabbing transition",
                isCorrect
                  ? "border-[oklch(0.7_0.16_140)] from-[oklch(0.92_0.1_140)] to-card"
                  : status === "bad"
                    ? "border-destructive/40 from-[oklch(0.95_0.05_25)] to-card"
                    : "border-transparent from-muted/60 to-card hover:scale-[1.01]",
              )}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                {pos + 1}
              </span>
              <span className="flex-1 font-semibold">{text}</span>
              <SpeakButton id={`opt-${idx}`} text={text} className="h-7 w-7" />
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => pos > 0 && move(pos, pos - 1)}
                  disabled={pos === 0}
                  className="rounded bg-muted px-1.5 text-xs disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  onClick={() => pos < order.length - 1 && move(pos, pos + 1)}
                  disabled={pos === order.length - 1}
                  className="rounded bg-muted px-1.5 text-xs disabled:opacity-30"
                >
                  ▼
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={check}
          className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-bold text-primary-foreground shadow-glow transition hover:scale-105"
        >
          <CheckCircle2 className="h-5 w-5" /> {tt(labels.check, lang)}
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-2xl bg-muted px-5 py-3 font-bold transition hover:scale-105"
        >
          <RotateCcw className="h-4 w-4" /> {tt(labels.again, lang)}
        </button>
        {status === "ok" && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="font-display text-xl font-black text-[oklch(0.55_0.18_140)]"
          >
            {tt(labels.correct, lang)}
          </motion.span>
        )}
        {status === "bad" && (
          <motion.span
            initial={{ x: -10 }}
            animate={{ x: [0, -8, 8, -4, 4, 0] }}
            className="font-bold text-destructive"
          >
            {tt(labels.wrong, lang)}
          </motion.span>
        )}
      </div>
    </div>
  );
}

/* ---------- Slide 8: Summary medal ---------- */
function SlideSummary({ lang }: { lang: Lang }) {
  const r = lessonData.remember_block;
  const title = tt(r.title as L, lang);
  const text = tt(r.text as L, lang);
  // fire confetti on mount
  useMemo(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.4 } });
      }, 200);
    }
  }, []);
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[oklch(0.92_0.1_85)] via-[oklch(0.88_0.12_60)] to-[oklch(0.85_0.14_30)] p-8 text-center shadow-soft">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.92_0.16_90)] to-[oklch(0.7_0.18_60)] shadow-glow"
      >
        <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <Trophy className="h-20 w-20 text-white drop-shadow-lg" strokeWidth={2.2} />
        </motion.div>
      </motion.div>
      <div className="mb-3 flex items-center justify-center gap-2">
        <h2 className="font-display text-3xl font-black">{title}</h2>
        <SpeakButton id="sum-title" text={title} />
      </div>
      <div className="mx-auto flex max-w-2xl items-start gap-2 rounded-2xl bg-card/80 p-4 backdrop-blur">
        <SpeakButton id="sum-text" text={text} />
        <p className="text-base leading-relaxed">{text}</p>
      </div>
      <div className="mt-5 flex justify-center gap-2">
        {["⭐", "⭐", "⭐"].map((s, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
            className="text-5xl drop-shadow"
          >
            {s}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
