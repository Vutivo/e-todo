const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth/auth');

const app = express();
app.use(express.json());
app.use(cors());

async function startServer() {
  try {
    const db = await connectDB();
    app.locals.db = db;

    console.log(' Connexion DB OK');

    app.use('/', authRoutes);

    app.listen(3000, () => {
      console.log(' Server launched on http://localhost:3000');
    });

  } catch (err) {
    console.error('Error connexion DB:', err);
  }
}
startServer();