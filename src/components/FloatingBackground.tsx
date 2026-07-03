import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function FloatingBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  // Clouds, leaves, stars — purely decorative SVG
  const clouds = Array.from({ length: 4 });
  const leaves = Array.from({ length: 8 });
  const stars = Array.from({ length: 18 });

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 gradient-sky opacity-40" />
      {clouds.map((_, i) => (
        <div
          key={`c${i}`}
          className="absolute animate-drift"
          style={{
            top: `${5 + i * 12}%`,
            animationDuration: `${50 + i * 12}s`,
            animationDelay: `${-i * 8}s`,
            opacity: 0.55,
          }}
        >
          <svg width={120 + i * 30} height={60} viewBox="0 0 120 60" fill="white">
            <ellipse cx="30" cy="35" rx="22" ry="18" />
            <ellipse cx="60" cy="28" rx="28" ry="22" />
            <ellipse cx="90" cy="38" rx="22" ry="16" />
          </svg>
        </div>
      ))}
      {leaves.map((_, i) => (
        <motion.div
          key={`l${i}`}
          className="absolute text-3xl"
          initial={{ y: -50, x: Math.random() * window.innerWidth }}
          animate={{
            y: typeof window !== "undefined" ? window.innerHeight + 50 : 1000,
            x: `+=${Math.sin(i) * 200}`,
            rotate: 360,
          }}
          transition={{
            duration: 20 + Math.random() * 15,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
          style={{ left: `${(i * 13) % 100}%`, opacity: 0.5 }}
        >
          {["🍃", "🌿", "🍀", "✨"][i % 4]}
        </motion.div>
      ))}
      {stars.map((_, i) => (
        <motion.div
          key={`s${i}`}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}
