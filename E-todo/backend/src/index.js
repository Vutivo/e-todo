// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/auth/auth');

// const app = express();
// app.use(express.json());
// app.use(cors());

// async function startServer() {
//   try {
//     const db = await connectDB(); 
//     app.locals.db = db; 
//     app.use('/auth', authRoutes);

//     app.listen(3000, () => console.log('Serveur lancé sur http://localhost:3000'));
//   } catch (err) {
//     console.error('Erreur connexion DB:', err);
//   }
// }



// startServer();


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

    console.log('✅ Connexion DB OK');

    // Ajout des routes ici
    app.use('/auth', authRoutes);

    // ✅ Lancement du serveur
    app.listen(3000, () => {
      console.log('🚀 Serveur lancé sur http://localhost:3000');
    });

  } catch (err) {
    console.error('Erreur connexion DB:', err);
  }
}


startServer();
