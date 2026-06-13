const db = require("../Database/dataBase");

class LivroRepository {

    async criar(livro) {
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO livros (nome, autor, editora, genero) VALUES (?, ?, ?, ?)",
                [livro.nome, livro.autor, livro.editora, livro.genero],
                function (err) {
                    if (err) {
                        return reject(err);
                    }

                    resolve({
                        id: this.lastID,
                        ...livro
                    });
                }
            );
        });
    }

    async listar() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM livros", (err, rows) => {
                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });
    }

    async buscarPorId(id) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM livros WHERE id = ?", [id], (err, row) => {
                if (err) {
                    return reject(err);
                }

                resolve(row || null);
            });
        });
    }
    
async buscarPorDetalhes(nome, autor, editora, genero) {
        return new Promise((resolve, reject) => {
            db.get(
                "SELECT * FROM livros WHERE nome = ? AND autor = ? AND editora = ? AND genero = ?",
                [nome, autor, editora, genero],
                (err, row) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(row || null);
                }
            );
        });
    }
}

module.exports = LivroRepository;