const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const token = req.headers["authorization"]?.split(" ")[1]; // Asumiendo que el token se envía como "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: "❌ Access denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; //Si el token es válido, su contenido (el payload) se guarda en req.user
        next();
    } catch (error) {
        return res.status(400).json({ error: "❌ Invalid token.",error });
    }
};

module.exports = authMiddleware;
