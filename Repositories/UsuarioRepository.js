const db = require("../Database/dataBase");

class UsuarioRepository {

    async criar(usuario) {
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO usuarios (nome, email, admin, senha) VALUES (?, ?, ?, ?)",
                [usuario.nome, usuario.email, usuario.admin ? 1 : 0, usuario.senha || null],
                function (err) {
                    if (err) {
                        return reject(err);
                    }

                    resolve({
                        id: this.lastID,
                        ...usuario,
                        admin: Boolean(usuario.admin)
                    });
                }
            );
        });
    }

    async listar() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM usuarios", (err, rows) => {
                if (err) {
                    return reject(err);
                }

                resolve(rows.map(usuario => ({
                    ...usuario,
                    admin: Boolean(usuario.admin)
                })));
            });
        });
    }

    async buscarPorId(id) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM usuarios WHERE id = ?", [id], (err, row) => {
                if (err) {
                    return reject(err);
                }

                if (!row) {
                    return resolve(null);
                }

                resolve({
                    ...row,
                    admin: Boolean(row.admin)
                });
            });
        });
    }

    async buscarPorEmail(email) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, row) => {
                if (err) {
                    return reject(err);
                }

                if (!row) {
                    return resolve(null);
                }

                resolve({
                    ...row,
                    admin: Boolean(row.admin)
                });
            });
        });
    }

    async alterarAdmin(id) {
        const usuario = await this.buscarPorId(id);

        if (!usuario) {
            return null;
        }

        const novoAdmin = usuario.admin ? 0 : 1;

        return new Promise((resolve, reject) => {
            db.run(
                "UPDATE usuarios SET admin = ? WHERE id = ?",
                [novoAdmin, id],
                function (err) {
                    if (err) {
                        return reject(err);
                    }

                    resolve({
                        ...usuario,
                        admin: Boolean(novoAdmin)
                    });
                }
            );
        });
    }

}

module.exports = UsuarioRepository;