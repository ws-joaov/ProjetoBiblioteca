const db = require("../database/memoryDatabase");

class LivroRepository {

    criar(livro) {
        db.livros.push(livro);
        return livro;
    }

    listar() {
        return db.livros;
    }

    buscarPorId(id) {
        return db.livros.find(
            livro => livro.id === Number(id)
        );
    }

}

module.exports = LivroRepository;