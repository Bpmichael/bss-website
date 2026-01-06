exports.handler = async (event) => {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_PRICE_ID;
    const siteUrl = process.env.SITE_URL;

    if (!key || !priceId || !siteUrl) {
      return { statusCode: 400, body: JSON.stringify({ error: "Stripe is not configured. Set STRIPE_SECRET_KEY, STRIPE_PRICE_ID, SITE_URL." }) };
    }

    const stripe = require("stripe")(key);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/apply?paid=1`,
      cancel_url: `${siteUrl}/apply?paid=0`
    });

    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
