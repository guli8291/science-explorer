import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/store/app";
import { UI, t } from "@/i18n/translations";
import type { Lesson } from "@/data/lessons";
import { Check, X, Sparkles, ChevronRight } from "lucide-react";

interface Props {
  lesson: Lesson;
  onComplete: (stars: number) => void;
}

type Stage = "intro" | "learn" | "match" | "quiz" | "done";

export function LessonRunner({ lesson, onComplete }: Props) {
  const { lang } = useApp();
  const stages: Stage[] = useMemo(() => {
    const s: Stage[] = ["intro", "learn"];
    if (lesson.match && lesson.match.length) s.push("match");
    s.push("quiz", "done");
    return s;
  }, [lesson]);
  const [stageIdx, setStageIdx] = useState(0);
  const stage = stages[stageIdx];
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [matchScore, setMatchScore] = useState(0);
  const [feedback, setFeedback] = useState<"ok" | "bad" | null>(null);

  const next = () => setStageIdx((i) => Math.min(i + 1, stages.length - 1));
  const progress = ((stageIdx + 1) / stages.length) * 100;

  const finish = () => {
    const matchTotal = lesson.match?.length ?? 0;
    const total = lesson.quiz.length + matchTotal;
    const got = score + matchScore;
    const ratio = total ? got / total : 1;
    const stars = ratio >= 0.95 ? 3 : ratio >= 0.6 ? 2 : 1;
    onComplete(stars);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--leaf)] to-[var(--primary)]"
          animate={{ width: `${progress}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-3xl p-8 text-center shadow-soft"
          >
            <motion.div
              className="text-7xl"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {lesson.emoji}
            </motion.div>
            <h2 className="mt-4 text-3xl font-bold">{t(lesson.title, lang)}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{t(lesson.intro, lang)}</p>
            <button
              onClick={next}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-glow hover:scale-105 transition"
            >
              {t(UI.learn, lang)} <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        {stage === "learn" && (
          <motion.div
            key="learn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <h2 className="text-2xl font-bold">
              {t(UI.learn, lang)} {lesson.emoji}
            </h2>
            {lesson.facts.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className="glass flex items-start gap-3 rounded-2xl p-4 shadow-soft cursor-default"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--leaf)] to-[var(--primary)] font-bold text-white">
                  {i + 1}
                </div>
                <p className="pt-1 text-lg">{t(f, lang)}</p>
              </motion.div>
            ))}
            <button
              onClick={next}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-glow hover:scale-105 transition"
            >
              {t(UI.practice, lang)} <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        {stage === "match" && lesson.match && (
          <MatchGame
            key="match"
            pairs={lesson.match}
            onDone={(s) => {
              setMatchScore(s);
              next();
            }}
          />
        )}

        {stage === "quiz" && (
          <motion.div
            key={`quiz-${quizIdx}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass rounded-3xl p-6 shadow-soft"
          >
            <div className="mb-3 text-sm font-bold text-muted-foreground">
              {t(UI.quiz, lang)} · {quizIdx + 1}/{lesson.quiz.length}
            </div>
            <h3 className="text-2xl font-bold">{t(lesson.quiz[quizIdx].q, lang)}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {lesson.quiz[quizIdx].options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    if (feedback) return;
                    const ok = i === lesson.quiz[quizIdx].answer;
                    setFeedback(ok ? "ok" : "bad");
                    if (ok) setScore((s) => s + 1);
                    setTimeout(() => {
                      setFeedback(null);
                      if (quizIdx + 1 < lesson.quiz.length) setQuizIdx((q) => q + 1);
                      else next();
                    }, 900);
                  }}
                  className="rounded-2xl border-2 border-border bg-card p-4 text-left text-lg font-semibold hover:border-primary hover:shadow-soft transition"
                >
                  {t(opt, lang)}
                </motion.button>
              ))}
            </div>
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-4 flex items-center justify-center gap-2 rounded-full px-4 py-2 font-bold ${
                    feedback === "ok"
                      ? "bg-[var(--leaf)] text-white"
                      : "bg-destructive text-destructive-foreground"
                  }`}
                >
                  {feedback === "ok" ? <Check /> : <X />}
                  {feedback === "ok" ? t(UI.correct, lang) : t(UI.wrong, lang)}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {stage === "done" && (
          <DoneScreen
            key="done"
            score={score + matchScore}
            total={lesson.quiz.length + (lesson.match?.length ?? 0)}
            onFinish={finish}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function DoneScreen({
  score,
  total,
  onFinish,
}: {
  score: number;
  total: number;
  onFinish: () => void;
}) {
  const { lang } = useApp();
  const ratio = total ? score / total : 1;
  const stars = ratio >= 0.95 ? 3 : ratio >= 0.6 ? 2 : 1;
  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="glass rounded-3xl p-10 text-center shadow-soft"
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mx-auto inline-block"
      >
        <Sparkles className="h-16 w-16 text-[var(--sun)]" />
      </motion.div>
      <h2 className="mt-4 text-4xl font-bold">{t(UI.completed, lang)}!</h2>
      <p className="mt-2 text-lg text-muted-foreground">
        {t(UI.yourScore, lang)}: {score}/{total}
      </p>
      <div className="mt-4 flex justify-center gap-2 text-4xl">
        {[1, 2, 3].map((n) => (
          <motion.span
            key={n}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: n * 0.2, type: "spring" }}
          >
            {n <= stars ? "⭐" : "☆"}
          </motion.span>
        ))}
      </div>
      <button
        onClick={onFinish}
        className="mt-6 rounded-full bg-primary px-8 py-3 font-bold text-primary-foreground shadow-glow hover:scale-105 transition"
      >
        {t(UI.finish, lang)}
      </button>
    </motion.div>
  );
}

function MatchGame({
  pairs,
  onDone,
}: {
  pairs: NonNullable<Lesson["match"]>;
  onDone: (score: number) => void;
}) {
  const { lang } = useApp();
  const [matched, setMatched] = useState<Record<number, number>>({});
  const [sel, setSel] = useState<{ side: "a" | "b"; i: number } | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);

  const shuffledB = useMemo(() => {
    const arr = pairs.map((_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [pairs]);

  const pick = (side: "a" | "b", i: number) => {
    if (Object.values(matched).includes(i) && side === "b") return;
    if (matched[i] !== undefined && side === "a") return;
    if (!sel) return setSel({ side, i });
    if (sel.side === side) return setSel({ side, i });
    const aIdx = side === "a" ? i : sel.i;
    const bIdx = side === "b" ? i : sel.i;
    if (aIdx === bIdx) {
      const newMatched = { ...matched, [aIdx]: bIdx };
      setMatched(newMatched);
      setSel(null);
      if (Object.keys(newMatched).length === pairs.length) {
        setTimeout(() => onDone(pairs.length), 700);
      }
    } else {
      setWrong(`${aIdx}-${bIdx}`);
      setTimeout(() => {
        setWrong(null);
        setSel(null);
      }, 600);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="glass rounded-3xl p-6 shadow-soft"
    >
      <h3 className="mb-4 text-2xl font-bold">{t(UI.matchPairs, lang)}</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {pairs.map((p, i) => {
            const done = matched[i] !== undefined;
            const active = sel?.side === "a" && sel.i === i;
            return (
              <motion.button
                key={i}
                whileTap={{ scale: 0.95 }}
                disabled={done}
                onClick={() => pick("a", i)}
                className={`w-full rounded-2xl border-2 p-3 text-left font-semibold transition ${
                  done
                    ? "border-[var(--leaf)] bg-[var(--leaf)]/20 line-through opacity-60"
                    : active
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary"
                }`}
              >
                {t(p.a, lang)}
              </motion.button>
            );
          })}
        </div>
        <div className="space-y-2">
          {shuffledB.map((i) => {
            const done = Object.values(matched).includes(i);
            const active = sel?.side === "b" && sel.i === i;
            const isWrong = wrong?.includes(`-${i}`);
            return (
              <motion.button
                key={i}
                whileTap={{ scale: 0.95 }}
                animate={isWrong ? { x: [-5, 5, -5, 5, 0] } : {}}
                disabled={done}
                onClick={() => pick("b", i)}
                className={`w-full rounded-2xl border-2 p-3 text-left font-semibold transition ${
                  done
                    ? "border-[var(--leaf)] bg-[var(--leaf)]/20 line-through opacity-60"
                    : active
                      ? "border-primary bg-primary/10"
                      : isWrong
                        ? "border-destructive bg-destructive/10"
                        : "border-border bg-card hover:border-primary"
                }`}
              >
                {t(pairs[i].b, lang)}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
