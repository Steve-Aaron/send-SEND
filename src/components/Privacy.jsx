import React from 'react';
import { Link } from 'react-router-dom';

export function Privacy() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
            <Link to="/" className="text-accent hover:text-accent-hover font-bold inline-flex items-center gap-2 mb-8 transition-colors">
                ← Back to Homepage
            </Link>

            <h1 className="text-4xl font-serif font-bold text-brand mb-8 border-b-2 border-accent pb-4 inline-block">Privacy Policy</h1>

            <div className="prose prose-slate max-w-none text-text-secondary space-y-6">
                <p className="text-lg">Last updated: March 2026</p>

                <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">1. Introduction</h2>
                <p>
                    Welcome to saveSEND ("we", "our", or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>

                <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">2. The data we collect about you</h2>
                <p>
                    We do not store the personal data you enter into the email generation form on our servers. The data (Name, Postcode, Address, Email, Phone Number) is processed purely in your browser to generate a template email which securely opens in your designated email client.
                </p>
                <p>
                    We may collect anonymous usage data (such as page views and interaction metrics) to improve the performance and reach of the campaign.
                </p>

                <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">3. Third-party links</h2>
                <p>
                    This website uses the UK Parliament API to retrieve public information regarding Members of Parliament. This website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
                </p>

                <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">4. Contact details</h2>
                <p>
                    If you have any questions about this privacy policy or our privacy practices, please contact the campaign administrators.
                </p>
            </div>
        </div>
    );
}
