# NZK Techs backend (Node.js + Express + MongoDB)

Run these commands inside the `server` folder.

1. Install packages:   `npm install`
2. Open `.env` and set: `MONGODB_URI`, `ADMIN_USER`, `ADMIN_PASSWORD`, `SESSION_SECRET`,
   `SMTP_USER`, `SMTP_PASS` (Gmail App Password), `TEAM_EMAIL`
3. Start:              `npm run dev`
4. Website:            http://localhost:5000
5. Admin panel:        http://localhost:5000/admin

## What happens when a visitor submits the contact form
1. Data is validated and saved in MongoDB (`nzktechs` > `contacts`).
2. Visitor receives a branded confirmation email (brown / white / black) with only their name.
3. Team receives a notification email with full details + "Open in Admin Panel" button.
4. Entry appears in the Admin Panel.
If email is not configured, the form still works and data is still saved.

## Admin panel
Login, stats, search, status filter (New / Read / Replied), internal notes, delete, WhatsApp shortcut, CSV export (Excel).
Session is a signed HttpOnly cookie (8 hours). Login is rate-limited.

## Gmail App Password
Google Account > Security > enable 2-Step Verification > App passwords > create one > paste in `SMTP_PASS`.

## Before going live
Change ADMIN_PASSWORD and SESSION_SECRET, set PUBLIC_URL to your domain, run behind HTTPS and set `NODE_ENV=production`.
Never upload `.env` to GitHub.
