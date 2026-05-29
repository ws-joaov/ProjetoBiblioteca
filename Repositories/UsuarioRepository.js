const db = require("../database/memoryDatabase");

class UsuarioRepository {

    criar(usuario) {
        db.usuarios.push(usuario);
        return usuario;
    }

    listar() {
        return db.usuarios;
    }

    buscarPorId(id) {
        return db.usuarios.find(
            usuario => usuario.id === Number(id)
        );
    }

    alterarAdmin(id) {

        const usuario =
            this.buscarPorId(id);

        if (!usuario) {
            return null;
        }

        usuario.admin = !usuario.admin;

        return usuario;
    }

}

module.exports = UsuarioRepository;