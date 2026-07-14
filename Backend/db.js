const sql = require("mssql");

const config = {
    server: "localhost",
    database: "lunaria_art",
    user: "lunaria_user",
    password: "Lunaria12345",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

module.exports = {
    sql,
    config
};