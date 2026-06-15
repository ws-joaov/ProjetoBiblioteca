const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "biblioteca-secret";

function gerarToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
}

function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
        return res.status(401).json({ erro: "Token de acesso obrigatório" });
    }

    try {
        const usuario = jwt.verify(token, JWT_SECRET);
        req.usuario = usuario;
        return next();
    } catch (error) {
        return res.status(401).json({ erro: "Token inválido ou expirado" });
    }
}

function exigirAdmin(req, res, next) {
    if (!req.usuario || !req.usuario.admin) {
        return res.status(403).json({ erro: "Acesso restrito a administradores" });
    }

    return next();
}

module.exports = {
    gerarToken,
    verificarToken,
    exigirAdmin,
    JWT_SECRET
};
