const { expressjwt: expressJwt } = require('express-jwt');
const Post = require( '../models/post');
//const { expressjwt: expressJwt } = require('express-jwt');
exports.requireSigning = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});


exports.canEditDeleteOwnPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params._id);

        if( req.auth._id != post.postedBy ){
            return res.status(400).send('Unauthorized')
        } else {
            next();
        }
    } catch (error) {
        throw new Error(error);
    }
};


