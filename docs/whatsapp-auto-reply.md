# WhatsApp Auto-Reply

## Option A (Simple): WhatsApp Business App
1. Install WhatsApp Business
2. Go to Business tools → Away message / Greeting message
3. Set message:
   "Thank you for contacting Bright Service Solution (BSS). We have received your message and will respond shortly."

## Option B (Advanced): Twilio WhatsApp API
- Configure Twilio WhatsApp number
- Set webhook to:
  `https://YOUR-NETLIFY-SITE/.netlify/functions/whatsappWebhook`
- Set Netlify env vars:
  `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM`
