const express = require('express');

//const formidable = require('express-formidable');
const multer  = require('multer')
//const sharp = require('sharp');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
//const upload = multer({ dest: 'tmp/' })

const router = express.Router();

const { requireSigning, canEditDeleteOwnPost } = require('../middlewares/auth');

const { createPost, uploadImage, postByUsers, userPost, updatePost, deletePost, userPostLike, userPostUnlike } = require('../controllers/post');
//controllers

router.get('/user-posts', requireSigning, postByUsers );
router.get('/user-post/:_id', requireSigning, userPost );
router.put('/post-update/:_id', requireSigning, canEditDeleteOwnPost, updatePost );
router.delete('/post-delete/:_id', requireSigning, canEditDeleteOwnPost, deletePost );
router.post('/post-like/:_id', requireSigning, userPostLike );
router.post('/post-unlike/:_id', requireSigning, userPostUnlike );
/*  Post  */
router.post('/create-post', requireSigning, createPost );
router.post('/upload-image', upload.array('images', 12), requireSigning, uploadImage );

// router.post('/upload-image', requireSigning, formidable({ maxFileSize: 5 * 1024 * 1024, multiples: true, }), uploadImage )

module.exports = router;
