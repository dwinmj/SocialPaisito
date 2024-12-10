const User = require( '../models/user');
const Team = require('../models/team');
const AuthController = require('../helpers/auth');
//const useRouter = 

require("dotenv").config();


const getMyTeams = async (req, res) =>{
    try {
        //console.log(req.auth);
        const user = await User.findById(req.auth._id);
        const myteams = user.teams;
        const my_teams = await Team.find({ _id: myteams})
        res.json(my_teams);
    } catch (error) {
        throw new Error(error);
    }
}; 
const getPendingTeams = async (req, res) =>{
    try {
        //console.log(req.auth);
        const user = await User.findById(req.auth._id);
        const myteams = user.teams;
        const my_teams = await Team.find({ _id: myteams})
        res.json(my_teams);

    } catch (error) {
        throw new Error(error);
    }
};
const getSuggestedTeams = async (req, res) =>{
    try {
        //console.log(req.auth);
        const user = await User.findById(req.auth._id);
        const myteams = user.teams;
        const my_teams = await Team.find({ _id: myteams})
        res.json(my_teams);

    } catch (error) {
        throw new Error(error);
    }
};

module.exports = { getMyTeams, getPendingTeams, getSuggestedTeams };
