import React, { useEffect } from 'react';
import { CheckCircle2, ShieldCheck, HelpCircle, Download, ArrowRight } from 'lucide-react';
import { AppStoreButtons } from '../components/AppStoreButtons';
import { trackEvent, getCampaignData } from '../utils/tracking';

interface DownloadPageProps {
  navigate: (path: string) => void;
  onOpenDownloadNotice?: () => void;
}

export const DownloadPage: React.FC<DownloadPageProps> = ({ navigate, onOpenDownloadNotice }) => {
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

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Verification indicator */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          <span>Access Verified · Ready to Download</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Your download is ready.
        </h1>

        {/* Supporting text */}
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-lg mx-auto">
          Choose the official store for your device.
        </p>

        {/* Store Selection Area */}
        <div className="mt-10 glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          <AppStoreButtons source="download_page" onOpenNotice={onOpenDownloadNotice} />

          {/* Alternative direct unlock with advance notice */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              onClick={() => onOpenDownloadNotice && onOpenDownloadNotice()}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#A78BFA] hover:text-white transition-colors border border-[#7C5CFF]/30 bg-[#7C5CFF]/10 px-4 py-2.5 rounded-xl hover:bg-[#7C5CFF]/20"
            >
              <Download className="h-4 w-4" />
              <span>Unlock Direct Download (Verification Locker)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Security & Integrity Note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 border-t border-white/5 pt-4">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Official store &amp; verified direct distribution. Malware-free.</span>
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="mt-12 text-left glass-card rounded-2xl p-6 sm:p-8">
          <h2 className="font-display text-base font-bold text-white mb-4 flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-[#A78BFA]" />
            <span>Next Steps After Tapping Your Store</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="rounded-xl bg-[#080B12]/60 p-4 border border-white/5 space-y-1">
              <span className="font-semibold text-white block">1. Open Official Store</span>
              <p className="text-slate-400">You will be taken directly to the Google Play Store or Apple App Store listing.</p>
            </div>
            <div className="rounded-xl bg-[#080B12]/60 p-4 border border-white/5 space-y-1">
              <span className="font-semibold text-white block">2. Tap Install / Get</span>
              <p className="text-slate-400">Your device securely verifies and downloads the application directly from the store.</p>
            </div>
            <div className="rounded-xl bg-[#080B12]/60 p-4 border border-white/5 space-y-1">
              <span className="font-semibold text-white block">3. Launch CIMABOX</span>
              <p className="text-slate-400">Open the app from your home screen and start discovering entertainment.</p>
            </div>
          </div>
        </div>

        {/* Support navigation */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <span>Need help installing? </span>
          <button
            onClick={() => navigate('/support')}
            className="text-[#A78BFA] hover:text-white transition-colors underline"
          >
            Visit Support &amp; FAQs
          </button>
        </div>
      </div>
    </div>
  );
};
