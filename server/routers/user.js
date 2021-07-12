const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.get('/user',async (req,res)=>{
    try {
        const user = await User.find({});
        res.send(user);
    } catch (err) {
        res.send("Error "+err);
    }
});

router.post('/user',async (req,res)=> {
    try {
        const user = new User(
            req.body
        );
        await user.save();
        res.send(user);
    } catch (error) {
        res.send("Error "+error);
    }
});

module.exports=router;

