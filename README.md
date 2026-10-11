# Aditya Patel — Portfolio (with working contact backend)

Static site in `public/` plus a small Node backend (`api/contact.js`) that emails you each contact-form message.

## Folder map
- `public/` — the website (index.html, css/, js/, assets/)
- `api/contact.js` — contact endpoint (validation, spam checks, sends the email via SMTP)
- `server.js` — local server for development
- `vercel.json` — tells Vercel to serve `public/`
- `.env.example` — the settings you must provide

## 1. Get a Gmail app password (to send mail)
1. Turn on 2-Step Verification for the Gmail account you will send from.
2. Google Account -> Security -> App passwords -> create one. Copy the 16 characters.

## 2. Run locally
```
npm install
copy .env.example .env      (Mac/Linux: cp .env.example .env)
```
Edit `.env` (SMTP_USER = your Gmail, SMTP_PASS = the app password, CONTACT_TO = where messages go), then:
```
npm run dev
```
Open http://localhost:3000 and send a test message.

## 3. Deploy on Vercel
1. Push this folder to GitHub, import it in Vercel (framework: "Other", no build command).
2. Project Settings -> Environment Variables: add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO.
3. Redeploy. The form posts to `/api/contact` on the same domain.
Never commit `.env`; it is in `.gitignore`.

## How the form is protected
Server-side validation, hidden honeypot field, a "submitted too fast" check, a per-IP limit of 5 messages per hour (best-effort on serverless), HTML-escaped email body, header-injection protection. The page shows "sent" only after the server confirms.

## Troubleshooting
- "The contact service is not set up yet": environment variables are missing.
- "could not be sent": usually a wrong app password or a Gmail security block; check the server log.
