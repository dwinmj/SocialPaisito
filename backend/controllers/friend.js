const User = require( '../models/user');
const AuthController = require('../helpers/auth');
//const useRouter = 

const hashPassword = AuthController.hashPassword;
const comparePassword = AuthController.comparePassword;
const jwt = require('jsonwebtoken');
require("dotenv").config();


const getFriends = async (req, res) =>{
    try {
        //console.log('getFriends');
        const user = await User.findById(req.auth._id);
        //console.log(user.length);
        
        const following = user.following;
        const following_user = [];
        following.forEach(element => {
            following_user.push(element.user);
        });
        const ifollow = await User.find({ _id: following_user}).select("-password -secret");
        //const ifollows = await User.find({ following: following })
        //console.log('suggested: ', ifollow[1])
        res.json(ifollow);
    } catch (error) {
        throw new Error(error);
    }
}; 
const getSuggestedFriends = async (req, res) =>{
    
    try {
        //console.log(req);
        const user = await User.findById(req.auth._id);
        const _limit = req.params.limit > 0 ? req.params.limit : 10;
        
        const following = user.following;
        following.push({ user:user._id });
        following_user = [];
        following.forEach(element => {
            following_user.push(element.user);
        });
       // User.collection
       console.log(_limit);
       const suggestedFriends = await User.find( { _id: {$nin:following_user }} ).select("-password -secret").limit(_limit); //.sort( { timestamp : -1 } ).limit(_limit);
       console.log(suggestedFriends.length);
        res.json(suggestedFriends);

    } catch (error) {
        throw new Error(error);
    }
};
const p_addFriend = async (this_user, friend) =>{
    try {
        const ruser = await User.findByIdAndUpdate(
            this_user, {
                $addToSet: { following: { user: friend }},
                $inc: { count: 1 }
            },
            {new: true}
        ).select("-password -secret");
        //console.log(ruser)
        return ruser;
    } catch (error) {
        throw new Error(error);
    }
}; 
const p_removeFriend = async (user, toremove) => {
    try{    
        console.log('remove_friends');

    } catch (error) {
        throw new Error(error);
    }


};
const p_addFollower = async (fuser, follower) => {
    try {
            const followed = await User.findByIdAndUpdate(
                fuser, {
                    $addToSet: { followers: { user: follower } },
                    $inc: { count: 1 }
                },
            ).select("-password -secret");
            return followed;
    } catch (error) {
        throw new Error(error);
    }


}; 
const addFriend = async (req, res) => {
    try {

        const this_user = req.auth._id;
        const new_friend = req.body._id;

        const user = await p_addFriend(this_user, new_friend);
        const followed = await p_addFollower(new_friend, this_user);

        res.json({user: user, follower: followed });

    } catch (error) {
        throw new Error(error);
    }
}; 
const removeFriend = async (req, res) => {
    try {

        // removed from following 


        console.log('remove Friend');
    } catch (error) {
        throw new Error(error);
    }
};
const getRecommendedFriends = async (req, res) =>{

}

module.exports = { getFriends, getSuggestedFriends, addFriend, removeFriend, getRecommendedFriends };

