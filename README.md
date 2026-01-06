# Bright Service Solution (BSS) Website

Multi-page website + MySQL-backed form storage + admin dashboard + multilingual support + optional Stripe payments + WhatsApp auto-reply integration (Twilio).

## 1) Run locally
```bash
npm install
npm run dev
```

## 2) Deploy to Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

### Required Netlify environment variables
**Database**
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

**Admin**
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

**Email notifications (optional but recommended)**
- `SMTP_HOST`
- `SMTP_USER`
- `SMTP_PASS`
- `ADMIN_NOTIFY_EMAIL`  (where notifications should go)

**Stripe (optional; only if you enable paid services later)**
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_ID`
- `SITE_URL`  (e.g. https://your-site.netlify.app)

**Twilio WhatsApp (optional; for auto-reply + inbound webhook)**
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_WHATSAPP_FROM` (e.g. whatsapp:+14155238886)
- `TWILIO_WHATSAPP_TO`   (your business number in WhatsApp format)

## 3) MySQL setup
Run `docs/mysql-schema.sql` in your MySQL server.

## 4) Admin dashboard
Go to `/admin` and login with the credentials set in Netlify env vars.

## 5) Payments (optional)
Stripe function is included. It stays disabled until you set Stripe env vars.

## 6) WhatsApp auto-reply
Auto-reply requires WhatsApp Business (simple) or Twilio WhatsApp API (advanced).
- For Twilio: point the webhook to `/.netlify/functions/whatsappWebhook`.
