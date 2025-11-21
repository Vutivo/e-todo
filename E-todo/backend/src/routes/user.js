const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");


router.get("/user/todos", authenticateToken, async (req, res) => {
    const db = req.app.locals.db;
    const { id } = req.user;  
 
    try {
        // Récupération de l'utilisateur
        const [userRows] = await db.query("SELECT name, firstname FROM User WHERE id = ?", [id]);
        if (userRows.length === 0) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }
        const user = userRows[0];
 
        // Récupération des todos
        const [tasks] = await db.query(
            "SELECT status, description, title, id FROM Todo WHERE user_id = ?",
            [id]
        );
 
        res.json({ 
            user, 
            tasks, 
            id: user.id, 
            tokensuccess: true });
 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});


router.get("/user", authenticateToken, async (req, res) => {
    const id = req.user.id;
    const db = req.app.locals.db;

    try {
        // Récupére l'utilisateur
        const [userRows] = await db.query("SELECT name, firstname, email, created_at FROM User WHERE id = ?", [id]);

        if (userRows.length === 0) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }
        // Récupère les données dans user
        const user = userRows[0];

        res.json({
            user,       // info utilisateur
            token:id      
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

router.delete("/user", authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const { password } = req.body; // qu'on a une fois que l'utilisateur a mis le mot de passe pour confirmer
    const db = req.app.locals.db;

    try {
        const [userRows] = await db.query("SELECT password FROM `User` WHERE id = ?", [userId]);

        if (userRows.length === 0) {
            return res.status(404).json({ success: false, message: "Utilisateur introuvable" });
        }

        const user = userRows[0];

        if (user.password !== password) { 
            return res.status(403).json({ success: false, message: "Mot de passe incorrect" });
        }

        // Suppression
        await db.query("DELETE FROM `User` WHERE id = ?", [userId]);

        res.json({ success: true, message: "Utilisateur et toutes ses données supprimés" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});



module.exports = router;