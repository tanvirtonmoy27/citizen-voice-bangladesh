# 🇧🇩 Citizen Voice Bangladesh — AI-Powered Smart Governance Platform

A production-quality, enterprise-level frontend demo of a national digital platform where citizens report public problems, government departments manage complaints, and AI helps classify, prioritize, assign, and analyze reports — supporting the vision of **Smart Bangladesh**.

> © Tanvir Islam Tonmoy. Built as a full-stack-style frontend demo with realistic mock data, client-side AI simulation, and a role-based dashboard system.

---

## ✨ Highlights

- **4 user roles** — Citizen, Government Officer, Department Admin, Super Admin — each with a tailored dashboard.
- **AI simulation engine** — automatic category detection, priority scoring, department routing, duplicate detection, spam scoring, AI-generated summaries, and an AI chat assistant — all running client-side with transparent, explainable logic (`src/utils/ai.ts`).
- **Interactive GIS map** — Leaflet-powered map with status-colored markers, filters by district/category/status/department.
- **Complaint lifecycle** — submission → AI analysis → tracking code + QR code → officer assignment → status updates → before/after photos → PDF export.
- **Public Transparency Portal** — no login required, shows real department resolution rates and public complaint history.
- **Emergency & Disaster Response modules** — one-tap emergency calling, flood/cyclone alerts, shelter map, relief tracker, volunteer registration, missing person board.
- **Bangla & English** — full UI translation via a lightweight i18n context.
- **Dark mode & High Contrast mode**, mobile-first responsive layout.
- **Realistic Bangladeshi mock data** — 24 districts across 8 divisions, upazilas, 14 complaint categories, 11 government departments, 70+ generated complaints, citizens, and officers — all deterministic (seeded), so the demo looks the same on every load, and persists your edits (new reports, upvotes, comments, status changes) in `localStorage`.

## 🧱 Tech Stack

- **React 19 + TypeScript + Vite**
- **Tailwind CSS v4**
- **React Router (HashRouter — GitHub Pages friendly)**
- **Leaflet / react-leaflet** for maps
- **Recharts** for analytics charts
- **jsPDF** for complaint PDF export
- **qrcode.react** for QR codes
- **lucide-react** for icons

## 📁 Project Structure

```
src/
  components/     Reusable UI (Navbar, Footer, ComplaintCard, Badges, ChatWidget, LocationPicker...)
  context/        LanguageContext, ThemeContext, AuthContext, DataContext (complaint store)
  data/           Mock data: districts, categories, departments, generated complaints/citizens/officers
  i18n/           Bangla/English translation strings
  layouts/        PublicLayout, DashboardLayout (role-based sidebar)
  pages/          Public pages (Home, Report, Map, Transparency, Emergency, Disaster...)
  pages/dashboard Role-based dashboard pages (Overview, Queue, Analytics, Manage Users...)
  utils/          AI engine, PDF generator, formatters, Leaflet icon helpers
```

## 🚀 Getting Started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

Requires Node.js 18+.

## 🎮 Using the Demo

- Visit `/report` to file a complaint — fill in the title/description (or tap **Voice to Text**), pick a district and pin a location on the map, optionally attach images, then tap **Run AI Analysis** to see the AI's category, priority, department routing, duplicate check, and spam score before submitting.
- Visit `/login` and pick any of the four roles to explore that role's dashboard — no real credentials needed, this is a UI demo.
- Visit `/track` and search any generated tracking code (e.g. shown on the homepage cards) to view a full complaint detail page with timeline, QR code, and PDF export.
- Visit `/transparency` for the public, no-login view of all complaints and department performance.

## 🌐 Deploying to GitHub Pages

This repo includes a ready-to-use GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys the site automatically.

1. Push this repository to GitHub.
2. In your repository settings, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to the `main` branch (or run the workflow manually from the **Actions** tab).
4. Your site will be published at `https://<your-username>.github.io/<repo-name>/`.

The app uses a relative Vite `base: './'` and `HashRouter`, so it works correctly regardless of the repository name or subpath — no extra configuration needed.

### Manual deployment

```bash
npm run build
# then publish the contents of ./dist to any static host
```

## 📌 Notes on Scope

This is a **frontend demonstration platform**. There is no real backend, authentication, or persistence beyond the browser's `localStorage` — by design, so it can be deployed as a static site on GitHub Pages. All AI features (classification, priority, duplicate detection, spam scoring, chat assistant) run as transparent, explainable client-side heuristics rather than calls to a hosted model, so the demo works fully offline once loaded (aside from map tiles and demo images).

---

Made with ❤️ for a more transparent, responsive, and citizen-first Bangladesh.
