const express = require('express');
const router = express.Router();


router.post('/login', async (req, res) => {
  const db = req.app.locals.db;
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Need Email and password' });
  }

  try {
    const [rows] = await db.query(
      'SELECT id FROM User WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Unknow identifier' });
    }

    res.json({ success: true, message: 'Login OK', user: rows[0] });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Error server', error: err });
  }
});

router.post('/register', async (req, res) => {

  const db = req.app.locals.db;
  const { email, password, name, firstname } = req.body;

  if (!email || !password || !name || !firstname) {
    return res.status(400).json({ success: false, message: 'Need all information' })
  }

  try {
    const [row] = await db.query(
      'SELECT id FROM User WHERE email = ?',
      [email]
    );

    if (row.length > 0) {
      return res.status(401).json({ success: false, message: 'Email already used' });
    }

    const [rows] = await db.query(
      'INSERT INTO `User` (email, password, name, firstname) VALUES (?, ?, ?, ?)',
      [email, password, name, firstname]

    );
      return res.status(200).json({ success: true, message: 'register ok' });
    


  }
  catch (err) {
    res.status(500).json({ success: false, message: 'Error server', error: err });
  }

});


module.exports = router;