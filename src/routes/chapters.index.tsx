import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useApp } from "@/store/app";
import { UI, t } from "@/i18n/translations";
import { CHAPTERS, lessonsByChapter } from "@/data/lessons";

export const Route = createFileRoute("/chapters/")({
  component: ChaptersPage,
  head: () => ({
    meta: [
      { title: "Chapters — Düniyetanu" },
      { name: "description", content: "Explore 8 chapters of interactive World Studies lessons." },
    ],
  }),
});

function ChaptersPage() {
  const { lang, isCompleted } = useApp();

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold md:text-5xl"
      >
        {t(UI.chapters, lang)} 📚
      </motion.h1>

      <div className="grid gap-5 md:grid-cols-2">
        {CHAPTERS.map((c, i) => {
          const lessons = lessonsByChapter(c.id);
          const done = lessons.filter((l) => isCompleted(l.id)).length;
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link
                to="/chapters/$chapterId"
                params={{ chapterId: c.id }}
                className={`relative block overflow-hidden rounded-3xl bg-gradient-to-br ${c.gradient} p-6 shadow-soft hover:shadow-glow transition`}
              >
                <motion.div
                  className="absolute -right-6 -top-6 text-9xl opacity-30"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  {c.emoji}
                </motion.div>
                <div className="relative">
                  <div className="text-sm font-bold text-white/90">
                    {t(UI.lesson, lang)} {c.index} · {lessons.length} {t(UI.totalLessons, lang)}
                  </div>
                  <h2 className="mt-2 text-3xl font-bold text-white drop-shadow">
                    {t(c.title, lang)}
                  </h2>
                  <p className="mt-1 text-white/90">{t(c.description, lang)}</p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/30">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${(done / lessons.length) * 100}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs font-bold text-white/90">
                    {done}/{lessons.length} {t(UI.completed, lang)}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
