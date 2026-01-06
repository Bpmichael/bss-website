/**
 * Twilio WhatsApp inbound webhook for auto-reply.
 * Set your Twilio WhatsApp webhook to:
 *   https://YOUR_SITE/.netlify/functions/whatsappWebhook
 */
exports.handler = async (event) => {
  try {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_WHATSAPP_FROM;

    if (!sid || !token || !from) {
      return { statusCode: 400, body: "Twilio WhatsApp not configured." };
    }

    // Twilio sends form-encoded body
    const params = new URLSearchParams(event.body || "");
    const incomingFrom = params.get("From");
    const body = params.get("Body") || "";

    const client = require("twilio")(sid, token);

    const autoReply =
      "Thank you for contacting Bright Service Solution (BSS). " +
      "We have received your message and will respond shortly. " +
      "You can also submit your details on our website Apply page.";

    // Reply to the sender
    await client.messages.create({
      from,
      to: incomingFrom,
      body: autoReply
    });

    // Twilio expects 200 OK
    return { statusCode: 200, body: "OK" };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
