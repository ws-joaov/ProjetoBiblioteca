class LivroController {

    constructor(livroService) {
        this.livroService = livroService;
    }

    criar = (req, res) => {

        try {

            const resultado =
                this.livroService.criar(req.body);

            return res.status(201).json(resultado);

        } catch (error) {

            return res.status(400).json({
                erro: error.message
            });

        }

    };

    listar = (req, res) => {

        const livros =
            this.livroService.listar();

        return res.json(livros);

    };

    buscarPorId = (req, res) => {

        try {

            const livro =
                this.livroService.buscarPorId(
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