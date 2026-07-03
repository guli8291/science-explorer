import { Volume2, Square } from "lucide-react";
import { useApp } from "@/store/app";
import { useTTS } from "@/hooks/useTTS";
import { cn } from "@/lib/utils";

export function SpeakButton({
  id,
  text,
  className,
}: {
  id: string;
  text: string;
  className?: string;
}) {
  const { lang } = useApp();
  const { speak, speakingId } = useTTS();
  const active = speakingId === id;
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        speak(id, text, lang);
      }}
      aria-label={active ? "Stop" : "Listen"}
      className={cn(
        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all hover:scale-110",
        active
          ? "bg-primary text-primary-foreground animate-pulse shadow-glow"
          : "bg-accent/40 text-accent-foreground hover:bg-accent",
        className,
      )}
    >
      {active ? <Square className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </button>
  );
}

export function useIsSpeaking(id: string) {
  const { speakingId } = useTTS();
  return speakingId === id;
}
