const mysql = require('mysql2/promise');


const dbConfig = {
  host: process.env.DB_HOST ,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME ,
  port:process.env.DB_PORT ,
};


async function connectDB(retries = 5) {
  try {
    const pool = await mysql.createPool(dbConfig);
    await pool.query('SELECT 1'); 
    console.log(' Connexion DB OK');
    return pool;
  } catch (err) {
    console.error(' Erreur connexion DB :', err.message);
    if (retries > 0) {
      console.log(`Retrying... (${retries} left)`);
      await new Promise(r => setTimeout(r, 3000));
      return connectDB(retries - 1);
    } else {
      throw err;
    }
  }
}


module.exports = connectDB;