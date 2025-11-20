const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const { authenticateToken } = require("./middleware/auth.js");
const authModule = require("./routes/auth/auth.js"); 
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.js');

const app = express();
app.use(bodyParser.json());  
app.use(express.json());
app.use(cors());
async function startServer() {
  try {
    const db = await connectDB();
    app.locals.db = db;
    
    app.use('/', authModule.router);
    app.use('/', userRoutes);
    
    app.get("/todos/:id", authenticateToken, (req, res) => {
        res.json({ 
            success: true, 
            message: "Route protégée OK", 
            userId: req.user.id 
        });
    });
    
    app.listen(3000, () => {
      console.log(' Server launched');
    });
  } catch (err) {
    console.error(' Error connexion DB:', err);
  }
}
startServer();