import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Video,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";
import { useApp } from "@/store/app";
import type { Lang } from "@/i18n/translations";
import { SpeakButton } from "@/components/SpeakButton";
import data from "@/data/lesson8.json";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lesson8")({ component: Lesson8 });

type L = Record<Lang, string>;
const tt = (s: L, lang: Lang) => s[lang] ?? s.en;

const PEACH = "bg-[oklch(0.92_0.05_40)]";
const PEACH_SOFT = "bg-[oklch(0.95_0.035_40)]";
const SKY = "bg-[oklch(0.92_0.045_220)]";
const SAGE = "bg-[oklch(0.9_0.06_130)]";
const SAGE_TAG = "bg-[oklch(0.78_0.07_90)]";
const GREEN_BORDER = "border-[oklch(0.7_0.13_140)]";
const PINK_TAG = "bg-[oklch(0.9_0.07_20)]";

function HeaderBanner() {
  return (
    <div className="relative h-28 overflow-hidden rounded-3xl bg-gradient-to-b from-[oklch(0.88_0.06_220)] via-[oklch(0.93_0.05_140)] to-[oklch(0.96_0.04_100)] shadow-soft sm:h-32">
      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 pb-1">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex h-16 w-16 items-end justify-center rounded-full bg-gradient-to-b from-pink-200 to-pink-300 text-4xl shadow-soft sm:h-20 sm:w-20"
        >
          👧
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex h-16 w-16 items-end justify-center rounded-full bg-gradient-to-b from-blue-200 to-blue-300 text-4xl shadow-soft sm:h-20 sm:w-20"
        >
          👦
        </motion.div>
      </div>
    </div>
  );
}

function SlideTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-auto rounded-md bg-[oklch(0.88_0.04_40)] px-2 py-0.5 text-xs font-bold text-foreground/70">
      {children}
    </span>
  );
}

function ImagePlaceholder({ ratio = "aspect-[4/3]", label }: { ratio?: string; label?: string }) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/40 text-muted-foreground",
        ratio,
      )}
    >
      <div className="flex flex-col items-center gap-1">
        <ImageIcon className="h-8 w-8 opacity-50" />
        <span className="text-xs">{label ?? "image"}</span>
      </div>
    </div>
  );
}

function VideoPlaceholder() {
  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/40 text-muted-foreground">
      <div className="flex flex-col items-center gap-1">
        <Video className="h-8 w-8 opacity-50" />
        <span className="text-xs">video</span>
      </div>
    </div>
  );
}

function Lesson8() {
  const { lang } = useApp();
  const [slide, setSlide] = useState(0);
  const total = 9;
  const labels = {
    back: { kk: "Артқа", ru: "Назад", en: "Back" } as L,
    next: { kk: "Алға", ru: "Далее", en: "Next" } as L,
    page: { kk: "слайд", ru: "слайд", en: "slide" } as L,
    you: { kk: "Сен:", ru: "Ты:", en: "You will:" } as L,
    keywords: { kk: "Тірек сөздер:", ru: "Ключевые слова:", en: "Key words:" } as L,
  };

  const slides = [
    <SlideIntro key="0" lang={lang} labels={labels} />,
    <SlidePedestrian key="1" lang={lang} />,
    <SlideVideo key="2" lang={lang} />,
    <SlideMemoryWay key="3" lang={lang} />,
    <SlideCaution key="4" lang={lang} />,
    <SlideSigns key="5" lang={lang} />,
    <SlideTrafficLight key="6" lang={lang} />,
    <SlideTasks key="7" lang={lang} />,
    <SlideSection key="8" lang={lang} />,
  ];

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
            transition={{ duration: 0.3 }}
          >
            {slides[slide]}
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
          className="flex items-center gap-1 rounded-2xl bg-[oklch(0.65_0.18_30)] px-5 py-3 font-bold text-white shadow-glow transition hover:scale-105"
        >
          {slide === total - 1 ? "🎉" : tt(labels.next, lang)} <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

/* Slide 1: Intro */
function SlideIntro({ lang, labels }: { lang: Lang; labels: Record<string, L> }) {
  const title = tt(data.lesson_title as L, lang);
  return (
    <div className={cn("rounded-3xl p-6 shadow-soft sm:p-8", PEACH)}>
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
              const text = tt(g as L, lang);
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
              const text = tt(k as L, lang);
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

/* Slide 2: Pedestrian intro + image */
function SlidePedestrian({ lang }: { lang: Lang }) {
  const title = tt(data.pedestrian.title as L, lang);
  return (
    <div className={cn("rounded-3xl p-6 shadow-soft sm:p-8", PEACH)}>
      <div className="mb-4 flex items-center gap-3">
        <SpeakButton id="pt" text={title} />
        <h2 className="font-display text-2xl font-bold">{title}</h2>
        <SlideTag>2 слайд</SlideTag>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-3">
          {data.pedestrian.paragraphs.map((p, i) => {
            const text = tt(p as L, lang);
            return (
              <div key={i} className="flex items-start gap-2">
                <SpeakButton id={`pp${i}`} text={text} className="h-6 w-6" />
                <p className="text-[15px] leading-relaxed">{text}</p>
              </div>
            );
          })}
          <ImagePlaceholder ratio="aspect-[4/3]" label="pedestrian illustration" />
        </div>
        <div className="space-y-3">
          <VideoPlaceholder />
          <p className="text-xs font-bold text-muted-foreground">2 слайд</p>
        </div>
      </div>
    </div>
  );
}

/* Slide 3: Video alone (kept slim) */
function SlideVideo({ lang }: { lang: Lang }) {
  return (
    <div className={cn("rounded-3xl p-6 shadow-soft sm:p-8", PEACH)}>
      <div className="mb-4 flex items-center gap-3">
        <h2 className="font-display text-xl font-bold">
          {lang === "kk" ? "Бейне" : lang === "ru" ? "Видео" : "Video"}
        </h2>
        <SlideTag>3 слайд</SlideTag>
      </div>
      <VideoPlaceholder />
    </div>
  );
}

/* Slide 4: Way memory questions */
function SlideMemoryWay({ lang }: { lang: Lang }) {
  return (
    <div className={cn("space-y-4 rounded-3xl p-6 shadow-soft sm:p-8", PEACH)}>
      <div
        className={cn(
          "relative rounded-2xl border-2 bg-[oklch(0.96_0.025_40)] p-4 pl-5 pt-6",
          GREEN_BORDER,
        )}
      >
        <div className="absolute -left-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[oklch(0.7_0.13_140)] bg-white text-base">
          👫
        </div>
        <SlideTag>3 слайд</SlideTag>
        <ul className="mt-2 space-y-2">
          {data.pedestrian.questions.map((q, i) => {
            const text = tt(q as L, lang);
            return (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />
                <SpeakButton id={`mq${i}`} text={text} className="h-6 w-6" />
                <p className="text-[15px] leading-relaxed">{text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* Slide 5: Caution + conclusion */
function SlideCaution({ lang }: { lang: Lang }) {
  const conclusion = tt(data.pedestrian.conclusion as L, lang);
  return (
    <div className={cn("space-y-4 rounded-3xl p-6 shadow-soft sm:p-8", PEACH)}>
      <div className="flex items-start gap-2 rounded-2xl bg-card/70 p-4">
        <SpeakButton id="conc" text={conclusion} />
        <p className="text-[15px] font-medium leading-relaxed">{conclusion}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {data.pedestrian.cautions.map((c, i) => {
          const text = tt(c as L, lang);
          const Icon = i === 0 ? AlertTriangle : HelpCircle;
          return (
            <div key={i} className={cn("relative rounded-2xl p-4 pl-10", PEACH_SOFT)}>
              <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[oklch(0.9_0.1_30)] text-[oklch(0.5_0.18_25)]">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex items-start gap-2">
                <SpeakButton id={`c${i}`} text={text} className="h-6 w-6" />
                <p className="text-sm leading-relaxed">{text}</p>
              </div>
              <p className="mt-2 text-xs font-bold text-muted-foreground">4 слайд</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Slide 6: Road signs grid */
function SlideSigns({ lang }: { lang: Lang }) {
  const title = tt(data.signs.title as L, lang);
  const intro = tt(data.signs.intro as L, lang);
  const note = tt(data.signs.note as L, lang);
  return (
    <div className={cn("space-y-4 rounded-3xl p-6 shadow-soft sm:p-8", SKY)}>
      <div className="flex items-center gap-3">
        <div className={cn("rounded-xl px-4 py-1.5 shadow-soft", PINK_TAG)}>
          <h2 className="font-display text-xl font-bold">{title}</h2>
        </div>
        <SpeakButton id="st" text={title} />
        <SlideTag>5 слайд</SlideTag>
      </div>
      <div className="flex items-start gap-2">
        <SpeakButton id="si" text={intro} className="h-6 w-6" />
        <p className="text-[15px] leading-relaxed">{intro}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {data.signs.items.map((item, i) => {
          const text = tt(item as L, lang);
          return (
            <div
              key={i}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl p-3 text-center",
                PEACH_SOFT,
              )}
            >
              <ImagePlaceholder ratio="aspect-square" label="sign" />
              <div className="flex items-center gap-1">
                <SpeakButton id={`s${i}`} text={text} className="h-5 w-5" />
                <p className="text-xs font-semibold leading-tight">{text}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className={cn("flex items-start gap-2 rounded-2xl p-4", PEACH_SOFT)}>
        <SpeakButton id="sn" text={note} className="h-6 w-6" />
        <p className="text-sm font-medium leading-relaxed">{note}</p>
      </div>
    </div>
  );
}

/* Slide 7: Traffic light */
function SlideTrafficLight({ lang }: { lang: Lang }) {
  const tl = data.signs.traffic_light;
  const title = tt(tl.title as L, lang);
  const q = tt(tl.question as L, lang);
  return (
    <div className={cn("space-y-4 rounded-3xl p-6 shadow-soft sm:p-8", SKY)}>
      <div className="flex items-center gap-3">
        <h2 className="font-display text-xl font-bold">{title}</h2>
        <SlideTag>6 слайд</SlideTag>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className={cn("rounded-2xl p-4", PEACH_SOFT)}>
          <div className="flex items-start gap-2">
            <SpeakButton id="tlq" text={q} className="h-6 w-6" />
            <p className="text-sm leading-relaxed">{q}</p>
          </div>
        </div>
        <ImagePlaceholder ratio="aspect-[4/3]" label="traffic light" />
      </div>
      <div className={cn("space-y-2 rounded-2xl p-4", PEACH_SOFT)}>
        {tl.tasks.map((task, i) => {
          const text = tt(task as L, lang);
          return (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />
              <SpeakButton id={`tlt${i}`} text={text} className="h-6 w-6" />
              <p className="text-sm leading-relaxed">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Slide 8: Tasks (choose + careful + answer) */
function SlideTasks({ lang }: { lang: Lang }) {
  const t = data.tasks;
  const choose = t.choose;
  const [picked, setPicked] = useState<Array<number | null>>([null, null]);
  const [showResult, setShowResult] = useState(false);
  const [careful, setCareful] = useState("");
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");

  const check = () => {
    setShowResult(true);
    if (picked.every((p, i) => p === choose.options[i].correct)) {
      confetti({ particleCount: 100, spread: 70 });
    }
  };

  return (
    <div className={cn("space-y-5 rounded-3xl p-6 shadow-soft sm:p-8", SAGE)}>
      <div className="flex items-center gap-3">
        <div className={cn("rounded-xl px-5 py-2 shadow-soft", SAGE_TAG)}>
          <h2 className="font-display text-xl font-bold">{tt(t.title as L, lang)}</h2>
        </div>
        <SlideTag>7 слайд</SlideTag>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Choose */}
        <div className={cn("rounded-2xl p-5", PEACH_SOFT)}>
          <div className="mb-2 flex items-center gap-2">
            <SpeakButton id="ct" text={tt(choose.title as L, lang)} className="h-6 w-6" />
            <h3 className="font-display text-lg font-bold">{tt(choose.title as L, lang)}</h3>
          </div>
          <p className="mb-2 text-xs font-semibold text-muted-foreground">
            {tt(choose.instruction as L, lang)}
          </p>
          <p className="mb-3 text-sm leading-relaxed">{tt(choose.prompt as L, lang)}</p>
          <div className="space-y-3">
            {choose.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2 rounded-xl bg-white/60 p-2">
                <ImagePlaceholder ratio="aspect-square w-16" label="" />
                <div className="flex flex-1 flex-col gap-1">
                  {opt.answers.map((ans, ai) => {
                    const isPicked = picked[i] === ai;
                    const isCorrect = opt.correct === ai;
                    const tone =
                      showResult && isPicked
                        ? isCorrect
                          ? "border-green-500 bg-green-50"
                          : "border-red-400 bg-red-50"
                        : isPicked
                          ? "border-primary bg-primary/10"
                          : "border-border bg-white/70";
                    return (
                      <button
                        key={ai}
                        onClick={() => {
                          const np = [...picked];
                          np[i] = ai;
                          setPicked(np);
                          setShowResult(false);
                        }}
                        className={cn(
                          "rounded-lg border-2 px-2 py-1 text-left text-xs font-semibold transition",
                          tone,
                        )}
                      >
                        {tt(ans as L, lang)}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={check}
            className="mt-3 rounded-full bg-[oklch(0.65_0.18_30)] px-4 py-1.5 text-xs font-bold text-white shadow-glow hover:scale-105 transition"
          >
            {lang === "kk" ? "Жауапты тексеру" : lang === "ru" ? "Проверить" : "Check"}
          </button>
        </div>

        {/* Careful + Answer */}
        <div className="space-y-4">
          <div className={cn("rounded-2xl p-5", PEACH_SOFT)}>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[oklch(0.9_0.1_30)] text-[oklch(0.5_0.18_25)]">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <SpeakButton id="cat" text={tt(t.careful.title as L, lang)} className="h-6 w-6" />
              <h3 className="font-display text-lg font-bold">{tt(t.careful.title as L, lang)}</h3>
            </div>
            <p className="mb-2 text-sm leading-relaxed">{tt(t.careful.prompt as L, lang)}</p>
            <textarea
              value={careful}
              onChange={(e) => setCareful(e.target.value)}
              rows={2}
              className="w-full rounded-xl border-2 border-border bg-background p-2 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className={cn("rounded-2xl p-5", PEACH_SOFT)}>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[oklch(0.9_0.1_30)] text-[oklch(0.5_0.18_25)]">
                <HelpCircle className="h-4 w-4" />
              </div>
              <SpeakButton id="ant" text={tt(t.answer.title as L, lang)} className="h-6 w-6" />
              <h3 className="font-display text-lg font-bold">{tt(t.answer.title as L, lang)}</h3>
            </div>
            <p className="mb-2 text-xs font-semibold text-muted-foreground">
              {tt(t.answer.instruction as L, lang)}
            </p>
            <label className="mb-1 block text-sm font-semibold">{tt(t.answer.q1 as L, lang)}</label>
            <input
              value={a1}
              onChange={(e) => setA1(e.target.value)}
              className="mb-3 w-full rounded-lg border-2 border-border bg-background p-2 text-sm outline-none focus:border-primary"
            />
            <label className="mb-1 block text-sm font-semibold">{tt(t.answer.q2 as L, lang)}</label>
            <input
              value={a2}
              onChange={(e) => setA2(e.target.value)}
              className="w-full rounded-lg border-2 border-border bg-background p-2 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Slide 9: Section summary */
function SlideSection({ lang }: { lang: Lang }) {
  const s = data.section;
  return (
    <div className={cn("space-y-4 rounded-3xl p-6 shadow-soft sm:p-8", PEACH)}>
      <div className="flex items-center gap-3">
        <SpeakButton id="sect" text={tt(s.title as L, lang)} />
        <h2 className="font-display text-xl font-bold">{tt(s.title as L, lang)}</h2>
        <SlideTag>9 слайд</SlideTag>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          {[s.learned, s.able].map((block, bi) => (
            <div key={bi} className={cn("rounded-2xl p-4", PEACH_SOFT)}>
              <h3 className="mb-2 font-bold text-[oklch(0.5_0.18_25)]">
                {tt(block.label as L, lang)}
              </h3>
              <ul className="space-y-1.5">
                {block.items.map((it, i) => {
                  const text = tt(it as L, lang);
                  return (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />
                      <SpeakButton id={`b${bi}-${i}`} text={text} className="h-5 w-5" />
                      <p className="text-sm leading-relaxed">{text}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <ImagePlaceholder ratio="aspect-[4/3]" label="kids illustration" />
          <div className={cn("rounded-2xl p-4", PEACH_SOFT)}>
            <h3 className="mb-2 font-bold">{tt(s.final.title as L, lang)}</h3>
            <ul className="space-y-1.5">
              {s.final.items.map((it, i) => {
                const text = tt(it as L, lang);
                return (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />
                    <SpeakButton id={`f${i}`} text={text} className="h-5 w-5" />
                    <p className="text-sm leading-relaxed">{text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
