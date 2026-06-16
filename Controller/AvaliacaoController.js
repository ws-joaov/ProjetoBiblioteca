class AvaliacaoController {

    constructor(avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    criar = async (req, res) => {
        try {
            // Extraímos os dados que vieram do Front-end
            const dadosDaAvaliacao = { ...req.body };

            // A Mágica da Segurança: 
            // Injetamos/Forçamos o usuarioId usando a informação validada pelo auth.js
            // Se o utilizador mal-intencionado enviou "usuarioId: 1" no JSON, esta linha
            // vai esmagar esse valor e usar o ID verdadeiro do token dele.
            dadosDaAvaliacao.usuarioId = req.usuario.id;

            const resultado =
                await this.avaliacaoService.criar(dadosDaAvaliacao);

            return res.status(201).json(resultado);

        } catch (error) {
            return res.status(400).json({
                erro: error.message
            });
        }
    };

    listar = async (req, res) => {

        const resultado =
            await this.avaliacaoService.listar();

        return res.json(resultado);

    };

}

module.exports = AvaliacaoController;