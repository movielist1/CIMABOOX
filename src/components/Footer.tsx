import React from 'react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (path: string, hash?: string) => {
    navigate(path);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#05070D] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#7C5CFF] to-[#5132d4] p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#0B0F1A]">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#A78BFA]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L19 9L12 16L5 9L12 2Z" fill="currentColor" />
                    <circle cx="12" cy="18" r="2.5" fill="#7C5CFF" />
                  </svg>
                </div>
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                CIMABOX
              </span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              A modern entertainment and streaming application designed to help you discover movies, series, anime, and curated content from your phone.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span>Official Website: cimabox.com</span>
              <span aria-hidden="true">·</span>
              <span>Android &amp; iOS</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('/')}
                  className="transition-colors hover:text-white"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/', '#features')}
                  className="transition-colors hover:text-white"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/', '#how-it-works')}
                  className="transition-colors hover:text-white"
                >
                  How it works
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/get')}
                  className="transition-colors hover:text-white"
                >
                  Get the App
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/support')}
                  className="transition-colors hover:text-white"
                >
                  Support
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Legal &amp; Privacy
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('/privacy')}
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/terms')}
                  className="transition-colors hover:text-white"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
            <div className="pt-2 text-xs text-slate-500 leading-normal">
              Third-party offers presented during the access step are delivered by independent promotional providers.
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/[0.06] pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {currentYear} CIMABOX. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Designed for mobile entertainment discovery.
          </p>
        </div>
      </div>
    </footer>
  );
};
