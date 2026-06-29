# LetsRunNow

A beautiful, beginner-friendly running website built with Next.js, Tailwind CSS, shadcn/ui, and Framer Motion. Help people go from couch to 5K in 8 weeks.

## Features

- **Training plans** — 5K, half marathon, and marathon with multiple durations
- **Custom schedule** — Pick rest day and long run day; cross-training on off days
- **User accounts** — Sign up / log in with email and password
- **Strava integration** — Sync runs, streaks, HR-based suggestions, route comparisons
- **Progress tracking** — Check off plan workouts (synced to your account when logged in)
- **Tips page** — Practical advice for new runners

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [NextAuth.js v5](https://authjs.dev/) — authentication
- [Prisma](https://www.prisma.io/) + PostgreSQL (Neon, Vercel Postgres, or local)
- [Stripe](https://stripe.com/) — coach subscriptions
- [Strava API](https://developers.strava.com/) — activity sync
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)

## Getting Started

```bash
npm install
cp .env.example .env
# Edit .env — set DATABASE_URL, AUTH_SECRET, and optional Strava/Stripe keys
npx prisma migrate dev
npm run dev
```

### Database (PostgreSQL)

This project uses **PostgreSQL** everywhere (local and production). Easiest options:

1. **[Neon](https://neon.tech)** (free tier) — create a project, copy the connection strings
2. **Vercel Postgres** — add from your Vercel project → Storage
3. **Docker** — `docker run -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres`

Set both env vars (for Neon, use the **pooled** URL for `DATABASE_URL` and the **direct** URL for `DIRECT_URL`; locally they can be the same):

```bash
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

Then run migrations:

```bash
npx prisma migrate dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (pooled on serverless) |
| `DIRECT_URL` | Direct PostgreSQL URL for Prisma migrations |
| `AUTH_SECRET` | Random string — `openssl rand -base64 32` |
| `AUTH_URL` | `http://localhost:3000` (your site URL in prod) |
| `NEXT_PUBLIC_SITE_URL` | Public URL for SEO (sitemap, canonical links) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID (`G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (captcha) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key |
| `STRAVA_CLIENT_ID` | From [Strava API settings](https://www.strava.com/settings/api) |
| `STRAVA_CLIENT_SECRET` | Strava app secret |
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_...` or `sk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | From Stripe webhook endpoint (`whsec_...`) |
| `STRIPE_COACH_PRICE_ID` | Recurring price ID for coach plan (`price_...`) |
| `BLOG_PREVIEW_SECRET` | Optional. Secret for `?preview=` links to read scheduled blog posts on production |

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

### Coach teams & Stripe

1. Create a **recurring product** in [Stripe Dashboard](https://dashboard.stripe.com/products) (e.g. “Coach plan”)
2. Copy the **Price ID** → `STRIPE_COACH_PRICE_ID`
3. Add webhook endpoint: `https://yourdomain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy webhook signing secret → `STRIPE_WEBHOOK_SECRET`
5. Coaches go to **Teams** → **Subscribe as coach** → create teams and approve athletes

Without Stripe keys, local dev falls back to the demo activate endpoint on checkout.

### Training plan sync

- Logged-in users: progress on `/plan` syncs to the database via `/api/user/training-plan`
- First login merges any existing browser `localStorage` progress into the account
- Guests still use `localStorage` until they sign in

## SEO & security

- **Sitemap** — auto-generated at `/sitemap.xml`
- **Robots** — `/robots.txt` blocks `/api/` and `/dashboard` from crawlers
- **Structured data** — JSON-LD for organization, website, and blog articles
- **Security headers** — CSP, HSTS, X-Frame-Options, nosniff, and more via `next.config.ts`
- **Rate limiting** — registration and blog comments limited per IP
- **Captcha** — Cloudflare Turnstile on signup and anonymous blog comments ([create keys](https://dash.cloudflare.com/?to=/:account/turnstile))
- **Honeypot fields** — hidden spam traps on signup and comment forms

## Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial LetsRunNow website"
git remote add origin https://github.com/YOUR_USERNAME/letsrunnow.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Import your `letsrunnow` repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Your site will be live at `letsrunnow.vercel.app` (or similar)

### 3. PostgreSQL on Vercel

1. In your Vercel project → **Storage** → create **Neon** or **Postgres** database
2. Vercel auto-sets `DATABASE_URL` — also add `DIRECT_URL` (Neon provides both)
3. Add remaining env vars from `.env.example` (Auth, Strava, Stripe, GA, Turnstile)
4. Redeploy — `vercel-build` runs `prisma migrate deploy` automatically

### 4. Connect Your Cloudflare Domain

#### Buy a domain on Cloudflare

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Domain Registration → Register Domains**
3. Search for your domain (e.g. `letsrunnow.app`, `startrunning.today`)
4. Complete purchase

#### Point domain to Vercel

**In Vercel:**

1. Open your project → **Settings → Domains**
2. Add your domain (e.g. `letsrunnow.app` and `www.letsrunnow.app`)
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

In Vercel domain settings, set `www.letsrunnow.app` to redirect to `letsrunnow.app`.

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
