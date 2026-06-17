const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath =
    process.env.DB_PATH ||
    process.env.SQLITE_DATABASE_PATH ||
    path.join(__dirname, "..", "biblioteca.db");

const dbDirectory = path.dirname(dbPath);

if (!fs.existsSync(dbDirectory)) {
    fs.mkdirSync(dbDirectory, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {

    if (err) {
        console.error(err.message);
    }

    console.log(`Banco conectado em ${dbPath}`);
});

module.exports = db;
