const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./biblioteca.db", (err) => {

    if (err) {
        console.error(err.message);
    }

    console.log("Banco conectado");
});

module.exports = db;