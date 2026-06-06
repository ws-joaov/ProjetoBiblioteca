class LivroController {

    constructor(livroService) {
        this.livroService = livroService;
    }

    criar = async (req, res) => {

        try {

            const resultado =
                await this.livroService.criar(req.body);

            return res.status(201).json(resultado);

        } catch (error) {

            return res.status(400).json({
                erro: error.message
            });

        }

    };

    listar = async (req, res) => {

        const livros =
            await this.livroService.listar();

        return res.json(livros);

    };

    buscarPorId = async (req, res) => {

        try {

            const livro =
                await this.livroService.buscarPorId(
                    req.params.id
                );

            return res.json(livro);

        } catch (error) {

            return res.status(404).json({
                erro: error.message
            });

        }

    };

}

module.exports = LivroController;