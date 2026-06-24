# RunNow

A beautiful, beginner-friendly running website built with Next.js, Tailwind CSS, shadcn/ui, and Framer Motion. Help people go from couch to 5K in 8 weeks.

## Features

- **Training plans** — 5K, half marathon, and marathon with multiple durations
- **Custom schedule** — Pick rest day and long run day; cross-training on off days
- **User accounts** — Sign up / log in with email and password
- **Strava integration** — Sync runs, streaks, HR-based suggestions, route comparisons
- **Progress tracking** — Check off plan workouts (saved in browser)
- **Tips page** — Practical advice for new runners

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [NextAuth.js v5](https://authjs.dev/) — authentication
- [Prisma](https://www.prisma.io/) + SQLite (local) / PostgreSQL (production)
- [Strava API](https://developers.strava.com/) — activity sync
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)

## Getting Started

```bash
npm install
cp .env.example .env
# Edit .env — set AUTH_SECRET and optional Strava keys
npx prisma migrate dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | `file:./dev.db` for local SQLite |
| `AUTH_SECRET` | Random string — `openssl rand -base64 32` |
| `AUTH_URL` | `http://localhost:3000` (your site URL in prod) |
| `STRAVA_CLIENT_ID` | From [Strava API settings](https://www.strava.com/settings/api) |
| `STRAVA_CLIENT_SECRET` | Strava app secret |

### Strava setup

1. Create an app at [strava.com/settings/api](https://www.strava.com/settings/api)
2. Set **Authorization Callback Domain** to `localhost` (dev) or your domain (prod)
3. Add `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET` to `.env`
4. Sign up → **Dashboard** → **Connect Strava** → **Sync Strava**

### Accounts & dashboard

- **Sign up** at `/signup` (include age for heart rate zone tips)
- **Dashboard** at `/dashboard` shows:
  - Run streak (from Strava sync)
  - Coaching suggestions (HR, run type, weekly volume)
  - Same-route comparisons (pace, duration, HR vs previous run)
  - Recent synced activities

> Strava does not expose age via API — add it in signup or on the dashboard for accurate HR zones.

## Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial RunNow website"
git remote add origin https://github.com/YOUR_USERNAME/runnow.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Import your `runnow` repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Your site will be live at `runnow.vercel.app` (or similar)

### 3. Connect Your Cloudflare Domain

#### Buy a domain on Cloudflare

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Domain Registration → Register Domains**
3. Search for your domain (e.g. `runnow.app`, `startrunning.today`)
4. Complete purchase

#### Point domain to Vercel

**In Vercel:**

1. Open your project → **Settings → Domains**
2. Add your domain (e.g. `runnow.app` and `www.runnow.app`)
3. Vercel shows the DNS records you need

**In Cloudflare:**

1. Go to your domain → **DNS → Records**
2. Add the records Vercel provides:

| Type  | Name | Content              | Proxy     |
|-------|------|----------------------|-----------|
| A     | @    | `76.76.21.21`        | DNS only  |
| CNAME | www  | `cname.vercel-dns.com` | DNS only |

> **Important:** Set proxy status to **DNS only** (grey cloud) for Vercel domains. Orange cloud proxy can cause SSL issues.

3. Wait 5–30 minutes for DNS propagation
4. Vercel will automatically provision SSL

#### Optional: Redirect www to apex

In Vercel domain settings, set `www.runnow.app` to redirect to `runnow.app`.

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Landing page
│   ├── plan/page.tsx     # 8-week plan with tracker
│   ├── tips/page.tsx     # Beginner tips
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Theme & styles
├── components/
│   ├── landing/          # Landing page sections
│   ├── layout/           # Navbar, footer
│   ├── plan/             # Plan tracker
│   ├── motion/           # Animation wrappers
│   └── ui/               # shadcn/ui components
└── lib/
    ├── plan-data.ts      # 8-week workout data
    └── progress.ts       # localStorage progress
```

## Customization

- **Brand colors** — Edit CSS variables in `src/app/globals.css`
- **Plan workouts** — Edit `src/lib/plan-data.ts`
- **Tips content** — Edit `src/app/tips/page.tsx`
- **Metadata/SEO** — Edit `src/app/layout.tsx`

## License

MIT
