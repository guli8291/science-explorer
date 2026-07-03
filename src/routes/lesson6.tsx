import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ChevronLeft, ChevronRight, Sparkles, Users, BookOpen, Trophy, Heart } from "lucide-react";
import { useApp } from "@/store/app";
import type { Lang } from "@/i18n/translations";
import { SpeakButton } from "@/components/SpeakButton";
import data from "@/data/lesson6.json";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lesson6")({ component: Lesson6 });

type L = Record<Lang, string>;
const tt = (s: L, lang: Lang) => s[lang] ?? s.en;

const YOUTUBE_ID = "Y6ljFaKRTrI";
const CLASS_IMG = "https://images.unsplash.com/photo-1581726690015-c9861fa5057f?w=1200&q=70";
const TEAM_IMG = "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&q=70";
const PAIR_IMG = "https://images.unsplash.com/photo-1588072432836-e10032774350?w=1200&q=70";

function Lesson6() {
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
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-10">
      <div className="rounded-3xl bg-gradient-to-r from-[oklch(0.93_0.07_30)] via-[oklch(0.92_0.08_60)] to-[oklch(0.9_0.08_350)] p-6 shadow-soft">
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
            {slide === 2 && <SlideTeam lang={lang} labels={labels} />}
            {slide === 3 && <SlideRulesQuestion lang={lang} />}
            {slide === 4 && <SlideGroupRules lang={lang} />}
            {slide === 5 && <SlidePairRules lang={lang} labels={labels} />}
            {slide === 6 && <SlideBehavior lang={lang} />}
            {slide === 7 && <SlideReflect lang={lang} />}
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
      <div className="rounded-3xl bg-gradient-to-br from-[oklch(0.95_0.05_30)] to-[oklch(0.93_0.06_60)] p-6 shadow-soft">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[oklch(0.6_0.18_30)]" />
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
          <BookOpen className="h-5 w-5 text-[oklch(0.55_0.2_350)]" />
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
  return (
    <div className="space-y-5 rounded-3xl bg-card p-6 shadow-soft">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-3">
          <img
            src={CLASS_IMG}
            alt="class"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
          />
          <div className="overflow-hidden rounded-2xl aspect-video bg-black shadow-soft">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
              title="class video"
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
            {data.overview_questions.map((q, i) => {
              const text = tt(q as L, lang);
              return (
                <li key={i} className="flex items-start gap-2 rounded-xl bg-card p-2.5">
                  <SpeakButton id={`oq-${i}`} text={text} className="h-7 w-7" />
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
    </div>
  );
}

function SlideTeam({ lang, labels }: { lang: Lang; labels: Record<string, L> }) {
  const def = tt(data.team_block.definition as L, lang);
  return (
    <div className="space-y-5 rounded-3xl bg-gradient-to-br from-[oklch(0.95_0.05_85)] to-[oklch(0.93_0.06_60)] p-6 shadow-soft">
      <div className="rounded-2xl border-2 border-[oklch(0.85_0.1_85)] bg-card p-5">
        <div className="mb-2 flex items-center gap-2">
          <Users className="h-6 w-6 text-[oklch(0.6_0.18_85)]" />
          <h2 className="font-display text-xl font-bold">
            {tt(data.intro.keywords[0] as L, lang)}
          </h2>
        </div>
        <div className="flex items-start gap-2">
          <SpeakButton id="def" text={def} />
          <p className="text-base leading-relaxed">{def}</p>
        </div>
      </div>
      <div className="rounded-2xl bg-card p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          <h3 className="font-display text-lg font-bold">{tt(labels.questions, lang)}</h3>
        </div>
        <ul className="space-y-2">
          {data.team_block.questions.map((q, i) => {
            const text = tt(q as L, lang);
            return (
              <li key={i} className="flex items-start gap-2 rounded-xl bg-muted/60 p-3">
                <SpeakButton id={`tq-${i}`} text={text} className="h-7 w-7" />
                <p className="text-sm leading-relaxed">
                  <span className="mr-1 font-bold text-[oklch(0.55_0.18_85)]">{i + 1}.</span>
                  {text}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function SlideRulesQuestion({ lang }: { lang: Lang }) {
  const text = tt(data.rules_question as L, lang);
  return (
    <div className="flex min-h-[400px] items-center justify-center rounded-3xl bg-gradient-to-br from-[oklch(0.94_0.06_350)] to-[oklch(0.92_0.07_30)] p-8 shadow-soft">
      <div className="max-w-2xl rounded-3xl border-2 border-[oklch(0.85_0.1_350)] bg-card p-6 shadow-glow">
        <div className="flex items-start gap-3">
          <span className="text-3xl">❓</span>
          <SpeakButton id="rq" text={text} />
          <p className="text-lg font-semibold leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
}

function SlideGroupRules({ lang }: { lang: Lang }) {
  const title = tt(data.group_rules.title as L, lang);
  return (
    <div className="space-y-5 rounded-3xl bg-gradient-to-br from-[oklch(0.94_0.06_180)] to-[oklch(0.92_0.07_220)] p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <Users className="h-6 w-6 text-[oklch(0.55_0.18_220)]" />
        <SpeakButton id="grt" text={title} />
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_1.2fr]">
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src={TEAM_IMG}
          alt="team"
          className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
        />
        <ul className="space-y-2">
          {data.group_rules.rules.map((r, i) => {
            const text = tt(r as L, lang);
            return (
              <motion.li
                key={i}
                initial={{ x: 12, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2 rounded-2xl bg-card p-3 shadow-soft"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[oklch(0.65_0.18_220)] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <SpeakButton id={`gr-${i}`} text={text} className="h-7 w-7" />
                <p className="text-sm leading-relaxed">{text}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function SlidePairRules({ lang, labels }: { lang: Lang; labels: Record<string, L> }) {
  const title = tt(data.pair_rules.title as L, lang);
  const trans = tt(data.transition as L, lang);
  const remember = tt(data.remember as L, lang);
  return (
    <div className="space-y-5 rounded-3xl bg-gradient-to-br from-[oklch(0.94_0.06_30)] to-[oklch(0.92_0.07_60)] p-6 shadow-soft">
      <div className="flex items-start gap-2 rounded-2xl bg-card p-3">
        <SpeakButton id="trn" text={trans} />
        <p className="text-sm italic leading-relaxed">{trans}</p>
      </div>
      <div className="flex items-center gap-2">
        <Heart className="h-6 w-6 text-[oklch(0.6_0.2_30)]" />
        <SpeakButton id="prt" text={title} />
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-[1.2fr_1fr]">
        <ul className="space-y-2">
          {data.pair_rules.rules.map((r, i) => {
            const text = tt(r as L, lang);
            return (
              <motion.li
                key={i}
                initial={{ x: -12, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2 rounded-2xl bg-card p-3 shadow-soft"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[oklch(0.7_0.18_30)] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <SpeakButton id={`pr-${i}`} text={text} className="h-7 w-7" />
                <p className="text-sm leading-relaxed">{text}</p>
              </motion.li>
            );
          })}
        </ul>
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src={PAIR_IMG}
          alt="pair"
          className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
        />
      </div>
      <div className="flex items-start gap-3 rounded-2xl border-2 border-[oklch(0.85_0.12_25)] bg-card p-4">
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="text-2xl"
        >
          ⭐
        </motion.span>
        <div className="flex-1">
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[oklch(0.55_0.18_25)]">
            {tt(labels.remember, lang)}
          </p>
          <div className="flex items-start gap-2">
            <SpeakButton id="rem" text={remember} />
            <p className="font-semibold leading-relaxed">{remember}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideBehavior({ lang }: { lang: Lang }) {
  const title = tt(data.behavior_task.title as L, lang);
  const prompt = tt(data.behavior_task.prompt as L, lang);
  const [extra, setExtra] = useState("");
  return (
    <div className="space-y-5 rounded-3xl bg-gradient-to-br from-[oklch(0.94_0.06_85)] to-[oklch(0.92_0.07_60)] p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-[oklch(0.65_0.18_85)] px-3 py-1 text-xs font-black uppercase tracking-wider text-white">
          {lang === "kk" ? "Тапсырма" : lang === "ru" ? "Задание" : "Task"}
        </span>
        <SpeakButton id="bt" text={title} />
        <h2 className="font-display text-xl font-bold">{title}</h2>
      </div>
      <ul className="grid gap-2 md:grid-cols-2">
        {data.behavior_task.rules.map((r, i) => {
          const text = tt(r as L, lang);
          return (
            <li key={i} className="flex items-start gap-2 rounded-2xl bg-card p-3 shadow-soft">
              <span className="mt-0.5 text-lg">✓</span>
              <SpeakButton id={`br-${i}`} text={text} className="h-7 w-7" />
              <p className="text-sm leading-relaxed">{text}</p>
            </li>
          );
        })}
      </ul>
      <div className="rounded-2xl bg-card p-4">
        <div className="mb-2 flex items-start gap-2">
          <SpeakButton id="bp" text={prompt} />
          <p className="font-semibold">{prompt}</p>
        </div>
        <textarea
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          rows={3}
          placeholder="..."
          className="w-full rounded-2xl border-2 border-border bg-background p-3 outline-none focus:border-primary"
        />
      </div>
    </div>
  );
}

function SlideReflect({ lang }: { lang: Lang }) {
  const title = tt(data.reflect_task.title as L, lang);
  const [picks, setPicks] = useState<Record<string, number>>({});

  const submit = () => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.3 } });
  };

  return (
    <div className="space-y-5 rounded-3xl bg-gradient-to-br from-[oklch(0.94_0.06_140)] to-[oklch(0.92_0.07_120)] p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <Trophy className="h-7 w-7 text-[oklch(0.7_0.18_85)]" />
        <SpeakButton id="rft" text={title} />
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      <div className="space-y-4">
        {data.reflect_task.groups.map((g, gi) => {
          const stem = tt(g.stem as L, lang);
          return (
            <div key={gi} className="rounded-2xl bg-card p-4 shadow-soft">
              <div className="mb-3 flex items-start gap-2">
                <SpeakButton id={`s-${gi}`} text={stem} />
                <p className="font-semibold leading-relaxed">{stem}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.options.map((o, oi) => {
                  const text = tt(o as L, lang);
                  const active = picks[gi] === oi;
                  return (
                    <button
                      key={oi}
                      onClick={() => setPicks((p) => ({ ...p, [gi]: oi }))}
                      className={cn(
                        "rounded-full border-2 px-4 py-2 text-sm font-bold transition",
                        active
                          ? "border-primary bg-primary/20"
                          : "border-border bg-card hover:border-primary",
                      )}
                    >
                      {text}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end">
        <button
          onClick={submit}
          className="rounded-full bg-primary px-6 py-2.5 font-bold text-primary-foreground shadow-glow transition hover:scale-105"
        >
          {lang === "kk" ? "Жіберу" : lang === "ru" ? "Отправить" : "Submit"} 🎉
        </button>
      </div>
    </div>
  );
}
