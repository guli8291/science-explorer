import { createFileRoute } from "@tanstack/react-router";
import { FamilyLesson, type FamilyLessonData } from "@/components/FamilyLesson";
import data from "@/data/lesson10.json";

export const Route = createFileRoute("/lesson10")({ component: Lesson10 });

function Lesson10() {
  return (
    <FamilyLesson
      data={data as FamilyLessonData}
      tint={{
        banner:
          "bg-gradient-to-b from-[oklch(0.9_0.07_330)] via-[oklch(0.93_0.05_300)] to-[oklch(0.96_0.04_270)]",
        body: "bg-[oklch(0.94_0.05_320)]",
        soft: "bg-[oklch(0.97_0.03_320)]",
        accent: "bg-[oklch(0.6_0.2_330)]",
        emoji: ["🎂", "🎉"],
      }}
    />
  );
}
