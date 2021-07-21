const express = require("express");
const {ObjectId} = require("mongodb");
const router = new express.Router();
const User = require("../models/user");

router.post("/addpost/:id", async (req, res) => {
    try {
        const userFound = await User.findById(req.params.id);
        if (!userFound) res.send("User not found");
        console.log(userFound);
        const postinjson = req.body;
        const len= await userFound.posts.push(postinjson);
        await userFound.save();
        const post_id=await userFound.posts[len-1]._id;
        for(frie of userFound.friends) {
            const userFound2 = await User.findById(frie.id);
            console.log(userFound2);
            await userFound2.friends_posts.push({
                'frd_id':userFound._id,
                'post_id':post_id
            });
            userFound2.save();
        }
        res.send(userFound);
    } catch (err) {
        res.send("Error " + err);
    }
});


router.post("/addfriend/:ids/:idf", async (req, res) => {
    try {
        const userFound = await User.findById(req.params.ids);
        const userFound2 = await User.findById(req.params.idf);
        if (userFound && userFound2) {
            if (await userFound.friends.includes({_id:req.params.idf})) {
                res.send("He is already your friend.");
            } else {
                await userFound.friends.push({
                    'id':new ObjectId(req.params.idf)
                });
                await userFound.save();
                await userFound2.friends.push({
                    'id':new ObjectId(req.params.ids)
                });
                await userFound2.save();
                res.send("say.. hi to your friend");
            }
        } else {
            res.send("User not found");
        }
    } catch (err) {
        res.send("Error " + err);
    }
});


router.get("/feed/:id", async (req, res) => {
    try {
        const userFound = await User.findById(req.params.id);
        
    } catch (err) {
        res.send("Error " + err);
    }
});


module.exports = router;

