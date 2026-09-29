/**
 * CIMABOX — Lightweight Campaign & Event Tracking Architecture
 * 
 * Supports YouTube funnel attribution:
 * ?utm_source=youtube&utm_medium=video&utm_campaign=YT_ANIME_001&utm_content=VIDEO_001
 * &source=... &campaign=... &content=... &video_id=...
 */

export interface CampaignData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  source?: string;
  campaign?: string;
  content?: string;
  video_id?: string;
  referrer?: string;
  timestamp?: string;
}

const STORAGE_KEY = 'cima_campaign_data';

/**
 * Parses query parameters from current URL or stored session.
 * Stores in first-party sessionStorage and localStorage to survive page navigation.
 */
export function getCampaignData(): CampaignData {
  if (typeof window === 'undefined') return {};

  const urlParams = new URLSearchParams(window.location.search);
  const detected: CampaignData = {};

  const keys: (keyof CampaignData)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'source',
    'campaign',
    'content',
    'video_id'
  ];

  let hasParamInUrl = false;
  keys.forEach((key) => {
    const val = urlParams.get(key);
    if (val) {
      detected[key] = val;
      hasParamInUrl = true;
    }
  });

  if (hasParamInUrl) {
    detected.referrer = document.referrer || 'direct';
    detected.timestamp = new Date().toISOString();
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(detected));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(detected));
    } catch {
      // Ignore storage restrictions
    }
    return detected;
  }

  // Fallback to existing session data
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved) as CampaignData;
    }
  } catch {
    // Storage read error fallback
  }

  return {};
}

/**
 * Dispatches an event to analytics listeners (Google Analytics, Firebase, Custom server, etc.)
 */
export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  const campaign = getCampaignData();
  const payload = {
    event: eventName,
    ...campaign,
    ...params,
    url: window.location.pathname,
    timestamp: new Date().toISOString()
  };

  // 1. Dispatch custom DOM event for modular listeners
  window.dispatchEvent(new CustomEvent('cima:track', { detail: payload }));

  // 2. Integration hook for Google Analytics (gtag) if present
  const win = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  if (typeof win.gtag === 'function') {
    win.gtag('event', eventName, payload);
  } else if (Array.isArray(win.dataLayer)) {
    win.dataLayer.push(payload);
  }

  // 3. Clean console output in development for inspection
  if (process.env.NODE_ENV !== 'production') {
    console.info(`[CIMA TRACKING] ${eventName}:`, payload);
  }
}

/**
 * Tracks CTA button clicks throughout the funnel.
 */
export function trackCTA(buttonName: string, destination: string) {
  trackEvent('cta_click', {
    button_name: buttonName,
    destination
  });
}

/**
 * Tracks store selection clicks (explicit user action).
 */
export function trackStoreClick(platform: 'google_play' | 'app_store', url: string) {
  trackEvent(platform === 'google_play' ? 'google_play_click' : 'app_store_click', {
    platform,
    destination_url: url
  });
}

/**
 * Integration point for verified offer completion from OGAds callback.
 * Call this function ONLY when the OGAds locker script fires a successful unlock event.
 */
export function trackOfferCompleted(offerId?: string, payout?: string | number) {
  trackEvent('offer_completed', {
    offer_id: offerId || 'default',
    payout: payout || 0,
    status: 'unlocked'
  });
}
