// TypeSetu Pedagogy & Progressive Lesson Engine
// Muscle-memory-first curriculum inspired by TypingClub & TypingMaster
import lessonsData from './lessonsData.json';

export const ENGLISH_PHASES = [
  {
    id: 1,
    name: 'Phase 1: Home Row Anchor',
    range: [1, 40],
    description: 'F & J bumps, D & K, S & L, A & ;, then G & H center stretches.',
    icon: '🏠',
  },
  {
    id: 2,
    name: 'Phase 2: Spacebar Rhythm',
    range: [41, 70],
    description: 'Spacebar rhythm, word pacing, and thumb discipline (Right thumb primary).',
    icon: '␣',
  },
  {
    id: 3,
    name: 'Phase 3: Top Row Reach',
    range: [71, 120],
    description: 'E & I, R & U, T & Y, W & O, Q & P reach and two-row vocabulary.',
    icon: '⬆️',
  },
  {
    id: 4,
    name: 'Phase 4: Bottom Row Reach',
    range: [121, 170],
    description: 'C & M, V & N, X & ,, Z & ., / downward slides and tri-row mastery.',
    icon: '⬇️',
  },
  {
    id: 5,
    name: 'Phase 5: Capital Letters & Shift Mechanics',
    range: [171, 210],
    description: 'Opposite-hand Shift rule (Left Shift for right keys, Right Shift for left keys).',
    icon: '⇧',
  },
  {
    id: 6,
    name: 'Phase 6: Punctuation & Function Keys',
    range: [211, 250],
    description: 'Period, comma, apostrophe, quotation marks, enter, tab, and backspace control.',
    icon: '🔤',
  },
  {
    id: 7,
    name: 'Phase 7: Number Row Reach & Developer Syntax',
    range: [251, 300],
    description: 'Numbers 1-0, coding braces {}, [], logic (&&, ||, ===, =>), HTML tags, JS & Python.',
    icon: '💻',
  },
];

export const HINDI_PHASES = [
  {
    id: 1,
    name: 'चरण 1: गृह पंक्ति मूल अक्षर (Home Row Basics)',
    range: [1, 60],
    description: 'क, ि, ह, ी, र, ा, स, य, श, ं, े (D, F, G, H, J, K, L, ;, \', A, S)',
    icon: '🏠',
  },
  {
    id: 2,
    name: 'चरण 2: ऊपरी पंक्ति गमन (Top Row Movement)',
    range: [61, 120],
    description: 'म, त, ज, ल, न, प, व, च, ख, अल्पविराम, ु, ू (E, R, T, Y, U, I, O, P, [, ], Q, W)',
    icon: '⬆️',
  },
  {
    id: 3,
    name: 'चरण 3: निचली पंक्ति गमन (Bottom Row Movement)',
    range: [121, 180],
    description: 'ग, ब, अ, इ, द, उ, ए, ध, हलंत ., रा-फलन ्र (X, C, V, B, N, M, ,, /, ., Z)',
    icon: '⬇️',
  },
  {
    id: 4,
    name: 'चरण 4: \'f\' छोटी \'ि\' मात्रा नियम अभ्यास',
    range: [181, 220],
    description: 'व्यंजन से पहले \'f\' दबाने का विशेष रेमिंगटन टाइपराइटर नियम अभ्यास (कि, सि, दि, पि)',
    icon: '⚡',
  },
  {
    id: 5,
    name: 'चरण 5: शिफ्ट कुँजी एवं आधे अक्षर (Shift & Halves)',
    range: [221, 270],
    description: 'क्, थ, भ, भ्, श्र, ज्ञ, स्, म्, त्, ज्, ल्, न्, प्, क्ष, द्व, रेफ़ र्',
    icon: '⇧',
  },
  {
    id: 6,
    name: 'चरण 6: शासकीय परीक्षा मानक एवं उच्च गति गद्यांश (Exam Mastery)',
    range: [271, 300],
    description: 'हाईकोर्ट, सीपीसीटी एवं एसएससी मानक 35+ WPM गद्यांश टंकण',
    icon: '🏆',
  },
];

// Backwards compatibility STAGES alias
export const STAGES = ENGLISH_PHASES;

export function getPhases(language = 'english') {
  return language === 'hindi' ? HINDI_PHASES : ENGLISH_PHASES;
}

export function getPhaseForLevel(level, language = 'english') {
  const phases = getPhases(language);
  for (const p of phases) {
    if (level >= p.range[0] && level <= p.range[1]) return p;
  }
  return phases[phases.length - 1];
}

export function getStageForLevel(level, language = 'english') {
  return getPhaseForLevel(level, language);
}

// -------------------------------------------------------------
// CURATED DRILL BANKS (TIER 1 ISOLATED, TIER 2 WORDS, TIER 3 FLOW)
// -------------------------------------------------------------

const EN_PHASE_1_DRILLS = [
  // Tier 1: Isolated
  { t: 1, title: 'Index Fingers: F and J Bumps', sub: 'Tactile bumps & home anchors', keys: ['f', 'j', ' '], text: 'fff jjj ff jj f j f j fjf jfj ffjj jjff f j fj jf' },
  { t: 1, title: 'Middle Fingers: D and K', sub: 'Adjacent home row reach', keys: ['d', 'k', ' '], text: 'ddd kkk dd kk dk kd f d j k fd jk dk fj kf dj kd fjdk' },
  { t: 1, title: 'Ring Fingers: S and L', sub: 'Ring finger coordination', keys: ['s', 'l', ' '], text: 'sss lll ss ll sl ls as df jk l; fs jl ds kl ls sl fds jkl' },
  { t: 1, title: 'Pinky Fingers: A and Semicolon', sub: 'Outer home boundaries', keys: ['a', ';', ' '], text: 'aaa ;;; aa ;; a; ;a asdf jkl; ;lkj fdsa a; sl dk fj ad ;l' },
  { t: 1, title: 'Center Stretches: G and H', sub: 'Index reaches inward', keys: ['g', 'h', ' '], text: 'ggg hhh gg hh gh hg fg jh gf hj gh hg gag had has gas half' },
  // Tier 2: Real Words
  { t: 2, title: 'Home Row Syllables: 3-Letter Words', sub: 'Short word formation', keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ' '], text: 'fad dad ask lad all fall hall shall has gas had hag ash' },
  { t: 2, title: 'Home Row Words: 4 & 5-Letter Words', sub: 'Continuous muscle memory', keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ' '], text: 'glad half flash salad dash flask lash flag fall hall shall' },
  { t: 2, title: 'Home Row Word Pairs', sub: 'Cadence pairs', keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ' '], text: 'sad dad glad lad ask dad half flag dark glass flash salad' },
  // Tier 3: Rhythm & Sentences
  { t: 3, title: 'Home Row Sentences: Part 1', sub: 'Natural rhythm flow', keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ' '], text: 'a sad dad had a flask and a salad a glad lad asks dad' },
  { t: 3, title: 'Home Row Sentences: Part 2', sub: 'Fluid sentence flow', keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ' '], text: 'all flags fall as dark glass salads dash glad dads ask all' },
  { t: 3, title: 'Home Row Speed Benchmark', sub: 'Benchmark test', keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', ' '], text: 'salad shall fall as dads ask half glad lads flash dark glass flags' },
];

const EN_TOP_ROW_DRILLS = [
  // E and I
  { t: 1, title: 'Top Vowels: E & I Isolated', sub: 'Middle fingers reach up', keys: ['e', 'i', ' '], text: 'eee iii de ki ed ik see did kid lie die fill kill like' },
  { t: 2, title: 'Top Vowels: E & I Words', sub: 'Common word integration', keys: ['e', 'i', 'd', 'k', 's', 'l', 'f', 'j', ' '], text: 'like life side fill kill idea file die feed feel hide ride' },
  { t: 3, title: 'Top Vowels: E & I Flow', sub: 'Sentence rhythm', keys: ['e', 'i', ' '], text: 'he likes his life as fresh ideas fill his side each day' },
  // R and U
  { t: 1, title: 'Top Keys: R & U Isolated', sub: 'Index fingers reach up', keys: ['r', 'u', ' '], text: 'rrr uuu fr ju rf uj fur run rule rude user pure sure' },
  { t: 2, title: 'Top Keys: R & U Words', sub: 'Word formation', keys: ['r', 'u', ' '], text: 'pure sure fire four user turn hurt rust rail real read' },
  { t: 3, title: 'Top Keys: R & U Flow', sub: 'Sentence rhythm', keys: ['r', 'u', ' '], text: 'true friends run four miles under pure summer rain' },
  // T and Y
  { t: 1, title: 'Top Keys: T & Y Isolated', sub: 'Index inward upward reach', keys: ['t', 'y', ' '], text: 'ttt yyy tr yu ty ru try you yet tyre year turn yard' },
  { t: 2, title: 'Top Keys: T & Y Words', sub: 'Word formation', keys: ['t', 'y', ' '], text: 'they stay year yard city story party easy try that this' },
  { t: 3, title: 'Top Keys: T & Y Flow', sub: 'Sentence cadence', keys: ['t', 'y', ' '], text: 'they try to stay yet the story starts today with you' },
  // W and O
  { t: 1, title: 'Top Keys: W & O Isolated', sub: 'Ring fingers reach up', keys: ['w', 'o', ' '], text: 'www ooo sw lo ws ol how low now cow slow show word' },
  { t: 2, title: 'Top Keys: W & O Words', sub: 'Word formation', keys: ['w', 'o', ' '], text: 'slow show word work wood know grow blow flow throw down' },
  { t: 3, title: 'Top Keys: W & O Flow', sub: 'Sentence cadence', keys: ['w', 'o', ' '], text: 'show how good words work without slow flow or waste' },
  // Q and P
  { t: 1, title: 'Top Keys: Q & P Isolated', sub: 'Pinky fingers reach up', keys: ['q', 'p', ' '], text: 'qqq ppp aq ;p qa p; quit pour pop pipe quiet plot quote' },
  { t: 2, title: 'Top Keys: Q & P Words', sub: 'Word formation', keys: ['q', 'p', ' '], text: 'quiet plot quote power point pure equip quick proper part' },
  { t: 3, title: 'Top Keys: Q & P Flow', sub: 'Sentence flow', keys: ['q', 'p', ' '], text: 'proper thought produces quiet power without prideful waste' },
];

const EN_BOTTOM_ROW_DRILLS = [
  // C and M
  { t: 1, title: 'Bottom Keys: C & M Isolated', sub: 'Middle fingers slide down', keys: ['c', 'm', ' '], text: 'ccc mmm dc km cd mk came calm camp mice come make time' },
  { t: 2, title: 'Bottom Keys: C & M Words', sub: 'Word formation', keys: ['c', 'm', ' '], text: 'come make time some much music dream claim match come' },
  { t: 3, title: 'Bottom Keys: C & M Flow', sub: 'Sentence cadence', keys: ['c', 'm', ' '], text: 'calm minds make much music come from simple dreams' },
  // V and N
  { t: 1, title: 'Bottom Keys: V & N Isolated', sub: 'Index fingers slide down', keys: ['v', 'n', ' '], text: 'vvv nnn fv jn vf nj van vine view nine noon name fine' },
  { t: 2, title: 'Bottom Keys: V & N Words', sub: 'Word formation', keys: ['v', 'n', ' '], text: 'noon name fine vane vent river never novel seven move' },
  { t: 3, title: 'Bottom Keys: V & N Flow', sub: 'Sentence cadence', keys: ['v', 'n', ' '], text: 'seven new vans move near nine fine river vines today' },
  // X and ,
  { t: 1, title: 'Bottom Keys: X & Comma Isolated', sub: 'Ring fingers slide down', keys: ['x', ',', ' '], text: 'xxx ,,, sx k, xs ,k box fox next six fix mix lax' },
  { t: 2, title: 'Bottom Keys: X & Comma Words', sub: 'Pauses & syntax', keys: ['x', ',', ' '], text: 'exact, fixed, flex, taxi, axis, index, text, mix, next,' },
  { t: 3, title: 'Bottom Keys: X & Comma Flow', sub: 'Cadence with commas', keys: ['x', ',', ' '], text: 'next box, six foxes, calm text, exact match, fine view' },
  // Z and . /
  { t: 1, title: 'Bottom Keys: Z, Period & Slash', sub: 'Pinky and ring slide down', keys: ['z', '.', '/', ' '], text: 'zzz ... /// az l. ;/ zero size prize lazy maze gaze' },
  { t: 2, title: 'Bottom Keys: Z & Period Words', sub: 'Sentence closers', keys: ['z', '.', ' '], text: 'zoom. zone. maze. gaze. blaze. freeze. breeze. size.' },
  { t: 3, title: 'Full Tri-Row Integration', sub: 'All 26 letters in motion', keys: ['ALL'], text: 'the quick brown fox jumps over the lazy dog in autumn' },
];

const EN_DEVELOPER_SNIPPETS = [
  { title: 'JavaScript Arrow Functions', text: 'const sum = (a, b) => a + b; const double = (arr) => arr.map((x) => x * 2);' },
  { title: 'Array Filter & Reduce', text: 'const evens = list.filter((n) => n % 2 === 0).reduce((acc, curr) => acc + curr, 0);' },
  { title: 'Async Fetch Request', text: 'async function loadData(url) { const res = await fetch(url); return await res.json(); }' },
  { title: 'React JSX Button Component', text: '<button onClick={() => setCount((c) => c + 1)} className="px-4 py-2 bg-blue-600">Click</button>' },
  { title: 'HTML5 Semantic Card', text: '<article className="p-4 rounded-xl border border-slate-800 bg-slate-900"><h3>Title</h3></article>' },
  { title: 'Python List Comprehension', text: 'squares = [x ** 2 for x in range(20) if x % 3 == 0] primes = [p for p in numbers if is_prime(p)]' },
  { title: 'Python Function & Types', text: 'def get_user_by_id(user_id: int) -> dict[str, str]: return db.query(User).filter_by(id=user_id).first()' },
  { title: 'SQL Select & Inner Join', text: 'SELECT u.id, u.username, o.amount FROM users u INNER JOIN orders o ON u.id = o.user_id WHERE o.paid = true;' },
  { title: 'SQL Group By & Aggregation', text: 'SELECT country, COUNT(*) AS total_users, AVG(score) FROM profiles GROUP BY country HAVING COUNT(*) > 10;' },
  { title: 'TypeScript Interface', text: 'interface SessionState { readonly token: string; user: { id: number; role: "admin" | "user" }; }' },
  { title: 'Regular Expression: URL Slug', text: 'const slugify = (text) => text.toLowerCase().trim().replace(/[^\\w\\s-]/g, "").replace(/[\\s_-]+/g, "-");' },
  { title: 'Git Terminal Commands', text: 'git checkout -b feature/auth && git add . && git commit -m "feat: complete login" && git push origin main' },
];

// -------------------------------------------------------------
// HINDI KRUTI DEV 010 CURATED DRILL BANKS
// -------------------------------------------------------------

const HI_PHASE_1_DRILLS = [
  // Tier 1: Isolated
  { t: 1, title: 'गृह पंक्ति: क और र (D & J Keys)', sub: 'बायाँ मध्यमा (D) एवं दायाँ तर्जनी (J)', keys: ['क', 'र', ' '], text: 'क र क र कर रक कक रर कर रक करक रकक करर रकक' },
  { t: 1, title: 'गृह पंक्ति: ा और े (K & S Keys)', sub: 'दायाँ मध्यमा (K) एवं बायाँ अनामिका (S)', keys: ['ा', 'े', ' '], text: 'ा े ा े का के रा रे कार केर कारा केरे राका केरा' },
  { t: 1, title: 'गृह पंक्ति: स और य (L & ; Keys)', sub: 'दायाँ अनामिका (L) एवं कनिष्ठिका (;)', keys: ['स', 'य', ' '], text: 'स य स य सय यस सर कस करस रसक सारा सेवा साय' },
  { t: 1, title: 'गृह पंक्ति: ि और ी (F & H Keys)', sub: 'बायाँ तर्जनी (F) एवं दायाँ तर्जनी (H)', keys: ['ि', 'ी', ' '], text: 'ि ी ि ी कि की रि री सिर सीख किया दिया सीरा' },
  { t: 1, title: 'गृह पंक्ति: ह और श (G & \' Keys)', sub: 'बायाँ तर्जनी विस्तार (G) एवं दायाँ कनिष्ठिका (\')', keys: ['ह', 'श', ' '], text: 'ह श ह श हर हक शहर कहा सही शीश हरा शरम शहर कह' },
  { t: 1, title: 'गृह पंक्ति: अनुस्वार बिंदी ं (A Key)', sub: 'बायाँ कनिष्ठिका (A)', keys: ['ं', ' '], text: 'ं कं सं रं हंस कंस रंग संग सारा संसार शंकर' },
  // Tier 2: Real Words
  { t: 2, title: 'गृह पंक्ति सार्थक शब्द रचना', sub: 'सभी गृह कुंजियों का संगम', keys: ['क', 'र', 'स', 'य', 'ह', 'श', 'ा', 'े', 'ि', 'ी', 'ं', ' '], text: 'कर सर हर यश शहर कह करस रसक सारा सेवा सारा शहर सही' },
  { t: 2, title: 'गृह पंक्ति द्वयक्षर एवं त्र्यक्षर शब्द', sub: 'शब्द प्रवाह', keys: ['क', 'र', 'स', 'य', 'ह', 'श', 'ा', 'े', 'ि', 'ी', 'ं', ' '], text: 'कार केरा सीख सीरा हंस रंग संग सारा संसार शंकर सही कह' },
  // Tier 3: Rhythm & Sentences
  { t: 3, title: 'गृह पंक्ति वाक्य एवं लय प्रवाह', sub: 'पूर्ण वाक्य रचना', keys: ['क', 'र', 'स', 'य', 'ह', 'श', 'ा', 'े', 'ि', 'ी', 'ं', ' '], text: 'कहा सही शहर सारा संसार एक सुंदर परिवार है सारा शहर सही राह पर चले' },
  { t: 3, title: 'गृह पंक्ति प्रवाह परीक्षा', sub: 'दक्षता मानक', keys: ['क', 'र', 'स', 'य', 'ह', 'श', 'ा', 'े', 'ि', 'ी', 'ं', ' '], text: 'संसार में सदा सही मार्ग पर चलकर ही मानव जीवन सार्थक बनता है' },
];

const HI_PHASE_4_F_MATRA_DRILLS = [
  // The 'f' matra (ि) rule drills: 'f' must be typed BEFORE the consonant!
  { t: 1, title: 'नियम ड्रिल: छोटी \'ि\' बुनियादी जोड़', sub: 'F Key फिर व्यंजन (f+d=कि, f+l=सि)', keys: ['कि', 'सि', 'दि', 'पि', ' '], text: 'कि कि सि सि दि दि पि पि मि मि ति ति जि जि लि लि' },
  { t: 1, title: 'नियम ड्रिल: \'ि\' युगल अक्षर', sub: 'f दबाएँ फिर वर्ण', keys: ['ि'], text: 'कि सि दि पि मि ति जि लि कि सि दि पि मि ति जि लि' },
  { t: 2, title: 'छोटी \'ि\' व्यावहारिक शब्द रचना', sub: 'दिन, किताब, विचार, कविता', keys: ['ि'], text: 'किताब दिन विचार कविता शिक्षा किरण विकास स्थिति किसान मिल दिल सिर' },
  { t: 2, title: 'छोटी \'ि\' एवं \'ी\' का अंतर', sub: 'f (ि) बनाम h (ी)', keys: ['ि', 'ी'], text: 'दिन दीन किया कीया सिर सीरा मिल मील किसान कीमत शिक्षा शीत' },
  { t: 3, title: 'छोटी \'ि\' वाक्य एवं गद्यांश प्रवाह', sub: 'धाराप्रवाह टंकण', keys: ['ि'], text: 'शिक्षक ने विद्यार्थी से कहा कि प्रतिदिन नियमित अभ्यास करने से ही सफलता मिलेगी' },
  { t: 3, title: 'छोटी \'ि\' परीक्षा मानक ड्रिल', sub: 'उच्च गति शुद्धता', keys: ['ि'], text: 'विकास और प्रगति के लिए शिक्षा एक महत्वपूर्ण किरण है जिससे समाज में नई दिशा मिलती है' },
];

// -------------------------------------------------------------
// 300 PROGRESSIVE LESSONS GENERATOR (ENGLISH & HINDI)
// -------------------------------------------------------------

export function generateEnglishLessons() {
  const lessons = [];

  for (let i = 1; i <= 300; i++) {
    const phase = getPhaseForLevel(i, 'english');
    let title = `English Lesson ${i}`;
    let subtitle = '';
    let description = '';
    let text = '';
    let targetKeys = [];
    let tier = 1;
    let targetWpm = 15 + Math.floor(i / 10) * 2;
    let minAccuracy = 90;

    if (i <= 40) {
      // Phase 1: Home Row Anchor (1-40)
      const drill = EN_PHASE_1_DRILLS[(i - 1) % EN_PHASE_1_DRILLS.length];
      tier = drill.t;
      title = `Level ${i}: ${drill.title}`;
      subtitle = drill.sub;
      description = `Master home-row touch anchor. Wrists elevated, eyes strictly on screen.`;
      targetKeys = drill.keys;
      text = drill.text;
    } else if (i <= 70) {
      // Phase 2: Spacebar Rhythm (41-70)
      const sub = i - 40;
      tier = sub <= 10 ? 1 : sub <= 20 ? 2 : 3;
      title = `Level ${i}: Spacebar Rhythm & Thumb Cadence ${sub}`;
      subtitle = 'Right thumb primary discipline';
      description = 'Hit spacebar crisply with your thumb after every word without breaking rhythm.';
      targetKeys = [' '];
      const spaceTexts = [
        'f j f j d k d k s l s l a ; a ; as df jk l; gf hj',
        'fad dad ask lad all fall hall shall dad glad lad ask flask',
        'a sad dad had a flask and a salad a glad lad asks dad as flags fall fast',
        'half a glass of salad shall fall as a lad asks dad for flags',
      ];
      text = spaceTexts[(sub - 1) % spaceTexts.length];
    } else if (i <= 120) {
      // Phase 3: Top Row Reach (71-120)
      const sub = i - 70;
      const drill = EN_TOP_ROW_DRILLS[(sub - 1) % EN_TOP_ROW_DRILLS.length];
      tier = drill.t;
      title = `Level ${i}: ${drill.title}`;
      subtitle = drill.sub;
      description = `Reach upward with precision. Always snap fingers back to home row rest keys.`;
      targetKeys = drill.keys;
      text = drill.text;
    } else if (i <= 170) {
      // Phase 4: Bottom Row Reach (121-170)
      const sub = i - 120;
      const drill = EN_BOTTOM_ROW_DRILLS[(sub - 1) % EN_BOTTOM_ROW_DRILLS.length];
      tier = drill.t;
      title = `Level ${i}: ${drill.title}`;
      subtitle = drill.sub;
      description = `Slide fingers diagonally down to bottom row keys with minimal palm displacement.`;
      targetKeys = drill.keys;
      text = drill.text;
    } else if (i <= 210) {
      // Phase 5: Capital Letters & Shift Mechanics (171-210)
      const sub = i - 170;
      tier = sub <= 15 ? 1 : sub <= 28 ? 2 : 3;
      if (sub <= 14) {
        title = `Level ${i}: Left Shift (Right-Hand Capitals)`;
        subtitle = 'Hold Left Shift with Pinky for J, K, L, U, I, O, P, N, M';
        description = 'Opposite-hand Shift: Left Pinky holds Shift while right hand strikes the key.';
        text = 'John, Karl, Larry, Paul, Oliver, Mary, Nancy, Utah, India, Japan, Korea, Peru, Norway, Mexico';
      } else if (sub <= 28) {
        title = `Level ${i}: Right Shift (Left-Hand Capitals)`;
        subtitle = 'Hold Right Shift with Pinky for F, D, S, A, R, E, W, Q, T, G, B, V, C';
        description = 'Opposite-hand Shift: Right Pinky holds Shift while left hand strikes the key.';
        text = 'Frank, David, Sarah, Alice, Robert, Emma, William, Queen, Thomas, George, Brian, Texas, Florida, Rome';
      } else {
        title = `Level ${i}: Alternating Shift Flow & Proper Nouns`;
        subtitle = 'Seamless alternating capitalization';
        description = 'Switch fluidly between Left Shift and Right Shift across full sentences.';
        text = 'The United Nations, World Health Organization, Silicon Valley Bank, and Oxford University meet today.';
      }
    } else if (i <= 250) {
      // Phase 6: Punctuation & Function Keys (211-250)
      const sub = i - 210;
      tier = sub <= 15 ? 1 : sub <= 28 ? 2 : 3;
      if (sub <= 14) {
        title = `Level ${i}: Punctuation Mechanics (. , ' " ? !)`;
        subtitle = 'Precise right pinky & ring reach';
        description = 'Strike punctuation marks with cadence without halting between words.';
        text = '"Wait!" she cried, "Did you see that?" He replied: "Yes, exactly at 10:30 PM; let\'s go!"';
      } else if (sub <= 28) {
        title = `Level ${i}: Dialogue & Conversational Cadence`;
        subtitle = 'Quotations, commas, and questions';
        description = 'Flow through direct speech, contractions, and question marks.';
        text = "It's a bright day, isn't it? She asked: 'Why shouldn't we go ahead?' Don't hesitate now.";
      } else {
        title = `Level ${i}: Zero-Backspace Rhythm Flow`;
        subtitle = 'Rhythm discipline and accuracy';
        description = 'Maintain unbroken flow. If an error happens, tap Backspace cleanly once.';
        text = 'Precision builds velocity. When every keystroke lands true, muscle memory becomes effortless speed.';
      }
    } else {
      // Phase 7: Number Row & Developer Syntax (251-300)
      const sub = i - 250;
      const snippet = EN_DEVELOPER_SNIPPETS[(sub - 1) % EN_DEVELOPER_SNIPPETS.length];
      tier = 3;
      title = `Level ${i}: ${snippet.title}`;
      subtitle = 'Developer Syntax Benchmark';
      description = 'Master braces {}, brackets [], logic operators, and language syntax with speed.';
      text = snippet.text;
      targetWpm = 35 + Math.floor(sub / 10) * 3;
      minAccuracy = 92;
    }

    lessons.push({
      id: `en-${i}`,
      level: i,
      phase: phase.name,
      phaseId: phase.id,
      stageId: phase.id,
      stageName: phase.name,
      tier,
      title,
      subtitle,
      description,
      targetKeys,
      exercises: [text],
      text,
      targetWpm,
      minAccuracy,
      passingAccuracy: minAccuracy,
    });
  }

  return lessons;
}

export function generateHindiLessons() {
  const lessons = [];

  for (let i = 1; i <= 300; i++) {
    const phase = getPhaseForLevel(i, 'hindi');
    let title = `हिंदी पाठ ${i}`;
    let subtitle = '';
    let description = '';
    let text = '';
    let targetKeys = [];
    let tier = 1;
    let targetWpm = 12 + Math.floor(i / 12) * 2;
    let minAccuracy = 90;

    if (i <= 60) {
      // Phase 1: Home Row Basics (1-60)
      const drill = HI_PHASE_1_DRILLS[(i - 1) % HI_PHASE_1_DRILLS.length];
      tier = drill.t;
      title = `पाठ ${i}: ${drill.title}`;
      subtitle = drill.sub;
      description = `कुर्ती देव ०१० गृह पंक्ति। उँगलियों को D-F-G-H एवं J-K-L-; पर रखें।`;
      targetKeys = drill.keys;
      text = drill.text;
    } else if (i <= 120) {
      // Phase 2: Top Row Movement (61-120)
      const sub = i - 60;
      tier = sub <= 20 ? 1 : sub <= 40 ? 2 : 3;
      if (sub <= 20) {
        title = `पाठ ${i}: ऊपरी पंक्ति म, त, ज, ल, न, प (E, R, T, Y, U, I)`;
        subtitle = 'बाएँ हाथ से E(म), R(त), T(ज) एवं दाएँ से Y(ल), U(न), I(प)';
        description = 'गृह पंक्ति से ऊपर उँगलियाँ ले जाकर अक्षर दबाएँ और तुरंत वापस गृह पंक्ति पर आएँ।';
        text = 'म त ज ल न प मत तम जल कलम नल पल नाम पान नया पानी पीना पिता';
      } else if (sub <= 40) {
        title = `पाठ ${i}: ऊपरी पंक्ति व, च, ख, ु, ू (O, P, [, Q, W)`;
        subtitle = 'O(व), P(च), [(ख), Q(ु), W(ू)';
        description = 'उ और ऊ की मात्राएँ तथा व, च, ख का द्रुत अभ्यास।';
        text = 'व च ख कुल कूट सुख सूत पूरा पुल मूल पूजा वर चर वचन चाल विचार खेल';
      } else {
        title = `पाठ ${i}: ऊपरी एवं गृह पंक्ति शब्द प्रवाह`;
        subtitle = 'दो पंक्तियों का द्रुत संगम';
        description = 'भारत देश पानी गीत फूल सुबह खेल धूप बाग हवा नदी तीर वीर जीत मीत बात हाथ';
        text = 'भारत देश पानी गीत फूल सुबह खेल धूप बाग हवा नदी तीर वीर जीत मीत बात हाथ पूरा पुल';
      }
    } else if (i <= 180) {
      // Phase 3: Bottom Row Movement (121-180)
      const sub = i - 120;
      tier = sub <= 20 ? 1 : sub <= 40 ? 2 : 3;
      if (sub <= 20) {
        title = `पाठ ${i}: निचली पंक्ति ग, ब, अ, इ, द, उ (X, C, V, B, N, M)`;
        subtitle = 'X(ग), C(ब), V(अ), B(इ), N(द), M(उ)';
        description = 'निचली पंक्ति के व्यंजन और स्वतंत्र स्वर (अ, इ, उ) का अभ्यास।';
        text = 'गम बस गगन बात गीत बाग बाल बार अब इस अमर इधर अपना दिन दिल उधर ऊपर';
      } else if (sub <= 40) {
        title = `पाठ ${i}: निचली पंक्ति ए, ध, रा-फलन ्र, हलंत ् (, / Z .)`;
        subtitle = ',(ए), /(ध), Z(्र), .(्)';
        description = 'ए, ध, क्रम-प्रेम वाला रा-फलन (्र), और हलंत (्) का अभ्यास।';
        text = 'एक ऐसा धन धर्म धार धाम क्रम प्रेम ग्राम प्रकाश विद्या सत्य त्याग राष्ट्र';
      } else {
        title = `पाठ ${i}: तीनों पंक्तियों का संगम एवं वाक्य प्रवाह`;
        subtitle = 'त्रि-पंक्ति गति प्रवाह';
        description = 'सत्य और अहिंसा के मार्ग पर चलकर ही मानव जीवन सार्थक बनता है ज्ञान की ज्योति अमर है';
        text = 'समय समाज विचार पुस्तक मित्र सत्य जीवन विद्या मंदिर संसार सुंदर पवन गगन नगर स्वयं';
      }
    } else if (i <= 220) {
      // Phase 4: 'f' Matra (ि) Rule Drills (181-220)
      const sub = i - 180;
      const drill = HI_PHASE_4_F_MATRA_DRILLS[(sub - 1) % HI_PHASE_4_F_MATRA_DRILLS.length];
      tier = drill.t;
      title = `पाठ ${i}: ${drill.title}`;
      subtitle = drill.sub;
      description = `रेमिंगटन टाइपराइटर नियम: छोटी 'ि' (F) हमेशा व्यंजन से पहले टाइप की जाती है!`;
      targetKeys = drill.keys;
      text = drill.text;
    } else if (i <= 270) {
      // Phase 5: Shift Key & Half Letters (221-270)
      const sub = i - 220;
      tier = sub <= 15 ? 1 : sub <= 35 ? 2 : 3;
      if (sub <= 15) {
        title = `पाठ ${i}: शिफ्ट कुँजी से आधे अक्षर (क्, थ, भ, भ्, श्र, ज्ञ, स्)`;
        subtitle = 'Shift + D(क्), F(थ), G(भ), H(भ्), J(श्र), K(ज्ञ), L(स्)';
        description = 'Shift दबाकर सीधे आधे अक्षर टाइप करें। विपरीत हाथ की पिंकी से Shift दबाएँ।';
        text = 'क्या क्यों थाली थोड़ा कथा स्थान तथा भारत भाई श्रीमान श्रम ज्ञान ज्ञानी अभ्यास स्पष्ट';
      } else if (sub <= 35) {
        title = `पाठ ${i}: शिफ्ट ऊपरी पंक्ति (म्, त्, ज्, ल्, न्, प्, क्ष, द्व)`;
        subtitle = 'Shift + E(म्), R(त्), T(ज्), Y(ल्), U(न्), I(प्), [(क्ष), ](द्व)';
        description = 'ऊपरी पंक्ति के आधे अक्षर और क्ष, द्व संयुक्ताक्षर।';
        text = 'फल मुख्य त्याग ज्वाला कल्याण न्याय प्यार प्यारा पुष्प क्षमा क्षेत्र द्वार द्वितीय विद्वान';
      } else {
        title = `पाठ ${i}: रेफ़ 'र्' ऊपर अभ्यास (Shift + Z Key)`;
        subtitle = 'Z कुँजी (Shift) से व्यंजन के ऊपर रेफ़';
        description = 'व्यंजन के बाद Shift+Z दबाने पर ऊपर रेफ़ (र्) लगता है (उदा. धर्म, कर्म, सूर्य)।';
        text = 'धर्म कर्म सूर्य कार्य मार्ग पर्व वर्ष गर्व पर्वत निर्णय दर्शन हर्ष आशीर्वाद';
      }
    } else {
      // Phase 6: Exam Fluency & Speed Paragraphs (271-300)
      const sub = i - 270;
      tier = 3;
      const examPassages = [
        'आधुनिक सूचना प्रौद्योगिकी ने शासकीय और प्रशासनिक कार्यों में अभूतपूर्व पारदर्शिता ला दी है । आज आम नागरिक अपने घर बैठे अनेक जनकल्याणकारी योजनाओं का लाभ उठा रहे हैं । डिजिटल भारत अभियान ने ग्रामीण क्षेत्रों तक कनेक्टिविटी पहुँचाकर आर्थिक विकास को नई गति प्रदान की है । निरंतर अभ्यास ही टंकण परीक्षा में उच्चतम अंक प्राप्त करने का एकमात्र मार्ग है ।',
        'परिश्रम ही सफलता की एकमात्र कुंजी है । जो व्यक्ति समय के मूल्य को पहचानकर अपने लक्ष्य की ओर निरंतर अग्रसर रहता है, सफलता उसके कदम चूमती है । विद्या और ज्ञान का प्रकाश मनुष्य के जीवन से अज्ञानता के अंधकार को समाप्त कर देता है । हमें सदैव सत्य, कर्तव्यनिष्ठा और अनुशासन के मार्ग पर चलना चाहिए ।',
        'भारत एक विशाल एवं समृद्ध सांस्कृतिक धरोहर वाला राष्ट्र है । यहाँ विभिन्न भाषाएं, बोलियाँ और संस्कृतियाँ आपस में मिलकर एक सुंदर गुलदस्ता बनाती हैं । हमारे देश के युवाओं ने विज्ञान, तकनीक और उद्योग के क्षेत्र में पूरे विश्व में अपना परचम लहराया है । सतत अभ्यास से कठिन से कठिन कार्य भी सरल बन जाता है ।',
      ];
      title = `पाठ ${i}: शासकीय परीक्षा मानक गद्यांश (CPCT / SSC / High Court Mock)`;
      subtitle = '35+ WPM रेमिंगटन टाइपराइटर परीक्षा मानक';
      description = 'पूर्णविराम (।), अल्पविराम (,) एवं सभी संयुक्ताक्षरों के साथ परीक्षा मानक गति अभ्यास।';
      text = examPassages[(sub - 1) % examPassages.length];
      targetWpm = 30 + Math.floor(sub / 10) * 2;
      minAccuracy = 95;
    }

    lessons.push({
      id: `hi-${i}`,
      level: i,
      phase: phase.name,
      phaseId: phase.id,
      stageId: phase.id,
      stageName: phase.name,
      tier,
      title,
      subtitle,
      description,
      targetKeys,
      exercises: [text],
      text,
      targetWpm,
      minAccuracy,
      passingAccuracy: minAccuracy,
    });
  }

  return lessons;
}

// Cached singletons
let cachedEnglishLessons = null;
let cachedHindiLessons = null;

export function getAllLessons(language = 'english') {
  if (language === 'hindi') {
    if (!cachedHindiLessons) cachedHindiLessons = generateHindiLessons();
    return cachedHindiLessons;
  }
  if (!cachedEnglishLessons) cachedEnglishLessons = generateEnglishLessons();
  return cachedEnglishLessons;
}

export function getLessonById(id, language = 'english') {
  const all = getAllLessons(language);
  return all.find((l) => l.id === id) || all[0];
}
