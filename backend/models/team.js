const mongoose = require("mongoose");
const User = require("./user");
const Event = require("./event")
const ObjectId  = mongoose.Schema.Types.ObjectId;
//const ObjectId = mongoose.Schema;

const teamSchema  = new mongoose.Schema({
    name : {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    code : {
        type: String,
        trim:true,
        required:true,
        unique: true
    },
     organization_name : {
        type: String,
        trim: true,
        required: true,
        unique: false
    },
    about: {},
    description: {

    },
    header_photo: {
        public_url: String,
        s3Name: String,
        created: { type: Date, default: Date.now },
    },
    profile_photo: {
        public_url: String,
        s3Name: String,
        created: { type: Date, default: Date.now },
    },
    leaders: [{type: ObjectId, ref: "User" }],
    units: [{ 
        lead: [{type: ObjectId, ref: "User" }], 
        members: [{type: ObjectId, ref: "User" }], 
        name: String,
        tag: String,
        team_photo: [{
            public_url: String,
            s3Name: String,
            created: { type: Date, default: Date.now },
            updates: [{ updated:{type: Date, default: Date.now}, update_by: {type: ObjectId, ref: "User" }, updated_content : String  }],
            comment: {
                text: String,
                required: false,
            },
        }],
        images: [{
            public_url: String,
            s3Name: String,
            created: { type: Date, default: Date.now },
            created: { type: Date, default: Date.now },
            updates: [{ updated:{type: Date, default: Date.now}, update_by: {type: ObjectId, ref: "User" }, update: String  }],
            comment: {
                text: String,
                required: false,
            },
        }],
        created: { type: Date, default: Date.now },
        updates: [{ updated:{type: Date, default: Date.now}, update_by: {type: ObjectId, ref: "User" }, update: String  }],
        content: {
            type: {},
            required: false,
        },
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now },
        events: [{type: ObjectId, ref: 'Team'}],

    }],
    members: [{type: ObjectId, ref: "User" }],
    pending: [{type: ObjectId, ref: "User" }]

}, { timestamps: true });

const Team =  mongoose.model("Team", teamSchema);
module.exports = Team;