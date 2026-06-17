const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./biblioteca.db", (err) => {
    if (err) {
        console.error("Erro ao conectar no banco:", err.message);
        return;
    }
    console.log("Banco conectado");

    // db.serialize garante que os comandos SQL sejam executados na ordem exata
    db.serialize(() => {
        // 1. Garante que a tabela existe antes de verificar os dados
        db.run(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                senha TEXT NOT NULL,
                admin BOOLEAN DEFAULT 0
            )
        `);

        // 2. Verifica se o banco está completamente vazio
        db.get("SELECT COUNT(*) as count FROM usuarios", (err, row) => {
            if (err) {
                console.error("Erro ao verificar tabela de usuários:", err.message);
                return;
            }

            // 3. O Deadlock Resolution: Injeta o Administrador Padrão
            if (row && row.count === 0) {
                console.log("Banco de dados vazio detetado. A semear Administrador Padrão...");
                
                // Hash Bcrypt seguro extraído da sua base local
                const hashSenhaPadrao = "$2a$10$9hqepnu2RKsDV4yZ/YdcduUQFkuxBWsqa2c9ENhZuo7IkFlMpQyxi";
                
                db.run(
                    `INSERT INTO usuarios (nome, email, senha, admin) VALUES (?, ?, ?, ?)`,
                    ['Admin Mestre', 'admin@biblioteca.com', hashSenhaPadrao, 1],
                    (err) => {
                        if (err) console.error("Erro ao semear admin:", err.message);
                        else console.log("Administrador criado com sucesso: admin@biblioteca.com");
                    }
                );
            }
        });
    });
});

module.exports = db;