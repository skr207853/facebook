const express = require("express");
const { ObjectId } = require("mongodb");
const router = new express.Router();
const User = require("../models/user");


// router.get('/user',async (req,res)=>{
//     try {
//         const user = await User.find({});
//         res.send(user);
//     } catch (err) {
//         res.send("Error "+err);
//     }
// });

router.post("/addpost/:id",async(req,res)=>{
    try{
        const userFound = await User.findById(req.params.id);
        console.log(userFound);
        // const user = await User.find({});
        userFound.friends.push({
            id:new ObjectId("60ebf7011173751c9493cfd3")
        });
        console.log(userFound.friends);
        if(userFound){
            res.send("nothing ra");
        }else{
            
        }
    }catch (err){
        
    }
});
module.exports=router;

