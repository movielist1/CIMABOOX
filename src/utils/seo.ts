/**
 * CIMABOX — Dynamic SEO and Social Card Manager
 * 
 * Dynamically updates document.title, canonical link, OpenGraph tags,
 * Twitter card tags, and Schema.org JSON-LD structured data upon page transitions.
 */

export interface PageSeoConfig {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
  schemaType?: 'WebSite' | 'MobileApplication' | 'SoftwareApplication' | 'FAQPage' | 'WebPage';
  schemaData?: Record<string, unknown>;
}

const DEFAULT_IMAGE = 'https://cimabox.com/assets/images/cima_app_showcase_1790544243306.jpg';
const BASE_URL = 'https://cimabox.com';

export const PAGE_SEO_METADATA: Record<string, PageSeoConfig> = {
  '/': {
    title: 'CIMABOX — Movies, Series, Anime & More',
    description: 'Discover CIMABOX, a mobile entertainment experience for movies, series, anime and more on Android and iPhone.',
    path: '/',
    image: 'https://cimabox.com/assets/images/cima_app_showcase_1790544243306.jpg',
    type: 'website',
    schemaType: 'MobileApplication',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      name: 'CIMABOX',
      operatingSystem: 'Android, iOS',
      applicationCategory: 'EntertainmentApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      description: 'Discover movies, series, anime and more in a simple, mobile-first experience.'
    }
  },
  '/get': {
    title: 'Get CIMABOX — Official Access Portal',
    description: 'Continue to the access step to verify and download the official CIMABOX app for Android and iPhone.',
    path: '/get',
    image: 'https://cimabox.com/assets/images/cima_hero_phone_1790544231676.jpg',
    type: 'website',
    schemaType: 'WebPage',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Get CIMABOX — Official Access Portal',
      description: 'Continue to the access step to verify and download the official CIMABOX app.'
    }
  },
  '/download': {
    title: 'Download CIMABOX — Google Play & App Store',
    description: 'Your download is ready. Install CIMABOX directly from Google Play or the Apple App Store for mobile streaming.',
    path: '/download',
    image: 'https://cimabox.com/assets/images/cima_hero_phone_1790544231676.jpg',
    type: 'website',
    schemaType: 'SoftwareApplication',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'CIMABOX App',
      operatingSystem: 'Android, iOS',
      applicationCategory: 'EntertainmentApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  },
  '/support': {
    title: 'Support & Help Center — CIMABOX',
    description: 'Need help with CIMABOX? Find installation troubleshooting, access guidance, and FAQs for Android and iOS devices.',
    path: '/support',
    image: 'https://cimabox.com/assets/images/cima_app_showcase_1790544243306.jpg',
    type: 'website',
    schemaType: 'FAQPage',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I download the CIMABOX application?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Click GET THE APP to complete the access verification step, then select Google Play or the Apple App Store on the download page.'
          }
        },
        {
          '@type': 'Question',
          name: 'Are there any automated APK downloads?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. CIMABOX never automatically downloads APKs or redirects without user interaction. Downloads are handled strictly through official stores.'
          }
        }
      ]
    }
  },
  '/no-offer': {
    title: 'Offer Status & Access Help — CIMABOX',
    description: 'Check available access options or retry downloading CIMABOX for your device and region.',
    path: '/no-offer',
    image: 'https://cimabox.com/assets/images/cima_hero_phone_1790544231676.jpg',
    type: 'website'
  },
  '/privacy': {
    title: 'Privacy Policy — CIMABOX',
    description: 'Review the official Privacy Policy for CIMABOX, covering device data, analytics, and third-party promotional services.',
    path: '/privacy',
    image: 'https://cimabox.com/assets/images/cima_app_showcase_1790544243306.jpg',
    type: 'article'
  },
  '/terms': {
    title: 'Terms of Service — CIMABOX',
    description: 'Official Terms of Service for CIMABOX website and mobile entertainment application access.',
    path: '/terms',
    image: 'https://cimabox.com/assets/images/cima_app_showcase_1790544243306.jpg',
    type: 'article'
  }
};

/**
 * Helper to get or create a meta tag by property or name
 */
function setMetaTag(selector: string, attrName: string, attrVal: string, content: string) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrVal);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Updates all page SEO, OpenGraph, Twitter, and canonical metadata
 */
export function updatePageSeo(pathname: string) {
  if (typeof document === 'undefined') return;

  const normalizedPath = pathname.endsWith('.html') ? pathname.slice(0, -5) : pathname;
  const config = PAGE_SEO_METADATA[normalizedPath] || PAGE_SEO_METADATA['/'];

  const fullUrl = `${BASE_URL}${config.path === '/' ? '' : config.path}`;
  const imageUrl = config.image || DEFAULT_IMAGE;

  // 1. Title
  document.title = config.title;

  // 2. Meta description
  setMetaTag('meta[name="description"]', 'name', 'description', config.description);

  // 3. Canonical link
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', fullUrl);

  // 4. OpenGraph tags
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', config.title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', config.description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', fullUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', config.type || 'website');
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', imageUrl);
  setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'CIMABOX');

  // 5. Twitter / X card tags
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', config.title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', config.description);
  setMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', fullUrl);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);

  // 6. Schema.org JSON-LD
  const existingJsonLd = document.head.querySelector('script[type="application/ld+json"]#cima-seo-schema');
  if (existingJsonLd) {
    existingJsonLd.remove();
  }

  if (config.schemaData) {
    const script = document.createElement('script');
    script.id = 'cima-seo-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(config.schemaData);
    document.head.appendChild(script);
  }
}
