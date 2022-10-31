const conn = require("../config/connection.config");

const register_user = async (body) => {
  const { user_id, email, password } = body;
  let sql = "INSERT INTO users (user_id, email, password) VALUES (?, ?, ?)";

  let [rows, fields] = await conn
    .promise()
    .query(sql, [user_id, email, password]);

  return rows.affectedRows;
};

const login_user = async (body) => {
  let sql = "SELECT * FROM users WHERE email = ? LIMIT 1";

  let [rows, fields] = await conn.promise().query(sql, body.email);

  return rows[0];
};

const find_user_by_email = async (email) => {
  let sql = "SELECT * FROM users WHERE email = ? LIMIT 1";
  let [rows, fields] = await conn.promise().query(sql, email);

  if (rows.length == 0) {
    return true;
  }
  return false;
};

module.exports = {
  login: login_user,
  register: register_user,
  find_user_by_email: find_user_by_email,
};
