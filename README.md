# Ordinary Ghost Agency — Website

## Setup (run in VS Code terminal)
```
npm install
npm run dev
```
Then open http://localhost:5173

## Pages
- `/` — Home (hero w/ live iRepair embed, value props, services, proof, process/pricing, CTA)
- `/work` — iRepair case study
- `/contact` — Contact form + FAQ

## What's built
- Full navbar (desktop + mobile menu) and footer, wired with React Router
- Smoke intro animation (2.4s, plays once per session)
- Design tokens: gold/black palette, Clash Display + General Sans + JetBrains Mono
- Glassmorphism cards, gold glow hover states throughout

## Still needs (before going live)
- Contact form isn't wired to send anywhere yet — hook it up to Formspree, EmailJS, or your FastAPI backend
- WhatsApp number in Contact page is a placeholder — swap in your real number
- Agency email in Contact page (hello@ordinaryghostagency.com) — update once your real email is live
- Review iRepair iframe embed in Home hero — some sites block being iframed (X-Frame-Options); test it and swap for a screenshot/video if it doesn't load
