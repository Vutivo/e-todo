const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const authModule = require("./routes/auth/auth.js"); 
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todo/todo.js');

const app = express();
app.use(bodyParser.json());  
app.use(express.json());
app.use(cors());
async function startServer() {
  try {
    const db = await connectDB();
    app.locals.db = db;
    
    app.use('/', authModule.router);
    app.use('/', todoRoutes);

    
    app.listen(3000, () => {
      console.log(' Server launched');
    });
  } catch (err) {
    console.error(' Error connexion DB:', err);
  }
}
startServer();