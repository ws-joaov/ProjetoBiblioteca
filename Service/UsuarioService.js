let ID = 1

class UsuarioService {

    constructor(
        usuarioRepository,
        avaliacaoRepository
    ) {
        this.usuarioRepository = usuarioRepository;
        this.avaliacaoRepository =
            avaliacaoRepository;
    }

    async criar(dados) {

        if (!dados.nome) {
            throw new Error("Nome obrigatório");
        }

        if (!dados.email) {
            throw new Error("Email obrigatório");
        }

        const novoUsuario = {
            id: ID,
            nome: dados.nome,
            email: dados.email,
            admin: false
        };
        ID++
        return await this.usuarioRepository.criar(
            novoUsuario
        );
    }

    async listar() {
        return await this.usuarioRepository.listar();
    }

    async buscarPorId(id) {

        const usuario =
            await this.usuarioRepository.buscarPorId(id);

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        const avaliacoes =
            await this.avaliacaoRepository
                .buscarPorUsuario(Number(id));

        const livrosLidos =
            avaliacoes.map(avaliacao => ({
                livro: avaliacao.livroId,
                nota: avaliacao.nota,
                descricao: avaliacao.descricao
            }));

        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            livrosLidos
        };
    }

    async alterarAdmin(id) {

        const usuario =
            await this.usuarioRepository.alterarAdmin(id);

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        return usuario;
    }

}

module.exports = UsuarioService;