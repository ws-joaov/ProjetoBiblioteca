const express = require("express");
const { verificarToken, exigirAdmin } = require("../auth");

module.exports = (usuarioController) => {

    const router = express.Router();

    router.post("/", usuarioController.criar);

    router.post("/login", usuarioController.login);

    router.get("/", verificarToken, usuarioController.listar);

    router.get("/:id", verificarToken, usuarioController.buscarPorId);

    router.patch("/:id/admin", verificarToken, exigirAdmin, usuarioController.alterarAdmin);

    return router;
};