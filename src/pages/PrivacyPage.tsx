import React, { useEffect } from 'react';
import { Shield, ArrowLeft, Mail } from 'lucide-react';
import { trackEvent } from '../utils/tracking';
import { CIMA_CONFIG } from '../config';

interface PrivacyPageProps {
  navigate: (path: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ navigate }) => {
  useEffect(() => {
    trackEvent('page_view', { page: 'privacy_policy' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to CIMABOX</span>
          </button>
        </div>

        {/* Header */}
        <div className="space-y-3 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-white/5 border border-white/10 px-3 py-1 text-xs text-[#A78BFA]">
            <Shield className="h-3.5 w-3.5" />
            <span>Legal Documentation</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400">
            Last updated: September 2026 · Effective Date: September 2026
          </p>
        </div>

        {/* Legal Setup Notice */}
        <div className="mt-8 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200">
          <p className="font-semibold mb-1">Administrative Notice for Business Operators:</p>
          <p>
            Brackets like <code className="bg-black/30 px-1 py-0.5 rounded font-mono">[Company Legal Entity]</code> designate business-specific information that should be confirmed with your legal counsel before public launch.
          </p>
        </div>

        {/* Document Body */}
        <div className="mt-10 space-y-10 text-sm leading-relaxed text-slate-300">
          {/* 1. Introduction */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              1. Introduction
            </h2>
            <p>
              This Privacy Policy explains how CIMABOX (operated by <span className="text-[#A78BFA] font-medium">[OPERATOR / COMPANY LEGAL ENTITY NAME]</span>, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, processes, and protects your information when you access or use the CIMABOX website (located at <a href="https://cimabox.com/" className="text-[#A78BFA] underline">https://cimabox.com/</a>) and related applications or distribution funnels.
            </p>
            <p>
              We are committed to respecting your privacy and complying with applicable data protection regulations, including the European Union General Data Protection Regulation (GDPR) and the California Consumer Privacy Act as amended (CCPA/CPRA).
            </p>
          </section>

          {/* 2. Information Collected */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              2. Information We Collect
            </h2>
            <p>We may collect information about you in the following categories:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
              <li>
                <strong className="text-white">Technical &amp; Device Information:</strong> Device model, operating system (Android, iOS), browser type and version, IP address, coarse geolocation (country and city level), language preferences, and screen resolution.
              </li>
              <li>
                <strong className="text-white">Campaign &amp; Traffic Data:</strong> Referral source, marketing parameters (e.g. YouTube UTM parameters such as utm_source, utm_campaign, video ID), landing page timestamps, and interaction timestamps.
              </li>
              <li>
                <strong className="text-white">Communications:</strong> Information you voluntarily provide when contacting our support desk, including your email address and message contents.
              </li>
            </ul>
            <p>
              We do not collect sensitive personal data such as financial details, biometric identifiers, or government identity numbers on this website.
            </p>
          </section>

          {/* 3. How Information Is Used */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              3. How Information Is Used
            </h2>
            <p>We process collected data for legitimate business purposes:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
              <li>To provide, operate, and maintain the CIMABOX website and funnel experience.</li>
              <li>To detect user device platforms (Android vs. iOS) and direct users to the appropriate official store listings.</li>
              <li>To analyze campaign traffic efficiency from promotional channels such as YouTube.</li>
              <li>To protect against malicious activity, bot abuse, and unauthorized access.</li>
              <li>To respond to user inquiries and support requests.</li>
            </ul>
          </section>

          {/* 4. Cookies and Analytics */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              4. Cookies and Analytics
            </h2>
            <p>
              We use first-party browser storage (<code className="bg-white/5 px-1 py-0.5 rounded text-xs text-white">sessionStorage</code> and <code className="bg-white/5 px-1 py-0.5 rounded text-xs text-white">localStorage</code>) to maintain campaign continuity across pages (e.g. tracking whether traffic originated from a specific video).
            </p>
            <p>
              We may utilize privacy-respecting analytics services to gather aggregate, non-personally identifiable metrics on page performance and conversion rates. You can manage or disable cookie storage via your browser settings at any time.
            </p>
          </section>

          {/* 5. Third-Party Services */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              5. Third-Party Services
            </h2>
            <p>
              Our website may link to or interact with third-party platforms, such as hosting infrastructure, content delivery networks (CDNs), and analytics utilities. These third parties only process data in accordance with their respective privacy policies and contractual obligations.
            </p>
          </section>

          {/* 6. Advertising / Offer Providers */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              6. Third-Party Offer Providers &amp; Access Steps
            </h2>
            <p>
              During the access step (accessible via <code className="bg-white/5 px-1 py-0.5 rounded text-xs text-white">/get</code>), you may be presented with third-party promotional offers, surveys, or sponsored tasks managed by independent promotional networks (such as OGAds).
            </p>
            <p>
              <strong className="text-white">Explicit Clarification:</strong> Third-party offers are created, operated, and verified exclusively by the independent offer network and its advertisers. CIMABOX does not operate these third-party offers, does not collect personal credentials submitted to third-party offers, and does not claim ownership over external advertiser campaigns. Users should carefully review the privacy terms of any third-party offer before participating.
            </p>
          </section>

          {/* 7. App Store Services */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              7. App-Store Services (Google Play &amp; Apple App Store)
            </h2>
            <p>
              Official downloads are hosted and distributed through the Google Play Store (Google LLC) and Apple App Store (Apple Inc.). When you click through to download CIMABOX, your transaction and installation are governed by the terms and privacy practices of Google LLC or Apple Inc. respectively.
            </p>
          </section>

          {/* 8. Data Retention */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              8. Data Retention
            </h2>
            <p>
              We retain technical logs and support correspondence only for as long as necessary to fulfill the purposes outlined in this policy, typically not exceeding <span className="text-[#A78BFA] font-medium">[RETENTION PERIOD, e.g., 90 to 365 days]</span> unless required by applicable law.
            </p>
          </section>

          {/* 9. Data Security */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              9. Data Security
            </h2>
            <p>
              We implement industry-standard technical and organizational security measures to protect website traffic and prevent unauthorized access, loss, or alteration. All web communications are transmitted using secure HTTPS / Transport Layer Security (TLS).
            </p>
          </section>

          {/* 10. Children's Privacy */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              10. Children&apos;s Privacy
            </h2>
            <p>
              Our website and services are not directed to individuals under the age of 13 (or under 16 in certain jurisdictions). We do not knowingly collect personal identifiable information from children. If you become aware that a child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          {/* 11. User Rights */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              11. Your Privacy Rights
            </h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
              <li>Request access to personal information we hold about you.</li>
              <li>Request correction or deletion of your personal data.</li>
              <li>Object to or restrict our processing of your information.</li>
              <li>Withdraw consent at any time where processing was based on consent.</li>
              <li>Opt out of any sale or sharing of personal data (we do not sell your personal data).</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at <a href={`mailto:${CIMA_CONFIG.supportEmail}`} className="text-[#A78BFA] underline">{CIMA_CONFIG.supportEmail}</a>.
            </p>
          </section>

          {/* 12. International Data Transfers */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              12. International Data Transfers
            </h2>
            <p>
              Your data may be processed on servers located in jurisdictions outside your home country. We ensure adequate safeguards and standard contractual clauses are applied where required.
            </p>
          </section>

          {/* 13. Changes to this Policy */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              13. Changes to this Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          {/* 14. Contact Information */}
          <section className="space-y-3 rounded-2xl glass-card p-6 border border-white/10">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <Mail className="h-5 w-5 text-[#A78BFA]" />
              <span>14. Contact Information</span>
            </h2>
            <p className="text-slate-300">
              For any questions, concerns, or requests regarding this Privacy Policy:
            </p>
            <div className="space-y-1 text-xs text-slate-400">
              <p><strong className="text-white">Email:</strong> {CIMA_CONFIG.supportEmail}</p>
              <p><strong className="text-white">Entity:</strong> [OPERATOR LEGAL NAME]</p>
              <p><strong className="text-white">Physical Address:</strong> [REGISTERED BUSINESS ADDRESS, CITY, COUNTRY]</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
