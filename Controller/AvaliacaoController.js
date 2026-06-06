class AvaliacaoController {

    constructor(avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    criar = async (req, res) => {

        try {

            const resultado =
                await this.avaliacaoService.criar(req.body);

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