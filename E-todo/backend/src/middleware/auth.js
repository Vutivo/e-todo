const jwt = require('jsonwebtoken'); 
const SECRET = process.env.SECRET


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    console.log(token)

    if (!token) return res.status(401).json({ message: " No Token", success: false });

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token invalid", success: false });
        req.user = user;
        next();
    });
}

module.exports= {authenticateToken}