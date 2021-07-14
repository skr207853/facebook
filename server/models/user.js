const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    friends: [
      {
        id : {
          type: Schema.Types.ObjectId
        }
      }
    ],
    posts: [
        {
            title:String,
            img:String,
            date : {
                type: Date,
                default: Date.now
            },
            description:String,
            likes:Number
        }
    ],
  }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;