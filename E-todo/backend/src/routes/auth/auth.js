const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = process.env.SECRET;

router.post('/login', async (req, res) => {
  const db = req.app.locals.db;
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, msg: 'Bad parameter' });
  }
  
  try {
    const [rows] = await db.query(
      'SELECT id, password FROM User WHERE email = ?',
      [email]
    );
    
    if (rows.length === 0) {
      return res.status(401).json({ success: false, msg: 'Invalid Credentials' });
    }
    
    const user = rows[0];
    const userId = user.id;
    const isOkPassword = await bcrypt.compare(password, user.password);
    
    if (!isOkPassword) {
      return res.status(401).json({ success: false, msg: "Invalid Credentials" });
    }
    
    const token = jwt.sign({ id: userId }, SECRET, { expiresIn: '3h' });
    res.status(200).json({ success: true, id: userId, token });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Internal server error' });
  }
});

router.post('/register', async (req, res) => {
  const db = req.app.locals.db;
  const { email, password, name, firstname } = req.body;
  
  if (!email || !password || !name || !firstname) {
    return res.status(400).json({ success: false, msg: 'Bad parameter' })
  }
  
  if (!(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))) {
    return res.status(400).json({ success: false, msg: 'Bad parameter' });
  }
  
  try {
    const [row] = await db.query(
      'SELECT id FROM User WHERE email = ?',
      [email]
    );
    
    if (row.length > 0) {
      return res.status(409).json({ success: false, msg: 'Account already exists' });
    }
    
    const hashPassword = await bcrypt.hash(password, 10);
    const [rows] = await db.query(
      'INSERT INTO `User` (email, password, name, firstname) VALUES (?, ?, ?, ?)',
      [email, hashPassword, name, firstname]
    );
    
    const id = rows.insertId;
    const token = jwt.sign({ id: id }, SECRET, { expiresIn: '3h' });
    res.status(200).json({ success: true, id: id, token ,test: "je suis un test"});
  }
  catch (err) {
    res.status(500).json({ success: false, msg: 'Internal server error' });
  }
});

module.exports = {
  router
};