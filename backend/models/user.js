const mongoose = require("mongoose");
const Team = require("./team");
//const  Schema = mongoose.Schema;
const ObjectId  = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        trim: true,
        required: true
    },
    email : {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password : {
        type: String,
        trim: true,
        required: true,
        min: 6,
        max: 64
    },
    question: { 
        type: String,
        required: true,
        trim: true
    },
    secret: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type:String,
        unique: true,
        required: true
    },
    about: {},
    profile_photo: {
        public_url: String,
        s3Name: String,
        created: { type: Date, default: Date.now },
    },
    last_seen: { type: Date, default: Date.now },
    following: [{ user:{type: ObjectId, ref: "User", unique: true, }, startdate: { type: Date, default: Date.now }}],
    followers: [{ user:{type: ObjectId, ref: "User", unique: true, }, startdate: { type: Date, default: Date.now }}],
    friends_recomended: [{type: ObjectId, ref: "User" }],
    teams: [{ team: { ref: "Team", type:ObjectId }, approved: false, accepted_date: { type: Date, default: Date.now }, request_date: { type: Date, default: Date.now } }],
    teams_recomended : [{ team: { ref: "Team", type:ObjectId }, commendation_date: { type: Date, default: Date.now } }],
    roles: [{type:String , default:'prospect', }]
// messages sent && recieved { to whom when and how} 
// chat history ?
// m v/suma_ren/
}, { timestamps: true });

const User =  mongoose.model("User", userSchema);
module.exports = User;