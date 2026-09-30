import React, { useState } from 'react';
import { Menu, X, ArrowRight, Download } from 'lucide-react';
import { trackCTA } from '../utils/tracking';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
  onOpenDownloadNotice?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate, onOpenDownloadNotice }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string, hash?: string) => {
    setMobileMenuOpen(false);
    if (hash && (currentPath === '/' || currentPath === '')) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate(path);
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleGetAppClick = () => {
    trackCTA('header_get_cimabox', '/get');
    navigate('/get');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#080B12]/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single Brand Element */}
        <button
          onClick={() => handleNavClick('/')}
          className="group flex items-center gap-3 text-left focus:outline-none"
          aria-label="CIMABOX Home"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFF] to-[#5132d4] p-0.5 shadow-lg shadow-[#7C5CFF]/25 transition-transform duration-200 group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0B0F1A]">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-[#A78BFA] transition-colors group-hover:fill-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L19 9L12 16L5 9L12 2Z" fill="currentColor" />
                <circle cx="12" cy="18" r="2.5" fill="#7C5CFF" />
              </svg>
            </div>
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-slate-100">
            CIMABOX
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNavClick('/')}
            className={`transition-colors hover:text-white ${
              currentPath === '/' ? 'text-white' : 'text-slate-400'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('/', '#features')}
            className="transition-colors hover:text-white text-slate-400"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('/', '#how-it-works')}
            className="transition-colors hover:text-white text-slate-400"
          >
            How it works
          </button>
          <button
            onClick={() => handleNavClick('/support')}
            className={`transition-colors hover:text-white ${
              currentPath === '/support' ? 'text-white' : 'text-slate-400'
            }`}
          >
            Support
          </button>
        </nav>

        {/* Zone 3: Primary Action & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleGetAppClick}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6342E8] px-5 py-2.5 text-xs font-semibold tracking-wide text-white uppercase shadow-md shadow-[#7C5CFF]/20 transition-all duration-200 hover:brightness-110 hover:shadow-lg hover:shadow-[#7C5CFF]/30 active:scale-[0.98]"
          >
            <span>Get CIMABOX</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          {/* Hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0B0F1A] px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3">
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center py-2.5 text-base font-medium text-slate-200 hover:text-white border-b border-white/5"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('/', '#features')}
              className="flex items-center py-2.5 text-base font-medium text-slate-400 hover:text-white border-b border-white/5"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick('/', '#how-it-works')}
              className="flex items-center py-2.5 text-base font-medium text-slate-400 hover:text-white border-b border-white/5"
            >
              How it works
            </button>
            <button
              onClick={() => handleNavClick('/support')}
              className="flex items-center py-2.5 text-base font-medium text-slate-400 hover:text-white border-b border-white/5"
            >
              Support
            </button>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGetAppClick();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6342E8] py-3.5 text-sm font-semibold tracking-wide text-white uppercase shadow-md shadow-[#7C5CFF]/20"
              >
                <span>Get CIMABOX</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
