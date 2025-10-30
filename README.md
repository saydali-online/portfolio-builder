# SaydaliOnline Portfolio Builder (Full-Stack)

A production-ready scaffold to build a pharmacist Portfolio Builder without Frontly, using standard web tech:

- **Frontend**: HTML + TailwindCSS (CDN) + Vanilla JavaScript (fetch API)
- **Backend**: Node.js + Express + Prisma ORM
- **DB**: SQLite by default (can switch to PostgreSQL)
- **Auth**: JWT (HTTP-only cookies), bcrypt password hashing
- **Features**: Free vs Premium fields, public profile pages (handle-based), image/file upload (local adapter with S3 adapter stub), analytics events, i18n labels (Arabic/English)

## Quick Start

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
# (Optional) edit CORS_ORIGIN to match your frontend origin
npm install
npm run prisma migrate dev -- --name init
npm run dev
```

### 2. Frontend (Static, no build step needed)

Open `frontend/public/index.html` in a local server, e.g.:

```bash
python3 -m http.server 5173 --directory frontend/public
```

Or use any static server.

Open http://localhost:5173 (or your static server URL), register/login, edit your portfolio, Save, then click **View Public Profile**.

## Directory Structure

```
portfolio-builder/
├─ backend/
│  ├─ src/
│  │  ├─ index.ts
│  │  ├─ env.ts
│  │  ├─ prisma.ts
│  │  ├─ middleware/
│  │  │  ├─ auth.ts
│  │  │  └─ error.ts
│  │  ├─ routes/
│  │  │  ├─ auth.ts
│  │  │  ├─ users.ts
│  │  │  ├─ portfolio.ts
│  │  │  ├─ uploads.ts
│  │  │  └─ public.ts
│  │  ├─ services/
│  │  │  ├─ user.service.ts
│  │  │  ├─ portfolio.service.ts
│  │  │  └─ upload.service.ts
│  │  └─ utils/
│  │     ├─ jwt.ts
│  │     └─ validators.ts
│  ├─ prisma/
│  │  └─ schema.prisma
│  ├─ package.json
│  ├─ tsconfig.json
│  └─ .env.example
├─ frontend/
│  ├─ public/
│  │  ├─ index.html
│  │  ├─ profile.html
│  │  ├─ styles.css
│  │  └─ app.js
│  └─ vite.config.js (optional)
└─ README.md
```

## Features

- **User Authentication**: Register and login with email/password
- **Portfolio Management**: Create and edit your public portfolio
- **Public Profiles**: Share your portfolio with a unique handle
- **Free vs Premium**: Different features based on account type
- **File Uploads**: Upload images and files
- **Responsive Design**: Mobile-friendly interface with TailwindCSS

## Upgrading to Premium Rules

- On the frontend, hide/show extra fields based on `accountType` value.
- On the backend, enforce limits (e.g., FREE cannot attach more than 2 links, PREMIUM unlimited).
- Add Stripe for upgrades: create `/billing/create-checkout-session` that returns a Stripe Checkout URL; on success webhook, set `accountType=PREMIUM`.

## Arabic/English Labels (Example)

Use bilingual placeholders (simple approach) or add an i18n map:

```js
const i18n = {
  en: { fullName: 'Full Name', specialization: 'Specialization', bio: 'Bio' },
  ar: { fullName: 'الاسم الكامل', specialization: 'التخصص', bio: 'نبذة' }
};
```

## Security Notes

- Use HTTPS in production; set `SameSite=None; Secure` for cookies.
- Add rate limiting (e.g., `express-rate-limit`).
- Validate all inputs (already using Zod models); extend as needed.
- If switching to Postgres, update `.env` and `schema.prisma` datasource provider.

## Next Steps

- Add image uploads for avatar/cover (already scaffolded `/upload/image`).
- Add Services/Products repeaters (store JSON in `Portfolio.links` or new tables).
- Add analytics events (page views per profile).
- Add search page to discover public portfolios (filter by country/specialization).

