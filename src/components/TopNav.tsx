import { Link, useRouterState } from "@tanstack/react-router";
import { useApp } from "@/store/app";
import { UI, LANGS, t } from "@/i18n/translations";
import { Volume2, VolumeX, Home, BookOpen, Trophy, User } from "lucide-react";
import { motion } from "framer-motion";

export function TopNav() {
  const { lang, setLang, muted, toggleMute, totalStars } = useApp();
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const nav = [
    { to: "/", icon: Home, label: t(UI.home, lang) },
    { to: "/chapters", icon: BookOpen, label: t(UI.chapters, lang) },
    { to: "/profile", icon: User, label: t(UI.profile, lang) },
  ];

  return (
    <header className="sticky top-0 z-40 glass border-b">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <motion.span
            className="text-3xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🌍
          </motion.span>
          <span className="font-display text-xl font-bold tracking-tight">
            {t(UI.appName, lang)}
          </span>
        </Link>

        <nav className="ml-4 hidden gap-1 md:flex">
          {nav.map((n) => {
            const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-all ${
                  active ? "bg-primary text-primary-foreground shadow-soft" : "hover:bg-muted"
                }`}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-full bg-accent/40 px-3 py-1 text-sm font-bold sm:flex">
            <Trophy className="h-4 w-4 text-[oklch(0.65_0.18_60)]" />
            <span>{totalStars()}</span>
          </div>

          <div className="flex gap-1 rounded-full bg-muted p-1">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`rounded-full px-2 py-0.5 text-xs font-bold transition-all ${
                  lang === l.code ? "bg-card shadow-soft" : "opacity-60 hover:opacity-100"
                }`}
                aria-label={l.label}
              >
                {l.code.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={toggleMute}
            aria-label={muted ? t(UI.unmute, lang) : t(UI.mute, lang)}
            className="rounded-full bg-muted p-2 hover:bg-accent"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* mobile nav */}
      <nav className="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden">
        {nav.map((n) => {
          const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
          return (
            <Link
              key={n.to}
              to={n.to}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                active ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              <n.icon className="h-3.5 w-3.5" />
              {n.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
