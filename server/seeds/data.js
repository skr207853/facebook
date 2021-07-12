const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/user");


const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

//connect to mongoDB
const uri = "";
mongoose.connect(
  uri,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true },
  () => {
    console.log("connected to MongoDB");
  }
);


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

usernameArr = ["Gustav_Irwin","Brantley_Willard","Aldric_Vijay","Yves_Nathan","Montgomery_Samuel","Louie_Bennie","Mohammad_Gerardo", "Adalia_Dina","Esperanza_Emely","Sylvia_Mirabel","Harriet_Presley","Millie_Violet","Evie_Meagan","Heaven_Ainsleigh"];

const chooseRandom = (arr, num = 1) => {
    const res = [];
    for(let i = 0; i < num; ){
       const random = Math.floor(Math.random() * arr.length);
       if(res.indexOf(arr[random]) !== -1){
          continue;
       };
       res.push(arr[random]);
       i++;
    };
    return res;
 };


const seedDB = async () => {
    
    let luser = new User({
        username: 'aaa',
        email: 'aaa@aaa.com',
        password: 'aaa'
    });
    await luser.save();
    for(let i = 1; i < usernameArr.length; i++)
    {
        let user = new User({
            username: usernameArr[i],
            email: makeid(3)+'@'+makeid(3)+'.com',
            password: usernameArr[i]
        })

        // const post = new Post({
        //     title: makeid(10), 
        //     description: lorem,
        //     likes: Math.floor((Math.random() * 100) + 0),
        //     user: user,
        //     images: img[Math.floor(Math.random() * img.length)],
        //     tags: tags
        // })

        // console.log(user, post);
        luser = user;
        await user.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});


