const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "@eh&A4SnEi@EYvEX6k",
    host: "localhost",
    port: 5432,
    database: "testdb"
});

module.exports = pool;


