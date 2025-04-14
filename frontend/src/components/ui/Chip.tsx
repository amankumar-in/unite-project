import { ReactNode } from "react";

type ChipVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "outline"
  | "black"
  | "white";
type ChipSize = "sm" | "md" | "lg";

interface ChipProps {
  children: ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  className?: string;
}

export function Chip({
  children,
  variant = "primary",
  size = "md",
  className = "",
}: ChipProps) {
  // Base styles - no rounded corners for Swiss design
  const baseStyles = "inline-flex items-center justify-center font-medium";

  // Size classes
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  // Variant classes
  const variantClasses = {
    primary: "bg-yellow-500 text-black",
    secondary: "bg-gray-200 text-black dark:bg-gray-700 dark:text-white",
    accent: "bg-black text-yellow-500 dark:bg-yellow-500 dark:text-black",
    outline:
      "bg-transparent border border-black text-black dark:border-white dark:text-white",
    black: "bg-black text-white",
    white: "bg-white text-black",
  };

  // Combine all classes
  const chipClasses = `${baseStyles} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return <span className={chipClasses}>{children}</span>;
}
