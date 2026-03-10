# Md. Mahfuzul Islam Portfolio (Admin-Managed)

This is a Next.js + TypeScript + Tailwind + Framer Motion portfolio website with:

- Public portfolio pages (`/`, `/about`, `/projects`, `/research`, `/experience`, `/resume`, `/contact`)
- Secure admin authentication
- Admin CMS panel for full content control
- Local backend persistence using validated JSON storage

## Admin Security Model

- Argon2 password verification (`@node-rs/argon2`)
- Signed HttpOnly session cookie (`jose` JWT, 8-hour session)
- Rate-limited login attempts
- Admin/API route guarding
- Security headers through `middleware.ts`
- Strict server-side schema validation (`zod`) on content updates

## Local Run

1. Install dependencies

```bash
npm install
```

2. Create environment file

```bash
copy .env.example .env
```

3. Generate admin password hash

```bash
npm run admin:hash -- YourStrongPasswordHere
```

4. Put generated hash in `.env`:

- `SESSION_SECRET=<long-random-string>`
- `ADMIN_USERNAME=<your-admin-username>`
- `ADMIN_PASSWORD_HASH=<argon2-hash>`

5. Start dev server

```bash
npm run dev
```

6. Open:

- Public site: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`
- Admin panel: `http://localhost:3000/admin`

## Content Management

- Admin panel provides a full JSON editor for the portfolio content schema.
- All updates are validated before writing.
- Content is stored locally at:

`data/portfolio-content.json`

## Important

- Default local credentials in `.env` should be changed immediately.
- Never commit `.env` with real secrets.
- For production, use a stronger deployment-grade session secret and HTTPS.
