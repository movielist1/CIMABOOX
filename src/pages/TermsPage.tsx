import React, { useEffect } from 'react';
import { FileText, ArrowLeft, Mail } from 'lucide-react';
import { trackEvent } from '../utils/tracking';
import { CIMA_CONFIG } from '../config';

interface TermsPageProps {
  navigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ navigate }) => {
  useEffect(() => {
    trackEvent('page_view', { page: 'terms_of_service' });
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
            <FileText className="h-3.5 w-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-400">
            Last updated: September 2026 · Effective Date: September 2026
          </p>
        </div>

        {/* Legal Setup Notice */}
        <div className="mt-8 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200">
          <p className="font-semibold mb-1">Administrative Notice for Business Operators:</p>
          <p>
            Brackets like <code className="bg-black/30 px-1 py-0.5 rounded font-mono">[Legal Entity]</code> and <code className="bg-black/30 px-1 py-0.5 rounded font-mono">[Governing Law]</code> mark fields that should be finalized by the site owner prior to commercial operation.
          </p>
        </div>

        {/* Terms Body */}
        <div className="mt-10 space-y-10 text-sm leading-relaxed text-slate-300">
          {/* 1. Acceptance of Terms */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the CIMABOX website (https://cimabox.com/) or associated software applications, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these Terms, you must not use or access our website or applications.
            </p>
          </section>

          {/* 2. Eligibility */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              2. Eligibility
            </h2>
            <p>
              You must be at least the age of majority in your jurisdiction of residence, or at least 13 years of age with parental or legal guardian consent, to access and use our website. By using this service, you represent and warrant that you meet these eligibility requirements.
            </p>
          </section>

          {/* 3. Use of the Website */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              3. Use of the Website
            </h2>
            <p>
              CIMABOX grants you a limited, non-exclusive, non-transferable, and revocable license to access and browse the website strictly for personal, non-commercial entertainment and informational discovery.
            </p>
          </section>

          {/* 4. Use of the Application */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              4. Use of the Application
            </h2>
            <p>
              The CIMABOX mobile application is distributed via official application stores (Google Play Store for Android, Apple App Store for iOS). Installation and operation of the application are subject to the specific end-user license agreements and guidelines of the respective platform operators.
            </p>
          </section>

          {/* 5. Content and Intellectual Property */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              5. Content and Intellectual-Property Rights
            </h2>
            <p>
              The CIMABOX name, logo, website design, brand elements, graphics, interface architecture, and proprietary code are the exclusive intellectual property of <span className="text-[#A78BFA] font-medium">[OPERATOR / COMPANY NAME]</span> and are protected by applicable copyright, trademark, and unfair competition laws.
            </p>
            <p>
              Any third-party trademarks, service marks, or logos appearing on the website (including Google Play, App Store, Android, and Apple) are property of their respective owners.
            </p>
          </section>

          {/* 6. Third-Party Services and Offers */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              6. Third-Party Services and Offers
            </h2>
            <p>
              The access flow may present optional third-party promotional offers provided by independent promotional partners (including OGAds).
            </p>
            <p>
              <strong className="text-white">Notice of Third-Party Relationship:</strong> CIMABOX does not provide, fulfill, or endorse third-party offers or external websites. Any participation in third-party offers is entirely voluntary and conducted solely between you and the respective third-party provider under their independent terms and privacy guidelines.
            </p>
          </section>

          {/* 7. User Responsibilities */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              7. User Responsibilities
            </h2>
            <p>
              You agree to provide accurate information if communicating with our support desk and to maintain the security of any device used to access our services. You are responsible for ensuring that your network connectivity and device satisfy technical requirements.
            </p>
          </section>

          {/* 8. Prohibited Activities */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              8. Prohibited Activities
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
              <li>Use automated scripts, bots, spiders, or scrapers to access the website or funnel.</li>
              <li>Attempt to reverse-engineer, decompile, or disassemble any part of the service.</li>
              <li>Circumvent, disable, or tamper with security or verification features.</li>
              <li>Misrepresent your identity, location, or device credentials.</li>
              <li>Use the website for any unlawful, fraudulent, or harmful purpose.</li>
            </ul>
          </section>

          {/* 9. Availability */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              9. Service Availability &amp; Modifications
            </h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any aspect of the website or application at any time without notice. We do not warrant that access will be continuous, uninterrupted, or error-free.
            </p>
          </section>

          {/* 10. Disclaimers */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              10. Disclaimers of Warranties
            </h2>
            <p className="uppercase text-xs tracking-wider text-slate-400">
              The service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express, implied, or statutory, including warranties of merchantability, fitness for a particular purpose, title, or non-infringement.
            </p>
          </section>

          {/* 11. Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              11. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable law, in no event shall CIMABOX, its affiliates, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of or inability to use the service.
            </p>
          </section>

          {/* 12. Changes to Terms */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white">
              12. Changes to these Terms
            </h2>
            <p>
              We reserve the right to revise these Terms of Service at any time. Continued use of the website following any posted modifications constitutes your acceptance of the updated terms.
            </p>
          </section>

          {/* 13. Contact & Governing Law */}
          <section className="space-y-3 rounded-2xl glass-card p-6 border border-white/10">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <Mail className="h-5 w-5 text-[#A78BFA]" />
              <span>13. Contact &amp; Governing Law</span>
            </h2>
            <p className="text-slate-300">
              These terms are governed by the laws of <span className="text-[#A78BFA] font-medium">[APPLICABLE JURISDICTION / COUNTRY]</span>.
            </p>
            <div className="space-y-1 text-xs text-slate-400">
              <p><strong className="text-white">Email:</strong> {CIMA_CONFIG.supportEmail}</p>
              <p><strong className="text-white">Operator:</strong> [OPERATOR LEGAL ENTITY]</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
