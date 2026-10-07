import React, { useEffect, useState } from 'react';
import { getAdConfig } from '../data/adConfig';

export default function AdBanner({ position = 'header', onOpenSettings }) {
  const [config, setConfig] = useState(getAdConfig());

  useEffect(() => {
    const handleStorage = () => {
      setConfig(getAdConfig());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const hasAdSense = config.isProduction && config.googleAdsenseClientId && config.activeNetwork === 'adsense';
  const hasAdsterra = config.isProduction && (config.adsterraBannerKey || config.adsterraScriptUrl) && config.activeNetwork === 'adsterra';

  // Live Google AdSense Container
  if (hasAdSense) {
    const slotId = config.adsenseSlots[position] || '';
    return (
      <div className="w-full flex justify-center my-3 overflow-hidden">
        <div className="w-full max-w-4xl min-h-[90px] bg-slate-900/40 border border-slate-800 rounded-xl flex items-center justify-center p-1">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', minHeight: '90px' }}
            data-ad-client={config.googleAdsenseClientId}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    );
  }

  // Live Adsterra Container
  if (hasAdsterra) {
    return (
      <div className="w-full flex justify-center my-3 overflow-hidden">
        <div className="w-full max-w-4xl min-h-[90px] bg-slate-900/40 border border-slate-800 rounded-xl flex items-center justify-center p-2">
          <div id={`adsterra-${position}`} className="text-center">
            {/* Adsterra container */}
            <span className="text-xs text-slate-500">Advertisement</span>
          </div>
        </div>
      </div>
    );
  }

  // Fallback Placeholder with Direct Setup Helper
  return (
    <div className="w-full max-w-4xl mx-auto my-3 px-2">
      <div className="bg-gradient-to-r from-slate-900/90 via-indigo-950/30 to-slate-900/90 border border-dashed border-indigo-500/30 hover:border-indigo-400/60 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 transition-all shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0 border border-indigo-500/30">
            Ad
          </div>
          <div>
            <span className="font-semibold text-slate-200">
              Monetization Slot ({position === 'header' ? 'Header 728x90' : position === 'lesson-bottom' ? 'In-Lesson Banner' : 'Post-Test Card'})
            </span>
            <p className="text-[11px] text-slate-400">
              Google AdSense & Adsterra ready. Place your IDs to start earning from typing traffic.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenSettings}
          className="shrink-0 px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 hover:text-white border border-indigo-500/40 font-medium transition cursor-pointer text-[11px] flex items-center gap-1.5"
        >
          ⚙️ Setup Ads & Domain
        </button>
      </div>
    </div>
  );
}
