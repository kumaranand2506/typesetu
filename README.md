# TypeSetu (टाइपसेतु) | Bilingual InScript & English Touch Typing Tutor & Literature Practice

> **100% Free • Anonymous Usage • BIS Hindi InScript Standard • TypeLit-Inspired Literature • Google AdSense & Adsterra Ready • Zero Hosting Cost**

---

## 🌟 Core Features

1. **Bilingual Typing on a Single Page**:
   - **Hindi (हिंदी InScript)**: Official Bureau of Indian Standards (BIS) layout required for MP CPCT, SSC CGL/CHSL, High Court, and all government exams.
   - **English (QWERTY)**: Step-by-step touch typing from Home row to speed benchmarks.
   - Dual Input Modes for Hindi:
     - **Built-in InScript Mapper (Default)**: Automatically translates keystrokes on standard English keyboards into Hindi InScript letters without needing any Windows language setup!
     - **Native OS Keyboard**: Toggleable for users who have Windows InScript enabled.

2. **Learn Typing Section (Inspired by edclub / TypingClub & TypingBaba)**:
   - 14 Structured Hindi InScript Levels + 12 English Levels.
   - Real-time **10-Finger Interactive Hand Display**: Visual color-coded hands highlighting the exact finger to press.
   - **Interactive Virtual Keyboard**: Shows English keys + Hindi InScript letters + finger dots + active pulsing key ring.
   - Shift key detection ("Hold Shift" cue when capital or shifted characters are expected).
   - Zero-latency mechanical key click sounds, mistake buzzers, and level completion fanfares (Web Audio API, muteable).
   - 1 to 3 Star Ratings & WPM/Accuracy/CPM tracking.

3. **Practice Room (Inspired by TypeLit.io)**:
   - Fluid, book-reading typing atmosphere.
   - Rich library of classic literature, fables, and official exam drills:
     - **मुंशी प्रेमचंद**: *ईदगाह*, *नमक का दारोगा*
     - **विष्णु शर्मा**: *पंचतंत्र (शेर और चतुर खरगोश)*
     - **संत कबीरदास**: *अमर दोहे*
     - **Lewis Carroll**: *Alice's Adventures in Wonderland*
     - **Sir Arthur Conan Doyle**: *The Adventures of Sherlock Holmes*
     - **Jane Austen**: *Pride and Prejudice*
     - **Swami Vivekananda**: *Parliament of Religions (1893)*
     - **Govt Mock Exam Passages**: CPCT, SSC, Court Steno drills.
   - **Custom Text Practice**: Paste ANY custom passage or article to practice typing.
   - Optional Zen Mode (toggle keyboard guide on/off).

4. **Anonymous Usage & Gamification**:
   - Zero login or account creation required.
   - 8 Unlockable Achievement Badges (First Keystroke, Perfectionist, Speedster 30 WPM, Lightning 50 WPM, InScript Scholar, Bookworm, etc.).
   - Confetti bursts & fanfare on badge unlocks.
   - All progress saved locally in browser `localStorage`.
   - 1-click JSON backup/export and reset.

5. **Monetization & Ad Integration (Google AdSense & Adsterra)**:
   - Dedicated ad unit positions: Header Leaderboard (728x90), In-Lesson Banner, Post-Test Completion Card.
   - In-app **Monetization Settings Modal**: Easily input your Google AdSense Publisher ID (`ca-pub-XXXXXXXX`) or Adsterra code.
   - Google AdSense Compliance Pages built-in: About Us, Privacy Policy (GDPR/CCPA compliant), Terms of Service, Contact Us.
   - `public/ads.txt` auto-generator included.

---

## 🚀 How to Run Locally

```bash
# In d:\typing:
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

---

## ☁️ How to Deploy for 100% FREE (Zero Hosting Cost Forever)

### Option A: Deploy to Vercel (Recommended - Fastest & Easiest)
1. Push this folder to your free [GitHub](https://github.com) account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of TypeSetu"
   git remote add origin https://github.com/<your-username>/typesetu.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in with GitHub (Free plan).
3. Click **Add New Project**, select `typesetu`, and click **Deploy**.
4. Within 30 seconds, your site is live with a free SSL domain like `https://typesetu.vercel.app`!

### Option B: Deploy to Cloudflare Pages ($0 Forever, Unlimited Bandwidth)
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) > **Pages**.
2. Connect your GitHub repository.
3. Build command: `npm run build`, Output directory: `dist`.
4. Your site is live at `https://typesetu.pages.dev`!

---

## 💰 Monetization Guide: Google AdSense vs Adsterra

| Feature | Google AdSense | Adsterra |
|---|---|---|
| **Domain Requirement** | Requires a custom domain (`.in` or `.com`) | **Works on free `.vercel.app` / `.pages.dev` URLs!** |
| **Approval Time** | 2-7 days review | **Instant (5 to 10 minutes)** |
| **Minimum Traffic** | Moderate | None ($0 budget friendly) |
| **Payment Options** | Direct Bank Transfer | Bank, Paxum, PayPal, WebMoney, Crypto |

### How to use Google AdSense:
1. Buy a low-cost domain (e.g. `.in` domain on Namecheap / Hostinger for ~₹399/year).
2. Attach it to your Vercel project (Settings > Domains > Add `yourdomain.in`).
3. Apply for Google AdSense with your custom domain.
4. Once approved, open TypeSetu's in-app **Earn / Ads** button and enter your `ca-pub-XXXXXXXXXXXX` Publisher ID and Slot IDs.
5. Update `public/ads.txt` with your publisher ID.

### How to use Adsterra (100% Free with $0 Spent):
1. Sign up for a free publisher account at [adsterra.com](https://adsterra.com).
2. Add your free Vercel URL (e.g. `https://typesetu.vercel.app`).
3. Create a 728x90 banner or Native banner unit.
4. Paste the unit key into TypeSetu's in-app **Earn / Ads** modal and click Save!
