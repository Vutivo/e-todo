const express = require('express');
const router = express.Router();

router.get("/Connected/:user_id", async (req, res) => {
    const db = req.app.locals.db;
    const { user_id } = req.params;

    try {
        const [rows] = await db.query("SELECT title, description FROM Todo WHERE user_id = ?", [user_id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});


module.exports = router;