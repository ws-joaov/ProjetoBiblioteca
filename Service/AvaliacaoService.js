let ID = 1
class AvaliacaoService {

    constructor(avaliacaoRepository, usuarioRepository, livroRepository) {
        this.avaliacaoRepository = avaliacaoRepository;
        this.usuarioRepository = usuarioRepository;
        this.livroRepository = livroRepository;

    }

    criar(dados) {


        if (!dados.descricao) {
            throw new Error("Descrição obrigatória");
        }

        if (dados.nota === undefined) {
            throw new Error("Nota obrigatória");
        }

        if (!dados.usuarioId) {
            throw new Error("Usuário obrigatório");
        }


        const usuarioExiste =
            this.usuarioRepository.buscarPorId(dados.usuarioId);

        if (!usuarioExiste) {
            throw new Error("Usuário não encontrado");
        }

        if (dados.nota < 0 || dados.nota > 5) {
            throw new Error("Nota inválida");
        }

        const avaliacaoExiste =
            this.avaliacaoRepository.buscarPorUsuarioELivro(
                dados.usuarioId,
                dados.livro
            );

        if (avaliacaoExiste) {
            throw new Error("Usuário já avaliou esse livro");
        }

        const novaAvaliacao = {
            id: ID,
            livro: dados.livroId,
            nota: dados.nota,
            descricao: dados.descricao,
            usuarioId: dados.usuarioId
        };
        ID++
        return this.avaliacaoRepository.criar(novaAvaliacao);
    }

    listar() {

        const avaliacoes =
            this.avaliacaoRepository.listar();

        return avaliacoes.map(avaliacao => {

            const usuario =
                this.usuarioRepository.buscarPorId(
                    avaliacao.usuarioId
                );

            const livro =
                this.livroRepository.buscarPorId(
                    avaliacao.livroId
                );

            return {
                id: avaliacao.id,
                livro: livro?.nome,
                usuario: usuario?.nome,
                nota: avaliacao.nota,
                descricao: avaliacao.descricao
            };

        });
    }

}

module.exports = AvaliacaoService;