import React, { useState } from 'react';
import { X, Shield, FileText, Info, Mail, Heart } from 'lucide-react';

export default function PolicyModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('about');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col my-6 max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xl">
              ⚖️
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                About & Legal Information
              </h2>
              <p className="text-xs text-slate-400">
                Educational Mission, Privacy Policy (AdSense Compliant) & Terms
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

        {/* Tab Strip */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 cursor-pointer ${
              activeTab === 'about'
                ? 'border-indigo-500 text-indigo-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            About Us (परिचय)
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-indigo-500 text-indigo-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 cursor-pointer ${
              activeTab === 'terms'
                ? 'border-indigo-500 text-indigo-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 cursor-pointer ${
              activeTab === 'contact'
                ? 'border-indigo-500 text-indigo-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Contact
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed">
          {activeTab === 'about' && (
            <div className="space-y-3 font-hindi">
              <h3 className="text-sm font-bold text-white">हमारा उद्देश्य (Our Mission)</h3>
              <p>
                <strong>TypeSetu (टाइपसेतु)</strong> का निर्माण उन सभी विद्यार्थियों, प्रतियोगी परीक्षार्थियों और सामान्य उपयोगकर्ताओं की सहायता के लिए किया गया है जो हिंदी और अंग्रेजी दोनों भाषाओं में द्रुत गति और उच्च सटीकता के साथ टंकण (Typing) सीखना चाहते हैं।
              </p>
              <p>
                वर्तमान में भारत सरकार और राज्य स्तरीय परीक्षाओं (जैसे MP CPCT, SSC CGL/CHSL, इलाहाबाद उच्च न्यायालय, राजस्थान उच्च न्यायालय, बिहार विधानसभा, रेलवे आदि) में <strong>कुर्ती देव ०१० (Kruti Dev 010) रेमिंगटन टाइपराइटर कीबोर्ड</strong> अनिवार्य है।
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-indigo-300 block">प्रमुख विशेषताएँ:</span>
                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                  <li><strong>पूर्णतः निःशुल्क एवं अनाम (100% Free & Anonymous):</strong> किसी भी प्रकार के पंजीकरण या व्यक्तिगत जानकारी की आवश्यकता नहीं है।</li>
                  <li><strong>द्विभाषी एकीकरण (Bilingual):</strong> एक ही मंच पर हिंदी कुर्ती देव ०१० एवं अंग्रेजी दोनों का संपूर्ण पाठ्यक्रम।</li>
                  <li><strong>साहित्यिक अभ्यास (TypeLit Style):</strong> मुंशी प्रेमचंद, पंचतंत्र एवं विश्व साहित्य का आनंद लेते हुए टाइपिंग में पारंगत बनें।</li>
                  <li><strong>दस उँगलियों का प्रशिक्षण:</strong> वास्तविक समय में कौन-सी उँगली से कौन-सी कुंजी दबानी है, इसका सजीव मार्गदर्शन।</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">Privacy Policy for TypeSetu</h3>
              <p>
                At TypeSetu, accessible from your domain, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by TypeSetu and how we use it.
              </p>
              <h4 className="font-bold text-slate-200">1. Anonymous Usage & Local Storage</h4>
              <p>
                We do NOT require user account creation, logins, passwords, or personal identifying information. All your lesson progress, high scores, accuracy statistics, and unlocked badges are stored locally inside your browser's <code>localStorage</code>. This data never leaves your computer or device.
              </p>
              <h4 className="font-bold text-slate-200">2. Cookies and Web Beacons (Google AdSense & Third-Party Vendors)</h4>
              <p>
                Like any other website, TypeSetu uses 'cookies' to serve advertisements. Google, as a third-party vendor, uses cookies to serve ads on TypeSetu based on users' visits to this and other websites. Users may opt out of personalized advertising by visiting Google Ad Settings (<a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-indigo-400 underline">google.com/settings/ads</a>).
              </p>
              <h4 className="font-bold text-slate-200">3. CCPA & GDPR Privacy Rights</h4>
              <p>
                Because TypeSetu does not collect, sell, or store your personal identity or personal data on remote servers, your right to privacy is completely respected by design. You can reset or wipe all saved local progress at any time using the in-app "Reset" button.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">Terms of Service</h3>
              <p>
                By accessing this website, you agree to be bound by these Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
              </p>
              <h4 className="font-bold text-slate-200">Educational Use</h4>
              <p>
                TypeSetu provides educational software tools and typing drills free of charge. The literature passages used for practice include classic public-domain literary works and educational quotes reproduced for fair use and educational improvement.
              </p>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-3 font-hindi">
              <h3 className="text-sm font-bold text-white">संपर्क एवं सुझाव (Contact Us)</h3>
              <p>
                यदि आपके पास TypeSetu के संबंध में कोई प्रश्न, सुझाव या सुधार के लिए विचार हैं, तो कृपया हमसे संपर्क करें:
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-200 font-mono">
                  <Mail size={14} className="text-indigo-400" />
                  <span>support@typesetu.app / contact.typesetu@gmail.com</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  प्रतिक्रिया समय: 24-48 कार्य घंटे।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-slate-800 bg-slate-950/60">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
