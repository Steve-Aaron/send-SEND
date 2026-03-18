import React from "react";
import { Link } from "react-router-dom";

/**
 * Header Component
 * Site-wide navigation and branding.
 */
export function Header() {
  return (
    <header className="h-20 hidden md:flex items-center justify-between px-6 md:px-12 bg-white border-b border-border-subtle z-50 sticky top-0">
      <Link to="/" className="flex items-center gap-3 group cursor-pointer">
        <img
          src="/sys.png"
          alt="SENDYourSay Logo"
          className="h-12 object-contain"
        />
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link
          to="/about"
          className="text-sm font-bold text-text-secondary hover:text-brand transition-colors cursor-pointer uppercase tracking-widest"
        >
          About
        </Link>
      </nav>
    </header>
  );
}
