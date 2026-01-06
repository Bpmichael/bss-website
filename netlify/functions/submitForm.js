const { getConnection } = require("./_db");

function ok(body) { return { statusCode: 200, body: JSON.stringify(body) }; }
function bad(status, msg) { return { statusCode: status, body: JSON.stringify({ error: msg }) }; }

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") return bad(405, "Method Not Allowed");
    const data = JSON.parse(event.body || "{}");

    const required = ["firstName","lastName","service","email","phone"];
    for (const k of required) if (!data[k]) return bad(400, `Missing field: ${k}`);
    if (!data.consent) return bad(400, "Consent is required.");

    const conn = await getConnection();

    const [result] = await conn.execute(
      `INSERT INTO applications
        (first_name, middle_name, last_name, service, email, phone, address, postcode, consent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.firstName,
        data.middleName || null,
        data.lastName,
        data.service,
        data.email,
        data.phone,
        data.address || null,
        data.postcode || null,
        1
      ]
    );

    const appId = result.insertId;

    // Create default tracking row
    await conn.execute(
      `INSERT INTO student_tracking (application_id, status, notes) VALUES (?, 'New', '')`,
      [appId]
    );

    // OPTIONAL email notifications (only if SMTP configured)
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const ADMIN_NOTIFY_EMAIL = process.env.ADMIN_NOTIFY_EMAIL;

    if (SMTP_HOST && SMTP_USER && SMTP_PASS && ADMIN_NOTIFY_EMAIL) {
      try {
        const nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: 587,
          secure: false,
          auth: { user: SMTP_USER, pass: SMTP_PASS }
        });

        await transporter.sendMail({
          from: SMTP_USER,
          to: data.email,
          subject: "BSS: We received your request",
          text: `Hello ${data.firstName},\n\nThank you for contacting Bright Service Solution. We have received your request for: ${data.service}.\nWe will contact you shortly.\n\nBSS\n+44 7350 160962`
        });

        await transporter.sendMail({
          from: SMTP_USER,
          to: ADMIN_NOTIFY_EMAIL,
          subject: "New BSS Application",
          text: `New application #${appId}\nName: ${data.firstName} ${data.lastName}\nService: ${data.service}\nEmail: ${data.email}\nPhone: ${data.phone}\nPostcode: ${data.postcode || ""}`
        });
      } catch (_) {
        // If email fails, do not block the submission.
      }
    }

    return ok({ message: "Stored", id: appId });
  } catch (e) {
    return bad(500, e.message);
  }
};
