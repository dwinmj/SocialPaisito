const Post = require('../models/post');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { json } = require('body-parser');
// const PutObjectCommand = s3.PutObjectCommand();
const crypto = require('crypto'); 
require("dotenv").config();
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const bucketAccessKey = process.env.BUCKET_ACCESS_KEY;
const bucketSecretKey = process.env.BUCKET_SECRET_KEY;
const cloudFlareURL = process.env.CLOUD_FLARE_URL;

const randomImageName = (bytes = 32 ) => crypto.randomBytes(bytes).toString('hex');


const createPost = async (req, res) => {

   const { content, images } = req.body;

   if( !content.length ) {
        return res.json({
            error: 'Content is required',
        });
   }

   try {
          const post = await new Post({
               content: content,
               postedBy: req.auth._id,
               images: images,
          });
          post.save();
          res.json( post );

   } catch (error) {
        console.log(error);
        res.sendStatus(400);
   }
};

const uploadImage = async (req, res, next) => {

     const nimages = req.files;
   //  console.log("controller/post.js:51", nimages);
   //  console.log("controller/post.js:52", images);
     if( !nimages.length ) {
          return res.json({
              error: 'Images are required',
          });
     }
     try {
          const sClient = new S3Client({
               credentials:{
                    accessKeyId : bucketAccessKey,
                    secretAccessKey : bucketSecretKey,
               },
               region : bucketRegion,
          });

          var responseData = [];

          nimages.map( async (image) => {
            let imageName = randomImageName();
            const params = {
               Bucket: bucketName,
               Key: imageName,
               Body: image.buffer,
               ContentType: image.mimetype, 
            };
            
            responseData.push({ s3Name: imageName, public_url: `${cloudFlareURL}/${imageName}` } );
            let command = new PutObjectCommand(params);

            await sClient.send(command) ;
           /* .then(
                 (data) => {
                   res.json({ uploaded_images : data, image_names : responseData }) 
                 },
                 (error) => {
                   // error handling.
                   console.log(error);
                 }
            ); */
       });

       res.json({ image_names : responseData }) ;
     } catch (error) {
         console.log(error);
          //res.sendStatus(400);
     }
  };

  const postByUsers = async (req, res) => {
     try {
          // const posts = await Post.find({ postedBy: req.auth._id})
          const posts = await Post.find()
          .populate('postedBy', '_id name image')
          .sort({createdAt: -1})
          .limit(20);

          // console.log(posts);
          res.json( posts );
     } catch (error) {
          console.log(error);
     }

  };
  
  const userPost = async (req, res) => {

     try {
          const post = await Post.findById(req.params._id)
          res.json( post )
     } catch (error) {
          console.log(error);
     }
  };

  const updatePost = async ( req, res ) => {
     try {
         //console.log("Post Update Edit Controller: ", req.body);
         const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true });
         res.json(post);
     } catch (error) {
         console.log(error);
     }
  };


  const deletePost = async ( req, res ) => {
     try {

         const post = await Post.findByIdAndDelete(req.params._id);

         if(post && post.images && post.images.length ){
               const sClient = new S3Client({
                    credentials:{
                         accessKeyId : bucketAccessKey,
                         secretAccessKey : bucketSecretKey,
                    },
                    region : bucketRegion,
               });

               post.images.map( async (image) => {
                    const input = {
                         Bucket: bucketName,
                         Key: image.s3Name
                    };
                    const command = new DeleteObjectCommand(input);
                    await sClient.send(command); 

               });
          }

          res.json({ok:true});

         //res.json(post);
     } catch (error) {
         console.log(error);
     }
  };


  const userPostLike = async ( req, res ) => {
     try {
         const post = await Post.findByIdAndUpdate(
               req.params._id,
               {
                    $addToSet:{likes: req.auth._id }
               }, { new: true });
          res.json(post);

     } catch (error) {
          console.log("UserPostLike:line:174");
          console.log(error);
     }
  };
  const userPostUnlike = async ( req, res ) => {
     try {
          const post = await Post.findByIdAndUpdate(
                req.params._id,
                {
                     $pull:{likes: req.auth._id }
                }, { new: true });
           res.json(post);
 
      } catch (error) {
          console.log("UserPostUnLike:line:174");
          console.log(error);
      }
  };
module.exports = { createPost, uploadImage, postByUsers, userPost, updatePost, deletePost, userPostLike, userPostUnlike }