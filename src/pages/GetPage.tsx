import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { CIMA_CONFIG } from '../config';
import { trackEvent, getCampaignData } from '../utils/tracking';

interface GetPageProps {
  navigate: (path: string) => void;
}

export const GetPage: React.FC<GetPageProps> = ({ navigate }) => {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [campaignInfo, setCampaignInfo] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    trackEvent('page_view', { page: 'get_preparation' });
    const data = getCampaignData();
    if (data.utm_source || data.source) {
      setCampaignInfo(data as Record<string, string | undefined>);
    }
  }, []);

  const handleContinueToAccess = () => {
    // 1. Immediate visual feedback
    setIsTransitioning(true);
    trackEvent('continue_to_access_click', {
      source: 'get_page_primary_cta',
      destination: CIMA_CONFIG.ogadsLockerUrl
    });

    // 2. Brief polished transition state before loading locker
    setTimeout(() => {
      // Check if OGAds official JS locker script has loaded
      const win = window as unknown as { og_load?: () => void };
      if (typeof win.og_load === 'function') {
        win.og_load();
        setIsTransitioning(false);
        return;
      }

      // Default: Direct transition to the configured locker destination
      window.location.href = CIMA_CONFIG.ogadsLockerUrl || 'https://appcomplete.org/cl/i/m5np5m';
    }, 1200);
  };

  return (
    <div className="relative min-h-[calc(100vh-160px)] py-12 sm:py-20">
      {/* Background ambient light */}
      <div className="pointer-events-none absolute top-10 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full violet-glow opacity-60 blur-3xl" />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Campaign detected subtle badge (e.g. YouTube visitors) */}
        {campaignInfo.utm_source && (
          <div className="mb-6 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7C5CFF]/25 bg-[#7C5CFF]/10 px-3.5 py-1 text-xs text-[#A78BFA]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>
                Connected from {campaignInfo.utm_source}
                {campaignInfo.utm_campaign ? ` (${campaignInfo.utm_campaign})` : ''}
              </span>
            </div>
          </div>
        )}

        {/* Preparation Header Block */}
        <div className="text-center space-y-4">
          {/* CIMABOX Logo */}
          <div className="flex justify-center mb-2">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C5CFF] to-[#5132d4] p-0.5 shadow-xl shadow-[#7C5CFF]/30">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#0B0F1A]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7 fill-[#A78BFA]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L19 9L12 16L5 9L12 2Z" fill="currentColor" />
                  <circle cx="12" cy="18" r="2.5" fill="#7C5CFF" />
                </svg>
              </div>
            </div>
          </div>

          <span className="text-xs font-semibold uppercase tracking-wider text-[#A78BFA]">
            CIMABOX
          </span>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            You're One Step Away
          </h1>

          <p className="mx-auto max-w-lg text-base sm:text-lg text-slate-300 leading-relaxed">
            You're almost ready to access CIMABOX. Continue to the access step below, then follow the instructions shown there. Once the required step is completed and verified, you'll continue to the official CIMABOX download page.
          </p>
        </div>

        {/* 3-Step Visual Explanation */}
        <div className="mt-10 glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-white/10 shadow-2xl">
          <div className="space-y-5">
            {/* Step 01 */}
            <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 font-display font-bold text-base text-[#A78BFA]">
                01
              </div>
              <div className="space-y-0.5">
                <h2 className="font-display text-base font-semibold text-white">
                  Continue
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Continue to the access step.
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 font-display font-bold text-base text-[#A78BFA]">
                02
              </div>
              <div className="space-y-0.5">
                <h2 className="font-display text-base font-semibold text-white">
                  Complete an available offer
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Choose an available offer from the third-party offer provider and complete the required step.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 font-display font-bold text-base text-[#A78BFA]">
                03
              </div>
              <div className="space-y-0.5">
                <h2 className="font-display text-base font-semibold text-white">
                  Download CIMABOX
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  After completion is verified, continue to the official app download page.
                </p>
              </div>
            </div>
          </div>

          {/* Advance Notice Banner (OGAds Recommendation: Advance context prevents unexpected bounce) */}
          <div className="rounded-xl border border-[#7C5CFF]/30 bg-[#7C5CFF]/10 p-4 text-xs text-slate-300 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-[#A78BFA] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-white">Advance Notice:</span>
              <p className="text-slate-300 leading-relaxed">
                Clicking the button below opens the third-party offer step. Completing 1 sponsored activity verifies your access to keep CIMABOX free.
              </p>
            </div>
          </div>

          {/* Primary Button */}
          <div className="pt-2">
            <button
              onClick={handleContinueToAccess}
              disabled={isTransitioning}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#7C5CFF] via-[#6844f2] to-[#5132d4] py-4 px-6 min-h-[54px] text-base font-bold tracking-wide text-white uppercase shadow-xl shadow-[#7C5CFF]/30 transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-80"
              aria-label="Continue to access step"
            >
              {isTransitioning ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Opening the access step...</span>
                </>
              ) : (
                <>
                  <span>Continue to access</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>

          {/* Small Transparent Disclosure */}
          <div className="text-center pt-1">
            <p className="text-[11px] text-slate-400/80 leading-normal max-w-lg mx-auto">
              Offers are provided by a third-party offer provider. Availability may vary depending on country and device.
            </p>
          </div>
        </div>

        {/* Polished Transition Modal/Overlay */}
        {isTransitioning && (
          <div
            role="status"
            aria-live="polite"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          >
            <div className="w-full max-w-md rounded-3xl border border-white/15 bg-gradient-to-b from-[#141926] to-[#0A0D15] p-8 text-center shadow-2xl text-slate-100">
              <div className="flex justify-center mb-5">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7C5CFF]/20 border border-[#7C5CFF]/40 text-[#A78BFA] shadow-lg shadow-[#7C5CFF]/25">
                  <Loader2 className="h-8 w-8 animate-spin text-[#A78BFA]" />
                </div>
              </div>

              <h2 className="font-display text-2xl font-bold tracking-tight text-white mb-2">
                Opening the access step...
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Connecting you to the third-party offer provider. Please follow the instructions shown on the next screen.
              </p>

              <div className="text-xs text-slate-400 border-t border-white/10 pt-4">
                <span>If not redirected automatically, </span>
                <a
                  href={CIMA_CONFIG.ogadsLockerUrl || 'https://appcomplete.org/cl/i/m5np5m'}
                  className="text-[#A78BFA] underline hover:text-white"
                >
                  click here to proceed
                </a>.
              </div>
            </div>
          </div>
        )}

        {/* Support & Fallback Assistance */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <span>Having trouble with available offers? </span>
          <button
            onClick={() => navigate('/no-offer')}
            className="text-[#A78BFA] underline hover:text-white transition-colors"
          >
            No offers available?
          </button>
          <span className="mx-2">·</span>
          <button
            onClick={() => navigate('/support')}
            className="text-slate-300 hover:text-white transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};
