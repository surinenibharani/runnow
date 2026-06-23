# RunNow

A beautiful, beginner-friendly running website built with Next.js, Tailwind CSS, shadcn/ui, and Framer Motion. Help people go from couch to 5K in 8 weeks.

## Features

- **Landing page** — Hero, features, how-it-works, testimonials, and CTA
- **8-week beginner plan** — Couch-to-5K style walk-run intervals
- **Progress tracking** — Check off workouts, streak counter (saved in browser)
- **Tips page** — Practical advice for new runners
- **Smooth animations** — Framer Motion scroll and interaction animations

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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
