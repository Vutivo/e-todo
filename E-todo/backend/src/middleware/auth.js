const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; 

    if (!token) return res.status(401).json({tokensuccess: false, message: "Token manquant" });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(403).json({tokensuccess: false, message: "Token invalide" });
        req.user = decoded; 
        next();
    });
};

module.exports = { authenticateToken };
