const mongoose = require('mongoose');
const User = require('./user');
// const Schema = mongoose.Schema;
const { ObjectId }  = mongoose.Schema;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    url: {
        type:String
    },
    content: {
        type: {},
        required: true,
    },
    postedBy:{
        type: ObjectId,
        required: true,
        ref: "User",
    },
    completed: {
        type: Boolean,
        default: false
    },
    images: [{
        public_url: String,
        s3Name: String,
        created: { type: Date, default: Date.now },
    }],
    likes : [{type: ObjectId, ref: "User", }],
    comments: [ 
    { 
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: {
            type: ObjectId,
            ref: "User",
        }
     }]
    }, { timestamps: true });
const Post = mongoose.model('Post', postSchema);
module.exports = Post;