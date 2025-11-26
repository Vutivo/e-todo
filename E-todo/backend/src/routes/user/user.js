const express = require('express');
const router = express.Router();
const { authenticateToken } = require("./../../middleware/auth.js");
const bcrypt = require("bcryptjs");

router.get("/user", authenticateToken, async (req, res) => {
    const id = req.user.id;
    const db = req.app.locals.db;
    console.log("Fetching info for user ID:", id);
    
    try {
        //Keep user
        const [userRows] = await db.query("SELECT name, firstname, email, created_at FROM User WHERE id = ?", [id]);
        console.log("User rows:", userRows);
        
        if (userRows.length === 0) {
            return res.status(404).json({ msg: "Not found" });
        }
        
        // take data to user
        const user = userRows[0];
        console.log("User data:", user);
        
        res.status(200).json({
            user,       
            token: id      
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});

router.delete("/user", authenticateToken, async (req, res) => {
    const userId = req.user.id;
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

router.put("/user", authenticateToken, async (req, res) => {
    const userId = req.user.id;
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

module.exports = router;