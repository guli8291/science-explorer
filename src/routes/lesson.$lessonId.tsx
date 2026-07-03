import { createFileRoute, Link, useNavigate, notFound, redirect } from "@tanstack/react-router";
import { useApp } from "@/store/app";
import { UI, t } from "@/i18n/translations";
import { getLesson, getChapter, lessonsByChapter, LESSONS } from "@/data/lessons";
import { LessonRunner } from "@/components/LessonRunner";
import { SlideRunner } from "@/components/SlideRunner";

export const Route = createFileRoute("/lesson/$lessonId")({
  component: LessonPage,
  notFoundComponent: () => (
    <div className="glass rounded-3xl p-10 text-center">Lesson not found</div>
  ),
  loader: ({ params }) => {
    if (params.lessonId === "l3") throw redirect({ to: "/lesson3" });
    if (params.lessonId === "l4") throw redirect({ to: "/lesson4" });
    if (params.lessonId === "l5") throw redirect({ to: "/lesson5" });
    if (params.lessonId === "l6") throw redirect({ to: "/lesson6" });
    if (params.lessonId === "l7") throw redirect({ to: "/lesson7" });
    if (params.lessonId === "l8") throw redirect({ to: "/lesson8" });
    if (params.lessonId === "l9") throw redirect({ to: "/lesson9" });
    if (params.lessonId === "l10") throw redirect({ to: "/lesson10" });
    if (params.lessonId === "l11") throw redirect({ to: "/lesson11" });
    if (params.lessonId === "l19") throw redirect({ to: "/lesson19" });
    if (params.lessonId === "l20") throw redirect({ to: "/lesson20" });
    if (params.lessonId === "l21") throw redirect({ to: "/lesson21" });
    if (params.lessonId === "l22") throw redirect({ to: "/lesson22" });
    if (params.lessonId === "l23") throw redirect({ to: "/lesson23" });
    if (params.lessonId === "l24") throw redirect({ to: "/lesson24" });
    if (params.lessonId === "l25") throw redirect({ to: "/lesson25" });
    if (!getLesson(params.lessonId)) throw notFound();
    return null;
  },
});

function LessonPage() {
  const { lessonId } = Route.useParams();
  const lesson = getLesson(lessonId)!;
  const chapter = getChapter(lesson.chapterId)!;
  const { lang, completeLesson } = useApp();
  const navigate = useNavigate();

  const all = lessonsByChapter(lesson.chapterId);
  const idxInChapter = all.findIndex((l) => l.id === lesson.id);
  const next = all[idxInChapter + 1];
  const globalIdx = LESSONS.findIndex((l) => l.id === lesson.id);
  const globalNext = LESSONS[globalIdx + 1];

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          {t(UI.home, lang)}
        </Link>
        <span>›</span>
        <Link to="/chapters" className="hover:text-foreground">
          {t(UI.chapters, lang)}
        </Link>
        <span>›</span>
        <Link
          to="/chapters/$chapterId"
          params={{ chapterId: chapter.id }}
          className="hover:text-foreground"
        >
          {t(chapter.title, lang)}
        </Link>
        <span>›</span>
        <span className="text-foreground">
          {t(UI.lesson, lang)} {lesson.index}
        </span>
      </nav>

      {lesson.slides && lesson.slides.length > 0 ? (
        <SlideRunner
          lesson={lesson}
          onComplete={(stars) => completeLesson(lesson.id, stars, stars)}
        />
      ) : (
        <LessonRunner
          lesson={lesson}
          onComplete={(stars) => {
            completeLesson(lesson.id, stars, stars);
          }}
        />
      )}

      <div className="mx-auto flex max-w-3xl flex-wrap justify-between gap-3">
        <Link
          to="/chapters/$chapterId"
          params={{ chapterId: chapter.id }}
          className="rounded-full bg-card px-5 py-2.5 font-bold shadow-soft hover:scale-105 transition"
        >
          ← {t(chapter.title, lang)}
        </Link>
        {(next || globalNext) && (
          <button
            onClick={() =>
              navigate({
                to: "/lesson/$lessonId",
                params: { lessonId: (next ?? globalNext).id },
              })
            }
            className="rounded-full bg-primary px-5 py-2.5 font-bold text-primary-foreground shadow-glow hover:scale-105 transition"
          >
            {t(UI.next, lang)} →
          </button>
        )}
      </div>
    </div>
  );
}
