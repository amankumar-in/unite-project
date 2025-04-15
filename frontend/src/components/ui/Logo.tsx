"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  forceMode?: "light" | "dark";
}

export function Logo({ className = "", forceMode }: LogoProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!forceMode) {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);

      // Listen for theme changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class") {
            const isDark = document.documentElement.classList.contains("dark");
            setIsDarkMode(isDark);
          }
        });
      });

      observer.observe(document.documentElement, { attributes: true });
      return () => observer.disconnect();
    }
  }, [forceMode]);

  // If forceMode is set, use that instead of detected mode
  const effectiveDarkMode = forceMode === "dark" || (!forceMode && isDarkMode);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`h-10 w-28 ${className}`}>
        {/* Placeholder for SSR */}
      </div>
    );
  }

  return (
    <Link
      href="/"
      onClick={() => (window.location.href = "/")}
      className={`flex items-center ${className}`}
    >
      <Image
        src={effectiveDarkMode ? "/logo-darkmode.svg" : "/logo-lightmode.svg"}
        alt="UNITE Expo 2025"
        width={112}
        height={40}
        className="h-10 w-auto"
        priority
      />
    </Link>
  );
}
