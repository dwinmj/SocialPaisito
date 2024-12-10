
const express = require('express');

const router = express.Router();
const { currentUser, profileImageUpdate, profileUpdate } = require( "../controllers/auth");
const { getFriends , getSuggestedFriends, addFriend, removeFriend } = require('../controllers/friend'); //, getRecommendedFriends
const { requireSigning } = require('../middlewares/auth');


//controllers


router.get('/current-user',  requireSigning, currentUser );
router.put('/profile-image', requireSigning, profileImageUpdate );
router.put('/profile-update', requireSigning, profileUpdate );
router.get('/get-friends', requireSigning, getFriends);
router.get('/get-suggested-friends/:limit', requireSigning, getSuggestedFriends);

router.put('/add-friend', requireSigning, addFriend);
router.delete('/remove-friend', requireSigning, removeFriend);
//router.get('/friends', requireSigning, usersFollowing);

//router.get('/friends/recommended', requireSigning, getRecommendedFriends);




router.use(function (err, req, res, next) {
  console.log(err);
  try{
    if (err.name === 'UnauthorizedError') {
      return res.status(401).send({
        success: false,
        message: 'No token provided.'
      });
    }
  }catch(error){
    throw new Error(error)
  }
  });

module.exports = router;
