import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useApp } from "@/store/app";
import { UI, t } from "@/i18n/translations";
import { LESSONS, CHAPTERS } from "@/data/lessons";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [
      { title: "Profile — Düniyetanu" },
      { name: "description", content: "Your learning progress, stars and achievements." },
    ],
  }),
});

const BADGES = [
  {
    id: "first",
    emoji: "🌱",
    title: { kk: "Алғашқы қадам", ru: "Первый шаг", en: "First step" },
    need: 1,
  },
  { id: "five", emoji: "🌿", title: { kk: "5 сабақ", ru: "5 уроков", en: "5 lessons" }, need: 5 },
  {
    id: "ten",
    emoji: "🌳",
    title: { kk: "10 сабақ", ru: "10 уроков", en: "10 lessons" },
    need: 10,
  },
  {
    id: "twenty",
    emoji: "🏆",
    title: { kk: "20 сабақ", ru: "20 уроков", en: "20 lessons" },
    need: 20,
  },
  {
    id: "all",
    emoji: "👑",
    title: { kk: "Барлығы аяқталды!", ru: "Всё пройдено!", en: "All complete!" },
    need: 34,
  },
];

function ProfilePage() {
  const { lang, completed, totalStars } = useApp();
  const done = Object.keys(completed).length;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass overflow-hidden rounded-3xl p-8 shadow-soft md:p-12"
      >
        <div className="flex flex-wrap items-center gap-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[var(--sun)] to-[var(--berry)] text-5xl shadow-glow"
          >
            🧑‍🎓
          </motion.div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold">{t(UI.profile, lang)}</h1>
            <p className="mt-1 text-muted-foreground">{t(UI.progress, lang)}</p>
          </div>
          <div className="flex gap-6">
            <Stat label={t(UI.lessons, lang)} value={`${done}/${LESSONS.length}`} />
            <Stat label="⭐" value={`${totalStars()}`} />
          </div>
        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--leaf)] via-[var(--primary)] to-[var(--berry)]"
            initial={{ width: 0 }}
            animate={{ width: `${(done / LESSONS.length) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </motion.div>

      <section>
        <h2 className="mb-4 text-2xl font-bold">{t(UI.achievements, lang)} 🏆</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {BADGES.map((b) => {
            const earned = done >= b.need;
            return (
              <motion.div
                key={b.id}
                whileHover={{ scale: 1.05 }}
                className={`glass rounded-2xl p-4 text-center shadow-soft ${
                  earned ? "" : "opacity-40 grayscale"
                }`}
              >
                <div className="text-4xl">{b.emoji}</div>
                <div className="mt-2 text-sm font-bold">{t(b.title, lang)}</div>
                {!earned && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    {done}/{b.need}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">{t(UI.chapters, lang)} 📚</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {CHAPTERS.map((c) => {
            const total = LESSONS.filter((l) => l.chapterId === c.id).length;
            const cdone = LESSONS.filter((l) => l.chapterId === c.id && completed[l.id]).length;
            return (
              <Link
                key={c.id}
                to="/chapters/$chapterId"
                params={{ chapterId: c.id }}
                className="glass flex items-center gap-3 rounded-2xl p-4 shadow-soft hover:shadow-glow transition"
              >
                <div className="text-3xl">{c.emoji}</div>
                <div className="flex-1">
                  <div className="font-bold">{t(c.title, lang)}</div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full bg-gradient-to-r ${c.gradient}`}
                      style={{ width: `${(cdone / total) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-sm font-bold text-muted-foreground">
                  {cdone}/{total}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs font-semibold text-muted-foreground">{label}</div>
    </div>
  );
}
