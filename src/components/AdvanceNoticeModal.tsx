import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, X, Clock, CheckCircle2, AlertCircle, Sparkles, Smartphone, Lock } from 'lucide-react';
import { CIMA_CONFIG } from '../config';
import { trackEvent } from '../utils/tracking';

interface AdvanceNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
  onNavigateFallback?: () => void;
}

export const AdvanceNoticeModal: React.FC<AdvanceNoticeModalProps> = ({
  isOpen,
  onClose,
  source = 'download_button',
  onNavigateFallback
}) => {
  const [countdown, setCountdown] = useState<number>(5);
  const [isReadyToProceed, setIsReadyToProceed] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setIsReadyToProceed(false);
      return;
    }

    trackEvent('advance_notice_modal_shown', { source });

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsReadyToProceed(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, source]);

  if (!isOpen) return null;

  const handleProceed = () => {
    trackEvent('advance_notice_accepted', {
      source,
      locker_url: CIMA_CONFIG.ogadsLockerUrl
    });

    const targetUrl = CIMA_CONFIG.ogadsLockerUrl || 'https://appcomplete.org/cl/i/m5np5m';

    // Check if an external locker script (e.g. window.og_load) exists
    const win = window as unknown as { og_load?: () => void; call_locker?: (id?: string) => void };
    if (typeof win.og_load === 'function') {
      win.og_load();
      onClose();
      return;
    }
    if (typeof win.call_locker === 'function') {
      win.call_locker(CIMA_CONFIG.ogadsLockerId);
      onClose();
      return;
    }

    // Direct transition to OGAds content locker URL
    window.location.href = targetUrl;
  };

  const handleClose = () => {
    trackEvent('advance_notice_dismissed', { source });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="advance-notice-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl rounded-3xl border border-white/15 bg-gradient-to-b from-[#141926] via-[#0E131F] to-[#0A0D15] p-6 sm:p-8 shadow-2xl shadow-[#7C5CFF]/20 text-slate-100">
        {/* Glow accent */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7C5CFF]/20 blur-3xl" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Close notice"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header with Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#7C5CFF]/20 border border-[#7C5CFF]/40 text-[#A78BFA] shadow-lg shadow-[#7C5CFF]/25">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-[#A78BFA] uppercase">
              <Sparkles className="h-3 w-3" />
              <span>Advance Notice</span>
            </div>
            <h2 id="advance-notice-title" className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
              Verification Notice Before Download
            </h2>
          </div>
        </div>

        {/* Advance Notice Body Explanation */}
        <div className="rounded-2xl bg-[#090D18]/80 border border-white/10 p-4 sm:p-5 space-y-3">
          <p className="text-sm text-slate-200 leading-relaxed">
            To provide <strong className="text-white font-semibold">CIMABOX</strong> completely free and protect our servers from automated bots, a brief sponsor verification step will be displayed next.
          </p>
          <div className="flex items-start gap-2.5 text-xs text-slate-400 bg-white/[0.03] rounded-xl p-3 border border-white/5">
            <AlertCircle className="h-4 w-4 shrink-0 text-[#A78BFA] mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-200">Why this notice?</strong> An unexpected locker can feel abrupt and confusing. We give you this advance notice so you know exactly what to expect on the next screen.
            </p>
          </div>
        </div>

        {/* 3-Step Clear Expectations */}
        <div className="mt-5 space-y-2.5">
          <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            What will happen next:
          </h3>

          <div className="grid grid-cols-1 gap-2.5">
            {/* Step 1 */}
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/5 p-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#7C5CFF]/20 text-xs font-bold text-[#A78BFA]">
                1
              </div>
              <div className="text-xs">
                <span className="font-semibold text-white">Open Verification Locker: </span>
                <span className="text-slate-300">Click below to view eligible free sponsor tasks for your device.</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/5 p-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#7C5CFF]/20 text-xs font-bold text-[#A78BFA]">
                2
              </div>
              <div className="text-xs">
                <span className="font-semibold text-white">Complete 1 Quick Task: </span>
                <span className="text-slate-300">Install a free app or complete a quick survey (takes ~30-60 seconds).</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/5 p-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-xs font-bold text-emerald-400">
                3
              </div>
              <div className="text-xs">
                <span className="font-semibold text-white">Download Starts Automatically: </span>
                <span className="text-slate-300">Access unlocks instantly with high-speed download links.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Trust Signals */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-y border-white/5 py-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5" />
            100% Free · No payment required
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Smartphone className="h-3.5 w-3.5 text-[#A78BFA]" />
            Android &amp; iOS Supported
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Lock className="h-3.5 w-3.5 text-[#A78BFA]" />
            Secure Verification
          </span>
        </div>

        {/* Interactive Notice Timer & Primary Action Button */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#A78BFA]" />
              {countdown > 0 ? (
                <span>Advance notice time: <strong className="text-white">{countdown}s</strong> remaining</span>
              ) : (
                <span className="text-emerald-400 font-medium">✓ Ready to proceed to verification</span>
              )}
            </span>
            <span className="text-[11px] text-slate-500">Click anytime to proceed</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleProceed}
              className="flex-1 flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFF] via-[#6B46F3] to-[#5132D4] py-3.5 px-6 text-sm font-semibold tracking-wide text-white uppercase shadow-xl shadow-[#7C5CFF]/30 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              <span>I UNDERSTAND — PROCEED TO VERIFICATION</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={handleClose}
              className="rounded-xl border border-white/10 bg-white/5 py-3.5 px-5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Fallback & Support Notice */}
        <div className="mt-4 text-center text-[11px] text-slate-400">
          <span>Having trouble with offers? </span>
          {onNavigateFallback ? (
            <button
              onClick={() => {
                handleClose();
                onNavigateFallback();
              }}
              className="text-[#A78BFA] underline hover:text-white transition-colors"
            >
              No offers available in your region?
            </button>
          ) : (
            <a
              href="/no-offer"
              className="text-[#A78BFA] underline hover:text-white transition-colors"
            >
              No offers available?
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
