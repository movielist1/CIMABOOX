import React, { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home, HelpCircle } from 'lucide-react';
import { trackEvent } from '../utils/tracking';

interface NoOfferPageProps {
  navigate: (path: string) => void;
}

export const NoOfferPage: React.FC<NoOfferPageProps> = ({ navigate }) => {
  useEffect(() => {
    trackEvent('page_view', { page: 'no_offer' });
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-160px)] py-16 sm:py-24">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Visual Badge */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-400">
          <AlertCircle className="h-8 w-8" />
        </div>

        {/* Headline */}
        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          No offer is currently available.
        </h1>

        {/* Text */}
        <p className="mt-4 text-base text-slate-300 leading-relaxed max-w-md mx-auto">
          We couldn't find an available offer for your device or location right now. Please try again later.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/get')}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6342E8] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-[#7C5CFF]/20 hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            <span>TRY AGAIN</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-200 hover:bg-white/10 active:scale-[0.98] transition-all"
          >
            <Home className="h-4 w-4" />
            <span>BACK TO CIMABOX</span>
          </button>
        </div>

        {/* Helpful Advice Box */}
        <div className="mt-12 rounded-2xl glass-card p-6 text-left border border-white/5">
          <h2 className="font-display text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-[#A78BFA]" />
            <span>Why might no offers appear?</span>
          </h2>
          <ul className="space-y-2 text-xs text-slate-400 list-disc list-inside">
            <li>Content locker availability varies dynamically based on your country and region.</li>
            <li>Active ad-blocking software or script blockers can prevent third-party offers from loading.</li>
            <li>Certain private network configurations (VPNs or corporate proxies) may restrict eligible offers.</li>
          </ul>
          <div className="mt-4 pt-3 border-t border-white/5 text-xs">
            <span>Still experiencing trouble? </span>
            <button
              onClick={() => navigate('/support')}
              className="text-[#A78BFA] hover:text-white underline transition-colors"
            >
              Contact CIMABOX Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
