import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/store/app";
import { getLesson } from "@/data/lessons";
import { SlideRunner } from "@/components/SlideRunner";
import { UI, t } from "@/i18n/translations";

export const Route = createFileRoute("/lesson23")({ component: Lesson23 });

function Lesson23() {
  const { lang, completeLesson } = useApp();
  const lesson = getLesson("l23")!;

  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-gradient-to-br from-[oklch(0.68_0.18_290)] via-[oklch(0.64_0.2_280)] to-[oklch(0.6_0.22_270)] p-5 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-widest text-white/80">
          {t(UI.chapters, lang)} VI ·{" "}
          {t({ kk: "Салт-дәстүр", ru: "Традиции", en: "Traditions" }, lang)}
        </p>
        <h1 className="mt-1 font-display text-2xl font-black text-white drop-shadow sm:text-3xl">
          📜 {t(lesson.title, lang)}
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
