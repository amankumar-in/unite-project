"use client";

import { useState, useEffect } from "react";
import { NavigationLink } from "@/components/ui/NavigationLink";
import { MobileMenuButton } from "@/components/ui/MobileMenuButton";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

// Remove Contact from mobile nav items
const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Speakers", href: "/speakers" },
  { name: "Sponsors", href: "/sponsors" },
  { name: "Venue", href: "/venue" },
];

// Separate desktop nav items to include Contact
const desktopNavItems = [...navItems, { name: "Contact", href: "/contact" }];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll state to add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed top-0 z-30 transition-shadow ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with 2025 chip */}
            <div className="flex items-center">
              <Logo />
              <Chip variant="primary" size="sm" className="ml-2">
                2025
              </Chip>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {desktopNavItems.map((item) => (
                <NavigationLink key={item.name} href={item.href}>
                  {item.name}
                </NavigationLink>
              ))}
            </nav>

            {/* Desktop Action Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="primary" href="/tickets">
                Get Tickets
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-4">
              <Button variant="primary" size="sm" href="/tickets">
                Tickets
              </Button>
              <MobileMenuButton
                isOpen={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-gray-900 pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col relative">
            {/* Close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-black dark:text-white"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="arcs"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            {/* Logo at top of mobile menu */}
            <div className="py-4 flex items-center">
              <Logo />
              <Chip variant="primary" size="sm" className="ml-2">
                2025
              </Chip>
            </div>

            {/* Action Buttons before links */}
            <div className="py-6 space-y-4">
              <Button variant="primary" fullWidth href="/tickets">
                Get Tickets
              </Button>
              <Button
                variant="secondary"
                buttonType="outline"
                fullWidth
                href="/contact" // Exhibit button goes to contact page
              >
                Exhibit
              </Button>
            </div>

            {/* Main Navigation Links */}
            <nav className="flex-1 flex flex-col">
              {navItems.map((item) => (
                <NavigationLink
                  key={item.name}
                  href={item.href}
                  isMobile={true}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </NavigationLink>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
}
