import { createFileRoute } from "@tanstack/react-router";
import { FamilyLesson, type FamilyLessonData } from "@/components/FamilyLesson";
import data from "@/data/lesson9.json";

export const Route = createFileRoute("/lesson9")({ component: Lesson9 });

function Lesson9() {
  return (
    <FamilyLesson
      data={data as FamilyLessonData}
      tint={{
        banner:
          "bg-gradient-to-b from-[oklch(0.9_0.06_30)] via-[oklch(0.93_0.05_60)] to-[oklch(0.96_0.04_90)]",
        body: "bg-[oklch(0.93_0.05_40)]",
        soft: "bg-[oklch(0.96_0.03_40)]",
        accent: "bg-[oklch(0.65_0.18_30)]",
        emoji: ["👩", "👨"],
      }}
    />
  );
}
