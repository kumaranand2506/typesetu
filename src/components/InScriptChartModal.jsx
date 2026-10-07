import React from 'react';
import { X, Printer, Download, ExternalLink, HelpCircle } from 'lucide-react';
import { KEYBOARD_ROWS, FINGER_INFO } from '../data/inscriptMap';

export default function InScriptChartModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col my-6 max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xl">
              ⌨️
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-hindi">
                हिंदी इनस्क्रिप्ट (InScript) कीबोर्ड संपूर्ण चार्ट
              </h2>
              <p className="text-xs text-slate-400">
                Official Bureau of Indian Standards (BIS) Hindi InScript Key Mapping
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* How InScript Works Info Box */}
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200 space-y-1.5 font-hindi leading-relaxed">
            <strong className="block text-sm text-white font-bold">
              💡 इनस्क्रिप्ट कीबोर्ड की वैज्ञानिक बनावट (How InScript Works):
            </strong>
            <p>
              इनस्क्रिप्ट (Indian Script) कीबोर्ड पूरी तरह से वैज्ञानिक है:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li><strong>बायाँ हाथ (Left Hand):</strong> सभी स्वर (Vowels) और मात्राएँ बाएँ हाथ की उँगलियों पर होती हैं (Q, W, E, R, T, A, S, D, F, G)।</li>
              <li><strong>दायाँ हाथ (Right Hand):</strong> सभी व्यंजन (Consonants) दाएँ हाथ की उँगलियों पर होते हैं (Y, U, I, O, P, H, J, K, L, N, M)।</li>
              <li><strong>हलंत (् - D Key):</strong> किसी अक्षर को आधा करने के लिए उस अक्षर के बाद D (्) दबाएँ (जैसे: क + ् + य = क्य)।</li>
            </ul>
          </div>

          {/* Quick Mapping Reference Table */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm font-hindi">
              कुंजी मैपिंग संदर्भ तालिका (Key Mapping Reference)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 block font-hindi border-b border-slate-800 pb-1">
                  गृह पंक्ति (Home Row)
                </span>
                <div className="grid grid-cols-2 gap-1 text-[11px] font-mono-custom">
                  <div>A = ो / ओ</div>
                  <div>S = े / ए</div>
                  <div>D = ् / अ</div>
                  <div>F = ि / इ</div>
                  <div>G = ु / उ</div>
                  <div>H = प / फ</div>
                  <div>J = र / ऱ</div>
                  <div>K = क / ख</div>
                  <div>L = त / थ</div>
                  <div>; = च / छ</div>
                  <div>' = ट / ठ</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-indigo-400 block font-hindi border-b border-slate-800 pb-1">
                  ऊपरी पंक्ति (Top Row)
                </span>
                <div className="grid grid-cols-2 gap-1 text-[11px] font-mono-custom">
                  <div>Q = ौ / औ</div>
                  <div>W = ै / ऐ</div>
                  <div>E = ा / आ</div>
                  <div>R = ी / ई</div>
                  <div>T = ू / ऊ</div>
                  <div>Y = ब / भ</div>
                  <div>U = ह / ङ</div>
                  <div>I = ग / घ</div>
                  <div>O = द / ध</div>
                  <div>P = ज / झ</div>
                  <div>[ = ड / ढ</div>
                  <div>] = ़ (नुक्ता) / ञ</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 block font-hindi border-b border-slate-800 pb-1">
                  निचली पंक्ति (Bottom Row)
                </span>
                <div className="grid grid-cols-2 gap-1 text-[11px] font-mono-custom">
                  <div>Z = ॆ / ऒ</div>
                  <div>X = ं (बिंदी) / ँ</div>
                  <div>C = म / ण</div>
                  <div>V = न / ऩ</div>
                  <div>B = व / ऴ</div>
                  <div>N = ल / ळ</div>
                  <div>M = स / श</div>
                  <div>, = , / ष</div>
                  <div>. = . / । (पूर्णविराम)</div>
                  <div>/ = य / ?</div>
                </div>
              </div>
            </div>
          </div>

          {/* Windows / Mac Setup Instructions */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <h3 className="font-bold text-white text-sm font-hindi flex items-center gap-1.5">
              <HelpCircle size={15} className="text-indigo-400" />
              विंडोज में हिंदी इनस्क्रिप्ट कीबोर्ड कैसे चालू करें? (Windows Setup Guide)
            </h3>
            <ol className="list-decimal pl-5 space-y-1 text-slate-300 font-hindi">
              <li>विंडोज <strong>Settings (सेटिंग्स)</strong> खोलें (या Windows Key + I दबाएँ)।</li>
              <li><strong>Time & Language</strong> &gt; <strong>Language & Region</strong> में जाएँ।</li>
              <li><strong>Add a language</strong> पर क्लिक करें और <strong>Hindi (हिंदी)</strong> जोड़ें।</li>
              <li>हिंदी के तीन बिंदुओं (...) पर क्लिक करके <strong>Language Options</strong> चुनें।</li>
              <li><strong>Keyboards</strong> में <strong>Add a keyboard</strong> दबाकर <strong>Hindi (InScript)</strong> जोड़ें।</li>
              <li>अब कभी भी <strong>Windows Key + Space</strong> दबाकर हिंदी और अंग्रेजी में बदल सकते हैं!</li>
            </ol>
            <p className="text-[11px] text-amber-400/90 pt-1 font-semibold">
              * ध्यान दें: हमारे ऐप में 'InScript Mapper' चालू रहने पर आपको विंडोज में कुछ भी बदलने की आवश्यकता नहीं है, आप सीधे टाइप कर सकते हैं!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-slate-800 bg-slate-950/60">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md cursor-pointer transition"
          >
            समझ गया (Got It)
          </button>
        </div>
      </div>
    </div>
  );
}
