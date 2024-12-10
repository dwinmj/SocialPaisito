import { useContext, useEffect, useState } from 'react';
import renderHtml from 'react-render-html';
import { Avatar, Modal } from 'antd';
import  PostImage  from '../images/PostImage';
import { HeartOutlined, HeartFilled, CommentOutlined, MacCommandFilled, MessageOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { UserContext } from '../../context';
import { useRouter } from 'next/router';

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localeEn from "dayjs/locale/en";
import ProfileImage from '../images/ProfileImage';
import axios from 'axios';

const daysago = (postDate) => { 
    dayjs.extend(relativeTime).locale(localeEn) 
    let fromNowOn = dayjs(postDate).fromNow(); 
    return(fromNowOn)
 };
// import crypto from 'crypto';

const PostList = ( { pageClass } ) => {
//console.log("postlist 7: ", posts);
const [ state ] = useContext(UserContext);
const [ posts, setPosts ] = useState([]);
const [ visible, setVisible ] = useState(false);
const [comment, setComment] = useState('');
const [currentPost, setCurrentPost ] = useState('');
const router = useRouter();
//console.log(state.user.profile_photo.public_url);
useEffect(() => {
    if( state && state.token ){ 
     fetchUserPosts(); 
     //fetchFriends();
     //fetchrecomFriends();
 }
}, [ state && state.token ]);
  
const fetchUserPosts = async () => {
    try {
        const { data }   = await axios.get("/user-posts");
        setPosts(data);
    } catch (error) {
        throw new Error(error);
    }
};
const handleDelete = async (post) => {
    // e.preventDefault();

     try {

         const confirmed_delete = window.confirm("Please confirm you want to delete this Post!");

         if(!confirmed_delete) return false;

         const { data } = await axios.delete(`/post-delete/${post._id}`);

         if(data.error){
             toast.error(data.error);
         } else {
             toast.error("Post deleted!");
             fetchUserPosts(); 
         }

     } catch (error) {
         console.log(error);
     }
 };
    const handlePostLike = async (post_id) => {
        console.log(post_id)
        try {
            //const confirmed_delete = window.confirm("Please confirm you want to delete this Post!");

            //if(!confirmed_delete) return false;

            const { data } = await axios.post(`/post-like/${post_id}`);

            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success("Post Liked!");
                fetchUserPosts(); 
            }

        } catch (error) {
            console.log(error);
        }
    };
    const handlePostUnLike = async (post_id) => {
        console.log(post_id)
        try {
            const confirmed_unliked = window.confirm("Please confirm you want to Unlike this Post!");

            if(!confirmed_unliked) return false;

            const { data } = await axios.post(`/post-unlike/${post_id}`);

            if (data.error) {
                toast.error(data.error);
            } else {
                toast.info("Post UnLiked!");
                fetchUserPosts(); 
            }

        } catch (error) {
            console.log(error);
        }
    };
   // console.log(posts[0].likes)
    const handleComment = ( post ) =>{
        setVisible(true);
        setCurrentPost(post);
    };
    const addComment = ( post ) =>{
        
    };
    const removeComment = ( post ) =>{
        
    };



    return <>
            <div className={"row" } >
            {
            posts && posts.map((post) => 
                
                 <div id={ post._id } key={ post._id } className="card mb-5" >
                    <div className="card-header" > 
                        <Avatar size={40} className='mb-2' key={post._id } >
                            {post.postedBy.name[0] }
                        </Avatar>{ ' ' }
                        {console.dir(post.postedBy)}
                        {/* <ProfileImage profilephoto = { state.user.profile_photo} size={40} class_name="frnds-profile" /> */}
                        <span className='pt-2 ml-3'> {post.postedBy.name } </span>
                        <span className='pt-2 ml-3'> { daysago(post.createdAt) } </span>
                    </div>
                    <div className="card-body">{ renderHtml(post.content) }</div>                     
                    <div className="card-footer">
                        
                        {
                             post.images.length > 0 ?  post.images.map((image) => 
                                <PostImage image={image} post_id={post._id } key={image.s3Name} />
                            ) : "0 Images"
                        }
                        <div className='row mb-3 text-center'>
                            <div className='col-6 themed-grid-col mb-xl-0'>
                                { post && post.likes.includes(state.user._id) ? (
                                    <HeartFilled onClick={()=> handlePostUnLike(post._id) } className='text-danger pt-2 h5 px-2' /> 
                                ) : (
                                    <HeartOutlined onClick={()=> handlePostLike(post._id) } className='text-danger pt-2 h5 px-2' /> 
                                ) }
                                
                                <span className="pt-3">{ post.likes.length } Likes </span>
                                <MessageOutlined onClick={ () => handleComment(post)  } className='text-danger pt-2 h5 pl-5 px-2' /> 
                                <span className="pt-3">4 comments</span>
                            </div>
                            { state && state.user && state.user._id === post.postedBy._id && (
                                <>
                                <div className='col-6 themed-grid-col text-right'>
                                    <EditOutlined onClick={() => router.push(`/dashboard/post/edit/${post._id}`) } className='text-danger pt-2 h5 px-2' /> 
                                    <DeleteOutlined onClick={ () => handleDelete(post) }  className='text-danger pt-2 h5 pl-5 px-2' /> 
                                </div>
                                </>
                            ) }
                        </div>
                    </div>
                     
                </div> 
            
                )
            }
            </div>
            
            </>
};

export default PostList;


