const { getConnection } = require("./_db");
const { requireAdmin } = require("./_auth");

function bad(status, msg) { return { statusCode: status, body: JSON.stringify({ error: msg }) }; }

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") return bad(405, "Method Not Allowed");
    const data = JSON.parse(event.body || "{}");
    if (!requireAdmin(data.token)) return bad(401, "Unauthorized");

    const applicationId = Number(data.applicationId);
    if (!applicationId) return bad(400, "Invalid applicationId");

    const conn = await getConnection();

    // Upsert tracking
    await conn.execute(
      `INSERT INTO student_tracking (application_id, status, notes)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE status = VALUES(status), notes = VALUES(notes), updated_at = CURRENT_TIMESTAMP`,
      [applicationId, data.status || "New", data.notes || ""]
    );

    return { statusCode: 200, body: JSON.stringify({ message: "Updated" }) };
  } catch (e) {
    return bad(500, e.message);
  }
};
