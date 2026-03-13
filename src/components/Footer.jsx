import React from "react";
import { Link } from "react-router-dom";

/**
 * Footer Component
 * Site-wide footer including branding and policy links.
 */
export function Footer() {
  return (
    <footer className="bg-brand text-white/60 py-12 px-6 lg:px-12 text-sm text-center md:text-left">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <img
              src="https://placehold.co/120x40/FFFFFF/00245D?text=saveSEND"
              alt="saveSEND Logo"
              className="h-8 object-contain opacity-50"
            />
          </div>
          <p>
            This website has been supported by Witherslack Group as part of its
            commitment to supporting families and contributing constructively to
            the national conversation on SEND reform.
          </p>
        </div>
        <div className="flex flex-col md:items-end justify-center gap-2">
          <Link
            to="/privacy"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy Policy
          </Link>
          <Link
            to="/cookies"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
