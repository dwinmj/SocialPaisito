const mongoose = require("mongoose");
const Team = require("./team");
// const  Schema = mongoose.Schema;
//const ObjectId  = mongoose.Schema.Types.ObjectId;
const roleSchema = new mongoose.Schema({
    role_name : {
        type: String,
        trim: true,
        required: true
    },
    

}, { timestamps: true });

const User =  mongoose.model("User", userSchema);
module.exports = User;