import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/store/app";
import { getLesson } from "@/data/lessons";
import { SlideRunner } from "@/components/SlideRunner";
import { UI, t } from "@/i18n/translations";

export const Route = createFileRoute("/lesson20")({ component: Lesson20 });

function Lesson20() {
  const { lang, completeLesson } = useApp();
  const lesson = getLesson("l20")!;

  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-gradient-to-br from-[oklch(0.85_0.14_75)] via-[oklch(0.82_0.16_60)] to-[oklch(0.78_0.18_45)] p-5 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-widest text-white/80">
          {t(UI.chapters, lang)} V · {t({ kk: "Саяхат", ru: "Путешествие", en: "Travel" }, lang)}
        </p>
        <h1 className="mt-1 font-display text-2xl font-black text-white drop-shadow sm:text-3xl">
          🏙️ {t(lesson.title, lang)}
        </h1>
      </div>

      <SlideRunner
        lesson={lesson}
        onComplete={(stars) => completeLesson(lesson.id, stars, stars)}
      />

      <div className="flex justify-center">
        <Link
          to="/chapters/$chapterId"
          params={{ chapterId: "travel" }}
          className="rounded-full bg-card px-5 py-2.5 text-sm font-bold shadow-soft hover:scale-105 transition"
        >
          ← {t({ kk: "V тарауға қайту", ru: "Вернуться к главе V", en: "Back to Chapter V" }, lang)}
        </Link>
      </div>
    </div>
  );
}
