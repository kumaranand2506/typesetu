// TypeSetu Enterprise Lesson Engine
// Generates 300 progressive, pedagogically-sound lessons per language across 5 distinct stages

export const STAGES = [
  {
    id: 1,
    name: 'Stage 1: Alphabet & Row Mastery',
    hindiName: 'चरण 1: वर्णमाला एवं पंक्ति दक्षता',
    range: [1, 60],
    description: 'Home row, top row, and bottom row lowercase fundamentals.',
    hindiDescription: 'गृह पंक्ति, ऊपरी पंक्ति और निचली पंक्ति का मूल अभ्यास (बिना शिफ्ट)।',
    icon: '⌨️',
  },
  {
    id: 2,
    name: 'Stage 2: Capitalization & Shift Mechanics',
    hindiName: 'चरण 2: शिफ्ट कुँजी एवं महाप्राण व्यंजन',
    range: [61, 120],
    description: 'Opposite-hand Shift mechanics, proper nouns, and InScript shifted characters.',
    hindiDescription: 'शिफ्ट कुँजी से स्वतंत्र स्वर (अ, आ, इ...), महाप्राण व्यंजन (ख, घ, छ...), एवं संयुक्ताक्षर।',
    icon: '⬆️',
  },
  {
    id: 3,
    name: 'Stage 3: Numbers & Punctuation',
    hindiName: 'चरण 3: संख्याएं एवं विराम चिह्न',
    range: [121, 180],
    description: 'Number row (1-0), dates, prices, commas, periods, exclamation, and Purna Viram (।).',
    hindiDescription: 'संख्या पंक्ति (1-0), अल्पविराम, पूर्णविराम (।), उद्धरण चिह्न एवं प्रश्नवाचक चिह्न।',
    icon: '🔢',
  },
  {
    id: 4,
    name: 'Stage 4: Extended Symbols & Functional Keys',
    hindiName: 'चरण 4: विस्तारित प्रतीक एवं तकनीकी कुंजियाँ',
    range: [181, 240],
    description: 'Slashes (/ \), Pipes (|), Math symbols (+ - * =), Markdown, and File paths.',
    hindiDescription: 'गणितीय चिह्न, बैकस्लैश, पाइप, हाइफ़न, अंडरस्कोर एवं पथ (Paths)।',
    icon: '⚡',
  },
  {
    id: 5,
    name: 'Stage 5: Web Developer & Programmer Syntax',
    hindiName: 'चरण 5: प्रोग्रामर सिंटैक्स एवं कोडिंग अभ्यास',
    range: [241, 300],
    description: 'Braces {}, brackets [], logic (&&, ||, ===, =>), HTML/XML tags, JS, Python & SQL snippets.',
    hindiDescription: 'कोडिंग कोष्ठक {}, [], लॉजिक ऑपरेटर्स (&&, ||, ===, =>), HTML टैग्स एवं कोड स्निपेट्स।',
    icon: '💻',
  },
];

// Helper to determine stage for a lesson level
export function getStageForLevel(level) {
  if (level <= 60) return STAGES[0];
  if (level <= 120) return STAGES[1];
  if (level <= 180) return STAGES[2];
  if (level <= 240) return STAGES[3];
  return STAGES[4];
}

// -------------------------------------------------------------
// ENGLISH 300 LESSON GENERATOR & CURATED CORPUS
// -------------------------------------------------------------

// Base templates for Stage 1 (Lessons 1-60)
const EN_STAGE_1_CORPUS = [
  // 1-10: Home Row Micro-steps
  { title: 'Home Row Foundation: F & J', sub: 'Index home bumps', text: 'f j f j ff jj fj jf fff jjj fjf jfj f j f j ffjj jjff fjdk' },
  { title: 'Home Row: D & K', sub: 'Middle fingers', text: 'd k d k dd kk dk kd f d j k fd jk dk fj kf dj kd fjdk' },
  { title: 'Home Row: S & L', sub: 'Ring fingers', text: 's l s l ss ll sl ls as df jk l; fs jl ds kl ls sl fds jkl' },
  { title: 'Home Row: A & Semicolon', sub: 'Pinky fingers', text: 'a ; a ; aa ;; a; ;a asdf jkl; ;lkj fdsa a; sl dk fj ad ;l' },
  { title: 'Home Row Stretch: G & H', sub: 'Index reach inward', text: 'g h g h fg jh gf hj gh hg gag had has gas half glad flash' },
  { title: 'Home Row Short Words', sub: 'All 8 home keys', text: 'all fall hall shall dad glad lad ask flask flag lash dash salad' },
  { title: 'Home Row Word Combinations', sub: 'Rhythm drill', text: 'sad dad had half a glass of salad ask fall shall glad half dad' },
  { title: 'Home Row Flow', sub: 'Steady pace', text: 'a lad had a flask all flags fall as dark glass salads dash glad' },
  { title: 'Home Row Speed Drill', sub: 'Fluency test', text: 'flash flags had fallen glad dads ask all shall fall as half alas' },
  { title: 'Home Row Mastery Test', sub: 'Benchmark', text: 'salad shall fall as dads ask half glad lads flash dark glass flags' },

  // 11-20: Top Row Essentials
  { title: 'Top Row: E & I', sub: 'Middle finger reach', text: 'd e k i de ki ed ik see did kid lie die fill kill like life side' },
  { title: 'Top Row: R & U', sub: 'Index finger reach', text: 'f r j u fr ju rf uj fur run rule rude user pure sure fire four' },
  { title: 'Top Row: T & Y', sub: 'Index inward stretch', text: 't y t y tr yu ty ru try you yet true rust tyre year turn hurt yard' },
  { title: 'Top Row: W & O', sub: 'Ring finger reach', text: 's w l o sw lo ws ol how low now cow slow show word work wood' },
  { title: 'Top Row: Q & P', sub: 'Pinky finger reach', text: 'a q ; p aq ;p qa p; quit pour pop quiet plot quote power point' },
  { title: 'Top Row Vowel Integration', sub: 'A, E, I, O, U', text: 'rate role read ride road rude rope rule reap ripe roof root ripe' },
  { title: 'Top Row + Home Words', sub: 'Two full rows', text: 'water people write great their there where would could should first' },
  { title: 'Top Row Word Flow', sub: 'Fluid motion', text: 'quick writers report true power while players perform tough parts' },
  { title: 'Top Row Sentences', sub: 'Smooth phrasing', text: 'we write what we see while their power grows pure and true today' },
  { title: 'Top Row Speed Benchmark', sub: 'Velocity drill', text: 'proper thought produces quiet power without worry or prideful waste' },

  // 21-30: Bottom Row
  { title: 'Bottom Row: C & M', sub: 'Middle finger slide', text: 'd c k m dc km cd mk came calm camp mice come make time some much' },
  { title: 'Bottom Row: V & N', sub: 'Index finger slide', text: 'f v j n fv jn vf nj van vine view nine noon name fine vane vent' },
  { title: 'Bottom Row: B & Space', sub: 'Left index reach', text: 'b b vb bv fb jb best book back blue bird bulb bear baby bring table' },
  { title: 'Bottom Row: X & Z', sub: 'Ring and pinky slide', text: 's x a z sx az xs za box fox next zinc zero prize size lazy exact' },
  { title: 'Bottom Row Short Words', sub: 'Bottom row fluency', text: 'can man ban van box zinc next back view calm camp move name zinc' },
  { title: 'Bottom Row + Home Combinations', sub: 'Row hopping', text: 'black cats come back home making noise near nice calm caves' },
  { title: 'Bottom Row + Top Combinations', sub: 'Full range', text: 'every visitor must move between novel zones with quiet caution' },
  { title: 'Bottom Row Sentences', sub: 'Natural rhythm', text: 'brave men make calm moves while many voices call from above' },
  { title: 'Bottom Row Endurance Drill', sub: 'Stamina builder', text: 'can you combine common verbs with maximum speed and minimum errors' },
  { title: 'Three Rows Full Integration', sub: 'Complete lowercase', text: 'the quick brown fox jumps over the lazy dog in quiet autumn breeze' },
];

// Stage 5 syntax bank
const PROGRAMMER_SNIPPETS = [
  { title: 'JavaScript Arrow Functions', text: 'const calculateTotal = (items, taxRate) => items.reduce((sum, item) => sum + item.price, 0) * (1 + taxRate);' },
  { title: 'Async/Await & Promises', text: 'async function fetchUserData(userId) { const res = await fetch(`/api/users/${userId}`); return await res.json(); }' },
  { title: 'Array Destructuring & Spread', text: 'const [firstItem, secondItem, ...remainingItems] = activeList; const merged = { ...defaultConfig, ...userOptions };' },
  { title: 'React Component Hook', text: 'const [count, setCount] = useState(0); useEffect(() => { document.title = `Count: ${count}`; }, [count]);' },
  { title: 'Python List Comprehension', text: 'squares = [x ** 2 for x in range(10) if x % 2 == 0] matrix = [[0 for _ in range(cols)] for _ in range(rows)]' },
  { title: 'Python Dictionary & Typing', text: 'def process_payload(data: dict[str, any]) -> bool: return data.get("status") == "success" and len(data["items"]) > 0' },
  { title: 'SQL Aggregate Query', text: 'SELECT department_id, COUNT(*) AS employee_count, AVG(salary) FROM employees GROUP BY department_id HAVING COUNT(*) > 5;' },
  { title: 'SQL Join & Filter', text: 'SELECT u.id, u.email, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id WHERE o.status = "completed";' },
  { title: 'HTML5 Semantic Elements', text: '<header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-900 border-b">' },
  { title: 'React JSX Input Form', text: '<form onSubmit={handleSubmit}><input type="text" value={query} onChange={(e) => setQuery(e.target.value)} required /></form>' },
  { title: 'CSS Grid & Flexbox Syntax', text: 'display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; align-items: center;' },
  { title: 'Regular Expressions: Email', text: 'const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/; if (!emailRegex.test(input)) throw new Error();' },
  { title: 'Regular Expressions: Date & URL', text: 'const datePattern = /^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$/; const urlSlug = text.toLowerCase().replace(/\\s+/g, "-");' },
  { title: 'TypeScript Interface & Types', text: 'interface UserProfile { readonly id: string; name: string; email: string; roles: Array<"admin" | "editor" | "viewer">; }' },
  { title: 'Git & Bash Shell Commands', text: 'git checkout -b feature/auth && git add . && git commit -m "feat: add oauth2 login" && git push -u origin feature/auth' },
];

export function generateEnglishLessons() {
  const lessons = [];

  for (let i = 1; i <= 300; i++) {
    const stage = getStageForLevel(i);
    let title = `English Lesson ${i}`;
    let subtitle = '';
    let description = '';
    let text = '';
    let targetWpm = 15 + Math.floor(i / 10) * 2;
    let minAccuracy = 88 + (i % 5);

    if (i <= 60) {
      // STAGE 1: Lowercase Fundamentals (1-60)
      if (i <= 30) {
        const item = EN_STAGE_1_CORPUS[(i - 1) % EN_STAGE_1_CORPUS.length];
        title = `Level ${i}: ${item.title}`;
        subtitle = item.sub;
        description = `Master lowercase keys with continuous precision and relaxed wrist posture.`;
        text = item.text;
      } else {
        const pool = [
          'pack my box with five dozen liquor jugs for the next great journey across town',
          'bright foxes jump swiftly over lazy dogs while children laugh and play under green trees',
          'every morning brings fresh light and silent hope to those who work with patience',
          'quiet waters flow between ancient stones carrying fallen leaves into the wide open lake',
          'brave travelers discover peaceful valleys beyond high mountain ridges in distant lands',
        ];
        title = `Level ${i}: Lowercase Tri-Row Fluency Drill ${i - 30}`;
        subtitle = 'Full three-row dexterity';
        description = 'Combine home, upper, and bottom row letters in fluent rhythm.';
        text = pool[(i - 31) % pool.length] + ' ' + pool[(i + 2) % pool.length].slice(0, 45);
      }
    } else if (i <= 120) {
      // STAGE 2: Capitalization & Shift Mechanics (61-120)
      const subIdx = i - 60;
      if (subIdx <= 20) {
        title = `Level ${i}: Left Shift Drills (Right-hand Capitals)`;
        subtitle = 'Hold Left Shift with Pinky for J, K, L, U, I, O, P, N, M';
        description = 'Opposite hand rule: Left Pinky holds Shift while right hand strikes.';
        text = 'John, Karl, Larry, Paul, Oliver, Mary, Nancy, Utah, India, Japan, Korea, Peru, Norway, Mexico, Milan';
      } else if (subIdx <= 40) {
        title = `Level ${i}: Right Shift Drills (Left-hand Capitals)`;
        subtitle = 'Hold Right Shift with Pinky for F, D, S, A, R, E, W, Q, T, G, B';
        description = 'Opposite hand rule: Right Pinky holds Shift while left hand strikes.';
        text = 'Frank, David, Sarah, Alice, Robert, Emma, William, Queen, Thomas, George, Brian, Texas, Florida, Rome, Spain';
      } else {
        title = `Level ${i}: TitleCase & Proper Noun Phrasing ${subIdx - 40}`;
        subtitle = 'Alternating Shift cadence';
        description = 'Seamlessly alternate left and right shift keys in full sentences.';
        text = 'The United Nations, World Health Organization, Silicon Valley Bank, Oxford University, Nobel Peace Prize Committee.';
      }
    } else if (i <= 180) {
      // STAGE 3: Numbers & Basic Punctuation (121-180)
      const subIdx = i - 120;
      if (subIdx <= 20) {
        title = `Level ${i}: Top Number Row Reach (1 to 0)`;
        subtitle = 'Index, middle, ring, pinky top-row elevation';
        description = 'Reach straight up from home row to hit numbers accurately.';
        text = `Invoice #4902: 12 units at $34.50 each, total 414 dollars. Room 809, Flight 732, Code 2026.`;
      } else if (subIdx <= 40) {
        title = `Level ${i}: Punctuation Mechanics (Comma, Period, Quotes)`;
        subtitle = ', . ; : " \' ! ? drills';
        description = 'Precision strikes for punctuation marks without breaking flow.';
        text = '"Wait!" she cried, "Did you see that?" He replied: "Yes, exactly at 10:30 PM; let\'s go!"';
      } else {
        title = `Level ${i}: Narrative Flow with Mixed Numbers & Dialogue`;
        subtitle = 'Real-world conversational typing';
        description = 'Combine direct speech, time formats, statistics, and narrative pace.';
        text = 'In 2026, over 78% of engineers reported: "Continuous touch typing saved 2.5 hours every day." It is remarkable!';
      }
    } else if (i <= 240) {
      // STAGE 4: Extended Symbols & Functional Keys (181-240)
      const subIdx = i - 180;
      if (subIdx <= 20) {
        title = `Level ${i}: Slashing, Piping & Math Symbols`;
        subtitle = '/ \\ | + - * = _ ~ ^ drills';
        description = 'Forward slash, backslash, vertical pipe, and mathematical equations.';
        text = 'x = (a + b) / (c - d); PATH="C:\\Users\\Admin\\AppData|/usr/local/bin"; delta_val = 100 * 2.5;';
      } else if (subIdx <= 40) {
        title = `Level ${i}: URLs, Emails & Markdown Formats`;
        subtitle = 'Web and documentation syntax';
        description = 'Type web endpoints, email patterns, and markdown headers.';
        text = 'Contact support@typesetu.app or visit https://github.com/kumaranand2506/typesetu#getting-started for v2.0!';
      } else {
        title = `Level ${i}: Strict Zero-Backspace Discipline ${subIdx - 40}`;
        subtitle = 'Deliberate speed without corrective backspaces';
        description = 'Train finger confidence by typing continuously without looking at keys.';
        text = 'Build muscle memory through deliberate repetition. Every key struck cleanly reinforces neural velocity.';
      }
    } else {
      // STAGE 5: Web Developer & Programmer Syntax (241-300)
      const snippet = PROGRAMMER_SNIPPETS[(i - 241) % PROGRAMMER_SNIPPETS.length];
      title = `Level ${i}: ${snippet.title}`;
      subtitle = 'Developer Syntax Benchmark';
      description = 'Master braces, brackets, logic operators, and language syntax.';
      text = snippet.text;
      targetWpm = 35 + Math.floor((i - 240) / 10) * 3;
      minAccuracy = 95;
    }

    lessons.push({
      id: `en-${i}`,
      level: i,
      stageId: stage.id,
      stageName: stage.name,
      title,
      subtitle,
      description,
      text,
      targetWpm,
      minAccuracy,
    });
  }

  return lessons;
}

// -------------------------------------------------------------
// HINDI INSCIPT 300 LESSON GENERATOR & CURATED CORPUS
// -------------------------------------------------------------

export function generateHindiLessons() {
  const lessons = [];

  for (let i = 1; i <= 300; i++) {
    const stage = getStageForLevel(i);
    let title = `हिंदी पाठ ${i}`;
    let subtitle = '';
    let description = '';
    let text = '';
    let targetWpm = 12 + Math.floor(i / 12) * 2;
    let minAccuracy = 88 + (i % 5);

    if (i <= 60) {
      // STAGE 1: Lowercase Fundamentals (1-60)
      if (i <= 10) {
        title = `पाठ ${i}: गृह पंक्ति मूल अक्षर (र, क, त, च, प)`;
        subtitle = 'दाहिने हाथ की तर्जनी व मध्यमा';
        description = 'दाहिने हाथ की उँगलियों से J (र), K (क), L (त), ; (च), H (प) का अभ्यास करें।';
        text = 'र क त च प रक तर चत कच तक रत चर कर तप कप रप चप परक कपट तरक';
      } else if (i <= 20) {
        title = `पाठ ${i}: गृह पंक्ति मात्राएँ (ि, ु, े, ो, ्)`;
        subtitle = 'बायाँ हाथ: F (ि), G (ु), S (े), A (ो), D (्)';
        description = 'बाएँ हाथ की उँगलियों से गृह पंक्ति की मूलभूत मात्राओं का अभ्यास।';
        text = 'ो े ् ि ु कि कु के को ति तु ते तो रि रु रे रो पि पु पे पो चिक चुरा';
      } else if (i <= 35) {
        title = `पाठ ${i}: ऊपरी पंक्ति मात्राएँ व व्यंजन (ब, ह, ग, द, ज, ा, ी, ू)`;
        subtitle = 'Y (ब), U (ह), I (ग), O (द), P (ज), E (ा), R (ी), T (ू)';
        description = 'ऊपरी पंक्ति के व्यंजन और दीर्घ मात्राओं का संगम।';
        text = 'भारत देश पानी गीत फूल सुबह खेल धूप बाग हवा नदी तीर वीर जीत मीत बात हाथ';
      } else if (i <= 50) {
        title = `पाठ ${i}: निचली पंक्ति के अक्षर (म, न, व, ल, स, य, ं)`;
        subtitle = 'C (म), V (न), B (व), N (ल), M (स), / (य), X (ं)';
        description = 'निचली पंक्ति के स्पर्श और अनुस्वार बिंदी का अभ्यास।';
        text = 'समय समाज विचार पुस्तक मित्र सत्य जीवन विद्या मंदिर संसार सुंदर पवन गगन नगर स्वयं';
      } else {
        title = `पाठ ${i}: तीनों पंक्तियों का द्रुत प्रवाह ड्रिल ${i - 50}`;
        subtitle = 'बिना शिफ्ट वाले सभी अक्षरों का संगम';
        description = 'लगातार और बिना रुके सभी पंक्तियों के अक्षरों से सार्थक शब्द बनाएँ।';
        text = 'सत्य और अहिंसा के मार्ग पर चलकर ही मानव जीवन सार्थक बनता है ज्ञान की ज्योति अमर है';
      }
    } else if (i <= 120) {
      // STAGE 2: Capitalization & Shift Mechanics (61-120)
      const sub = i - 60;
      if (sub <= 20) {
        title = `पाठ ${i}: शिफ्ट कुँजी से स्वतंत्र स्वर (अ, आ, इ, ई, उ, ऊ, ए, ऐ, ओ, औ)`;
        subtitle = 'Shift + D, E, F, R, G, T, S, W, A, Q';
        description = 'शिफ्ट दबाकर स्वतंत्र स्वरों का अभ्यास करें।';
        text = 'अ आ इ ई उ ऊ ए ऐ ओ औ अब आज इधर ईश्वर उधर ऊपर एक ऐसा और औरत अमर आशा';
      } else if (sub <= 40) {
        title = `पाठ ${i}: शिफ्ट कुँजी से महाप्राण व्यंजन (ख, घ, छ, झ, ठ, ढ, थ, ध, फ, भ, श, ष)`;
        subtitle = 'Shift + K, I, :, P, ", {, L, O, H, Y, M, <';
        description = 'महाप्राण व्यंजन और ऊष्म वर्णों का अभ्यास।';
        text = 'ख घ छ झ ठ ढ थ ध फ भ श ष फल घर धन थल छाया झंडा भाषा शांति शुभ ठीक धर्म';
      } else {
        title = `पाठ ${i}: संयुक्ताक्षर एवं विशेष वर्ण (क्ष, त्र, ज्ञ, श्र, ँ, ।)`;
        subtitle = 'Shift + 7, 6, 5, 8, X, .';
        description = 'क्ष (Shift+7), त्र (Shift+6), ज्ञ (Shift+5), श्र (Shift+8), पूर्ण विराम (।)';
        text = 'ज्ञान क्षमा त्रिशूल श्रम चाँद गाँव । सूर्य प्रकाश । विद्या धनं सर्वधनं प्रधानम् ।';
      }
    } else if (i <= 180) {
      // STAGE 3: Numbers & Basic Punctuation (121-180)
      const sub = i - 120;
      if (sub <= 30) {
        title = `पाठ ${i}: संख्या पंक्ति एवं शासकीय प्रारूप`;
        subtitle = '1 2 3 4 5 6 7 8 9 0 एवं दिनांक';
        description = 'दिनांक, समय, और अंकों का आधिकारिक प्रारूप में टंकण।';
        text = 'वर्ष 2026 में 85 प्रतिशत से अधिक शासकीय कार्य ऑनलाइन सम्पन्न हुए । क्रमांक 90210 दिनांक 15 अगस्त ।';
      } else {
        title = `पाठ ${i}: पूर्ण विराम, उद्धरण एवं संवाद शैली`;
        subtitle = 'संवाद एवं जटिल वाक्य रचना';
        description = 'गांधी जी ने कहा था: "सत्य ही ईश्वर है।" हमें समय का सदुपयोग करना चाहिए ।';
        text = 'शिक्षक ने कहा: "परिश्रम ही सफलता की एकमात्र कुंजी है ।" विद्यार्थी ने उत्तर दिया: "हम अवश्य सफल होंगे ।"';
      }
    } else if (i <= 240) {
      // STAGE 4: Extended Symbols & Functional Keys (181-240)
      const sub = i - 180;
      title = `पाठ ${i}: तकनीकी चिह्न एवं शासकीय संक्षेप (${sub})`;
      subtitle = 'हाइफ़न, कोष्ठक, एवं संक्षेप चिह्न';
      description = 'शासकीय आदेशों और नियमों में प्रयुक्त होने वाले विशेष चिह्नों का अभ्यास।';
      text = 'क्रमांक: प्रशा/2026-27 (गोपनीय) [अनुभाग-4]; विषय: ई-गवर्नेंस एवं टंकण दक्षता प्रशिक्षण शिविर ।';
    } else {
      // STAGE 5: Web Developer & Programmer Syntax in Hindi (241-300)
      const sub = i - 240;
      const devSnippetsHi = [
        '// डेटाबेस कनेक्शन एवं प्रमाणीकरण: const dbClient = await connectPool({ host: "localhost", port: 5432 });',
        '/* उपयोगकर्ता प्रपत्र सत्यापन */ function validateForm(payload) { return payload.isValid && payload.score >= 95; }',
        '// हिंदी इनस्क्रिप्ट मैपर लॉजिक: const inscriptNormalMap = { k: "क", j: "र", l: "त", h: "प", f: "ि" };',
        'SELECT कर्मचारी_आईडी, नाम, पद, वेतन FROM कर्मचारी_विवरण WHERE विभाग = "आई_टी" ORDER BY वेतन DESC;',
        'const response = await fetch("/api/v1/hindi-lessons", { method: "POST", headers: { "Content-Type": "application/json" } });',
        '<div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">',
        'export const computeAccuracy = (total, errors) => Math.max(0, Math.round(((total - errors) / total) * 100));',
      ];
      const snippet = devSnippetsHi[(sub - 1) % devSnippetsHi.length];
      title = `पाठ ${i}: द्विभाषी कोडिंग एवं डेवलपर सिंटैक्स (${sub})`;
      subtitle = 'प्रोग्रामर इनस्क्रिप्ट एवं कोड अभ्यास';
      description = 'प्रोग्रामिंग चिह्नों ({ }, [], =>, ===) के साथ द्विभाषी टिप्पणियाँ और कोड स्निपेट्स।';
      text = snippet;
      targetWpm = 25 + Math.floor(sub / 10) * 2;
      minAccuracy = 95;
    }

    lessons.push({
      id: `hi-${i}`,
      level: i,
      stageId: stage.id,
      stageName: stage.hindiName,
      title,
      subtitle,
      description,
      text,
      targetWpm,
      minAccuracy,
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
