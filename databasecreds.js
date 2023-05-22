const Pool = require("pg").Pool;

const connectionCreds = new Pool({
  host: "localhost",
  port: 5432,
  database: "users",
  user: "postgres",
  password: process.env.DB_PASSWORD,
});

module.exports = connectionCreds;
