const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  console.log('Données reçues du login :', req.body);
  
  res.json({ 
    success: true, 
    message: 'Login reçu !',
    data: req.body 
  });
});



module.exports = router;