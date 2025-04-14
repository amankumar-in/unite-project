"use client";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      className="p-3 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {/* Swiss design: clean, minimal iconography */}
      {!isOpen ? (
        // Hamburger icon
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className="block w-full h-0.5 bg-black dark:bg-white"></span>
          <span className="block w-full h-0.5 bg-black dark:bg-white"></span>
          <span className="block w-full h-0.5 bg-black dark:bg-white"></span>
        </div>
      ) : (
        // Close icon
        <div className="w-6 h-6 relative">
          <span className="absolute top-1/2 left-0 w-full h-0.5 bg-black dark:bg-white -translate-y-1/2 rotate-45"></span>
          <span className="absolute top-1/2 left-0 w-full h-0.5 bg-black dark:bg-white -translate-y-1/2 -rotate-45"></span>
        </div>
      )}
    </button>
  );
}
