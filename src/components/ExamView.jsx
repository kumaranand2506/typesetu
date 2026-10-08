import React, { useState, useEffect, useRef } from 'react';
import { useTypingEngine } from '../hooks/useTypingEngine';
import IntegratedKeyboardHands from './IntegratedKeyboardHands';
import RollingTextDisplay from './RollingTextDisplay';
import AdBanner from './AdBanner';
import {
  Shield,
  Clock,
  Award,
  AlertTriangle,
  RotateCcw,
  CheckCircle,
  FileText,
  Sliders,
  ChevronRight,
  Maximize2,
  Check,
  X,
  Keyboard,
  Building,
  Scale
} from 'lucide-react';

const EXAM_PRESETS = [
  {
    id: 'cpct-hindi',
    name: 'MP CPCT Exam (हिंदी Kruti Dev 010)',
    language: 'hindi',
    durationMinutes: 15,
    cutoffNetWpm: 20,
    maxErrorPercent: 10,
    backspaceRule: 'currentWord', // CPCT restricts backspacing beyond current word
    title: 'म.प्र. शासन सीपीटी परीक्षा प्रारूप',
    description: '15 मिनट आधिकारिक कुर्ती देव ०१० रेमिंगटन मानक। उत्तीर्ण अंक: न्यूनतम 20 शुद्ध शब्द/मिनट (Net WPM)।',
  },
  {
    id: 'ssc-dest',
    name: 'SSC CGL / CHSL DEST (English)',
    language: 'english',
    durationMinutes: 10,
    cutoffNetWpm: 35,
    maxErrorPercent: 7,
    backspaceRule: 'allowed',
    title: 'Staff Selection Commission DEST Mock',
    description: '10 Minutes Official Data Entry Skill Test. Qualifying speed: 35 WPM (1750 key depressions in 10 min).',
  },
  {
    id: 'court-exam-hindi',
    name: 'High Court / District Court (हिंदी Kruti Dev 010)',
    language: 'hindi',
    durationMinutes: 5,
    cutoffNetWpm: 30,
    maxErrorPercent: 5,
    backspaceRule: 'disabled', // Strict court exams often lock backspace
    title: 'उच्च न्यायालय कनिष्ठ न्यायिक सहायक प्रारूप',
    description: '5 मिनट कठोर परीक्षा। बैकस्पेस पूर्णतः प्रतिबंधित (कुर्ती देव ०१०)। उत्तीर्ण मानक: 30 Net WPM।',
  },
  {
    id: 'court-exam-eng',
    name: 'High Court Judicial Assistant (English)',
    language: 'english',
    durationMinutes: 5,
    cutoffNetWpm: 35,
    maxErrorPercent: 5,
    backspaceRule: 'disabled',
    title: 'High Court Judicial Assistant Test',
    description: '5 Minutes Strict Examination. Backspace disabled. Qualifying standard: 35 Net WPM.',
  },
  {
    id: 'custom-exam',
    name: 'Custom Government Exam Mock',
    language: 'both',
    durationMinutes: 10,
    cutoffNetWpm: 30,
    maxErrorPercent: 7,
    backspaceRule: 'allowed',
    title: 'Custom Configured Typing Test',
    description: 'अभ्यर्थी अपनी सुविधा अनुसार समय (5/10/15 min) और बैकस्पेस नियम चुन सकते हैं।',
  },
];

const OFFICIAL_EXAM_PASSAGES = {
  hindi: [
    {
      id: 'hi-court-judgment',
      title: 'उच्च न्यायालय निर्णय प्रारूप: त्वरित न्याय का अधिकार',
      category: 'न्यायालय निर्णय (Court Judgment)',
      text: 'न्यायालय के समक्ष प्रस्तुत मामले में मुख्य विचारणीय प्रश्न यह था कि क्या त्वरित विचारण का अधिकार भारतीय संविधान के अनुच्छेद इक्कीस के अंतर्गत एक मौलिक अधिकार है । विद्वान न्यायमूर्ति ने अपने निर्णय में स्पष्ट किया कि न्याय में विलंब वस्तुतः न्याय से वंचित करने के समान है । किसी भी अभियुक्त को बिना ठोस प्रमाण के दीर्घकाल तक विचाराधीन बंदी बनाकर नहीं रखा जा सकता । राज्य का यह संवैधानिक दायित्व है कि वह प्रत्येक नागरिक को निष्पक्ष, पारदर्शी और समयबद्ध न्याय उपलब्ध कराने के लिए पर्याप्त न्यायिक अवसंरचना का प्रबंध करे । यदि अभियोजन पक्ष उचित समय सीमा के भीतर साक्ष्य प्रस्तुत करने में असमर्थ रहता है, तो न्यायालय अभियुक्त को जमानत पर रिहा करने का आदेश दे सकता है । इस सिद्धांत की पुष्टि सर्वोच्च न्यायालय के अनेक पूर्व निर्णयों में भी की जा चुकी है । अतः वर्तमान याचिका स्वीकार की जाती है और संबंधित अधीनस्थ न्यायालय को निर्देशित किया जाता है कि वह छह माह के भीतर इस वाद का अंतिम निस्तारण सुनिश्चित करे ।',
    },
    {
      id: 'hi-admin-circular',
      title: 'मध्य प्रदेश शासन सामान्य प्रशासन विभाग: ई-गवर्नेंस एवं नागरिक सेवाएँ',
      category: 'प्रशासनिक परिपत्र (Govt Circular)',
      text: 'मध्य प्रदेश शासन के समस्त विभागों को निर्देशित किया जाता है कि वे लोक सेवाओं के प्रदाय की गारंटी अधिनियम के अंतर्गत आने वाली सभी नागरिक सेवाओं को पूर्णतः ऑनलाइन पोर्टल से संबद्ध करें । नागरिकों को शासकीय कार्यालयों के अनावश्यक चक्कर लगाने से मुक्त करने के उद्देश्य से एकल खिड़की प्रणाली लागू की गई है । प्रमाण पत्र, भू-अभिलेख की प्रतिलिपि तथा अन्य आवश्यक दस्तावेज निर्धारित समय सीमा के भीतर डिजिटल रूप से हस्ताक्षरित प्रारूप में उपलब्ध कराए जाने चाहिए । यदि किसी स्तर पर बिना किसी वैध कारण के आवेदन लंबित पाया जाता है, तो संबंधित नोडल अधिकारी के विरुद्ध नियमानुसार अनुशासनात्मक कार्रवाई की जाएगी । सभी संभागीय आयुक्त एवं जिला कलेक्टर इस व्यवस्था के सतत अनुश्रवण हेतु पाक्षिक समीक्षा बैठकें आयोजित करेंगे । सूचना प्रौद्योगिकी का प्रभावी उपयोग ही सुशासन की वास्तविक कसौटी है ।',
    },
    {
      id: 'hi-economic-policy',
      title: 'राष्ट्रीय अर्थव्यवस्था: आत्मनिर्भर भारत एवं डिजिटल भुगतान क्रांति',
      category: 'आर्थिक नीति (Economic Policy)',
      text: 'भारतीय अर्थव्यवस्था ने विगत दशकों में तीव्र गति से आत्मनिर्भरता और तकनीकी नवाचार की दिशा में अभूतपूर्व प्रगति की है । एकीकृत भुगतान इंटरफेस अर्थात यूपीआई ने देश के दूरदराज के ग्रामीण अंचलों तक डिजिटल लेन-देन को सहज और सुरक्षित बना दिया है । वित्तीय समावेशन के इस युग में छोटे व्यापारी और कृषक भी आधुनिक बैंकिंग प्रणाली से सीधे लाभान्वित हो रहे हैं । प्रत्यक्ष लाभ अंतरण योजना के माध्यम से शासकीय अनुदान की शत-प्रतिशत राशि सीधे लाभार्थियों के बैंक खातों में स्थानांतरित की जा रही है, जिससे बिचौलियों की भूमिका समाप्त हो गई है । उत्पादन आधारित प्रोत्साहन योजनाओं ने घरेलू विनिर्माण उद्योग को वैश्विक प्रतिस्पर्धा में अग्रणी स्थान दिलाने में महत्वपूर्ण भूमिका निभाई है ।',
    },
  ],
  english: [
    {
      id: 'en-court-judgment',
      title: 'Supreme Court Ruling: Fundamental Right to Privacy and Data Protection',
      category: 'Court Judgment',
      text: 'The nine-judge Constitution Bench of the Supreme Court of India unanimously held that the right to privacy is an intrinsic part of the right to life and personal liberty guaranteed under Article 21 of the Constitution. The Court observed that privacy encompasses personal autonomy, bodily integrity, and informational self-determination. In an era dominated by rapid digital transformation, technological surveillance cannot be permitted to encroach upon individual liberty without clear sanction of law. Any state measure that restricts privacy must satisfy the rigorous threefold test of legality, necessity, and proportionality. Consequently, legislative safeguards must be instituted to protect citizen data from unauthorized extraction or arbitrary commercial exploitation.',
    },
    {
      id: 'en-admin-policy',
      title: 'Ministry of Personnel: Public Service Delivery and Citizen-Centric Governance',
      category: 'Administrative Policy',
      text: 'Effective public governance fundamentally depends upon responsiveness, accountability, and seamless citizen interface across all administrative echelons. The Government has prioritized mission-mode digital portals to ensure that public welfare benefits reach eligible households without leakage or bureaucratic friction. Key performance indicators must be systematically recorded to assess civil servant efficiency and institutional responsiveness. Redressal of public grievances must be completed within thirty working days, accompanied by reasoned speaking orders. Civil servants are expected to discharge their statutory functions with unyielding integrity, objective neutrality, and complete fidelity to constitutional mandates.',
    },
    {
      id: 'en-economic-development',
      title: 'Economic Survey: Infrastructure Modernization and Sustainable Urban Growth',
      category: 'Economic Survey',
      text: 'Accelerating sustainable capital expenditure remains the cornerstone of modern economic development across emerging markets. Multi-modal logistics corridors, high-speed rail networks, and clean renewable energy installations contribute significantly toward enhancing industrial competitiveness and generating productive employment. Urban municipalities must incorporate green zoning laws, intelligent traffic management systems, and decentralized wastewater treatment facilities to mitigate climate change risks while simultaneously fostering entrepreneurial innovation.',
    },
  ],
};

export default function ExamView({
  language = 'hindi',
  userStats = {},
  onUpdateStats = null,
  onUnlockBadge = null,
  onOpenAdSettings = null,
  onToggleFocusMode = null,
  isFocusMode = false,
}) {
  const [selectedPresetId, setSelectedPresetId] = useState(
    language === 'hindi' ? 'cpct-hindi' : 'ssc-dest'
  );
  const [customMinutes, setCustomMinutes] = useState(10);
  const [backspaceRule, setBackspaceRule] = useState('currentWord');
  const [isExamRunning, setIsExamRunning] = useState(false);
  const [selectedPassageId, setSelectedPassageId] = useState(
    language === 'hindi' ? 'hi-court-judgment' : 'en-court-judgment'
  );
  const [customText, setCustomText] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [examResult, setExamResult] = useState(null);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  const containerRef = useRef(null);

  const currentPreset = EXAM_PRESETS.find((p) => p.id === selectedPresetId) || EXAM_PRESETS[0];
  const examLang = currentPreset.language === 'both' ? language : currentPreset.language;

  // Find passage
  const passageList = OFFICIAL_EXAM_PASSAGES[examLang] || OFFICIAL_EXAM_PASSAGES.hindi;
  let activePassage = passageList.find((p) => p.id === selectedPassageId) || passageList[0];
  if (selectedPassageId === 'custom' && customText.trim()) {
    activePassage = {
      id: 'custom',
      title: 'Custom Imported Examination Text',
      category: 'Custom Excerpt',
      text: customText.trim(),
    };
  }

  const durationSeconds = (currentPreset.id === 'custom-exam' ? customMinutes : currentPreset.durationMinutes) * 60;

  const handleExamComplete = (stats) => {
    setIsExamRunning(false);
    setShowConfirmSubmit(false);

    const preset = EXAM_PRESETS.find((p) => p.id === selectedPresetId) || EXAM_PRESETS[0];
    const isQualified =
      stats.netWpm >= preset.cutoffNetWpm &&
      (100 - stats.accuracy) <= preset.maxErrorPercent;

    const result = {
      ...stats,
      examPreset: preset,
      isQualified,
      targetCutoff: preset.cutoffNetWpm,
      maxAllowedError: preset.maxErrorPercent,
      errorRate: Math.max(0, 100 - stats.accuracy),
    };

    setExamResult(result);

    if (onUpdateStats) {
      const updatedStats = {
        ...userStats,
        highestWpm: Math.max(userStats.highestWpm || 0, stats.netWpm),
        totalWordsTyped: (userStats.totalWordsTyped || 0) + Math.round(stats.charactersTyped / 5),
      };
      if (isQualified && onUnlockBadge) {
        onUnlockBadge('govt-exam-passed');
      }
      onUpdateStats(updatedStats);
    }
  };

  const {
    typedIndex,
    history,
    mistakes,
    isCompleted,
    currentWpm,
    currentGrossWpm,
    currentAccuracy,
    remainingSeconds,
    targetKeyInfo,
    lastPressedPhysicalKey,
    handleKeyDown,
    hiddenInputRef,
    focusInput,
    strictError,
    errorMode,
    setErrorMode,
    submitExam,
    progressPercent,
  } = useTypingEngine({
    targetText: activePassage?.text || '',
    language: examLang,
    inputMode: 'mapper',
    initialErrorMode: 'casual',
    backspaceRule: currentPreset.id === 'custom-exam' ? backspaceRule : currentPreset.backspaceRule,
    timeLimitSeconds: isExamRunning ? durationSeconds : null,
    onComplete: handleExamComplete,
  });

  // Start exam test
  const handleStartExam = () => {
    setExamResult(null);
    setIsExamRunning(true);
    setTimeout(() => {
      if (hiddenInputRef.current) {
        hiddenInputRef.current.focus({ preventScroll: true });
      }
    }, 100);
  };

  // Format seconds to MM:SS
  const formatTime = (secs) => {
    if (secs === null || secs === undefined) return '00:00';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const isHindiMode = examLang === 'hindi';

  // ==========================================
  // VIEW: EXAM CONFIGURATION & SELECTION LOBBY
  // ==========================================
  if (!isExamRunning && !examResult) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6 select-none">
        {/* Lobby Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/20">
              <Shield size={14} /> Official Govt Exam Simulator
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {isHindiMode ? 'शासकीय परीक्षा टाइपिंग सिमुलेटर' : 'Government Typing Exam Simulation'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-hindi">
              {isHindiMode
                ? 'मध्य प्रदेश CPCT (कुर्ती देव ०१०), SSC CGL/CHSL DEST, एवं उच्च न्यायालय स्टेनो/सहायक परीक्षा के हूबहू वास्तविक मानकों पर आधारित।'
                : 'Full-fledged exam simulation adhering to official CPCT Kruti Dev 010, SSC DEST, and High Court backspace guidelines.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onToggleFocusMode && (
              <button
                type="button"
                onClick={onToggleFocusMode}
                className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Maximize2 size={14} />
                <span>Focus Mode</span>
              </button>
            )}
            <button
              onClick={() => setShowCustomModal(true)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/30 text-indigo-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <FileText size={14} />
              <span>{isHindiMode ? '+ अपना प्रारूप जोड़ें' : '+ Import Custom Text'}</span>
            </button>
          </div>
        </div>

        {/* 4 Official Preset Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXAM_PRESETS.filter(p => p.id !== 'custom-exam').map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/20 ring-2 ring-indigo-500/40'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      preset.language === 'hindi'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}>
                      {preset.language === 'hindi' ? 'हिंदी Kruti Dev 010' : 'English QWERTY'}
                    </span>
                    <span className="text-xs font-bold text-slate-400 font-mono">
                      ⏱️ {preset.durationMinutes} Min
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-sm leading-snug">
                    {preset.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed font-hindi">
                    {preset.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-emerald-400 font-semibold font-mono">
                    🎯 {preset.cutoffNetWpm} Net WPM
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    preset.backspaceRule === 'disabled'
                      ? 'bg-rose-500/20 text-rose-300'
                      : preset.backspaceRule === 'currentWord'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {preset.backspaceRule === 'disabled' ? 'Backspace Off' : preset.backspaceRule === 'currentWord' ? 'Word Lock' : 'Backspace On'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Preset Details & Passage Selector */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-sm space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                Selected Examination Standard
              </span>
              <h2 className="text-xl font-black text-white mt-0.5">
                {currentPreset.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
                <span className="text-slate-500 mr-1.5">Timer:</span>
                <strong className="text-white font-mono">{currentPreset.durationMinutes} Minutes</strong>
              </div>
              <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
                <span className="text-slate-500 mr-1.5">Qualifying Speed:</span>
                <strong className="text-emerald-400 font-mono">{currentPreset.cutoffNetWpm} Net WPM</strong>
              </div>
              <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
                <span className="text-slate-500 mr-1.5">Backspace Rule:</span>
                <strong className="text-amber-400">
                  {currentPreset.backspaceRule === 'disabled'
                    ? 'Strictly Disabled (Court Standard)'
                    : currentPreset.backspaceRule === 'currentWord'
                    ? 'Current Word Only (CPCT/SSC)'
                    : 'Allowed'}
                </strong>
              </div>
            </div>
          </div>

          {/* Passage Selection */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 block">
              {isHindiMode ? 'परीक्षा अनुच्छेद चुनें (Choose Exam Passage):' : 'Choose Examination Passage:'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {passageList.map((p) => {
                const isSelected = selectedPassageId === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPassageId(p.id)}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer text-left ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 shadow-md'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                      {p.category}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-1 font-hindi">
                      {p.title}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Start Exam Action CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 font-hindi">
              {isHindiMode
                ? '⚠️ परीक्षा प्रारंभ होने पर टाइमर उल्टी गिनती शुरू करेगा। सभी दिशानिर्देशों का पालन करें।'
                : '⚠️ Exam timer will commence immediately upon your first keystroke. Maintain accuracy to prevent penalty deductions.'}
            </p>

            <button
              onClick={handleStartExam}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isHindiMode ? 'परीक्षा प्रारंभ करें (Start Exam)' : 'Start Examination'}</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Custom Text Import Modal */}
        {showCustomModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-base font-hindi flex items-center gap-2">
                  <FileText size={18} className="text-indigo-400" />
                  <span>{isHindiMode ? 'कस्टम परीक्षा अनुच्छेद पेस्ट करें' : 'Paste Custom Examination Excerpt'}</span>
                </h3>
                <button
                  onClick={() => setShowCustomModal(false)}
                  className="p-1 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <textarea
                rows={7}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder={isHindiMode ? 'यहाँ अपना न्यायालयीन निर्णय, शासकीय आदेश, या अन्य हिंदी लेख पेस्ट करें...' : 'Paste custom court judgment, gazette notice, or legal drill here...'}
                className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-hindi leading-relaxed"
              />

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCustomModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (customText.trim()) {
                      setSelectedPassageId('custom');
                      setShowCustomModal(false);
                    }
                  }}
                  disabled={!customText.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold disabled:opacity-50 cursor-pointer shadow-md shadow-indigo-600/30"
                >
                  Apply Custom Text
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW: LIVE EXAM SIMULATION ARENA
  // ==========================================
  if (isExamRunning) {
    const isWarningTime = remainingSeconds !== null && remainingSeconds <= 60;

    return (
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="w-full max-w-7xl mx-auto px-4 py-4 space-y-3 focus:outline-none select-none"
      >
        {/* Exam Header Telemetry Ribbon */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-2.5 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Exam Info & Candidate Mock */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <h2 className="font-bold text-white text-sm leading-tight">
                {currentPreset.title}
              </h2>
              <span className="text-[10px] text-slate-400 font-hindi">
                {currentPreset.backspaceRule === 'disabled'
                  ? '🔒 बैकस्पेस पूर्णतः प्रतिबंधित'
                  : currentPreset.backspaceRule === 'currentWord'
                  ? '⚠️ बैकस्पेस केवल सक्रिय शब्द में मान्य'
                  : 'बैकस्पेस अनुमत'}
              </span>
            </div>
          </div>

          {/* Center: High-Visibility Countdown Timer */}
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-xl border font-mono font-black text-lg ${
            isWarningTime
              ? 'bg-rose-950/80 border-rose-600 text-rose-300 animate-pulse shadow-lg shadow-rose-900/50'
              : 'bg-slate-950 border-slate-800 text-emerald-400'
          }`}>
            <Clock size={16} className={isWarningTime ? 'text-rose-400 animate-spin' : 'text-emerald-400'} />
            <span>{formatTime(remainingSeconds)}</span>
          </div>

          {/* Right: Real-time Telemetry & Submit Button */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Gross</span>
                <span className="text-slate-200 font-bold">{currentGrossWpm} WPM</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Net</span>
                <span className="text-emerald-400 font-bold">{currentWpm} WPM</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Accuracy</span>
                <span className="text-cyan-400 font-bold">{currentAccuracy}%</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Errors</span>
                <span className="text-rose-400 font-bold">{mistakes}</span>
              </div>
            </div>

            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="px-4 py-1.5 rounded-xl bg-rose-600/20 border border-rose-500/40 hover:bg-rose-600/30 text-rose-300 font-bold text-xs transition cursor-pointer"
            >
              Submit Exam
            </button>
          </div>
        </div>

        {/* 2-LINE ROLLING CAROUSEL TYPING CANVAS */}
        <RollingTextDisplay
          targetText={activePassage?.text || ''}
          typedIndex={typedIndex}
          history={history}
          strictError={strictError}
          errorMode={errorMode}
          onToggleErrorMode={setErrorMode}
          hiddenInputRef={hiddenInputRef}
          onKeyDown={handleKeyDown}
          onFocusTypingArea={focusInput}
          fontSize="normal"
          language={examLang}
          wpm={currentWpm}
          grossWpm={currentGrossWpm}
          accuracy={currentAccuracy}
          progressPercent={progressPercent}
          mistakes={mistakes}
        />

        {/* INTEGRATED KEYBOARD WITH REALISTIC ORGANIC HUMAN HANDS */}
        <IntegratedKeyboardHands
          targetKey={targetKeyInfo?.key || null}
          targetShift={targetKeyInfo?.shift || false}
          language={examLang}
          pressedKey={lastPressedPhysicalKey}
        />

        {/* Confirm Submit Modal */}
        {showConfirmSubmit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
              <AlertTriangle size={36} className="text-amber-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">
                Submit Examination Now?
              </h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to finalize your exam test before time expires?
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Continue Test
                </button>
                <button
                  onClick={() => submitExam()}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30 cursor-pointer"
                >
                  Yes, Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW: OFFICIAL EXAM SCORECARD & REPORT
  // ==========================================
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 space-y-6 select-none">
      <div className={`p-8 rounded-3xl border text-center shadow-2xl relative space-y-6 ${
        examResult.isQualified
          ? 'bg-slate-900/90 border-emerald-500/50 shadow-emerald-500/10'
          : 'bg-slate-900/90 border-rose-500/50 shadow-rose-500/10'
      }`}>
        {/* Status Badge */}
        <div>
          <div className="inline-flex p-3 rounded-full mb-3 bg-slate-950 border border-slate-800">
            {examResult.isQualified ? (
              <CheckCircle size={44} className="text-emerald-400" />
            ) : (
              <AlertTriangle size={44} className="text-rose-400" />
            )}
          </div>

          <h2 className="text-3xl font-black text-white font-hindi">
            {examResult.isQualified
              ? '🎉 परीक्षा उत्तीर्ण (QUALIFIED)'
              : '⚠️ परीक्षा अनुत्तीर्ण (NOT QUALIFIED)'}
          </h2>

          <p className="text-xs text-slate-400 mt-1 font-hindi">
            {examResult.examPreset.name} • कटऑफ मानक: {examResult.targetCutoff} Net WPM
          </p>
        </div>

        {/* 6 Key Scorecard Telemetry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center font-mono">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Net Speed</span>
            <span className={`text-2xl font-black ${examResult.netWpm >= examResult.targetCutoff ? 'text-emerald-400' : 'text-rose-400'}`}>
              {examResult.netWpm}
            </span>
            <span className="text-[10px] text-slate-400 block font-sans">Net WPM</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Gross Speed</span>
            <span className="text-2xl font-black text-indigo-400">{examResult.grossWpm}</span>
            <span className="text-[10px] text-slate-400 block font-sans">Gross WPM</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Accuracy</span>
            <span className="text-2xl font-black text-cyan-400">{examResult.accuracy}%</span>
            <span className="text-[10px] text-slate-400 block font-sans">सटीकता</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Keystrokes</span>
            <span className="text-xl font-black text-white">{examResult.totalKeystrokes}</span>
            <span className="text-[10px] text-slate-400 block font-sans">Depressions</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Mistakes</span>
            <span className="text-xl font-black text-rose-400">{examResult.mistakes}</span>
            <span className="text-[10px] text-slate-400 block font-sans">Errors</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Duration</span>
            <span className="text-xl font-black text-amber-400">{Math.round(examResult.timeSeconds / 60)}m {examResult.timeSeconds % 60}s</span>
            <span className="text-[10px] text-slate-400 block font-sans">Time Taken</span>
          </div>
        </div>

        {/* Detailed Evaluation Feedback */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-left text-xs text-slate-300 space-y-1.5 font-hindi">
          <strong className="text-white block font-bold">आधिकारिक मूल्यांकन विवरण (Official Evaluation):</strong>
          <p>
            • आपकी शुद्ध गति <strong>{examResult.netWpm} WPM</strong> रही (अर्हक न्यूनतम सीमा: {examResult.targetCutoff} WPM)।
          </p>
          <p>
            • कुल {examResult.mistakes} त्रुटियों के कारण आपके कुल शब्दों में से समतुल्य कटौती की गई है।
          </p>
          <p>
            • {examResult.isQualified
              ? 'बधाई! आपकी गति एवं सटीकता आधिकारिक शासकीय परीक्षा उत्तीर्ण करने के लिए पूर्णतः उपयुक्त है।'
              : 'सुझाव: त्रुटियों की संख्या घटाने और नियमित इनस्क्रिप्ट अभ्यास से शुद्ध गति में सुधार करें।'}
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => setExamResult(null)}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition"
          >
            <RotateCcw size={15} /> Choose Another Exam
          </button>
          <button
            onClick={handleStartExam}
            className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer transition"
          >
            Retake Exam ➔
          </button>
        </div>
      </div>
    </div>
  );
}
