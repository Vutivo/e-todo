const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../../middleware/auth.js");


router.get("/user/todos", authenticateToken, async (req, res) => {
    const db = req.app.locals.db;
    const { id } = req.user;  // id récupéré depuis JWT

    try {
        // Récupération de l'utilisateur
        const [userRows] = await db.query("SELECT * FROM User WHERE id = ?", [id]);
        if (userRows.length === 0) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }
        const user = userRows[0];

        // Récupération des todos
        const [tasks] = await db.query(
            "SELECT status, description, title FROM Todo WHERE user_id = ?",
            [id]
        );

        res.json({ user, tasks });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

router.post("/todos", authenticateToken, async (req, res) => {
const db = req.app.locals.db;
const { status,value } = req.body;
const userId = req.user.id; 
const description = "This is a best description"

    try {
        const [row] = await db.query(
            "INSERT into `Todo`(title,description,status,user_id) VALUES(?, ?, ? ,?) ",
            [value,description,status,userId]
        )

       const newTodo = {
    id: row.insertId,
    title: value,
    description,
    status,
    user_id: userId
};

res.status(200).json(newTodo);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });

    }

});

module.exports = router;
