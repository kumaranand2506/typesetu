import React, { useState } from 'react';
import { getAdConfig, saveAdConfig } from '../data/adConfig';
import { X, CheckCircle, ExternalLink, ShieldAlert, Sparkles, Copy, Globe, DollarSign } from 'lucide-react';

export default function AdSettingsModal({ isOpen, onClose }) {
  const [config, setConfig] = useState(getAdConfig());
  const [activeTab, setActiveTab] = useState('adsense'); // 'adsense' | 'adsterra' | 'domain' | 'adstxt'
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedTxt, setCopiedTxt] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    saveAdConfig(config);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const adsTxtContent = config.googleAdsenseClientId
    ? `google.com, ${config.googleAdsenseClientId.replace('ca-', '')}, DIRECT, f08c47fec0942fa0`
    : `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`;

  const copyAdsTxt = () => {
    navigator.clipboard.writeText(adsTxtContent);
    setCopiedTxt(true);
    setTimeout(() => setCopiedTxt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col my-8 max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl">
              💰
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Monetization & Free Domain Guide
              </h2>
              <p className="text-xs text-slate-400">
                Setup Google AdSense, Adsterra & Deploy on a free domain
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('adsense')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 cursor-pointer ${
              activeTab === 'adsense'
                ? 'border-indigo-500 text-indigo-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Google AdSense
          </button>
          <button
            onClick={() => setActiveTab('adsterra')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 cursor-pointer ${
              activeTab === 'adsterra'
                ? 'border-indigo-500 text-indigo-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Adsterra ($0 Budget Friendly)
          </button>
          <button
            onClick={() => setActiveTab('domain')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 cursor-pointer ${
              activeTab === 'domain'
                ? 'border-indigo-500 text-indigo-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Free Hosting & Domains
          </button>
          <button
            onClick={() => setActiveTab('adstxt')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 cursor-pointer ${
              activeTab === 'adstxt'
                ? 'border-indigo-500 text-indigo-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            ads.txt Generator
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* ADSENSE TAB */}
          {activeTab === 'adsense' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs flex gap-3">
                <ShieldAlert size={20} className="shrink-0 text-amber-400" />
                <div>
                  <strong className="block font-semibold mb-0.5">Important for Google AdSense:</strong>
                  Google AdSense requires a <strong>top-level custom domain</strong> (like <code>yourname.in</code> or <code>.com</code>). They generally do not approve free subdomains (like <code>.vercel.app</code>). If you want 100% $0 spending on domains, check the <strong>Adsterra</strong> tab!
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div>
                  <span className="font-semibold text-white block">Ad Mode Active</span>
                  <span className="text-xs text-slate-400">Enable real ad units instead of placeholders</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.isProduction}
                    onChange={(e) => setConfig({ ...config, isProduction: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Google AdSense Publisher ID (Client ID)
                </label>
                <input
                  type="text"
                  placeholder="ca-pub-1234567890123456"
                  value={config.googleAdsenseClientId}
                  onChange={(e) => setConfig({ ...config, googleAdsenseClientId: e.target.value, activeNetwork: 'adsense' })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Find this in AdSense Dashboard &gt; Account &gt; Settings &gt; Publisher ID.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Header Banner Slot ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1234567890"
                    value={config.adsenseSlots.headerBanner}
                    onChange={(e) => setConfig({
                      ...config,
                      adsenseSlots: { ...config.adsenseSlots, headerBanner: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Post-Test Card Slot ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 9876543210"
                    value={config.adsenseSlots.practiceComplete}
                    onChange={(e) => setConfig({
                      ...config,
                      adsenseSlots: { ...config.adsenseSlots, practiceComplete: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2 text-xs">
                <span className="font-semibold text-slate-200">✅ How we optimized TypeSetu for 100% AdSense Approval:</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-400">
                  <li>Included comprehensive Privacy Policy, Terms of Service, and About pages.</li>
                  <li>Over 25 high-value lessons and classic literature passages in Hindi and English.</li>
                  <li>Responsive, fast static layout (100/100 Google Core Web Vitals).</li>
                  <li>InScript educational keyboard guide providing clear user utility.</li>
                </ul>
              </div>
            </div>
          )}

          {/* ADSTERRA TAB */}
          {activeTab === 'adsterra' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs flex gap-3">
                <Sparkles size={20} className="shrink-0 text-emerald-400" />
                <div>
                  <strong className="block font-semibold mb-0.5">Why Adsterra is Great for $0 Budget:</strong>
                  Adsterra approves websites within <strong>10 minutes</strong>. You do NOT need to buy a custom domain — it works directly on your free <code>your-site.vercel.app</code> or <code>.pages.dev</code> URL! No traffic minimums, instant payout options.
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Adsterra Banner Unit Key / Script Code
                </label>
                <textarea
                  rows={3}
                  placeholder="Paste your Adsterra 728x90 or Social Bar script snippet here"
                  value={config.adsterraBannerKey}
                  onChange={(e) => setConfig({ ...config, adsterraBannerKey: e.target.value, activeNetwork: 'adsterra' })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-xs space-y-2">
                <span className="font-semibold text-slate-200">Steps to get Adsterra ads running for free:</span>
                <ol className="list-decimal pl-4 space-y-1 text-slate-400">
                  <li>Create a free publisher account at <a href="https://adsterra.com" target="_blank" rel="noreferrer" className="text-indigo-400 underline">adsterra.com</a>.</li>
                  <li>Click <strong>Add Website</strong> and paste your free Vercel URL (e.g. <code>https://typesetu.vercel.app</code>).</li>
                  <li>Select Banner unit (728x90 or 300x250) or Native Banners.</li>
                  <li>Copy the provided code and paste it into this box, then click Save.</li>
                </ol>
              </div>
            </div>
          )}

          {/* FREE DOMAIN & DEPLOYMENT TAB */}
          {activeTab === 'domain' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-xs">
                <strong className="block font-semibold mb-1">100% Free Hosting (Forever, Zero Server Cost):</strong>
                Because this application is a high-performance static React app, you will never pay a single rupee for web hosting, databases, or bandwidth.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    ▲ Vercel (Recommended)
                  </span>
                  <p className="text-slate-400">
                    Gives free <code>yourproject.vercel.app</code> with free automatic SSL, worldwide CDN, and instant git deployments.
                  </p>
                  <span className="text-emerald-400 font-semibold block">Cost: ₹0 / $0 Forever</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    ☁️ Cloudflare Pages
                  </span>
                  <p className="text-slate-400">
                    Gives free <code>yourproject.pages.dev</code> with unlimited bandwidth, lightning-fast edge routing, and free SSL.
                  </p>
                  <span className="text-emerald-400 font-semibold block">Cost: ₹0 / $0 Forever</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2 text-xs">
                <span className="font-semibold text-slate-200">How to attach a custom domain (Optional, for AdSense):</span>
                <p className="text-slate-400">
                  If you purchase a low-cost domain (e.g. <code>.in</code> for ~₹399/year or <code>.online</code> for ~₹150):
                </p>
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                  <div>Type: <strong>CNAME</strong> | Name: <strong>@ / www</strong></div>
                  <div>Value: <strong>cname.vercel-dns.com</strong> (for Vercel)</div>
                </div>
                <p className="text-[11px] text-slate-500">
                  Vercel automatically provisions the HTTPS SSL certificate within 2 minutes.
                </p>
              </div>
            </div>
          )}

          {/* ADS.TXT TAB */}
          {activeTab === 'adstxt' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Google AdSense requires an <code>ads.txt</code> file in your website's root folder. We've placed this in your <code>/public/ads.txt</code> folder.
              </p>

              <div className="relative">
                <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-indigo-300 font-mono text-xs overflow-x-auto">
                  {adsTxtContent}
                </pre>
                <button
                  onClick={copyAdsTxt}
                  className="absolute top-2 right-2 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 cursor-pointer transition"
                >
                  {copiedTxt ? <CheckCircle size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  {copiedTxt ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/60">
          <div className="text-xs text-slate-400">
            {savedSuccess && (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle size={14} /> Settings Saved Successfully!
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 cursor-pointer transition"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
