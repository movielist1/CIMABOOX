/**
 * CIMABOX — Configuration File
 * ===================================================
 * Configure your official application links, support email,
 * and OGAds Content Locker identifiers here.
 */

const CIMA_CONFIG = {
  // Official Store URLs
  // Provide your real Google Play Store link (e.g. "https://play.google.com/store/apps/details?id=com.cimabox.app")
  googlePlayUrl: "",

  // Provide your real Apple App Store link (e.g. "https://apps.apple.com/app/cimabox/id000000000")
  appStoreUrl: "",

  // Official Support Email
  supportEmail: "support@cimabox.com",

  // OGAds Content Locker Integration Identifiers
  ogadsLockerId: "m5np5m",
  ogadsPublisherId: "",
  ogadsLockerUrl: "https://appcomplete.org/cl/i/m5np5m",

  // Destination URLs
  ogadsSuccessUrl: "/download",
  ogadsFallbackUrl: "/no-offer"
};

// Export for browser global context
if (typeof window !== 'undefined') {
  window.CIMA_CONFIG = CIMA_CONFIG;
}
