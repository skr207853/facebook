const express = require("express");
const { ObjectId } = require("mongodb");
const router = new express.Router();
const User = require("../models/user");
const NodeCache = require("node-cache");
const { rawListeners } = require("../models/user");
const myCache = new NodeCache();

router.post("/addpost/:id", async (req, res) => {
    try {
        const userFound = await User.findById(req.params.id);
        if (!userFound) res.send("User not found");
        const postinjson = req.body;
        const len = await userFound.posts.push(postinjson);
        await userFound.save();
        const post_id = await userFound.posts[len - 1]._id;
        for (frie of userFound.friends) {
            const userFound2 = await User.findById(frie.id);
            await userFound2.friends_posts.push({
                frd_id: userFound._id,
                post_id: post_id,
            });
            userFound2.save();
        }
        res.send(userFound);
    } catch (err) {
        res.send("Error " + err);
    }
});

router.get("/getpost/:userid/:friends_post_id", async (req, res) => {
    try {
        const userFound = await User.findById(req.params.userid);
        const fpi = userFound.friends_posts.find(
            (el) => el._id == req.params.friends_post_id
        );
        const userFound2 = await User.findById(fpi.frd_id);
        const thepost = userFound2.posts.find(
            (el) => el._id.toString() == fpi.post_id.toString()
        );
        res.send(thepost);
    } catch (e) {
        res.send("error " + e);
    }
});

router.post("/addfriend/:ids/:idf", async (req, res) => {
    try {
        const userFound = await User.findById(req.params.ids);
        const userFound2 = await User.findById(req.params.idf);
        if (!userFound || !userFound2) res.send("User not found");
        if (await userFound.friends.some((el) => el.id == req.params.idf)) {
            res.send("He is already your friend.");
        }
        await userFound.friends.push({
            id: new ObjectId(req.params.idf),
        });
        await userFound.save();
        await userFound2.friends.push({
            id: new ObjectId(req.params.ids),
        });
        await userFound2.save();
        {
            const post_array = [];
            userFound.posts.forEach((el) =>
                post_array.push({
                    frd_id: userFound._id,
                    post_id: post._id,
                    is_seen: false,
                })
            );
            const feed_array = [];
            const feed_result_array = [];
        }
        userFound.save();
        res.send("say.. hi to your friend");
    } catch (err) {
        res.send("Error " + err);
    }
});
// 60f67942233cdf234c673f76
router.get("/feed/:id", async (req, res) => {
    try {
        const userFound = await User.findById(req.params.id);
        let value = myCache.get(req.params.id);
        let feed_posts = [];

        if (value == undefined) {
            // to handle miss
            console.log("from the database");
            for (friend_post of userFound.friends_posts) {
                if (friend_post.is_seen) continue;
                // friend_post.is_seen = true;
                await userFound.save();
                const userFound2 = await User.findById(friend_post.frd_id);
                const thepost = userFound2.posts.find(
                    (el) => el._id.toString() == friend_post.post_id.toString()
                );
                feed_posts.push(thepost);
                // we have to push that data to the cache
            }
            const value = myCache.set(req.params.id, feed_posts, 10000);
            console.log(value);
        } else {
            // we got the value
            console.log(" from cache");
            feed_posts = myCache.get(req.params.id);
            console.log(feed_posts);
        }
        res.send(feed_posts);
    } catch (err) {
        res.send("Error " + err);
    }
});

module.exports = router;
