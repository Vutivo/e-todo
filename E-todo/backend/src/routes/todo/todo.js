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

        if (userIds.length === 0) {
            return res.status(200).json({
                tokensuccess: true,
                tasks: []
            });
        }

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

        res.status(200).json({
            tokensuccess: true,
            tasks
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});


router.get("/user/todos", authenticateToken, async (req, res) => {
    const db = req.app.locals.db;
    const { id } = req.user;  

    try {
        const [userRows] = await db.query("SELECT name, firstname, email, id FROM User WHERE id = ?", [id]);
        if (userRows.length === 0) {
            return res.status(404).json({ msg: "Not found" });
        }
        const user = userRows[0];

        const [tasks] = await db.query(
            "SELECT status, description, title, id FROM Todo WHERE user_id = ?",
            [id]
        );

        res.json({ 
            user,
            tasks,
            id: user.id,
            tokensuccess: true 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});

router.post("/todos", authenticateToken, async (req, res) => {
    const db = req.app.locals.db;
    const userId = req.user.id;
    const { status, title, description, due_time } = req.body;

    if (!title || !description || !due_time) {
        return res.status(400).json({ msg: "Bad parameter" });
    }

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
        res.status(500).json({ msg: "Internal server error" });
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

        if (row.length === 0) {
            return res.status(404).json({ msg: "Not found" });
        }

        const todo = row[0];
        let description = todo.description;

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
        res.status(500).json({ msg: "Internal server error" });
    }
});

router.delete("/todos/:id", authenticateToken, async (req, res) => {
    const db = req.app.locals.db;
    const todoId = req.params.id;

    try {
        const [checkRows] = await db.query(
            "SELECT id FROM `Todo` WHERE id = ?",
            [todoId]
        );

        if (checkRows.length === 0) {
            return res.status(404).json({ msg: "Not found" });
        }

        await db.query(
            "DELETE FROM `Todo` WHERE id = ?",
            [todoId]
        );

        res.status(200).json({ 
            msg: `Successfully deleted record number: ${todoId}`, 
            tokensuccess: true 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});

router.put("/todos/:id", authenticateToken, async (req, res) => {
    const db = req.app.locals.db;
    const todoId = req.params.id;
    const { title, description, status, due_time } = req.body;

    try {
        const [checkRows] = await db.query(
            "SELECT id FROM `Todo` WHERE id = ?",
            [todoId]
        );

        if (checkRows.length === 0) {
            return res.status(404).json({ msg: "Not found" });
        }

        await db.query(
            "UPDATE `Todo` SET title = ?, description = ?, status = ?, due_time = ? WHERE id = ?",
            [title, description, status, due_time, todoId]
        );

        res.status(200).json({ 
            msg: "Todo updated successfully", 
            tokensuccess: true 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = router;