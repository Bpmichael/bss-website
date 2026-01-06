const { getConnection } = require("./_db");
const { requireAdmin } = require("./_auth");

function bad(status, msg) { return { statusCode: status, body: JSON.stringify({ error: msg }) }; }

exports.handler = async (event) => {
  try {
    const token = (event.queryStringParameters && event.queryStringParameters.token) || "";
    if (!requireAdmin(token)) return bad(401, "Unauthorized");

    const conn = await getConnection();
    const [rows] = await conn.execute(
      `SELECT a.*,
              t.status AS tracking_status,
              t.notes AS tracking_notes
       FROM applications a
       LEFT JOIN student_tracking t ON t.application_id = a.id
       ORDER BY a.created_at DESC
       LIMIT 200`
    );

    return { statusCode: 200, body: JSON.stringify({ items: rows }) };
  } catch (e) {
    return bad(500, e.message);
  }
};
