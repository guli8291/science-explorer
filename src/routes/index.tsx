import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useApp } from "@/store/app";
import { UI, t } from "@/i18n/translations";
import { CHAPTERS, LESSONS } from "@/data/lessons";
import { Sparkles, BookOpen, Trophy } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { lang, completed, totalStars } = useApp();
  const doneCount = Object.keys(completed).length;

  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[2.5rem] glass shadow-soft">
        <div className="absolute inset-0 gradient-earth opacity-30" />
        <div className="relative grid gap-6 p-8 md:grid-cols-2 md:p-14">
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/40 px-3 py-1 text-sm font-bold"
            >
              <Sparkles className="h-4 w-4" /> 34 · 8 · 3🌍
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-balance text-5xl font-bold leading-[1.05] md:text-7xl"
            >
              {t(UI.heroLine1, lang)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-lg text-muted-foreground"
            >
              {t(UI.heroLine2, lang)}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <Link
                to="/chapters"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-glow hover:scale-105 transition animate-pulse-glow"
              >
                <BookOpen className="h-5 w-5" /> {t(UI.start, lang)}
              </Link>
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 rounded-full bg-card px-6 py-3.5 font-bold shadow-soft hover:scale-105 transition"
              >
                <Trophy className="h-5 w-5" /> {totalStars()} ⭐
              </Link>
            </motion.div>
          </div>

          {/* Animated earth scene */}
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="relative h-64 w-64 md:h-80 md:w-80"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--sky)] via-[var(--leaf)] to-[var(--earth)] shadow-glow" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[var(--leaf)]/60 to-transparent" />
              <span className="absolute left-8 top-10 text-4xl">🌳</span>
              <span className="absolute right-10 top-20 text-4xl">⛰️</span>
              <span className="absolute bottom-12 left-16 text-4xl">🌊</span>
              <span className="absolute bottom-8 right-14 text-4xl">🏞️</span>
            </motion.div>
            <motion.span
              className="absolute -top-2 right-4 text-5xl"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              ☀️
            </motion.span>
            <motion.span
              className="absolute bottom-4 left-2 text-4xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              🌙
            </motion.span>
          </div>
        </div>
      </section>

      {/* Progress preview */}
      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: t(UI.lessons, lang), value: `${doneCount}/${LESSONS.length}`, emoji: "📚" },
          { label: t(UI.chapters, lang), value: `${CHAPTERS.length}`, emoji: "🗂️" },
          { label: t(UI.achievements, lang), value: `${totalStars()} ⭐`, emoji: "🏆" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-3xl p-6 shadow-soft"
          >
            <div className="text-3xl">{s.emoji}</div>
            <div className="mt-2 text-sm font-semibold text-muted-foreground">{s.label}</div>
            <div className="text-3xl font-bold">{s.value}</div>
          </motion.div>
        ))}
      </section>

      {/* Chapters grid */}
      <section>
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">{t(UI.chapters, lang)}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHAPTERS.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8, rotate: -1 }}
            >
              <Link
                to="/chapters/$chapterId"
                params={{ chapterId: c.id }}
                className={`block rounded-3xl bg-gradient-to-br ${c.gradient} p-5 shadow-soft hover:shadow-glow transition`}
              >
                <div className="text-5xl">{c.emoji}</div>
                <h3 className="mt-3 text-xl font-bold text-white drop-shadow">
                  {t(c.title, lang)}
                </h3>
                <p className="mt-1 text-sm font-semibold text-white/90">{t(c.description, lang)}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
