"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-amber-900/20 hover:bg-amber-900/40 transition-colors"
        aria-label="Toggle theme"
      >
        <span className="text-xl">🌙</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-amber-900/20 hover:bg-amber-900/40 transition-colors"
      aria-label="Toggle theme"
    >
      <span className="text-xl">{theme === "dark" ? "☀️" : "🌙"}</span>
    </button>
  );
}
