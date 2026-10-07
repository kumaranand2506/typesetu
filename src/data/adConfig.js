// Monetization Configuration for Google AdSense & Adsterra

const ADS_STORAGE_KEY = 'typesetu_ad_settings_v1';

export const DEFAULT_AD_CONFIG = {
  // Set to true when you want real ads to render
  isProduction: false,

  // Google AdSense Publisher ID (e.g., 'ca-pub-1234567890123456')
  googleAdsenseClientId: '',

  // Ad Slot IDs from your Google AdSense Dashboard
  adsenseSlots: {
    headerBanner: '',
    lessonBottom: '',
    practiceComplete: '',
  },

  // Adsterra Banner Script URL or Direct Ad Unit Key
  adsterraBannerKey: '',
  adsterraScriptUrl: '',

  // Which network is currently primary
  activeNetwork: 'adsense', // 'adsense' | 'adsterra'
};

export function getAdConfig() {
  try {
    const raw = localStorage.getItem(ADS_STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_AD_CONFIG, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Failed to load ad config', e);
  }
  return DEFAULT_AD_CONFIG;
}

export function saveAdConfig(config) {
  try {
    localStorage.setItem(ADS_STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save ad config', e);
  }
}
