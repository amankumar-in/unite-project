"use client";

import { useState, useEffect } from "react";

export default function TestDarkModePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check current state
  useEffect(() => {
    const darkModeOn = document.documentElement.classList.contains("dark");
    setIsDarkMode(darkModeOn);

    // Display current class list for debugging
    console.log("HTML classes:", document.documentElement.classList);
  }, []);

  // Toggle dark mode manually
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-8">
      <h1 className="text-2xl font-bold mb-8">Dark Mode Test</h1>

      <div className="space-y-6 mb-10">
        <div className="p-4 border border-gray-300 dark:border-gray-700">
          <p>
            This box should have a light background in light mode and dark
            background in dark mode.
          </p>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700">
          <p>
            This text should be black on white in light mode and white on dark
            gray in dark mode.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <p>
          Current state:{" "}
          <span className="font-medium">
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          HTML element has class 'dark':{" "}
          {document.documentElement.classList.contains("dark") ? "Yes" : "No"}
        </p>

        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-blue-500 text-white"
        >
          Toggle Dark Mode Manually
        </button>
      </div>

      <div className="mt-10 p-4 border border-gray-300 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4">Steps to Fix Dark Mode:</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Check if clicking the button above toggles dark mode correctly
          </li>
          <li>If it works, the issue is with our ThemeToggle component</li>
          <li>
            If it doesn't work, the issue is with Tailwind's dark mode
            configuration
          </li>
        </ol>
      </div>
    </div>
  );
}
