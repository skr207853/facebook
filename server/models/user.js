const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    friends: [
        {
            id: {
                type: Schema.Types.ObjectId,
                unique: true,
            },
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
    friends_posts: [
        {
            frd_id: Schema.Types.ObjectId,
            post_id: Schema.Types.ObjectId,
            is_seen: {
                type: Boolean,
                default: false,
            },
        },
    ],
});
// UserSchema.index({ _id: 1 }, { sparse: true });
const User = mongoose.model("User", UserSchema);
module.exports = User;
