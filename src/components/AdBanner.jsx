import React, { useEffect, useState } from 'react';
import { getAdConfig } from '../data/adConfig';

function Adsterra728x90({ bannerKey = 'baa681aa9f1b8413e4f557ee3107cc9b' }) {
  const adHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      atOptions = {
        'key' : '${bannerKey}',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="https://reelparentaltrembling.com/${bannerKey}/invoke.js"></script>
  </body>
</html>`;

  return (
    <iframe
      title="Adsterra 728x90 Banner"
      width="728"
      height="90"
      className="border-0 overflow-hidden max-w-full rounded-lg"
      style={{
        border: 'none',
        overflow: 'hidden',
        width: '728px',
        height: '90px',
        maxWidth: '100%',
        minHeight: '90px',
      }}
      srcDoc={adHtml}
    />
  );
}

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
  const hasAdsterra = config.isProduction && config.activeNetwork === 'adsterra';

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
    const key = config.adsterraBannerKey || 'baa681aa9f1b8413e4f557ee3107cc9b';
    return (
      <div className="w-full flex flex-col items-center my-3 overflow-hidden select-none">
        <div className="w-full max-w-[728px] flex items-center justify-between px-1 mb-1">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
            Sponsored / Advertisement
          </span>
        </div>
        <div className="w-full max-w-[728px] min-h-[94px] bg-slate-900/40 border border-slate-800 rounded-xl flex items-center justify-center p-0.5 overflow-hidden shadow-sm">
          <Adsterra728x90 bannerKey={key} />
        </div>
      </div>
    );
  }

  // When no ad network is active, return null to maintain clean distraction-free UI
  return null;
}
