# Abhishek Sahani — engineering portfolio

Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, and Lucide. All portfolio content is local to the project; no accounts, tracking, or database are required.

## Setup

Use Node 24 and pnpm (see `packageManager` in package.json). Install with `pnpm install --frozen-lockfile`, then use `pnpm dev` for development. Run `pnpm build` for the type-checked production build and `pnpm start` to serve it locally.

## Personalize before sharing

- Edit `lib/portfolio.ts` for email, HTTPS social URLs, education, skills, career details, and project source/demo URLs. Leave unknown values empty: no fake external links are rendered.
- The hero uses the supplied workstation photo URL. To replace it, update `profile.portrait` in `lib/portfolio.ts` and its alt text in `components/hero.tsx`. For a new external URL, update `images.remotePatterns` in `next.config.mjs`.
- Replace `public/resume.pdf` to update the downloadable resume. The starter PDF uses only the supplied career details.
- The contact form validates fields and opens the visitor’s mail app when an email address is configured. The visitor sends the message from that app. With no address it offers a copyable draft; it does not transmit or store submissions.
- Metadata and the brand mark live in `app/layout.tsx` and `public/mark.svg`.

## Deploy on Vercel

Use Publish in v0, or connect the project’s Git repository to Vercel using the Next.js preset. Keep the project root as the root directory and the default build and output settings. No environment variables are required. After deployment, check the production URL, resume download, and configured contact links.
