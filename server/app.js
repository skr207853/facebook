const express = require("express");
const userrouter = require("./routers/user");
const postrouter = require("./routers/post");
const mongoose = require("mongoose");
var addRequestId = require("express-request-id")();
require("dotenv").config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(addRequestId);

//connect to mongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(
    uri,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    () => {
        console.log("connected to MongoDB");
    }
);

app.use(userrouter);
app.use(postrouter);

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
