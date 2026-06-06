require("./Database/initDatabase");

const express = require("express");


const UsuarioRepository =
    require("./Repositories/UsuarioRepository");

const AvaliacaoRepository =
    require("./Repositories/AvaliacaoRepository");

const UsuarioService =
    require("./Service/UsuarioService");

const AvaliacaoService =
    require("./Service/AvaliacaoService");

const UsuarioController =
    require("./Controller/UsuarioController");

const AvaliacaoController =
    require("./Controller/AvaliacaoController");

const usuarioRoutes =
    require("./Router/usuarioRoutes");

const avaliacaoRoutes =
    require("./Router/avaliacaoRoutes");

const LivroRepository =
    require("./Repositories/LivroRepository");

const LivroService =
    require("./Service/LivroService");

const LivroController =
    require("./Controller/LivroController");

const livroRoutes =
    require("./Router/livroRoutes");

const app = express();

app.use(express.json());

/*
    REPOSITORIES
*/

const usuarioRepository =
    new UsuarioRepository();

const avaliacaoRepository =
    new AvaliacaoRepository();

const livroRepository =
    new LivroRepository();

/*
    SERVICES
*/

const usuarioService =
    new UsuarioService(
        usuarioRepository,
        avaliacaoRepository
    );

const avaliacaoService =
    new AvaliacaoService(
        avaliacaoRepository,
        usuarioRepository,
        livroRepository
    );


const livroService =
    new LivroService(
        livroRepository,
        usuarioRepository,
        avaliacaoRepository
    );
/*
    CONTROLLERS
*/

const usuarioController =
    new UsuarioController(usuarioService);

const avaliacaoController =
    new AvaliacaoController(avaliacaoService);

const livroController =
    new LivroController(
        livroService
    );

/*
    ROUTES
*/

app.use(
    "/usuarios",
    usuarioRoutes(usuarioController)
);

app.use(
    "/avaliacoes",
    avaliacaoRoutes(avaliacaoController)
);

app.use(
    "/livros",
    livroRoutes(livroController)
);

app.listen(3000, () => {
    console.log("Servidor rodando");
});