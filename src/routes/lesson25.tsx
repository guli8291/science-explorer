import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/store/app";
import { getLesson } from "@/data/lessons";
import { SlideRunner } from "@/components/SlideRunner";
import { UI, t } from "@/i18n/translations";

export const Route = createFileRoute("/lesson25")({ component: Lesson25 });

function Lesson25() {
  const { lang, completeLesson } = useApp();
  const lesson = getLesson("l25")!;

  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-gradient-to-br from-[oklch(0.75_0.18_140)] via-[oklch(0.68_0.2_130)] to-[oklch(0.62_0.22_120)] p-5 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-widest text-white/80">
          🏆 {t({ kk: "Финалдық қорытынды", ru: "Финальный обзор", en: "Final Review" }, lang)}
        </p>
        <h1 className="mt-1 font-display text-2xl font-black text-white drop-shadow sm:text-3xl">
          {t(lesson.title, lang)}
        </h1>
      </div>

      <SlideRunner
        lesson={lesson}
        onComplete={(stars) => completeLesson(lesson.id, stars, stars)}
      />

      <div className="flex justify-center">
        <Link
          to="/chapters/$chapterId"
          params={{ chapterId: "tradition" }}
          className="rounded-full bg-card px-5 py-2.5 text-sm font-bold shadow-soft hover:scale-105 transition"
        >
          ←{" "}
          {t(
            { kk: "VI тарауға қайту", ru: "Вернуться к главе VI", en: "Back to Chapter VI" },
            lang,
          )}
        </Link>
      </div>
    </div>
  );
}
