const mongoose = require('mongoose');
const User = require('./user');
// const Schema = mongoose.Schema;
const ObjectId  = mongoose.Schema.Types.ObjectId;

const eventSchema = new mongoose.Schema({
    content: {
        type: {},
        required: true,
    },
    postedBy:{
        type: ObjectId,
        ref: "User",
    },
    images: [{
        public_url: String,
        s3Name: String,
        created: { type: Date, default: Date.now },
    }],
    likes : [{
        user: {type: ObjectId, ref: "User"},
        created: { type: Date, default: Date.now }, }],
    comments: [{ 
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: {
            type: ObjectId,
            ref: "User",
        }
     }]
    }, { timestamps: true });
const Event = mongoose.model('Event', eventSchema);
module.exports = Event;