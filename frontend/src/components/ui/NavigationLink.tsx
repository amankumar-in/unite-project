"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavigationLinkProps {
  href: string;
  children: ReactNode;
  isMobile?: boolean;
  onClick?: () => void;
}

export function NavigationLink({
  href,
  children,
  isMobile = false,
  onClick,
}: NavigationLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  // Swiss design: flat colors, no rounded corners, bold typography
  const baseStyles = "block px-4 py-2 font-medium transition-colors";

  // Desktop styles
  const desktopStyles = !isMobile
    ? `
    ${
      isActive
        ? "bg-black text-white dark:bg-white dark:text-black"
        : "text-black hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"
    }
  `
    : "";

  // Mobile styles - full width for the Swiss block design
  const mobileStyles = isMobile
    ? `
    w-full text-center text-lg py-4
    ${
      isActive
        ? "bg-black text-white dark:bg-white dark:text-black"
        : "text-black hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"
    }
  `
    : "";

  return (
    <Link
      href={href}
      className={`${baseStyles} ${desktopStyles} ${mobileStyles}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
