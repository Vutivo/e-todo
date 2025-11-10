const express = require("express");
const app = express();
const port = 3000;

// Page d'accueil
app.get("/", (req, res) => {
  res.send("Bienvenue sur la page d'accueil !");
});

// Page d'inscription
app.get("/register", (req, res) => {
  res.send("Page d'inscription !");
});

// Si quelqu’un tape /regi au lieu de /register → on le redirige
app.get("/regi", (req, res) => {
  res.redirect("/register"); // redirige automatiquement vers la bonne page
});

// Si aucune route ne correspond
app.use((req, res) => {
  res.status(404).send("Cette page n'existe pas !");
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
