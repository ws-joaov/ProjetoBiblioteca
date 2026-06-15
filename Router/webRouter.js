const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("painel");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/usuarios", (req, res) => {
    res.render("usuarios");
});

router.get("/usuarios/:id", (req, res) => {
    res.render("usuario-detalhes", { usuarioId: req.params.id });
});

router.get("/livros", (req, res) => {
    res.render("livros");
});

router.get("/avaliacoes", (req, res) => {
    res.render("avaliacoes");
});

module.exports = router;