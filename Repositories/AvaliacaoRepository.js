const db = require("../Database/dataBase");

class AvaliacaoRepository {

    async criar(avaliacao) {
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO avaliacoes (usuarioId, livroId, nota, descricao) VALUES (?, ?, ?, ?)",
                [avaliacao.usuarioId, avaliacao.livroId ?? avaliacao.livro, avaliacao.nota, avaliacao.descricao],
                function (err) {
                    if (err) {
                        return reject(err);
                    }

                    resolve({
                        id: this.lastID,
                        ...avaliacao,
                        livroId: avaliacao.livroId ?? avaliacao.livro
                    });
                }
            );
        });
    }

    async listar() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM avaliacoes", (err, rows) => {
                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });
    }

    async buscarPorUsuario(usuarioId) {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM avaliacoes WHERE usuarioId = ?", [usuarioId], (err, rows) => {
                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });
    }

    async buscarPorUsuarioELivro(usuarioId, livroId) {
        return new Promise((resolve, reject) => {
            db.get(
                "SELECT * FROM avaliacoes WHERE usuarioId = ? AND livroId = ?",
                [usuarioId, livroId],
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

module.exports = AvaliacaoRepository;