const express = require('express');
const router = express.Router();


router.post('/login', async (req, res) => {
  const db = req.app.locals.db;
  const { email, password } = req.body;
  

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email et mot de passe requis' });
  }

  try {
    const [rows] = await db.query(
      'SELECT id, email FROM User WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Identifiants incorrects' });
    }

    res.json({ success: true, message: 'Login OK', user: rows[0] });

  } catch (err) {
    console.error('Erreur DB:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err });
  }
});


module.exports = router;