import React from "react";
import { Link } from "react-router-dom";

export function Cookies() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
      <div>
        <Link
          to="/"
          className="text-accent hover:text-accent-hover font-bold inline-flex items-center gap-2 mb-8 transition-colors"
        >
          ← Return to Homepage
        </Link>
      </div>

      <h1 className="text-4xl font-serif font-bold text-brand mb-8 border-b-2 border-accent pb-4 inline-block">
        Cookie Policy
      </h1>

      <div className="prose prose-slate max-w-none text-text-secondary space-y-6">
        <p className="text-lg">Last updated: March 2026</p>

        <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">
          1. What are cookies?
        </h2>
        <p>
          Cookies are simple computer files made of text. They are safe and
          cannot be used to spread viruses. The information stored in cookies
          can be used to track your browsing behavior.
        </p>

        <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">
          2. How we use cookies
        </h2>
        <p>
          Our application currently utilizes minimal cookies strictly necessary
          for the operation of the website. We do not use tracking or
          advertising cookies.
        </p>

        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <strong>Essential cookies:</strong> These are cookies that are
            required for the operation of our website.
          </li>
          <li>
            <strong>Analytical/performance cookies:</strong> They allow us to
            recognize and count the number of visitors and to see how visitors
            move around our website when they are using it.
          </li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">
          3. Managing cookies
        </h2>
        <p>
          You can block cookies by activating the setting on your browser that
          allows you to refuse the setting of all or some cookies. However, if
          you use your browser settings to block all cookies (including
          essential cookies) you may not be able to access all or parts of our
          website.
        </p>
      </div>
    </div>
  );
}
