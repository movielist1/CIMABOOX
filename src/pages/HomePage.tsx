import React from 'react';
import { Film, Tv, PlaySquare, Zap, ArrowRight, ShieldCheck, Smartphone, Download, Sparkles } from 'lucide-react';
import { trackCTA } from '../utils/tracking';

// Generated asset paths
import heroPhoneMockup from '../assets/images/cima_hero_phone_1790544231676.jpg';
import appShowcaseImage from '../assets/images/cima_app_showcase_1790544243306.jpg';

interface HomePageProps {
  navigate: (path: string) => void;
  onOpenDownloadNotice?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate, onOpenDownloadNotice }) => {
  const handleDownloadClick = (ctaName: string) => {
    trackCTA(ctaName, '/get');
    if (onOpenDownloadNotice) {
      onOpenDownloadNotice();
    } else {
      navigate('/get');
    }
  };

  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[650px] w-[800px] -translate-x-1/2 rounded-full violet-glow opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute top-[1200px] right-[-100px] -z-10 h-[500px] w-[500px] rounded-full violet-glow-subtle opacity-50 blur-3xl" />

      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#7C5CFF]/30 bg-[#7C5CFF]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#A78BFA] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA] animate-pulse" />
                <span>CIMABOX</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
                Your entertainment. <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-white via-slate-100 to-[#A78BFA] bg-clip-text text-transparent">
                  Wherever you go.
                </span>
              </h1>

              <p className="max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed mx-auto lg:mx-0">
                Discover movies, series, anime and more in a simple, mobile-first experience.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => handleDownloadClick('hero_download_cimabox')}
                  className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6342E8] px-8 py-4 text-sm font-bold tracking-wide text-white uppercase shadow-xl shadow-[#7C5CFF]/25 transition-all duration-200 hover:brightness-110 hover:shadow-2xl hover:shadow-[#7C5CFF]/35 active:scale-[0.98]"
                >
                  <Download className="h-4 w-4" />
                  <span>DOWNLOAD CIMABOX</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={scrollToFeatures}
                  className="flex w-full sm:w-auto items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-7 py-4 text-sm font-medium text-slate-200 transition-all duration-200 hover:bg-white/[0.08] hover:border-white/25 active:scale-[0.98]"
                >
                  EXPLORE FEATURES
                </button>
              </div>

              {/* Quiet Platform availability */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-5 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="h-3.5 w-3.5 text-[#A78BFA]" />
                  Android 8.0+
                </span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="flex items-center gap-1.5">
                  <Smartphone className="h-3.5 w-3.5 text-[#A78BFA]" />
                  iOS 15.0+
                </span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Official Stores
                </span>
              </div>
            </div>

            {/* Right Column: Premium Phone Mockup */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[420px] rounded-3xl p-2 bg-gradient-to-b from-white/10 to-transparent">
                <div className="overflow-hidden rounded-2xl bg-[#0B0F1A] shadow-2xl shadow-[#7C5CFF]/20 border border-white/10">
                  <img
                    src={heroPhoneMockup}
                    alt="CIMABOX mobile app preview on modern smartphone"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-500"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURES SECTION
          ========================================================================= */}
      <section id="features" className="relative py-20 bg-[#090D17]/60 border-y border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Everything in one place.
            </h2>
            <p className="mt-3 text-base text-slate-300">
              A simple experience designed to help you discover and enjoy content from your phone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1: Movies */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 text-[#A78BFA] mb-5">
                  <Film className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  Movies
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Explore a variety of movies through the CIMABOX experience.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs text-[#A78BFA] font-medium">
                Discover titles
              </div>
            </div>

            {/* Feature 2: Series */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 text-[#A78BFA] mb-5">
                  <Tv className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  Series
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Find series and keep your entertainment organized in one place.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs text-[#A78BFA] font-medium">
                Organized tracking
              </div>
            </div>

            {/* Feature 3: Anime & Cartoons */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 text-[#A78BFA] mb-5">
                  <PlaySquare className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  Anime &amp; Cartoons
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Discover anime and cartoon content through a mobile-friendly interface.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs text-[#A78BFA] font-medium">
                Curated categories
              </div>
            </div>

            {/* Feature 4: Simple Experience */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 text-[#A78BFA] mb-5">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  Simple Experience
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Designed to make finding something to watch straightforward.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs text-[#A78BFA] font-medium">
                Lightweight &amp; Fast
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          APP SHOWCASE SECTION
          ========================================================================= */}
      <section className="relative py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl border border-white/10 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            {/* Background glow inside card */}
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-[#7C5CFF]/15 blur-3xl" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-semibold tracking-wider text-[#A78BFA] uppercase">
                  Mobile Experience
                </span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
                  Simple. Fast. Easy to explore.
                </h2>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  Use CIMABOX from your phone and move from discovery to watching with a straightforward interface.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => handleDownloadClick('showcase_download_app')}
                    className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6342E8] px-7 py-3.5 text-sm font-bold tracking-wide text-white uppercase shadow-lg shadow-[#7C5CFF]/20 hover:brightness-110 transition-all duration-200 active:scale-[0.98]"
                  >
                    <Download className="h-4 w-4" />
                    <span>DOWNLOAD CIMABOX</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Showcase Image */}
              <div className="lg:col-span-6">
                <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-[#080B12]">
                  <img
                    src={appShowcaseImage}
                    alt="CIMABOX mobile app screens showing discovery and media controls"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS SECTION
          ========================================================================= */}
      <section id="how-it-works" className="relative py-20 bg-[#090D17]/40 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Get started in a few simple steps.
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Clear and straightforward onboarding to install the application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="glass-card rounded-2xl p-8 relative">
              <div className="text-3xl font-display font-extrabold text-[#7C5CFF]/60 mb-4">
                01
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Visit CIMABOX
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Start from the official CIMABOX website.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card rounded-2xl p-8 relative">
              <div className="text-3xl font-display font-extrabold text-[#7C5CFF]/60 mb-4">
                02
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Continue to the access step
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Follow the access instructions and review the available third-party offers.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card rounded-2xl p-8 relative">
              <div className="text-3xl font-display font-extrabold text-[#7C5CFF]/60 mb-4">
                03
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Get the app
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                After the access step is completed, continue to the official app download page.
              </p>
            </div>
          </div>

          {/* Important disclosure banner */}
          <div className="mt-12 rounded-xl border border-white/10 bg-[#111722]/80 p-5 text-center max-w-3xl mx-auto">
            <p className="text-xs text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-200">Important:</span> Clearly communicate that third-party offers may be presented during the access process. CIMABOX does not host or endorse third-party offers; review applicable terms prior to participation.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL CTA SECTION
          ========================================================================= */}
      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card rounded-3xl border border-[#7C5CFF]/20 p-10 sm:p-16 relative overflow-hidden shadow-2xl">
            <div className="pointer-events-none absolute inset-0 violet-glow opacity-30 blur-2xl" />

            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight relative z-10">
              Ready to experience CIMABOX?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 relative z-10 max-w-lg mx-auto">
              Get started on your Android or iPhone.
            </p>

            <div className="mt-8 flex justify-center relative z-10">
              <button
                onClick={() => handleDownloadClick('final_download_cimabox_now')}
                className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6342E8] px-9 py-4 text-sm font-bold tracking-wide text-white uppercase shadow-xl shadow-[#7C5CFF]/30 hover:brightness-110 active:scale-[0.98] transition-all duration-200"
              >
                <Download className="h-4 w-4" />
                <span>DOWNLOAD CIMABOX NOW</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
