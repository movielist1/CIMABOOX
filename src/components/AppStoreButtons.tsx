import React, { useState, useEffect } from 'react';
import { CIMA_CONFIG } from '../config';
import { trackStoreClick } from '../utils/tracking';
import { AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react';

interface AppStoreButtonsProps {
  className?: string;
  source?: string;
  onOpenNotice?: () => void;
}

type DeviceType = 'android' | 'ios' | 'unknown';

export const AppStoreButtons: React.FC<AppStoreButtonsProps> = ({ className = '', source = 'download_page', onOpenNotice }) => {
  const [device, setDevice] = useState<DeviceType>('unknown');
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '';
      if (/android/i.test(ua)) {
        setDevice('android');
      } else if (/iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream) {
        setDevice('ios');
      } else if (/Macintosh/i.test(ua) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1) {
        setDevice('ios'); // iPadOS detection
      } else {
        setDevice('unknown');
      }
    }
  }, []);

  const handleStoreClick = (platform: 'google_play' | 'app_store') => {
    const targetUrl = platform === 'google_play' ? CIMA_CONFIG.googlePlayUrl : CIMA_CONFIG.appStoreUrl;
    trackStoreClick(platform, targetUrl || 'unconfigured');

    if (!targetUrl || targetUrl.trim() === '') {
      if (onOpenNotice) {
        onOpenNotice();
        return;
      }
      setModalMessage(
        platform === 'google_play'
          ? 'The official Google Play Store listing is currently being synchronized. You can unlock the direct verified installation package below.'
          : 'The official Apple App Store listing is currently being synchronized. You can unlock the direct verified installation package below.'
      );
      return;
    }

    // Explicit user-driven navigation
    window.location.href = targetUrl;
  };

  const isAndroid = device === 'android';
  const isIos = device === 'ios';

  const renderGooglePlayButton = (isRecommended: boolean) => (
    <div key="google-play" className="flex-1 w-full">
      {isRecommended && (
        <div className="mb-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#A78BFA]">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Recommended for your Android device</span>
        </div>
      )}
      <button
        onClick={() => handleStoreClick('google_play')}
        className={`group relative flex w-full items-center justify-center gap-4 rounded-2xl p-4 sm:p-5 transition-all duration-200 active:scale-[0.98] ${
          isRecommended
            ? 'bg-gradient-to-r from-[#161D2B] to-[#1E273A] border-2 border-[#7C5CFF] shadow-lg shadow-[#7C5CFF]/20 hover:border-[#A78BFA]'
            : 'bg-[#111722] border border-white/10 hover:border-white/20 hover:bg-[#161D2B]'
        }`}
        aria-label="Download CIMABOX on Google Play"
      >
        {/* Google Play Vector Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center">
          <svg viewBox="0 0 512 512" className="h-9 w-9" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"
              fill="#ea4335"
            />
            <path
              d="M47 38.8l234.4 234.4L47 507.6c-7.3-8.8-11.8-20.2-11.8-32.8V71.6c0-12.6 4.5-24 11.8-32.8z"
              fill="#4285f4"
            />
            <path
              d="M47 473.2c0 12.6 4.5 24 11.8 32.8l222.6-222.6-60.1-60.1L47 473.2z"
              fill="#34a853"
            />
            <path
              d="M424.3 227.1L355.6 187l-74.2 74.2 74.2 74.2 70.4-40.4c17.8-10.2 28.8-28.7 28.8-49s-11.1-38.7-30.5-48.9z"
              fill="#fbbc04"
            />
          </svg>
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">
            GET IT ON
          </span>
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-slate-100">
            Google Play
          </span>
        </div>

        <ExternalLink className="ml-auto h-4 w-4 text-slate-500 transition-colors group-hover:text-slate-300" />
      </button>
    </div>
  );

  const renderAppStoreButton = (isRecommended: boolean) => (
    <div key="app-store" className="flex-1 w-full">
      {isRecommended && (
        <div className="mb-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#A78BFA]">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Recommended for your iOS device</span>
        </div>
      )}
      <button
        onClick={() => handleStoreClick('app_store')}
        className={`group relative flex w-full items-center justify-center gap-4 rounded-2xl p-4 sm:p-5 transition-all duration-200 active:scale-[0.98] ${
          isRecommended
            ? 'bg-gradient-to-r from-[#161D2B] to-[#1E273A] border-2 border-[#7C5CFF] shadow-lg shadow-[#7C5CFF]/20 hover:border-[#A78BFA]'
            : 'bg-[#111722] border border-white/10 hover:border-white/20 hover:bg-[#161D2B]'
        }`}
        aria-label="Download CIMABOX on the Apple App Store"
      >
        {/* Apple Vector Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center">
          <svg viewBox="0 0 170 170" className="h-9 w-9 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.94-12.04-14.59-6.3-9.69-11.39-20.91-15.28-33.68-3.89-12.76-5.83-25.07-5.83-36.93 0-14.28 3.52-26.23 10.56-35.85 7.04-9.62 16.03-14.48 26.97-14.59 5.65 0 11.55 1.54 17.7 4.62 6.15 3.08 10.3 4.67 12.45 4.77 1.84 0 6.13-1.64 12.87-4.92 6.74-3.28 12.79-4.7 18.15-4.26 13.9.78 24.97 5.66 33.21 14.65-12.18 7.37-18.15 17.52-17.91 30.45.24 10.15 4.15 18.77 11.72 25.86 7.57 7.09 16.71 11.13 27.42 12.13-2.22 6.72-4.8 13.06-7.74 19.03zM119.22 33.02c0-7.39 2.65-14.28 7.95-20.67 5.3-6.39 11.89-10.42 19.78-12.09.43 2.17.65 4.35.65 6.52 0 7.39-2.76 14.42-8.29 21.09-5.53 6.67-12.19 10.58-19.98 11.74-.07-2.17-.11-4.37-.11-6.59z" />
          </svg>
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">
            DOWNLOAD ON THE
          </span>
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-slate-100">
            App Store
          </span>
        </div>

        <ExternalLink className="ml-auto h-4 w-4 text-slate-500 transition-colors group-hover:text-slate-300" />
      </button>
    </div>
  );

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
        {isIos ? (
          <>
            {renderAppStoreButton(true)}
            {renderGooglePlayButton(false)}
          </>
        ) : isAndroid ? (
          <>
            {renderGooglePlayButton(true)}
            {renderAppStoreButton(false)}
          </>
        ) : (
          <>
            {renderGooglePlayButton(false)}
            {renderAppStoreButton(false)}
          </>
        )}
      </div>

      {/* Info notice */}
      <p className="mt-4 text-center text-xs text-slate-400">
        Requires explicit click. No automated background installs or silent redirects.
      </p>

      {/* Configuration Guidance Modal */}
      {modalMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111722] p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 shrink-0 text-[#A78BFA]" />
              <div>
                <h3 className="font-display text-base font-semibold text-white">
                  Store Link Notice
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {modalMessage}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalMessage(null)}
                className="rounded-xl bg-[#7C5CFF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#6846f3] transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
