const mysql = require("mysql2/promise");

let cached;
async function getConnection() {
  if (cached) return cached;

  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;

  if (!host || !user || !database) {
    throw new Error("Database env vars not set. Please set DB_HOST, DB_USER, DB_PASSWORD, DB_NAME.");
  }

  cached = await mysql.createConnection({ host, user, password, database });
  return cached;
}

module.exports = { getConnection };
