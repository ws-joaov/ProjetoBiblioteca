const db = require("./dataBase");

// 1. ATIVA O SUPORTE A FOREIGN KEYS E CASCADE NO SQLITE
db.run("PRAGMA foreign_keys = ON;");

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
    CREATE UNIQUE INDEX IF NOT EXISTS idx_livro_unico
    ON livros (nome, autor, editora, genero)
`);

// 2. ADICIONADA A REGRA DE CASCADE NA FOREIGN KEY DO LIVRO
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
                REFERENCES livros(id) ON DELETE CASCADE
        )
    `);

});

module.exports = db;