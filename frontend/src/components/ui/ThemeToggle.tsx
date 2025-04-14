"use client";

import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme on component mount
  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  // Toggle theme function
  const toggleTheme = (enabled: boolean) => {
    if (enabled) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setIsDarkMode(enabled);
  };

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <Switch
      checked={isDarkMode}
      onChange={toggleTheme}
      className={`${
        isDarkMode ? "bg-black" : "bg-gray-200"
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white`}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        className={`${
          isDarkMode ? "translate-x-6 bg-white" : "translate-x-1 bg-black"
        } inline-block h-4 w-4 transform rounded-full transition-transform`}
      />
    </Switch>
  );
}
