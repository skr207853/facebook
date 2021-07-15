const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.get('/users', async (req, res) => {
    try {
        const user = await User.find({});
        res.send(user);
    } catch (err) {
        res.send("Error " + err);
    }
});

router.post('/user', async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        await user.save();
        await user.friends.push();
        await user.save();
        res.send(user);
    } catch (error) {
        res.send("Error " + error);
    }
});

router.get("/user/:id", async (req, res) => {
    try {
        const userFound = await User.findById(req.params.id);
        if (userFound) {
            res.send(userFound);
        } else {
            res.send("User not found");
        }
    } catch (err) {
        res.send("Error " + err);
    }
});


module.exports = router;

