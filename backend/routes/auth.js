const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', async (req, res) => {
    try {
        console.log("Received signup request:", req.body); // DEBUG LOG
        let success = false;
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            console.log("User already exists:", req.body.email); // DEBUG LOG
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" });
        }

        // Create a new user
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            firebaseUid: req.body.firebaseUid,
        });

        success = true;
        res.json({ success, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Google Login Sync: POST "/api/auth/google". No login required
router.post('/google', async (req, res) => {
    try {
        console.log("Received google login request:", req.body);
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            // User exists, just ensure firebaseUid is updated if missing (optional but good practice)
            if (!user.firebaseUid) {
                user.firebaseUid = req.body.firebaseUid;
                await user.save();
            }
            return res.json({ success: true, user });
        }

        // User doesn't exist, create new one
        // We use firebaseUid as the password for Google users as per the learning note pattern
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.firebaseUid,
            firebaseUid: req.body.firebaseUid,
        });

        res.json({ success: true, user });
    } catch (error) {
        console.error("Google sync error:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
