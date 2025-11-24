const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../../middleware/auth.js");


router.get("/user/todos", authenticateToken, async (req, res) => {
    const db = req.app.locals.db;
    const { id } = req.user;  

    try {
        // Récupération de l'utilisateur
        const [userRows] = await db.query("SELECT * FROM User WHERE id = ?", [id]);
        if (userRows.length === 0) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }
        const user = userRows[0];

        // Récupération des todos
        const [tasks] = await db.query(
            "SELECT status, description, title, id FROM Todo WHERE user_id = ?",
            [id]
        );

        res.json({ user,
             tasks,
             id: user.id,
            tokensuccess: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

router.post("/todos", authenticateToken, async (req, res) => {
    const db = req.app.locals.db;
    const { status, value } = req.body;
    const userId = req.user.id;
    const description = "This is a best description"

    try {
        const [row] = await db.query(
            "INSERT into `Todo`(title,description,status,user_id) VALUES(?, ?, ? ,?) ",
            [value, description, status, userId]
        )

        const newTodo = {
            tokensuccess: true,
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

router.get("/todos/:id", authenticateToken, async (req, res) => {
    const db = req.app.locals.db;
    const todoId = req.params.id;

    try {
        const [row] = await db.query(
            "SELECT title, description, due_time, created_at, status FROM `Todo` WHERE id = ?",
            [todoId]
        );

        const todo = row[0];
        const description = todo.description;

        if (!description) {
            description = "This is a best description"
        }

        res.status(200).json({
            tokensuccess: true,
            title: todo.title,
            description: description,
            status: todo.status,
            created_at: todo.created_at,
            due_time: todo.due_time
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

router.delete("/todos/:id", authenticateToken, async (req, res) => {

    const db = req.app.locals.db;
    const todoId = req.params.id;


    try{
        const [row] = await db.query(
            "DELETE FROM `Todo` WHERE id = ?",
            [todoId]
        );

        res.status(200).json({ message: "Todo deleted successfully", tokensuccess: true });

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }


});

module.exports = router;

