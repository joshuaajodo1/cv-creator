# CVCraft — Professional CV Creator

A full-featured CV builder with **7 distinct templates**, photo upload, PDF export, and print support.

## Features
- 📋 Multi-step form (Personal Info → Experience → Education → Skills → Template → Export)
- 🎨 7 professional CV templates (Executive, Minimalist, Editorial, Creative, Tech, Elegant, Corporate)
- 📸 Profile photo upload
- ⭐ Skill proficiency rating
- 🌍 Languages & certifications sections
- ⬇️ PDF download via html2pdf.js
- 🖨️ Direct browser print
- 📱 Responsive form (mobile-friendly)

## Quick Start

```bash
npm install
npm start
```

## Deploy to Vercel

### Option A — Vercel CLI (Recommended)
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option B — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Framework: **Create React App**
5. Build Command: `npm run build`
6. Output Directory: `build`
7. Click **Deploy**

## Project Structure
```
cv-creator/
├── public/
│   └── index.html          # Google Fonts loaded here
├── src/
│   ├── App.js              # Main app, all steps, form logic
│   ├── index.js            # React entry point
│   ├── index.css           # Global styles
│   └── templates/
│       └── Templates.js    # All 7 CV template components
├── package.json
└── vercel.json             # Vercel deployment config
```

## Templates
| # | Name | Style | Best For |
|---|------|-------|----------|
| 1 | Executive Classic | Dark sidebar, serif | Senior roles, finance, law |
| 2 | Modern Minimalist | Clean, red accents | Most industries |
| 3 | Editorial Bold | Magazine style | Marketing, media |
| 4 | Studio Creative | Colorful, card-based | Design, creative |
| 5 | Tech Professional | Dark/terminal | Developers, engineers |
| 6 | Elegant Serif | Soft, italic | Academia, writing |
| 7 | Corporate Clean | ATS-safe, simple | Corporate, government |
