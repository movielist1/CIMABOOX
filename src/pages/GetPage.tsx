import React, { useState, useEffect } from 'react';
import { Shield, ArrowRight, AlertCircle, CheckCircle2, Download, Sparkles } from 'lucide-react';
import { CIMA_CONFIG } from '../config';
import { trackEvent, getCampaignData } from '../utils/tracking';
import { AdvanceNoticeModal } from '../components/AdvanceNoticeModal';

interface GetPageProps {
  navigate: (path: string) => void;
}

export const GetPage: React.FC<GetPageProps> = ({ navigate }) => {
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [campaignInfo, setCampaignInfo] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    trackEvent('page_view', { page: 'get_access' });
    const data = getCampaignData();
    if (data.utm_source || data.source) {
      setCampaignInfo(data as Record<string, string | undefined>);
    }
  }, []);

  const handleOpenNotice = () => {
    trackEvent('download_click', {
      source: 'get_page_cta',
      target: CIMA_CONFIG.ogadsLockerUrl
    });
    setShowNoticeModal(true);
  };

  return (
    <div className="relative min-h-[calc(100vh-160px)] py-12 sm:py-20">
      {/* Background ambient light */}
      <div className="pointer-events-none absolute top-10 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full violet-glow opacity-60 blur-3xl" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Campaign detected subtle badge */}
        {campaignInfo.utm_source && (
          <div className="mb-6 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7C5CFF]/25 bg-[#7C5CFF]/10 px-3.5 py-1 text-xs text-[#A78BFA]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>
                Campaign connected: {campaignInfo.utm_source}
                {campaignInfo.utm_campaign ? ` (${campaignInfo.utm_campaign})` : ''}
              </span>
            </div>
          </div>
        )}

        {/* Header Block */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-white/[0.05] border border-white/10 px-3 py-1 text-xs font-medium text-slate-300">
            <Shield className="h-3.5 w-3.5 text-[#A78BFA]" />
            <span>Official Access Portal</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Get the CIMABOX app
          </h1>

          <p className="mx-auto max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed">
            Continue to the access step below. After completing an available offer, you can continue to the official app download page.
          </p>
        </div>

        {/* 3-Step Explanation Card */}
        <div className="mt-10 glass-card rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="font-display text-base sm:text-lg font-bold text-white border-b border-white/10 pb-4">
            Access Verification Steps
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 font-display font-bold text-sm text-[#A78BFA]">
                01
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-sm font-semibold text-white">
                  Continue
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Open the available access options.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 font-display font-bold text-sm text-[#A78BFA]">
                02
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-sm font-semibold text-white">
                  Complete an available offer
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The offer provider will show available options based on your device and location. Review each offer's terms before proceeding.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 font-display font-bold text-sm text-[#A78BFA]">
                03
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-sm font-semibold text-white">
                  Download CIMABOX
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  After the access step is completed, continue to the official app download page.
                </p>
              </div>
            </div>
          </div>

          {/* Advance Notice Pre-Action Alert */}
          <div className="rounded-xl border border-[#7C5CFF]/30 bg-[#7C5CFF]/10 p-4 text-xs text-slate-300 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-[#A78BFA] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-white">OGAds Advance Notice:</span>
              <p className="text-slate-300 leading-relaxed">
                Tapping the download button will prompt an advance confirmation before displaying the sponsor locker (<code className="text-[#A78BFA]">appcomplete.org/cl/i/m5np5m</code>). You will simply complete 1 free sponsor activity to unlock your full download.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleOpenNotice}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#7C5CFF] via-[#6844f2] to-[#5132d4] py-4 px-6 text-sm sm:text-base font-bold tracking-wide text-white uppercase shadow-xl shadow-[#7C5CFF]/30 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              <Download className="h-5 w-5" />
              <span>DOWNLOAD CIMABOX (CONTINUE TO ACCESS)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mandatory Transparent Disclosure */}
          <div className="rounded-xl border border-white/5 bg-[#080B12]/60 p-4 text-xs text-slate-400 leading-relaxed text-center sm:text-left">
            <p>
              <span className="font-semibold text-slate-300">Third-Party Notice:</span> Offers shown during the access step are provided by a third-party offer provider. Review the applicable offer terms before proceeding. CIMABOX does not charge for or operate these third-party promotional tasks.
            </p>
          </div>
        </div>

        {/* Fallback Option */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <span>Encountering problems with third-party offers? </span>
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

        {/* OGAds Advance Notice Modal */}
        <AdvanceNoticeModal
          isOpen={showNoticeModal}
          onClose={() => setShowNoticeModal(false)}
          source="get_access_page"
          onNavigateFallback={() => navigate('/no-offer')}
        />
      </div>
    </div>
  );
};
