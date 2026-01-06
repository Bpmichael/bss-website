const { getConnection } = require("./_db");
const { requireAdmin } = require("./_auth");

exports.handler = async (event) => {
  try {
    const token = (event.queryStringParameters && event.queryStringParameters.token) || "";
    if (!requireAdmin(token)) return { statusCode: 401, body: "Unauthorized" };

    const conn = await getConnection();
    const [rows] = await conn.execute(
      `SELECT a.id, a.first_name, a.middle_name, a.last_name, a.service, a.email, a.phone, a.address, a.postcode, a.created_at,
              t.status as tracking_status, t.notes as tracking_notes
       FROM applications a
       LEFT JOIN student_tracking t ON t.application_id = a.id
       ORDER BY a.created_at DESC`
    );

    const headers = Object.keys(rows[0] || { id: "" });
    const escape = (v) => {
      if (v === null || v === undefined) return "";
      const s = String(v).replace(/"/g, '""');
      return `"${s}"`;
    };
    const csv = [headers.join(",")]
      .concat(rows.map(r => headers.map(h => escape(r[h])).join(",")))
      .join("\n");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=bss-applications.csv"
      },
      body: csv
    };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
