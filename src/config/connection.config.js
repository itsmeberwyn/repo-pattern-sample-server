const mysql = require("mysql2");
const config = require("./db.config");

const connection = mysql.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
});

module.exports = connection;
