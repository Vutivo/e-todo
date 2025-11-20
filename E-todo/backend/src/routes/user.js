const express = require('express');
const router = express.Router();

router.get("/todos/:id", async (req, res) => {
    const db = req.app.locals.db;
    const { id } = req.params;

    try {
        // Récupére l'utilisateur
        const [userRows] = await db.query("SELECT * FROM User WHERE id = ?", [id]);

        if (userRows.length === 0) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }
        // Récupère les données dans user
        const user = userRows[0];

        // Récupère le status et description depuis todo
        const [tasks] = await db.query("SELECT status, description, title FROM Todo WHERE user_id = ?", [id]);


        // tout mettre dans le json
        res.json({
            user,           // info utilisateur
            tasks,          // prend status, description et titre
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});


module.exports = router;