const db = require("./dataBase");

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            admin INTEGER DEFAULT 0
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS livros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            autor TEXT NOT NULL,
            editora TEXT NOT NULL,
            genero TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS avaliacoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuarioId INTEGER NOT NULL,
            livroId INTEGER NOT NULL,
            nota INTEGER NOT NULL,
            descricao TEXT NOT NULL,

            FOREIGN KEY(usuarioId)
                REFERENCES usuarios(id),

            FOREIGN KEY(livroId)
                REFERENCES livros(id)
        )
    `);

});

module.exports = db;