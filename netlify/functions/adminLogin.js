const { issueToken } = require("./_auth");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
    const body = JSON.parse(event.body || "{}");
    const emailOk = body.email && body.email === process.env.ADMIN_EMAIL;
    const passOk = body.password && body.password === process.env.ADMIN_PASSWORD;

    if (!emailOk || !passOk) {
      return { statusCode: 401, body: JSON.stringify({ error: "Invalid admin credentials" }) };
    }

    return { statusCode: 200, body: JSON.stringify({ token: issueToken() }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
