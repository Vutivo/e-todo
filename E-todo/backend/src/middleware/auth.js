const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; 

    if (!token) return res.status(401).json({tokensuccess: false, msg: "Token not found" });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(403).json({tokensuccess: false, msg: "invalid Token" });
        req.user = decoded; 
        next();
    });
};

module.exports = { authenticateToken };
