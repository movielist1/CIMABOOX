import React, { useEffect } from 'react';
import { CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { AppStoreButtons } from '../components/AppStoreButtons';
import { trackEvent, getCampaignData } from '../utils/tracking';

interface DownloadPageProps {
  navigate: (path: string) => void;
  onOpenDownloadNotice?: () => void;
}

export const DownloadPage: React.FC<DownloadPageProps> = ({ navigate }) => {
  useEffect(() => {
    const campaign = getCampaignData();
    trackEvent('download_page_view', {
      source: campaign.utm_source || 'direct',
      campaign: campaign.utm_campaign || 'none'
    });
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-160px)] py-12 sm:py-20">
      {/* Background ambient violet light */}
      <div className="pointer-events-none absolute top-10 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full violet-glow opacity-70 blur-3xl" />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Verification indicator */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          <span>Access Verified · Ready to Download</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          You're Ready to Go
        </h1>

        {/* Subheadline */}
        <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-md mx-auto">
          Download CIMABOX for your device.
        </p>

        {/* Store Selection Area — Simple & Focused */}
        <div className="mt-10 glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          <AppStoreButtons source="download_page" />

          {/* Security & Integrity Note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 border-t border-white/5 pt-4">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Official store availability · Verified safe download</span>
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="mt-10 text-left glass-card rounded-2xl p-6 sm:p-7 border border-white/5">
          <h2 className="font-display text-sm font-bold text-white mb-3 flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-[#A78BFA]" />
            <span>Next Steps</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="rounded-xl bg-[#080B12]/60 p-3.5 border border-white/5 space-y-1">
              <span className="font-semibold text-white block">1. Open Store</span>
              <p className="text-slate-400 leading-relaxed">Tap your device's official app store link above.</p>
            </div>
            <div className="rounded-xl bg-[#080B12]/60 p-3.5 border border-white/5 space-y-1">
              <span className="font-semibold text-white block">2. Tap Install</span>
              <p className="text-slate-400 leading-relaxed">Confirm the installation directly on your device.</p>
            </div>
            <div className="rounded-xl bg-[#080B12]/60 p-3.5 border border-white/5 space-y-1">
              <span className="font-semibold text-white block">3. Enjoy</span>
              <p className="text-slate-400 leading-relaxed">Launch CIMABOX and start discovering entertainment.</p>
            </div>
          </div>
        </div>

        {/* Support link */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <span>Need help with installation? </span>
          <button
            onClick={() => navigate('/support')}
            className="text-[#A78BFA] hover:text-white transition-colors underline"
          >
            Visit Support &amp; Help Center
          </button>
        </div>
      </div>
    </div>
  );
};
