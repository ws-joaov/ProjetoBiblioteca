class UsuarioController {

    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }

    criar = async (req, res) => {

        try {

            const resultado =
                await this.usuarioService.criar(req.body);

            return res.status(201).json(resultado);

        } catch (error) {

            return res.status(400).json({
                erro: error.message
            });

        }

    };

    listar = async (req, res) => {

        const usuarios =
            await this.usuarioService.listar();

        return res.json(usuarios);

    };

    buscarPorId = async (req, res) => {

        try {

            const usuario =
                await this.usuarioService.buscarPorId(
                    req.params.id
                );

            return res.json(usuario);

        } catch (error) {

            return res.status(404).json({
                erro: error.message
            });

        }

    };

    alterarAdmin = async (req, res) => {

        try {

            const resultado =
                await this.usuarioService.alterarAdmin(
                    req.params.id
                );

            return res.json(resultado);

        } catch (error) {

            return res.status(404).json({
                erro: error.message
            });

        }

    };

}

module.exports = UsuarioController;