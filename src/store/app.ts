import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Lang } from "@/i18n/translations";

interface AppState {
  lang: Lang;
  setLang: (l: Lang) => void;
  muted: boolean;
  toggleMute: () => void;
  completed: Record<string, { score: number; stars: number }>;
  completeLesson: (id: string, score: number, stars: number) => void;
  isCompleted: (id: string) => boolean;
  totalStars: () => number;
}

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      lang: "kk",
      setLang: (lang) => set({ lang }),
      muted: true,
      toggleMute: () => set((s) => ({ muted: !s.muted })),
      completed: {},
      completeLesson: (id, score, stars) =>
        set((s) => ({
          completed: {
            ...s.completed,
            [id]: {
              score: Math.max(s.completed[id]?.score ?? 0, score),
              stars: Math.max(s.completed[id]?.stars ?? 0, stars),
            },
          },
        })),
      isCompleted: (id) => !!get().completed[id],
      totalStars: () => Object.values(get().completed).reduce((a, b) => a + b.stars, 0),
    }),
    { name: "duniyetanu-app" },
  ),
);
