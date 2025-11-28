const express = require('express');
const router = express.Router();
const { authenticateToken } = require("./../../middleware/auth.js");
const bcrypt = require("bcryptjs");

router.get("/users/:id", authenticateToken, async (req, res) => {
    const value = req.params.id;
    const db = req.app.locals.db;

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    // Determine query
    const query = isEmail
        ? "SELECT id FROM `User` WHERE email = ?"
        : "SELECT id FROM `User` WHERE id = ?";

    try {
        // Check if user exists
        const [rows] = await db.query(query, [value]);

        if (rows.length === 0) {
            return res.status(404).json({ msg: "Not found" });
        }

        const userId = rows[0].id;

        // Fetch full user data
        const [userRows] = await db.query(
            "SELECT name, firstname, email, password, created_at FROM User WHERE id = ?",
            [userId]
        );

        if (userRows.length === 0) {
            return res.status(404).json({ msg: "Not found" });
        }

        res.status(200).json({
            user: userRows[0],
            token: userId
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});


router.delete("/users/:id", authenticateToken, async (req, res) => {
    const userId = req.params.id;
    const { password } = req.body;
    const db = req.app.locals.db;

    if (!password) {
        return res.status(400).json({ success: false, msg: "Bad parameter" });
    }

    try {
        const [userRows] = await db.query("SELECT password FROM `User` WHERE id = ?", [userId]);

        if (userRows.length === 0) {
            return res.status(404).json({ success: false, msg: "Not found" });
        }

        const user = userRows[0];
        const samePass = await bcrypt.compare(password, user.password);

        if (!samePass) {
            return res.status(401).json({ success: false, msg: "Invalid Credentials" });
        }

        // Suppression
        await db.query("DELETE FROM `User` WHERE id = ?", [userId]);

        res.status(200).json({
            success: true,
            msg: `Successfully deleted record number: ${userId}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
});

router.put("/users/:id", authenticateToken, async (req, res) => {
    const userId = req.params.id;
    const { name, firstname, email, password } = req.body;
    const db = req.app.locals.db;

    if (!password || !name || !firstname || !email) {
        return res.status(400).json({ success: false, msg: "Bad parameter" });
    }

    try {
        const [userRows] = await db.query("SELECT password FROM `User` WHERE id = ?", [userId]);

        if (userRows.length === 0) {
            return res.status(404).json({ success: false, msg: "Not found" });
        }

        const user = userRows[0];
        const samePass = await bcrypt.compare(password, user.password);

        if (!samePass) {
            return res.status(401).json({ success: false, msg: "Invalid Credentials" });
        }

        const [emailCheck] = await db.query(
            "SELECT id FROM `User` WHERE email = ? AND id != ?",
            [email, userId]
        );

        if (emailCheck.length > 0) {
            return res.status(409).json({ success: false, msg: "Account already exists" });
        }

        // Edit
        await db.query("UPDATE `User` SET name=?, firstname=?, email=? WHERE id=?", [name, firstname, email, userId]);

        res.status(200).json({
            success: true,
            msg: "User updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
});

router.get("/user", authenticateToken, async (req, res) => {
    const db = req.app.locals.db;
    try {
        const [rows] = await db.query(
            "SELECT id, name, firstname, email, password, created_at FROM `User`"
        );


        const users = rows.map(row => ({
            id: row.id,
            name: row.name,
            firstname: row.firstname,
            email: row.email,
            created_at: row.created_at,
            password: row.password
        }));
        
        res.status(200).json({
            users
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = router;