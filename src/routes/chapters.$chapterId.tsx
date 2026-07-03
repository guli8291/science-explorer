import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useApp } from "@/store/app";
import { UI, t } from "@/i18n/translations";
import { getChapter, lessonsByChapter } from "@/data/lessons";
import { ChevronRight, Lock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/chapters/$chapterId")({
  component: ChapterPage,
  notFoundComponent: () => (
    <div className="glass rounded-3xl p-10 text-center">Chapter not found</div>
  ),
  loader: ({ params }) => {
    if (!getChapter(params.chapterId)) throw notFound();
    return null;
  },
});

function ChapterPage() {
  const { chapterId } = Route.useParams();
  const chapter = getChapter(chapterId)!;
  const lessons = lessonsByChapter(chapterId);
  const { lang, isCompleted, completed } = useApp();

  return (
    <div className="space-y-8">
      <Link
        to="/chapters"
        className="inline-flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-foreground"
      >
        ← {t(UI.backToChapters, lang)}
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${chapter.gradient} p-8 shadow-soft md:p-12`}
      >
        <motion.div
          className="absolute -right-8 -top-8 text-[12rem] opacity-30"
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          {chapter.emoji}
        </motion.div>
        <div className="relative">
          <div className="text-sm font-bold text-white/90">
            {t(UI.chapters, lang)} · {chapter.index}/8
          </div>
          <h1 className="mt-2 text-5xl font-bold text-white drop-shadow md:text-6xl">
            {t(chapter.title, lang)}
          </h1>
          <p className="mt-3 text-lg text-white/95">{t(chapter.description, lang)}</p>
        </div>
      </motion.div>

      <div className="grid gap-3 md:grid-cols-2">
        {lessons.map((l, i) => {
          const done = isCompleted(l.id);
          const prev = true;
          const stars = completed[l.id]?.stars ?? 0;
          return (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={prev ? { scale: 1.02 } : {}}
            >
              {prev ? (
                <Link
                  to="/lesson/$lessonId"
                  params={{ lessonId: l.id }}
                  className="glass flex items-center gap-4 rounded-2xl p-4 shadow-soft hover:shadow-glow transition"
                >
                  <LessonRow l={l} done={done} stars={stars} lang={lang} locked={false} />
                </Link>
              ) : (
                <div className="flex items-center gap-4 rounded-2xl bg-muted p-4 shadow-soft opacity-60">
                  <LessonRow l={l} done={done} stars={stars} lang={lang} locked={true} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

import type { Lesson } from "@/data/lessons";
import type { Lang } from "@/i18n/translations";

function LessonRow({
  l,
  done,
  stars,
  lang,
  locked,
}: {
  l: Lesson;
  done: boolean;
  stars: number;
  lang: Lang;
  locked: boolean;
}) {
  return (
    <>
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--leaf)] to-[var(--primary)] text-2xl text-white shadow-soft">
        {l.emoji}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-bold text-muted-foreground">
          {t(UI.lesson, lang)} {l.index}
        </div>
        <div className="truncate font-bold">{t(l.title, lang)}</div>
        {done && (
          <div className="text-sm">
            {Array.from({ length: 3 }).map((_, j) => (
              <span key={j}>{j < stars ? "⭐" : "☆"}</span>
            ))}
          </div>
        )}
      </div>
      {locked ? (
        <Lock className="h-5 w-5 text-muted-foreground" />
      ) : done ? (
        <CheckCircle2 className="h-6 w-6 text-[var(--leaf)]" />
      ) : (
        <ChevronRight className="h-5 w-5" />
      )}
    </>
  );
}
