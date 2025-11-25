const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET = process.env.SECRET

router.post('/login', async (req, res) => {
  const db = req.app.locals.db;
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Need Email and password' });
  }

  try {
    const [rows] = await db.query(
      'SELECT id, password FROM User WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Unknown identifier' });
    }
    const user = rows[0];
    const userId = user.id;

    const isOkPassword = await bcrypt.compare(password, user.password);

    if (!isOkPassword) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: userId }, SECRET, { expiresIn: '3h' });

    res.status(200).json({ success: true, id: userId, token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});


router.post('/register', async (req, res) => {

  const db = req.app.locals.db;
  const { email, password, name, firstname } = req.body;

  if (!email || !password || !name || !firstname) {
    return res.status(400).json({ success: false, message: 'Need all information' })
  }
  if (!(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });

  }

  try {
    const [row] = await db.query(
      'SELECT id FROM User WHERE email = ?',
      [email]
    );


    if (row.length > 0) {
      return res.status(401).json({ success: false, message: 'Email already used' });
    }


    const hashPassword = await bcrypt.hash(password, 10);
    const [rows] = await db.query(
      'INSERT INTO `User` (email, password, name, firstname) VALUES (?, ?, ?, ?)',
      [email, hashPassword, name, firstname]

    );
    const id = rows.insertId;
    const token = jwt.sign({ id: id }, SECRET, { expiresIn: '3h' });


    res.status(200).json({ success: true, id: id, token });



  }
  catch (err) {
    res.status(500).json({ success: false, message: 'Error server', error: err });
  }

});




module.exports = {
  router
};
