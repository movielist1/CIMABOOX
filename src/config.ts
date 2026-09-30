/**
 * CIMABOX — Central Application Configuration
 * 
 * Update these values before launching the site.
 * This configuration is shared across the conversion funnel.
 */

export interface CimaConfig {
  /**
   * Google Play Store URL for CIMABOX Android app.
   * Example: "https://play.google.com/store/apps/details?id=com.cimabox.app"
   */
  googlePlayUrl: string;

  /**
   * Apple App Store URL for CIMABOX iOS app.
   * Example: "https://apps.apple.com/app/cimabox/id123456789"
   */
  appStoreUrl: string;

  /**
   * Official support email address.
   */
  supportEmail: string;

  /**
   * OGAds Content Locker ID (configured in your OGAds dashboard).
   */
  ogadsLockerId: string;

  /**
   * OGAds Publisher ID.
   */
  ogadsPublisherId: string;

  /**
   * Direct OGAds Content Locker URL.
   */
  ogadsLockerUrl: string;

  /**
   * URL to navigate to once the OGAds Content Locker completes successfully.
   */
  ogadsSuccessUrl: string;

  /**
   * URL to navigate to if no offers are available for the user's geo/device.
   */
  ogadsFallbackUrl: string;
}

export const CIMA_CONFIG: CimaConfig = {
  // Official Store URLs (leave empty until official store listings are published)
  googlePlayUrl: "",
  appStoreUrl: "",

  // Support Contact
  supportEmail: "support@cimabox.online",

  // OGAds Content Locker Configuration
  ogadsLockerId: "m5np5m",
  ogadsPublisherId: "",
  ogadsLockerUrl: "https://appcomplete.org/cl/i/m5np5m",
  ogadsSuccessUrl: "/download",
  ogadsFallbackUrl: "/no-offer"
};

// Also expose on window for debugging and static scripts compatibility
if (typeof window !== 'undefined') {
  (window as unknown as { CIMA_CONFIG: CimaConfig }).CIMA_CONFIG = CIMA_CONFIG;
}
