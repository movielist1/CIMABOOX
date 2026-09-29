# CIMABOX — Official Brand Website & YouTube Conversion Funnel

CIMABOX is a modern, mobile-first entertainment and streaming application for discovering movies, series, anime, and cartoons on Android and iPhone. This repository contains the complete, production-ready website and conversion funnel designed specifically for receiving and attributing high-intent traffic from YouTube.

---

## Architecture & Funnel Flow

```
YouTube Video / Description Link
           │
           ▼
1. CIMABOX Homepage / Landing Page (/)
   • Attributed UTM campaign data captured & persisted in session
   • User clicks "GET CIMABOX"
           │
           ▼
2. Access Verification Portal (/get)
   • Transparent 3-step explanation of access & third-party offer step
   • User clicks "CONTINUE TO ACCESS"
   • Calls openOgadsLocker() to launch OGAds Content Locker
           │
     ┌─────┴────────────────────────┐
     │ Successful offer completion  │ No offers available / geo block
     ▼                              ▼
3. Download Page (/download)     4. Fallback Page (/no-offer)
   • Device detected (Android/iOS)  • Helpful guidance & retry buttons
   • Highlights official store
   • Explicit user click required
           │
           ▼
5. Official App Store (Google Play / Apple App Store)
```

---

## 1. How to Deploy the Website

### Option A: Static Web Hosting (Cloudflare Pages, Vercel, Netlify, Nginx, Apache, S3/CloudFront)
The project includes pre-built standalone HTML files and assets ready for static deployment:
- Deploy the `/public` or root folder containing `index.html`, `get.html`, `download.html`, `no-offer.html`, `privacy.html`, `terms.html`, `support.html`, `robots.txt`, and `sitemap.xml`.
- Ensure HTTPS is enforced on your domain (`https://cimabox.com/`).

### Option B: Modern Vite / Node.js Production Build
```bash
# 1. Install dependencies
npm install

# 2. Build production distribution
npm run build

# 3. Preview or serve the compiled dist folder
npm run preview
```
The compiled SPA will be output to `/dist` with full asset optimization, hash caching, and lightning-fast load times.

---

## 2. Where to Add the Google Play URL

Open `src/config.ts` (for Vite/React builds) and `assets/config.js` (for static HTML pages):

```javascript
const CIMA_CONFIG = {
  // Replace with your live Android package store listing:
  googlePlayUrl: "https://play.google.com/store/apps/details?id=com.cimacloud.app",
  ...
};
```
*Note: If left empty, the website will display a polite informational modal indicating that the store link is currently being synchronized, rather than broken dead links.*

---

## 3. Where to Add the App Store URL

In `src/config.ts` and `assets/config.js`:

```javascript
const CIMA_CONFIG = {
  // Replace with your live iOS App Store listing:
  appStoreUrl: "https://apps.apple.com/app/cima-cloud/id123456789",
  ...
};
```

---

## 4. Where to Add the Support Email

In `src/config.ts` and `assets/config.js`:

```javascript
const CIMA_CONFIG = {
  // Replace with your domain's support inbox:
  supportEmail: "support@cimabox.com",
  ...
};
```
This updates the contact email across the Support page, FAQ, copy-to-clipboard buttons, Privacy Policy, and Terms of Service.

---

## 5. Where to Insert the Official OGAds Content Locker Integration

OGAds requires your own publisher code snippet from your OGAds dashboard. We have created a dedicated integration area:

### In React / TypeScript (`src/pages/GetPage.tsx`):
Look for the `OGADS_LOCKER_INTEGRATION` block:
```typescript
/* =========================================================================
   OGADS_LOCKER_INTEGRATION
   -------------------------------------------------------------------------
   Replace this logic with the JavaScript trigger provided in your
   OGAds Content Locker dashboard (e.g. call_locker() or og_load()).
   ========================================================================= */
const openOgadsLocker = () => {
  // Example call to your OGAds locker function:
  if (typeof (window as any).og_load === 'function') {
    (window as any).og_load();
    return;
  }
  
  // Or invoke locker by locker ID:
  // (window as any).call_locker(CIMA_CONFIG.ogadsLockerId);
};
```

### In Static HTML (`get.html` / `public/get.html`):
Locate the `<script>` tag at the bottom of the page and paste your OGAds header script into the `<head>` and your locker trigger into `openOgadsLocker()`.

---

## 6. How the Redirect to /download Works

1. Once the user completes an eligible offer, the OGAds Content Locker script fires an unlock event or redirect callback.
2. In your OGAds Locker Dashboard under **Redirect URL / Unlock URL**, set the destination URL to:
   ```
   https://cimabox.com/download
   ```
3. When the user lands on `/download`, the website automatically detects whether they are browsing on an **Android** or **iOS (iPhone/iPad)** device via User-Agent inspection.
4. The matching store card is visually highlighted and tagged as "Recommended for your device".
5. **Zero Silent Redirects**: In strict compliance with app store trust guidelines, the user must explicitly tap the Google Play or App Store button to proceed. No APK files are downloaded silently in the background.

---

## 7. How the Fallback /no-offer Page Works

1. If OGAds determines there are no available offers in the user's geographical territory, or if network ad-blockers prevent offers from rendering, the OGAds script triggers the fallback URL.
2. In your OGAds Locker Dashboard under **No Offers Fallback URL**, specify:
   ```
   https://cimabox.com/no-offer
   ```
3. `/no-offer` informs the user gently with neutral wording: *"We couldn't find an available offer for your device or location right now. Please try again later."*
4. It provides clean buttons to **Try Again** (`/get`), **Return Home** (`/`), and contact Support.

---

## 8. How YouTube Campaign Parameters Work

The built-in tracking architecture (`src/utils/tracking.ts`) recognizes both standard UTM parameters and custom YouTube video tags:

Example YouTube URL:
```
https://cimabox.com/get?utm_source=youtube&utm_medium=video&utm_campaign=YT_ANIME_001&utm_content=VIDEO_001
```

Supported query parameters:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `source`
- `campaign`
- `content`
- `video_id`

### Persistence & Forwarding:
Parameters are automatically saved into first-party browser `sessionStorage` and `localStorage`. When the user navigates between `/`, `/get`, and `/download`, campaign metadata remains attached to tracking events (`page_view`, `cta_click`, `locker_open`, `download_page_view`, `google_play_click`, `app_store_click`).

---

## 9. How to Replace Placeholder Screenshots

App mockups and preview assets are located in:
- `src/assets/images/`
- `public/assets/images/`
- `public/assets/screenshots/`

To replace with your live app screenshots:
1. Export high-resolution PNGs of your app's home feed and media playback interface.
2. Place them into `src/assets/images/` with matching names or update the import paths in `src/pages/HomePage.tsx`.
3. The layout automatically adapts with responsive aspect ratios and soft borders.

---

## 10. What Must Be Completed Before Public Launch

Before sending public traffic from YouTube:
- [ ] **Configure Store URLs**: Enter verified `googlePlayUrl` and `appStoreUrl` in `src/config.ts` and `assets/config.js`.
- [ ] **Insert OGAds Locker**: Add your verified OGAds Content Locker snippet to `openOgadsLocker()`.
- [ ] **Configure Locker Redirect**: Set unlock URL in OGAds dashboard to `https://cimabox.com/download`.
- [ ] **Set Support Email**: Replace `support@cimabox.com` with your team's monitored inbox.
- [ ] **Review Legal Placeholders**: In `/privacy` and `/terms`, replace bracketed placeholders (`[Operator Legal Name]`, `[Jurisdiction]`) with your business legal information.
---

## 11. Per-Page SEO & Social Sharing Cards (Open Graph & Twitter / X)

Each page across the CIMABOX conversion funnel includes dedicated Open Graph tags, Twitter / X card metadata, canonical URLs, and Schema.org JSON-LD structured data:

| Route | Page Title | Meta Description Focus | Schema.org Type | Social Image |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `CIMABOX — Movies, Series, Anime & More` | Discovery value prop for Android & iOS | `MobileApplication` | App Showcase (`cima_app_showcase`) |
| `/get` | `Get CIMABOX — Official Access Portal` | Transparent 3-step access & offer verification | `WebPage` | Smartphone Mockup (`cima_hero_phone`) |
| `/download` | `Download CIMABOX — Google Play & App Store` | Store installation instructions & trust markers | `SoftwareApplication` | Smartphone Mockup (`cima_hero_phone`) |
| `/support` | `Support & Help Center — CIMABOX` | Help desk, troubleshooting & installation FAQs | `FAQPage` | App Showcase (`cima_app_showcase`) |
| `/no-offer` | `Offer Status & Access Help — CIMABOX` | Fallback assistance & retry guidance | `WebPage` | Smartphone Mockup (`cima_hero_phone`) |
| `/privacy` | `Privacy Policy — CIMABOX` | Privacy commitments, third-party disclosure | `Article` | App Showcase (`cima_app_showcase`) |
| `/terms` | `Terms of Service — CIMABOX` | Legal usage terms, app store guidelines | `Article` | App Showcase (`cima_app_showcase`) |

In the React SPA, `src/utils/seo.ts` dynamically mutates `document.title`, `<meta name="description">`, `og:*`, `twitter:*`, and JSON-LD schema during client-side navigation. All static HTML pages (`/get.html`, `/download.html`, etc.) also contain these tags in their `<head>` for crawlers and social bot previews.

