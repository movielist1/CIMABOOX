/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { GetPage } from './pages/GetPage';
import { DownloadPage } from './pages/DownloadPage';
import { NoOfferPage } from './pages/NoOfferPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { SupportPage } from './pages/SupportPage';
import { AdvanceNoticeModal } from './components/AdvanceNoticeModal';
import { getCampaignData, trackEvent } from './utils/tracking';
import { updatePageSeo } from './utils/seo';

export default function App() {
  const getNormalizedPath = useCallback(() => {
    if (typeof window === 'undefined') return '/';
    let path = window.location.pathname || '/';
    // Remove .html suffix if present
    if (path.endsWith('.html')) {
      path = path.slice(0, -5);
    }
    // Remove trailing slash if not root
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    return path || '/';
  }, []);

  const [currentPath, setCurrentPath] = useState<string>(getNormalizedPath);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState<boolean>(false);
  const [noticeSource, setNoticeSource] = useState<string>('download_button');

  const openDownloadNotice = (source: string = 'download_button') => {
    setNoticeSource(source);
    setIsNoticeModalOpen(true);
  };

  // Initialize tracking and dynamic SEO on path change
  useEffect(() => {
    // Dynamically update document title, OpenGraph, Twitter, and Schema.org
    updatePageSeo(currentPath);

    // Capture URL params (e.g. YouTube utm parameters) into session
    const campaign = getCampaignData();
    trackEvent('page_view', {
      path: currentPath,
      has_campaign: Boolean(campaign.utm_source || campaign.source)
    });

    const handlePopState = () => {
      setCurrentPath(getNormalizedPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPath, getNormalizedPath]);

  // Navigate helper preserving query search params where appropriate
  const navigate = (toPath: string) => {
    let cleanPath = toPath;
    let hash = '';
    if (cleanPath.includes('#')) {
      const parts = cleanPath.split('#');
      cleanPath = parts[0] || '/';
      hash = '#' + parts[1];
    }

    if (cleanPath.endsWith('.html')) {
      cleanPath = cleanPath.slice(0, -5);
    }
    if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
      cleanPath = cleanPath.slice(0, -1);
    }
    cleanPath = cleanPath || '/';

    // Preserve existing query params (e.g. YouTube UTMs)
    const search = window.location.search;
    const newUrl = `${cleanPath}${search}${hash}`;

    window.history.pushState({}, '', newUrl);
    setCurrentPath(cleanPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render current active page based on normalized path
  const renderPage = () => {
    switch (currentPath) {
      case '/get':
        return <GetPage navigate={navigate} />;
      case '/download':
        return <DownloadPage navigate={navigate} onOpenDownloadNotice={() => openDownloadNotice('download_page')} />;
      case '/no-offer':
        return <NoOfferPage navigate={navigate} />;
      case '/privacy':
        return <PrivacyPage navigate={navigate} />;
      case '/terms':
        return <TermsPage navigate={navigate} />;
      case '/support':
        return <SupportPage navigate={navigate} />;
      case '/':
      default:
        return <HomePage navigate={navigate} onOpenDownloadNotice={() => openDownloadNotice('homepage')} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#080B12] text-slate-100 selection:bg-[#7C5CFF]/30 selection:text-white">
      <Header
        currentPath={currentPath}
        navigate={navigate}
        onOpenDownloadNotice={() => openDownloadNotice('header')}
      />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer navigate={navigate} />

      {/* Global Advance Notice Modal for any download trigger */}
      <AdvanceNoticeModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        source={noticeSource}
        onNavigateFallback={() => navigate('/no-offer')}
      />
    </div>
  );
}
