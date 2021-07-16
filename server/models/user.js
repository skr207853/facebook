const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
            id: Schema.Types.ObjectId,
        },
    ],
    posts: [
        {
            title: String,
            img: String,
            date: {
                type: Date,
                default: Date.now,
            },
            description: String,
            likes: Number,
        },
    ],
});
// UserSchema.index({ _id: 1 }, { sparse: true });
const User = mongoose.model("User", UserSchema);
module.exports = User;
