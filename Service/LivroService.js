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

    async criar(dados) {

        const usuario =
            await this.usuarioRepository.buscarPorId(
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
            nome: dados.nome,
            autor: dados.autor,
            editora: dados.editora,
            genero: dados.genero
        };
        return await this.livroRepository.criar(novoLivro);
    }

    async listar() {
        return await this.livroRepository.listar();
    }

    async buscarPorId(id) {

        const livro =
            await this.livroRepository.buscarPorId(id);

        if (!livro) {
            throw new Error("Livro não encontrado");
        }

        const avaliacoes =
            (await this.avaliacaoRepository.listar())
                .filter(
                    avaliacao =>
                        avaliacao.livroId === Number(id)
                );

        return {
            ...livro,
            avaliacoes
        };
    }

}

module.exports = LivroService;