import { createFileRoute } from "@tanstack/react-router";
import { FamilyLesson, type FamilyLessonData } from "@/components/FamilyLesson";
import data from "@/data/lesson11.json";

export const Route = createFileRoute("/lesson11")({ component: Lesson11 });

function Lesson11() {
  return (
    <FamilyLesson
      data={data as FamilyLessonData}
      tint={{
        banner:
          "bg-gradient-to-b from-[oklch(0.92_0.06_150)] via-[oklch(0.94_0.05_180)] to-[oklch(0.96_0.04_210)]",
        body: "bg-[oklch(0.93_0.06_150)]",
        soft: "bg-[oklch(0.96_0.035_150)]",
        accent: "bg-[oklch(0.6_0.16_150)]",
        emoji: ["💞", "🤝"],
      }}
    />
  );
}
