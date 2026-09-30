import React, { useState, useEffect } from 'react';
import { Mail, Copy, Check, HelpCircle, Send, Smartphone, ShieldCheck, AlertCircle } from 'lucide-react';
import { CIMA_CONFIG } from '../config';
import { trackEvent } from '../utils/tracking';
import { FaqAccordion, FaqItem } from '../components/FaqAccordion';

interface SupportPageProps {
  navigate: (path: string) => void;
}

const FAQS: FaqItem[] = [
  // App download help
  {
    category: 'download',
    question: 'How do I download the CIMABOX application?',
    answer: 'Navigate to our official access page by clicking "Get CIMABOX" on the homepage. After reviewing the verification step, you will be directed to the download page where you can choose your official store (Google Play for Android or Apple App Store for iPhone).',
    badge: 'Popular'
  },
  {
    category: 'download',
    question: 'Are there any automated APK downloads?',
    answer: 'No. CIMABOX never automatically downloads APK files or silently redirects you. You must explicitly tap the official Google Play or App Store button to begin installation through your device\'s trusted store.',
    badge: 'Security'
  },

  // Offer/access troubleshooting
  {
    category: 'offers',
    question: 'Why am I asked to complete an access step?',
    answer: 'To manage server capacity and verify legitimate traffic, an access step with third-party offers may be presented. These independent offers are provided by external promotional networks and vary based on your location.'
  },
  {
    category: 'offers',
    question: 'What if no offers are available in my region?',
    answer: 'Offer availability depends on advertiser demand in your country or device type. If no offers appear, you can check our No-Offer page or try again at a later time when new inventory becomes active.'
  },

  // Android troubleshooting
  {
    category: 'android',
    question: 'What Android versions are supported?',
    answer: 'CIMABOX supports Android 8.0 (Oreo) and above. Ensure Google Play Services are up to date on your device for smooth discovery and video playback.'
  },
  {
    category: 'android',
    question: 'Play Store says "Item unavailable in your country". What should I do?',
    answer: 'Regional store rollout occurs in stages. Contact our support desk at ' + CIMA_CONFIG.supportEmail + ' to inquire about regional availability timelines for your territory.'
  },

  // iPhone troubleshooting
  {
    category: 'ios',
    question: 'What iOS versions are compatible with CIMABOX?',
    answer: 'CIMABOX requires iOS 15.0 or later on compatible iPhone, iPad, or iPod touch devices.'
  },
  {
    category: 'ios',
    question: 'Do I need an Apple ID to download CIMABOX?',
    answer: 'Yes. Because installation occurs strictly through Apple\'s official App Store, a standard active Apple ID is required on your device.'
  }
];

export const SupportPage: React.FC<SupportPageProps> = () => {
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'download' | 'offers' | 'android' | 'ios'>('all');

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'general', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    trackEvent('page_view', { page: 'support' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CIMA_CONFIG.supportEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill in all required fields.');
      return;
    }
    if (!formData.email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setFormError('');
    setFormSubmitted(true);
    trackEvent('support_message_submitted', {
      subject: formData.subject
    });
  };

  const filteredFaqs = activeCategory === 'all'
    ? FAQS
    : FAQS.filter(faq => faq.category === activeCategory);

  return (
    <div className="relative min-h-screen py-12 sm:py-20">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-10 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full violet-glow opacity-50 blur-3xl" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Block */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-white/5 border border-white/10 px-3 py-1 text-xs text-[#A78BFA]">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Support &amp; Troubleshooting</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            How can we help?
          </h1>
          <p className="mx-auto max-w-xl text-base sm:text-lg text-slate-300">
            For download, account, or application issues, contact the CIMABOX support team.
          </p>
        </div>

        {/* Contact Email Highlight Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 text-[#A78BFA]">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                Official Support Desk
              </span>
              <span className="font-display text-lg sm:text-xl font-bold text-white">
                {CIMA_CONFIG.supportEmail}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied' : 'Copy Email'}</span>
            </button>
            <a
              href={`mailto:${CIMA_CONFIG.supportEmail}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6342E8] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-[#7C5CFF]/20 hover:brightness-110 transition-all"
            >
              <span>Compose Email</span>
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Select a topic to quickly resolve common inquiries.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-white/5 rounded-xl border border-white/5">
              {[
                { id: 'all', label: 'All' },
                { id: 'download', label: 'Download' },
                { id: 'offers', label: 'Access Steps' },
                { id: 'android', label: 'Android' },
                { id: 'ios', label: 'iPhone' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeCategory === tab.id
                      ? 'bg-[#7C5CFF] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive FAQ Accordion with smooth CSS transitions */}
          <FaqAccordion items={filteredFaqs} />
        </div>

        {/* Interactive In-App Inquiry Form */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-white/10">
          <h2 className="font-display text-xl font-bold text-white mb-2">
            Send an Inquiry to Support
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            Our support desk typically responds within 24 to 48 business hours.
          </p>

          {formSubmitted ? (
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-6 text-center space-y-2">
              <Check className="h-8 w-8 text-emerald-400 mx-auto" />
              <h3 className="font-display text-base font-bold text-white">
                Message Received
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you for contacting CIMABOX Support. A support representative will follow up at <strong className="text-white">{formData.email}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'general', message: '' });
                }}
                className="mt-4 inline-block text-xs text-[#A78BFA] underline"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {formError && (
                <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/25 p-3 text-xs text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="support-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="support-name"
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full rounded-xl border border-white/10 bg-[#080B12] px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-[#7C5CFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="support-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="support-email"
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full rounded-xl border border-white/10 bg-[#080B12] px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-[#7C5CFF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="support-topic" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Inquiry Topic
                </label>
                <select
                  id="support-topic"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#080B12] px-4 py-2.5 text-sm text-white focus:border-[#7C5CFF] focus:outline-none"
                >
                  <option value="general">General Inquiry</option>
                  <option value="download">App Download Assistance</option>
                  <option value="access_offer">Offer / Access Step Assistance</option>
                  <option value="android_issue">Android Play Store Issue</option>
                  <option value="ios_issue">iOS App Store Issue</option>
                </select>
              </div>

              <div>
                <label htmlFor="support-message" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Describe Your Issue
                </label>
                <textarea
                  id="support-message"
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe what happened, including your device model..."
                  className="w-full rounded-xl border border-white/10 bg-[#080B12] px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-[#7C5CFF] focus:outline-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6342E8] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-[#7C5CFF]/20 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
