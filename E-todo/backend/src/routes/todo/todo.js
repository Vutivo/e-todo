const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../../middleware/auth.js");

router.get("/todos", authenticateToken, async (req, res) => {
    const db = req.app.locals.db;

    try {
        const [todos] = await db.query(
            "SELECT title, status, user_id FROM `Todo`"
        );

        const userIds = todos.map(todo => todo.user_id);
        const [users] = await db.query(
            "SELECT id, name, firstname FROM `User` WHERE id IN (?)",
            [userIds]
        );

        const tasks = todos.map(todo => ({
            title: todo.title,
            status: todo.status,
            name: users.find(user => user.id === todo.user_id)?.name || 'Unknown',
            firstname: users.find(user => user.id === todo.user_id)?.firstname || 'Unknown'
        }));

        console.log("Fetched todos:", tasks);

        res.status(200).json({
            tokensuccess: true,
            tasks
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error server" });
    }
});


router.get("/user/todos", authenticateToken, async (req, res) => {
    const db = req.app.locals.db;
    const { id } = req.user;  

    try {
        const [userRows] = await db.query("SELECT * FROM User WHERE id = ?", [id]);
        if (userRows.length === 0) {
            return res.status(404).json({ message: "Unknow user" });
        }
        const user = userRows[0];

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
        res.status(500).json({ message: "Error server" });
    }
});

router.post("/todos", authenticateToken, async (req, res) => {
    const db = req.app.locals.db;
    const userId = req.user.id;
    const { status, title, description, due_time } = req.body;

    try {
        const [insertResult] = await db.query(
            "INSERT INTO `Todo` (title, description, status, due_time, user_id) VALUES (?, ?, ?, ?, ?)",
            [title, description, status, due_time, userId]
        );

        const [rows] = await db.query(
            "SELECT * FROM `Todo` WHERE id = ?",
            [insertResult.insertId]
        );


        res.status(200).json({
            tokensuccess: true,
            ...rows[0]
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error server" });
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

router.put("/todos/:id", authenticateToken,  async (req, res) => {
    const db = req.app.locals.db;
    const todoId = req.params.id;
    const { title, description, status, due_time } = req.body;

    try {
        await db.query(
            "UPDATE `Todo` SET title = ?, description = ?, status = ?, due_time = ? WHERE id = ?",
            [title, description, status, due_time, todoId]
        );

        res.status(200).json({ message: "Todo updated successfully", tokensuccess: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }


});

module.exports = router;

