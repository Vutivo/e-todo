const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

const authRoutes = require('./routes/auth/auth');

app.use(cors())

app.use(express.json());

app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});