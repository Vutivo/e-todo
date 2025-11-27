const express = require("express");
const bodyParser = require('body-parser');

const authModule = require("./routes/auth/auth.js"); 
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todo/todo.js');
const userRoutes = require('./routes/user/user.js');
const notFoundMiddleware = require("./middleware/notFound.js");

const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});
app.use(bodyParser.json());  
app.use(express.json());
async function startServer() {
  try {
    const db = await connectDB();
    app.locals.db = db;
    
    app.use('/', authModule.router);
    app.use('/', todoRoutes)
    app.use('/', userRoutes);
    
    app.use(notFoundMiddleware);

    
    app.listen(3000, () => {
      console.log(' Server launched');
    });
  } catch (err) {
    console.error(' Error connexion DB:', err);
  }
}
startServer();