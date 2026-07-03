import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ChevronLeft, ChevronRight, ImageIcon, Star, Sparkles } from "lucide-react";
import { useApp } from "@/store/app";
import type { Lang } from "@/i18n/translations";
import { SpeakButton } from "@/components/SpeakButton";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type L = Record<Lang, string>;
const tt = (s: L, lang: Lang) => s[lang] ?? s.en;

export type FamilyLessonData = {
  lesson_title: L;
  intro: { goals: L[]; keywords: L[] };
  slides: { title: L; text: L }[];
  task: { title: L; prompt: L };
  summary: { title: L; text: L; reward: L };
};

type Tint = {
  banner: string;
  body: string;
  soft: string;
  accent: string;
  emoji: [string, string];
};

function ImagePlaceholder({ label }: { label?: string }) {
  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/40 text-muted-foreground">
      <div className="flex flex-col items-center gap-1">
        <ImageIcon className="h-8 w-8 opacity-50" />
        <span className="text-xs">{label ?? "image"}</span>
      </div>
    </div>
  );
}

function SlideTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-auto rounded-md bg-black/10 px-2 py-0.5 text-xs font-bold text-foreground/70">
      {children}
    </span>
  );
}

export function FamilyLesson({ data, tint }: { data: FamilyLessonData; tint: Tint }) {
  const { lang } = useApp();
  const [slide, setSlide] = useState(0);
  const total = data.slides.length + 3; // intro + slides + task + summary

  const labels = {
    back: { kk: "Артқа", ru: "Назад", en: "Back" } as L,
    next: { kk: "Алға", ru: "Далее", en: "Next" } as L,
    page: { kk: "слайд", ru: "слайд", en: "slide" } as L,
    you: { kk: "Сен:", ru: "Ты:", en: "You will:" } as L,
    keywords: { kk: "Тірек сөздер:", ru: "Ключевые слова:", en: "Key words:" } as L,
  };

  const renderSlide = () => {
    if (slide === 0) return <IntroSlide data={data} lang={lang} labels={labels} tint={tint} />;
    const contentIdx = slide - 1;
    if (contentIdx < data.slides.length) {
      const s = data.slides[contentIdx];
      return <ContentSlide s={s} idx={contentIdx + 2} lang={lang} tint={tint} />;
    }
    if (slide === total - 2) return <TaskSlide data={data} lang={lang} tint={tint} />;
    return <SummarySlide data={data} lang={lang} tint={tint} />;
  };

  return (
    <div className="mx-auto max-w-5xl space-y-5 pb-10">
      <Banner emoji={tint.emoji} banner={tint.banner} />
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={cn(
              "h-2 flex-1 rounded-full transition-all",
              i === slide
                ? cn(tint.accent, "shadow-glow")
                : i < slide
                  ? "bg-foreground/40"
                  : "bg-muted",
            )}
          />
        ))}
      </div>
      <p className="text-center text-sm font-bold text-muted-foreground">
        {slide + 1} {tt(labels.page, lang)} / {total}
      </p>
      <div className="min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {renderSlide()}
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
          onClick={() => {
            if (slide === total - 1) {
              confetti({ particleCount: 130, spread: 80 });
              return;
            }
            setSlide((s) => Math.min(total - 1, s + 1));
          }}
          className={cn(
            "flex items-center gap-1 rounded-2xl px-5 py-3 font-bold text-white shadow-glow transition hover:scale-105",
            tint.accent,
          )}
        >
          {slide === total - 1 ? "🎉" : tt(labels.next, lang)} <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function Banner({ emoji, banner }: { emoji: [string, string]; banner: string }) {
  return (
    <div className={cn("relative h-28 overflow-hidden rounded-3xl shadow-soft sm:h-32", banner)}>
      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 pb-1">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex h-16 w-16 items-end justify-center rounded-full bg-white/70 text-4xl shadow-soft sm:h-20 sm:w-20"
        >
          {emoji[0]}
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex h-16 w-16 items-end justify-center rounded-full bg-white/70 text-4xl shadow-soft sm:h-20 sm:w-20"
        >
          {emoji[1]}
        </motion.div>
      </div>
    </div>
  );
}

function IntroSlide({
  data,
  lang,
  labels,
  tint,
}: {
  data: FamilyLessonData;
  lang: Lang;
  labels: Record<string, L>;
  tint: Tint;
}) {
  const title = tt(data.lesson_title, lang);
  return (
    <div className={cn("rounded-3xl p-6 shadow-soft sm:p-8", tint.body)}>
      <div className="mb-5 flex items-start gap-3">
        <SpeakButton id="t" text={title} />
        <h1 className="font-display text-2xl font-black sm:text-3xl">{title}</h1>
        <SlideTag>1 {tt(labels.page, lang)}</SlideTag>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="mb-2 text-lg font-bold">{tt(labels.you, lang)}</h2>
          <ul className="space-y-2">
            {data.intro.goals.map((g, i) => {
              const text = tt(g, lang);
              return (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />
                  <SpeakButton id={`g${i}`} text={text} className="h-6 w-6" />
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
              const text = tt(k, lang);
              return (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />
                  <span className="font-semibold underline decoration-foreground/40 underline-offset-4">
                    {text}
                  </span>
                  <SpeakButton id={`k${i}`} text={text} className="h-6 w-6" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ContentSlide({
  s,
  idx,
  lang,
  tint,
}: {
  s: { title: L; text: L };
  idx: number;
  lang: Lang;
  tint: Tint;
}) {
  const title = tt(s.title, lang);
  const text = tt(s.text, lang);
  return (
    <div className={cn("rounded-3xl p-6 shadow-soft sm:p-8", tint.body)}>
      <div className="mb-4 flex items-center gap-3">
        <SpeakButton id={`ct${idx}`} text={title} />
        <h2 className="font-display text-xl font-bold sm:text-2xl">{title}</h2>
        <SlideTag>{idx} слайд</SlideTag>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className={cn("flex items-start gap-2 rounded-2xl p-4", tint.soft)}>
          <SpeakButton id={`cb${idx}`} text={text} className="h-6 w-6" />
          <p className="text-[15px] leading-relaxed">{text}</p>
        </div>
        <ImagePlaceholder label="illustration" />
      </div>
    </div>
  );
}

function TaskSlide({ data, lang, tint }: { data: FamilyLessonData; lang: Lang; tint: Tint }) {
  const title = tt(data.task.title, lang);
  const prompt = tt(data.task.prompt, lang);
  const [val, setVal] = useState("");
  return (
    <div className={cn("rounded-3xl p-6 shadow-soft sm:p-8", tint.body)}>
      <div className="mb-4 flex items-center gap-3">
        <div className={cn("rounded-xl px-4 py-1.5 text-white shadow-soft", tint.accent)}>
          <h2 className="font-display text-xl font-bold">{title}</h2>
        </div>
        <SpeakButton id="tt" text={title} />
        <SlideTag>{data.slides.length + 2} слайд</SlideTag>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className={cn("space-y-3 rounded-2xl p-5", tint.soft)}>
          <div className="flex items-start gap-2">
            <SpeakButton id="tp" text={prompt} className="h-6 w-6" />
            <p className="text-[15px] font-medium leading-relaxed">{prompt}</p>
          </div>
          <Textarea
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="..."
            className="min-h-[120px] bg-white/80"
          />
          <button
            onClick={() => {
              if (val.trim()) confetti({ particleCount: 80, spread: 70 });
            }}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-bold text-white shadow-glow",
              tint.accent,
            )}
          >
            <Sparkles className="mr-1 inline h-4 w-4" />
            {lang === "kk" ? "Тексеру" : lang === "ru" ? "Проверить" : "Check"}
          </button>
        </div>
        <ImagePlaceholder label="task scene" />
      </div>
    </div>
  );
}

function SummarySlide({ data, lang, tint }: { data: FamilyLessonData; lang: Lang; tint: Tint }) {
  const title = tt(data.summary.title, lang);
  const text = tt(data.summary.text, lang);
  const reward = tt(data.summary.reward, lang);
  return (
    <div className={cn("rounded-3xl p-6 text-center shadow-soft sm:p-10", tint.body)}>
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className={cn(
          "mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-white shadow-glow",
          tint.accent,
        )}
      >
        <Star className="h-10 w-10 fill-white" />
      </motion.div>
      <div className="mb-3 flex items-center justify-center gap-2">
        <h2 className="font-display text-2xl font-black sm:text-3xl">{title}</h2>
        <SpeakButton id="st" text={title} />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className={cn("flex items-start gap-2 rounded-2xl p-4 text-left", tint.soft)}>
          <SpeakButton id="sb" text={text} className="h-6 w-6" />
          <p className="text-[15px] leading-relaxed">{text}</p>
        </div>
      </div>
      <div
        className={cn(
          "mx-auto mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold text-white shadow-soft",
          tint.accent,
        )}
      >
        <Star className="h-4 w-4 fill-white" /> {reward}
      </div>
    </div>
  );
}
