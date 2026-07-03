import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/store/app";
import { UI, t } from "@/i18n/translations";
import type { Lesson, Slide } from "@/data/lessons";
import { ChevronLeft, ChevronRight, Check, X, Sparkles, MessageCircle, Star } from "lucide-react";

interface Props {
  lesson: Lesson;
  onComplete: (stars: number) => void;
}

export function SlideRunner({ lesson, onComplete }: Props) {
  const { lang } = useApp();
  const slides = lesson.slides ?? [];
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = slides.length;
  const slide = slides[idx];

  const recordTask = (got: number, of: number) => {
    setScore((s) => s + got);
    setMaxScore((m) => m + of);
  };

  const goNext = () => {
    if (idx + 1 < total) setIdx(idx + 1);
    else if (!finished) {
      setFinished(true);
      const ratio = maxScore ? score / maxScore : 1;
      const stars = ratio >= 0.95 ? 3 : ratio >= 0.6 ? 2 : 1;
      onComplete(stars);
    }
  };
  const goPrev = () => setIdx(Math.max(0, idx - 1));

  if (finished) {
    return <FinishScreen score={score} max={maxScore} onClose={() => setFinished(false)} />;
  }

  return (
    <div className="mx-auto max-w-5xl">
      {/* Page indicator */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="text-sm font-bold text-muted-foreground">
          {t(UI.page, lang)} {idx + 1} / {total}
        </div>
        <div className="flex flex-1 gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 flex-1 rounded-full transition ${
                i === idx ? "bg-primary" : i < idx ? "bg-[var(--leaf)]" : "bg-muted"
              }`}
              aria-label={`${t(UI.page, lang)} ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <SlideView slide={slide} onTask={recordTask} onAdvance={goNext} />
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={goPrev}
          disabled={idx === 0}
          className="inline-flex items-center gap-2 rounded-full bg-card px-5 py-2.5 font-bold shadow-soft transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" /> {t(UI.prev, lang)}
        </button>
        <button
          onClick={goNext}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-bold text-primary-foreground shadow-glow transition hover:scale-105"
        >
          {idx + 1 === total ? t(UI.finish, lang) : t(UI.next, lang)}{" "}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function SlideView({
  slide,
  onTask,
  onAdvance,
}: {
  slide: Slide;
  onTask: (got: number, of: number) => void;
  onAdvance: () => void;
}) {
  const { lang } = useApp();

  if (slide.kind === "intro") {
    return (
      <div className="glass overflow-hidden rounded-3xl shadow-soft">
        <div className="gradient-sky h-24 md:h-32" />
        <div className="-mt-12 px-6 pb-8 md:px-10">
          <motion.div
            className="mx-auto mb-3 grid h-20 w-20 place-items-center rounded-3xl bg-white text-5xl shadow-soft"
            animate={{ rotate: [0, 6, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            {slide.emoji ?? "📖"}
          </motion.div>
          <h2 className="text-center text-3xl font-bold md:text-4xl">{t(slide.title, lang)}</h2>
          <div className="mx-auto mt-6 grid max-w-3xl gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-[var(--leaf)]/10 p-5">
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--leaf)]">
                {t(UI.goals, lang)}
              </div>
              <div className="mb-2 font-bold">
                {lang === "kk" ? "Сен:" : lang === "ru" ? "Ты:" : "You will:"}
              </div>
              <ul className="space-y-1.5">
                {slide.goals.map((g, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--leaf)]">•</span>
                    <span>{t(g, lang)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-[var(--sky)]/10 p-5">
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--sky)]">
                {t(UI.keyWords, lang)}
              </div>
              <div className="flex flex-wrap gap-2">
                {slide.keywords.map((k, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-white px-3 py-1.5 text-sm font-bold shadow-soft"
                  >
                    {t(k, lang)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slide.kind === "scene") {
    return (
      <div className="glass rounded-3xl p-6 shadow-soft md:p-8">
        <h3 className="mb-5 text-2xl font-bold md:text-3xl">{t(slide.title, lang)}</h3>
        <div className="grid gap-5 md:grid-cols-[1.2fr_1fr]">
          {/* Scene */}
          <div className="space-y-4">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-sky-100 via-amber-50 to-rose-100 p-6 shadow-inner">
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                {slide.scene.map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="text-5xl tracking-widest md:text-6xl"
                  >
                    {row}
                  </motion.div>
                ))}
              </div>
            </div>
            {slide.caption && (
              <p className="rounded-xl bg-card/60 p-4 text-base font-medium leading-relaxed md:text-lg">
                {t(slide.caption, lang)}
              </p>
            )}
            {slide.youtubeId && (
              <div className="overflow-hidden rounded-2xl shadow-soft">
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${slide.youtubeId}`}
                    title="video"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
          {/* Questions */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t(UI.questions, lang)}
            </div>
            {slide.questions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.1 }}
                className="flex gap-3 rounded-2xl border-2 border-[var(--berry)]/30 bg-white p-4 shadow-soft"
              >
                <MessageCircle className="h-5 w-5 shrink-0 text-[var(--berry)]" />
                <p className="text-base">{t(q, lang)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (slide.kind === "video") {
    return (
      <div className="glass rounded-3xl p-6 shadow-soft md:p-8">
        <h3 className="mb-4 text-2xl font-bold md:text-3xl">{t(slide.title, lang)}</h3>
        <div className="overflow-hidden rounded-2xl shadow-soft">
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${slide.youtubeId}`}
              title="video"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        {slide.caption && (
          <p className="mt-4 text-base text-muted-foreground">{t(slide.caption, lang)}</p>
        )}
      </div>
    );
  }

  if (slide.kind === "text") {
    return (
      <div className="glass rounded-3xl p-6 shadow-soft md:p-10">
        <div className="mb-3 text-5xl">{slide.emoji ?? "📘"}</div>
        <h3 className="text-2xl font-bold md:text-3xl">{t(slide.title, lang)}</h3>
        <p className="mt-3 text-lg leading-relaxed">{t(slide.paragraph, lang)}</p>
        {slide.bullets && (
          <ul className="mt-5 space-y-2">
            {slide.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 rounded-xl bg-card/60 p-3"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--leaf)] to-[var(--primary)] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-base">{t(b, lang)}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  if (slide.kind === "pickCorrect") {
    return <PickCorrectView slide={slide} onTask={onTask} onAdvance={onAdvance} />;
  }

  if (slide.kind === "categorize") {
    return <CategorizeView slide={slide} onTask={onTask} onAdvance={onAdvance} />;
  }

  if (slide.kind === "quiz") {
    return <QuizView question={slide.question} onTask={onTask} onAdvance={onAdvance} />;
  }

  if (slide.kind === "match") {
    return (
      <div className="glass rounded-3xl p-6 shadow-soft">
        <h3 className="text-2xl font-bold">{t(slide.title, lang)}</h3>
        <p className="mt-2 text-muted-foreground">{t(UI.matchPairs, lang)}</p>
      </div>
    );
  }

  return null;
}

// ----- Pick correct (multi-select) -----
function PickCorrectView({
  slide,
  onTask,
  onAdvance,
}: {
  slide: Extract<Slide, { kind: "pickCorrect" }>;
  onTask: (got: number, of: number) => void;
  onAdvance: () => void;
}) {
  const { lang } = useApp();
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

  const totalCorrect = slide.options.filter((o) => o.correct).length;
  const got = slide.options.reduce((acc, o, i) => acc + (picked.has(i) === o.correct ? 1 : 0), 0);

  const check = () => {
    setChecked(true);
    const correctPicks = slide.options.reduce(
      (a, o, i) => a + (o.correct && picked.has(i) ? 1 : 0),
      0,
    );
    onTask(correctPicks, totalCorrect);
  };

  return (
    <div className="glass rounded-3xl p-6 shadow-soft md:p-8">
      <div className="mb-1 inline-block rounded-full bg-[var(--sun)]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--earth)]">
        {t(UI.task, lang)}
      </div>
      <h3 className="mt-2 text-2xl font-bold md:text-3xl">{t(slide.title, lang)}</h3>
      <p className="mt-1 text-muted-foreground">{t(slide.prompt, lang)}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
        {slide.options.map((o, i) => {
          const isPicked = picked.has(i);
          const reveal = checked;
          const correctPick = reveal && o.correct;
          const wrongPick = reveal && isPicked && !o.correct;
          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggle(i)}
              className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition ${
                correctPick
                  ? "border-[var(--leaf)] bg-[var(--leaf)]/15"
                  : wrongPick
                    ? "border-destructive bg-destructive/10"
                    : isPicked
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary"
              }`}
            >
              <span className="text-5xl">{o.emoji}</span>
              <span className="text-sm font-bold">{t(o.label, lang)}</span>
              {reveal && o.correct && <Check className="h-5 w-5 text-[var(--leaf)]" />}
              {reveal && isPicked && !o.correct && <X className="h-5 w-5 text-destructive" />}
            </motion.button>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        {checked ? (
          <div className="font-bold">
            {got}/{slide.options.length} ✓
          </div>
        ) : (
          <div />
        )}
        {!checked ? (
          <button
            onClick={check}
            disabled={picked.size === 0}
            className="rounded-full bg-primary px-6 py-2.5 font-bold text-primary-foreground shadow-glow transition hover:scale-105 disabled:opacity-50"
          >
            {t(UI.checkAnswer, lang)}
          </button>
        ) : (
          <button
            onClick={onAdvance}
            className="rounded-full bg-[var(--leaf)] px-6 py-2.5 font-bold text-white shadow-glow transition hover:scale-105"
          >
            {t(UI.next, lang)} →
          </button>
        )}
      </div>
    </div>
  );
}

// ----- Categorize (drag-or-tap into columns) -----
function CategorizeView({
  slide,
  onTask,
  onAdvance,
}: {
  slide: Extract<Slide, { kind: "categorize" }>;
  onTask: (got: number, of: number) => void;
  onAdvance: () => void;
}) {
  const { lang } = useApp();
  const [placed, setPlaced] = useState<Record<number, number>>({}); // itemIdx -> categoryIdx
  const [active, setActive] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const place = (itemIdx: number, cat: number) => {
    if (checked) return;
    setPlaced((p) => ({ ...p, [itemIdx]: cat }));
    setActive(null);
  };
  const unplace = (itemIdx: number) => {
    if (checked) return;
    setPlaced((p) => {
      const n = { ...p };
      delete n[itemIdx];
      return n;
    });
  };

  const remaining = slide.items.map((_, i) => i).filter((i) => placed[i] === undefined);

  const check = () => {
    setChecked(true);
    const got = slide.items.reduce((a, it, i) => a + (placed[i] === it.category ? 1 : 0), 0);
    onTask(got, slide.items.length);
  };

  return (
    <div className="glass rounded-3xl p-6 shadow-soft md:p-8">
      <div className="mb-1 inline-block rounded-full bg-[var(--sun)]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--earth)]">
        {t(UI.task, lang)}
      </div>
      <h3 className="mt-2 text-2xl font-bold md:text-3xl">{t(slide.title, lang)}</h3>
      <p className="mt-1 text-muted-foreground">{t(slide.prompt, lang)}</p>

      {/* Bench */}
      <div className="mt-5 min-h-[5rem] rounded-2xl border-2 border-dashed border-border bg-muted/40 p-3">
        <div className="flex flex-wrap gap-2">
          {remaining.length === 0 && (
            <div className="px-2 py-3 text-sm text-muted-foreground">{checked ? "" : "✓"}</div>
          )}
          {remaining.map((i) => {
            const it = slide.items[i];
            const isActive = active === i;
            return (
              <button
                key={i}
                onClick={() => setActive(isActive ? null : i)}
                className={`flex items-center gap-2 rounded-2xl border-2 bg-white px-3 py-2 font-bold shadow-soft transition ${
                  isActive ? "border-primary scale-105" : "border-border hover:border-primary"
                }`}
              >
                <span className="text-2xl">{it.emoji}</span>
                <span>{t(it.label, lang)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Columns */}
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {slide.categories.map((c, ci) => (
          <button
            key={ci}
            onClick={() => active !== null && place(active, ci)}
            disabled={active === null}
            className="min-h-[10rem] rounded-2xl border-2 border-border bg-card p-3 text-left transition hover:border-primary disabled:hover:border-border"
          >
            <div className="mb-2 font-bold">{t(c, lang)}</div>
            <div className="flex flex-wrap gap-2">
              {slide.items.map((it, i) => {
                if (placed[i] !== ci) return null;
                const correct = checked && it.category === ci;
                const wrong = checked && it.category !== ci;
                return (
                  <span
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      unplace(i);
                    }}
                    className={`flex items-center gap-1 rounded-xl border-2 bg-white px-2 py-1 text-sm font-bold ${
                      correct
                        ? "border-[var(--leaf)] bg-[var(--leaf)]/15"
                        : wrong
                          ? "border-destructive bg-destructive/10"
                          : "border-border"
                    }`}
                  >
                    <span>{it.emoji}</span>
                    <span>{t(it.label, lang)}</span>
                    {correct && <Check className="h-4 w-4 text-[var(--leaf)]" />}
                    {wrong && <X className="h-4 w-4 text-destructive" />}
                  </span>
                );
              })}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-5 flex justify-end gap-3">
        {!checked ? (
          <button
            onClick={check}
            disabled={remaining.length > 0}
            className="rounded-full bg-primary px-6 py-2.5 font-bold text-primary-foreground shadow-glow transition hover:scale-105 disabled:opacity-50"
          >
            {t(UI.checkAnswer, lang)}
          </button>
        ) : (
          <button
            onClick={onAdvance}
            className="rounded-full bg-[var(--leaf)] px-6 py-2.5 font-bold text-white shadow-glow transition hover:scale-105"
          >
            {t(UI.next, lang)} →
          </button>
        )}
      </div>
    </div>
  );
}

// ----- Single quiz -----
function QuizView({
  question,
  onTask,
  onAdvance,
}: {
  question: { q: unknown; options: unknown[]; answer: number };
  onTask: (got: number, of: number) => void;
  onAdvance: () => void;
}) {
  const { lang } = useApp();
  const [picked, setPicked] = useState<number | null>(null);
  const reveal = picked !== null;
  return (
    <div className="glass rounded-3xl p-6 shadow-soft md:p-8">
      <div className="mb-1 inline-block rounded-full bg-[var(--berry)]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--berry)]">
        {t(UI.quiz, lang)}
      </div>
      <h3 className="mt-2 text-2xl font-bold md:text-3xl">{t(question.q, lang)}</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {question.options.map((opt: unknown, i: number) => {
          const isPicked = picked === i;
          const isCorrect = reveal && i === question.answer;
          const isWrong = reveal && isPicked && i !== question.answer;
          return (
            <motion.button
              key={i}
              whileHover={!reveal ? { scale: 1.02 } : {}}
              whileTap={!reveal ? { scale: 0.98 } : {}}
              disabled={reveal}
              onClick={() => {
                setPicked(i);
                onTask(i === question.answer ? 1 : 0, 1);
              }}
              className={`rounded-2xl border-2 p-4 text-left text-lg font-semibold transition ${
                isCorrect
                  ? "border-[var(--leaf)] bg-[var(--leaf)]/15"
                  : isWrong
                    ? "border-destructive bg-destructive/10"
                    : "border-border bg-card hover:border-primary"
              }`}
            >
              {t(opt, lang)}
            </motion.button>
          );
        })}
      </div>
      {reveal && (
        <div className="mt-5 flex justify-end">
          <button
            onClick={onAdvance}
            className="rounded-full bg-[var(--leaf)] px-6 py-2.5 font-bold text-white shadow-glow transition hover:scale-105"
          >
            {t(UI.next, lang)} →
          </button>
        </div>
      )}
    </div>
  );
}

function FinishScreen({
  score,
  max,
  onClose,
}: {
  score: number;
  max: number;
  onClose: () => void;
}) {
  const { lang } = useApp();
  const ratio = max ? score / max : 1;
  const stars = ratio >= 0.95 ? 3 : ratio >= 0.6 ? 2 : 1;
  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="glass mx-auto max-w-2xl rounded-3xl p-10 text-center shadow-soft"
    >
      <Sparkles className="mx-auto h-16 w-16 text-[var(--sun)]" />
      <h2 className="mt-4 text-4xl font-bold">{t(UI.greatJob, lang)}</h2>
      <p className="mt-2 text-lg text-muted-foreground">
        {t(UI.yourScore, lang)}: {score}/{max}
      </p>
      <div className="mt-4 flex justify-center gap-2">
        {[1, 2, 3].map((n) => (
          <motion.div
            key={n}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: n * 0.2, type: "spring" }}
          >
            <Star
              className={`h-12 w-12 ${
                n <= stars ? "fill-[var(--sun)] text-[var(--sun)]" : "text-muted-foreground/40"
              }`}
            />
          </motion.div>
        ))}
      </div>
      <button
        onClick={onClose}
        className="mt-6 rounded-full bg-primary px-8 py-3 font-bold text-primary-foreground shadow-glow hover:scale-105 transition"
      >
        {t(UI.finish, lang)}
      </button>
    </motion.div>
  );
}
