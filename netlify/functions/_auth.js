function requireAdmin(token) {
  // token format: "BSS <email>"
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("Admin env vars not set. Please set ADMIN_EMAIL and ADMIN_PASSWORD.");
  }
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf8");
    return decoded === `BSS_ADMIN:${email}`;
  } catch {
    return false;
  }
}

function issueToken() {
  const email = process.env.ADMIN_EMAIL;
  return Buffer.from(`BSS_ADMIN:${email}`, "utf8").toString("base64");
}

module.exports = { requireAdmin, issueToken };
