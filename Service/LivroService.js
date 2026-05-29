ID = 1
class LivroService {

    constructor(
        livroRepository,
        usuarioRepository,
        avaliacaoRepository
    ) {

        this.livroRepository =
            livroRepository;

        this.usuarioRepository =
            usuarioRepository;

        this.avaliacaoRepository =
            avaliacaoRepository;
    }

    criar(dados) {

        const usuario =
            this.usuarioRepository.buscarPorId(
                dados.usuarioId
            );

        if (!usuario) {
            throw new Error(
                "Usuário não encontrado"
            );
        }

        if (!usuario.admin) {
            throw new Error(
                "Usuário não é administrador"
            );
        }

        const novoLivro = {
            id: ID,
            nome: dados.nome,
            autor: dados.autor,
            editora: dados.editora,
            genero: dados.genero
        };
        ID++
        return this.livroRepository
            .criar(novoLivro);
    }

    listar() {
        return this.livroRepository.listar();
    }

    buscarPorId(id) {

        const livro =
            this.livroRepository.buscarPorId(id);

        if (!livro) {
            throw new Error("Livro não encontrado");
        }

        const avaliacoes =
            this.avaliacaoRepository.listar()
                .filter(
                    avaliacao =>
                        avaliacao.livro === Number(id)
                );

        return {
            ...livro,
            avaliacoes
        };
    }

}

module.exports = LivroService;