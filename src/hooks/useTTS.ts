import { useSyncExternalStore, useCallback } from "react";
import type { Lang } from "@/i18n/translations";

const LOCALE: Record<Lang, string> = { kk: "kk-KZ", ru: "ru-RU", en: "en-US" };

let speakingId: string | null = null;
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const getSnapshot = () => speakingId;
const setSpeaking = (id: string | null) => {
  speakingId = id;
  listeners.forEach((l) => l());
};

export function useTTS() {
  const current = useSyncExternalStore(subscribe, getSnapshot, () => null);

  const stop = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setSpeaking(null);
  }, []);

  const speak = useCallback(
    (id: string, text: string, lang: Lang) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      if (speakingId === id) {
        stop();
        return;
      }
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = LOCALE[lang];
      u.rate = 0.95;
      u.pitch = 1.05;
      u.onend = () => {
        if (speakingId === id) setSpeaking(null);
      };
      u.onerror = () => {
        if (speakingId === id) setSpeaking(null);
      };
      setSpeaking(id);
      window.speechSynthesis.speak(u);
    },
    [stop],
  );

  return { speak, stop, speakingId: current };
}
