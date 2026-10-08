import React from 'react';
import { X, HelpCircle, ShieldCheck } from 'lucide-react';

export default function KrutiDevChartModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col my-6 max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl">
              ⌨️
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-hindi">
                हिंदी कुर्ती देव ०१० (Kruti Dev 010) रेमिंगटन संपूर्ण चार्ट
              </h2>
              <p className="text-xs text-slate-400">
                Official CPCT, High Court & SSC Remington Gail / Kruti Dev 010 Reference
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
          {/* How Kruti Dev 010 Works Info Box */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 space-y-1.5 font-hindi leading-relaxed">
            <strong className="block text-sm text-white font-bold flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-400" />
              💡 कुर्ती देव ०१० टाइपराइटर के मुख्य नियम (Core Rules):
            </strong>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>
                <strong>छोटी 'ि' की मात्रा नियम:</strong> 'ि' (F Key) हमेशा संबंधित व्यंजन से <em>पहले</em> दबाई जाती है (उदा: 'कि' टाइप करने हेतु पहले <code>f</code> दबाएँ, फिर <code>d</code> दबाएँ)।
              </li>
              <li>
                <strong>आधे अक्षर एवं संयुक्ताक्षर:</strong> Shift दबाकर सीधे आधे अक्षर टाइप होते हैं (उदा: <code>D</code> = क्, <code>E</code> = म्, <code>R</code> = त्, <code>L</code> = स्, <code>K</code> = ज्ञ, <code>J</code> = श्र, <code>{'{'}</code> = क्ष, <code>{'}'}</code> = द्व)।
              </li>
              <li>
                <strong>रेफ़ ('र्' ऊपर) नियम:</strong> <code>Z</code> (Shift + z) से व्यंजन के ऊपर रेफ़ लगता है (उदा: 'धर्म' = <code>/</code> [ध] + <code>e</code> [म] + <code>Z</code> [र्])।
              </li>
              <li>
                <strong>रा-फलन ('्र' नीचे) नियम:</strong> <code>z</code> दबाने पर अक्षर के पैर में '्र' लगता है (उदा: 'क्रम' = <code>d</code> [क] + <code>z</code> [्र] + <code>e</code> [म])।
              </li>
            </ul>
          </div>

          {/* Quick Mapping Reference Table */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm font-hindi">
              कुंजी मैपिंग संदर्भ तालिका (Key Mapping Reference: Normal / Shift)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              {/* Home Row */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 block font-hindi border-b border-slate-800 pb-1">
                  गृह पंक्ति (Home Row: ASDF JKL;)
                </span>
                <div className="grid grid-cols-2 gap-1 text-[11px] font-mono-custom">
                  <div>A = ं / । (विराम)</div>
                  <div>S = े / ै</div>
                  <div>D = क / क् (आधा)</div>
                  <div>F = ि (छोटी ई) / थ</div>
                  <div>G = ह / भ</div>
                  <div>H = ी / भ्</div>
                  <div>J = र / श्र</div>
                  <div>K = ा / ज्ञ</div>
                  <div>L = स / स्</div>
                  <div>; = य / रू</div>
                  <div>' = श / ष्</div>
                </div>
              </div>

              {/* Top Row */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-indigo-400 block font-hindi border-b border-slate-800 pb-1">
                  ऊपरी पंक्ति (Top Row: QWERTY)
                </span>
                <div className="grid grid-cols-2 gap-1 text-[11px] font-mono-custom">
                  <div>Q = ु / फ</div>
                  <div>W = ू / ॅ</div>
                  <div>E = म / म्</div>
                  <div>R = त / त्</div>
                  <div>T = ज / ज्</div>
                  <div>Y = ल / ल्</div>
                  <div>U = न / न्</div>
                  <div>I = प / प्</div>
                  <div>O = व / व्</div>
                  <div>P = च / च्</div>
                  <div>[ = ख / क्ष</div>
                  <div>] = , / द्व</div>
                  <div>\ = . / द्य</div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 block font-hindi border-b border-slate-800 pb-1">
                  निचली पंक्ति (Bottom Row: ZXCVBNM)
                </span>
                <div className="grid grid-cols-2 gap-1 text-[11px] font-mono-custom">
                  <div>Z = ्र / र् (रेफ़)</div>
                  <div>X = ग / ग्</div>
                  <div>C = ब / ब्</div>
                  <div>V = अ / ट</div>
                  <div>B = इ / ठ</div>
                  <div>N = द / ड</div>
                  <div>M = उ / ढ</div>
                  <div>, = ए / ृ</div>
                  <div>. = ् / ड़</div>
                  <div>/ = ध / ध्</div>
                </div>
              </div>
            </div>
          </div>

          {/* Exam Prep Tip */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <h3 className="font-bold text-white text-sm font-hindi flex items-center gap-1.5">
              <HelpCircle size={15} className="text-amber-400" />
              शासकीय परीक्षा तैयारी टिप्स (CPCT & High Court Exam Advice)
            </h3>
            <p className="text-slate-300 font-hindi leading-relaxed">
              मध्य प्रदेश CPCT, राजस्थान हाईकोर्ट, UPPSC एवं SSC LDC परीक्षाओं में कुर्ती देव ०१० (Kruti Dev 010) रेमिंगटन टाइपराइटर लेआउट अनिवार्य होता है। टाइपसेतु (TypeSetu) में इनबिल्ट मैपर सक्रिय रहता है, इसलिए आपको किसी अतिरिक्त सॉफ्टवेयर या फॉन्ट इंस्टालेशन की आवश्यकता नहीं है।
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-slate-800 bg-slate-950/60">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-md cursor-pointer transition"
          >
            समझ गया (Got It)
          </button>
        </div>
      </div>
    </div>
  );
}
