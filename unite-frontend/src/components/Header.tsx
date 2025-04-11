"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-900">UNITE</span>
            <span className="text-sm bg-yellow-500 text-black px-2 ml-2 rounded-md">
              2025
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              About
            </Link>
            <Link
              href="/events"
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              Events
            </Link>
            <Link
              href="/speakers"
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              Speakers
            </Link>
            <Link
              href="/sponsors"
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              Sponsors
            </Link>
            <Link
              href="/tickets"
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              Tickets
            </Link>
            <Link
              href="/venue"
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              Venue
            </Link>
            <Link
              href="/contact"
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              className="text-gray-800 hover:text-blue-600 focus:outline-none"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* CTA Button (only visible on desktop) */}
          <div className="hidden md:block">
            <Link
              href="/tickets"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
          <Link
            href="/"
            className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/events"
            className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Events
          </Link>
          <Link
            href="/speakers"
            className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Speakers
          </Link>
          <Link
            href="/sponsors"
            className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Sponsors
          </Link>
          <Link
            href="/tickets"
            className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Tickets
          </Link>
          <Link
            href="/venue"
            className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Venue
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/tickets"
            className="block px-3 py-2 text-base font-medium bg-blue-600 text-white rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Register Now
          </Link>
        </div>
      </div>
    </header>
  );
}
