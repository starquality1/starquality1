# Esther Speaks: Get Into Tech Companion

A step-by-step career system for people breaking into tech. Built with Next.js 14. No API calls. No backend required.

---

## Tools included

1. **Role Matcher** — 9-question scoring system recommending: Business Analyst, Data Analyst, Tech Sales (SDR/BDR), Project Coordinator, or Project Manager
2. **CV Bullet Translator** — transforms job responsibilities into tech-aligned, action-driven bullet points
3. **JD Analyser** — keyword analysis on any job description, returns APPLY / STRETCH / SKIP verdict
4. **Readiness Check** — 6-point assessment, tells the user exactly what to fix before applying

All logic runs locally. No API calls. Works on any hosting platform.

---

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

Connect this repository to [vercel.com](https://vercel.com). Vercel auto-detects Next.js and deploys with zero configuration.

---

## Project structure

```
esther-speaks-get-into-tech-companion/
├── app/
│   ├── globals.css        # Global styles and font import
│   ├── layout.js          # HTML shell and page metadata
│   └── page.js            # Entry point
├── components/
│   ├── TechCareerApp.jsx  # Main app shell and navigation
│   ├── Welcome.jsx        # Landing screen
│   ├── RoleMatcher.jsx    # Tool 1: Role scoring
│   ├── CVTranslator.jsx   # Tool 2: CV bullet transformation
│   ├── JDAnalyser.jsx     # Tool 3: Job description analysis
│   ├── ReadinessCheck.jsx # Tool 4: Application readiness
│   ├── Dashboard.jsx      # Progress hub
│   └── ui.jsx             # Shared UI atoms
├── lib/
│   └── logic.js           # All scoring and analysis logic
├── public/                # Static assets (empty by default)
├── .gitignore
├── next.config.js
├── package.json
└── README.md
```

---

## Brand

Navy `#1B2A4A` · Gold `#C9A84C` · Cream `#FAF6EF`

© Esther Speaks | estherspeaksofficial.com
