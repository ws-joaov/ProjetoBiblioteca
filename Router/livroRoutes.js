const express = require("express");

module.exports = (livroController) => {

    const router = express.Router();

    router.post("/", livroController.criar);

    router.get("/", livroController.listar);

    router.get("/:id", livroController.buscarPorId);

    router.delete("/:id", livroController.deletar);

    return router;
};