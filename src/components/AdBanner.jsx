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

  // Sizing definitions by position
  const sizeMap = {
    header: { dims: 'w-full max-w-[728px] min-h-[90px]', label: 'Top Leaderboard (728x90 / Responsive)' },
    sidebar: { dims: 'w-full max-w-[300px] min-h-[250px]', label: 'Sidebar Rectangle (300x250)' },
    'lesson-bottom': { dims: 'w-full max-w-[728px] min-h-[90px]', label: 'Bottom Banner (728x90 / Responsive)' },
    'practice-complete': { dims: 'w-full max-w-[336px] min-h-[280px]', label: 'Result Card Banner (336x280)' },
  };

  const currentSize = sizeMap[position] || sizeMap.header;

  // Live Google AdSense Container
  if (hasAdSense) {
    const slotId = config.adsenseSlots[position] || '';
    return (
      <div className="w-full flex flex-col items-center my-3 overflow-hidden select-none">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">
          Advertisement
        </span>
        <div className={`${currentSize.dims} bg-slate-900/40 border border-slate-800 rounded-xl flex items-center justify-center p-1`}>
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '100%' }}
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
      <div className="w-full flex flex-col items-center my-3 overflow-hidden select-none">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">
          Advertisement
        </span>
        <div className={`${currentSize.dims} bg-slate-900/40 border border-slate-800 rounded-xl flex items-center justify-center p-2 text-center`}>
          <div id={`adsterra-${position}`}>
            <span className="text-xs text-slate-500">Adsterra Sponsored Unit</span>
          </div>
        </div>
      </div>
    );
  }

  // Clean, Non-Intrusive Ad Placeholder (Monetization Ready)
  return (
    <div className="w-full flex justify-center my-3 px-2 select-none">
      <div className={`${currentSize.dims} bg-slate-900/40 dark:bg-slate-900/40 light:bg-slate-100/70 border border-dashed border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 transition-all`}>
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-[10px] shrink-0 border border-indigo-500/20">
            Ad
          </div>
          <div>
            <span className="font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 block">
              {currentSize.label}
            </span>
            <p className="text-[11px] text-slate-500">
              Google AdSense & Adsterra ready placement.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenSettings}
          className="shrink-0 px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 hover:text-white border border-indigo-500/30 font-medium transition cursor-pointer text-[11px] flex items-center gap-1"
        >
          ⚙️ Setup Ads
        </button>
      </div>
    </div>
  );
}
