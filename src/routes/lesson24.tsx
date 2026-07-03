import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/store/app";
import { getLesson } from "@/data/lessons";
import { SlideRunner } from "@/components/SlideRunner";
import { UI, t } from "@/i18n/translations";

export const Route = createFileRoute("/lesson24")({ component: Lesson24 });

function Lesson24() {
  const { lang, completeLesson } = useApp();
  const lesson = getLesson("l24")!;

  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-gradient-to-br from-[oklch(0.82_0.18_85)] via-[oklch(0.78_0.2_70)] to-[oklch(0.72_0.22_55)] p-5 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-widest text-white/80">
          {t(UI.chapters, lang)} VI ·{" "}
          {t({ kk: "Тарихи мұра", ru: "Историческое наследие", en: "Historical Heritage" }, lang)}
        </p>
        <h1 className="mt-1 font-display text-2xl font-black text-white drop-shadow sm:text-3xl">
          👑 {t(lesson.title, lang)}
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
