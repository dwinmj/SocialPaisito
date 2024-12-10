import { useState, useContext, useEffect,  } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
// import Link from "next/link";
// import { 
//     SyncOutlined, LogoutOutlined, CameraOutlined, BarChartOutlined,
//     AppstoreOutlined, SettingOutlined
// } from "@ant-design/icons";
//import ProfileForm from "../components/forms/ProfileForm";
import { UserContext } from "../context";
//import InputUserName from "../components/input/InputUserName";
import UserRoute from "../components/routes/UserRoute";
import PostForm from "../components/forms/PostForm";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localeEn from "dayjs/locale/en";
import ProfileImage from "../components/images/ProfileImage";

import PostList from "../components/cards/PostList";
import Friends from "../components/cards/Friends";
import RecommendedFriends from "../components/cards/RecommendedFriends";
const daysago = (postDate) => { 
    dayjs.extend(relativeTime).locale(localeEn);
    let fromNowOn = dayjs(postDate).fromNow(); 
    return(fromNowOn);
 };



const Home = () => {
    const [ state ] = useContext(UserContext);
    const [name, setName] = useState(" ");
    const [about, setAbout] = useState(' ');
    const [username, setUsername] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [createat, setCreatedat] = useState(' ');
    const [lastseen, setLastseen] = useState(' ');
    const [password, setPassword] = useState(' ');
    const [secret, setSecret] = useState(' ');
    const [question, setQuestion] = useState(' ');
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ content, setContent ] = useState('');
    const [ profileimage, setProfileimage ] = useState('');
    const [ uploading, setUploading ] = useState(false);

    const [ images, setImages ] = useState([]);
   // const router = useRouter();
   const [ posts, setPosts ] = useState([]);



   useEffect(() => {
    if( window && window.localStorage.getItem('postImages') ){ 
        const imagesPosted = window.localStorage.getItem('postImages');
       // var newImages = [] ;
        if( imagesPosted ) {
          const addedImages = JSON.parse(imagesPosted);
          window.localStorage.removeItem(`postImages`);
          if( images.length ){
            setImages([...images, ...addedImages]);
          } else {
            setImages([...addedImages]);   
          }
         // setImages(addedImages);
         
        }
     }
}, [ process.browser && window && window.localStorage.getItem('postImages') ]);

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
 /*  const fetchFriends = async () => {
        try {
            //console.log('fetchFriends');
            const { data } = await axios.get("/get-friends");
            setFriends(data);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchrecomFriends = async (limit=6) => {
        try {
            // console.log('fetchrecomFriends');
            const { data } = await axios.get(`/get-suggested-friends/${limit}`);
            console.log(data.length);
            setRecommendedusers(data);
        } catch (error) {
            console.log(error);
        }
    }; */
    useEffect(() =>{
        if( state && state.user && state.user.name != undefined  ){
            let current = state.user;
            //console.log(current);
            setName(current.name );
            setUsername(current.username);
            setAbout(current.about);
            setEmail(current.email);
            //setPassword(current.password);
            setCreatedat(current.createdAt)
            setQuestion(current.question);
            //setSecret(current.secret);
            setProfileimage(current.profile_photo);
            setLastseen(current.last_seen);

        }
    },[state && state.user && state.user.name != undefined  ]);

    const postSubmit = async (e) => {
        e.preventDefault();
        try {

            // const formData = new FormData();
            // console.log(content);

           const { data } = await axios.post('/create-post', { content, images });
           //console.log(new_images);
          // console.log(images);
           //setImages(new_images);
          // console.log(images);
            // Array.from(file).forEach(fil => {
            //     formData.append('images', fil)
            // })

            // formData.append("content", content);
            // console.log(formData.entries());
            
            //console.log(data);
            if(data.error){
                toast.error(data.error);
            } else {
                fetchUserPosts();
                toast.success('Post was saved successful!');
                setContent('');
                setImages({})
            }

        } catch (error) {
            console.log(error);

        }
        //console.log("post => ", content ); 
    }

    // const handleAttachments = async (e) => {
    //     e.preventDefault();
    //     try {
    //         var formData = new FormData();
    //         const newimages = e.target.files;
    //         //console.log(images);
            
    //         Array.from(newimages).forEach(img => {
    //             formData.append('images', img)
    //         });

    //         const { data } = await axios.post('/upload-image', formData, {  headers: {'Content-Type': 'multipart/form-data'}});

    //         if(images && images.length){
    //             setImages([...images, ...data.image_names]);
    //         } else {
    //             setImages(data.image_names);
    //         }
    //         if(data.error){
    //             toast.error(data.error);
    //         } else {
    //             toast.success('Images were uploaded successfully!');
    //             //setContent('');
    //         }
    //         setUploading(false);
    //     } catch (error) {
    //         console.log(error);
    //         setUploading(false);
    //     }
    // }


     let join_date = dayjs(createat).locale(localeEn).format('MMM D, YYYY h:mm A').toString() ;
     let last_login =  daysago(lastseen);
    // const recommendedfriends = suggested_friends; //.reverse().slice(0,4) ;

    return (
        <UserRoute>
            <main>
                <div className="container my-5" >
                    <div className="d-flex row flex-lg-nowcrap">

                        <div className="col-md-4 order-md-1 order-lg-0 order-sm-1 order-1" >
                            <div className="prf-card mx-4">
                                <div className="overlay d-none">
                                    <small className="fa fa-close"></small>

                                </div>
                                <div className="upperborder">
                                </div>

                                {/* <div class="sideprof-image"> */}

                                {
                                    <ProfileImage profilephoto={profileimage} size={100} />                                
                                }

                                {/* </div> */}
                                <div className="text">
                                    <h3 className="user fullname">{name}</h3>
                                    <p className="mb-0">@{username}</p>
                                    <p className="mb-0 text-muted"><small>Last Logged in {last_login}</small></p>
                                </div>
                                <div className="bottom box-footer">
                                    <div className="row">
                                        <div className="col-sm-4 border-right">
                                            <div className="description-block">
                                                <h5 className="description-header">132</h5>
                                                <span className="description-text">Friends</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 border-right">
                                            <div className="description-block">
                                                <h5 className="description-header">150</h5>
                                                <span className="description-text">Followers</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="description-block">
                                                <h5 className="description-header">35</h5>
                                                <span className="description-text">Posts</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container teams-recom">
                            <div className="header-title"><h4>Recommended Teams</h4><a href="#">See all</a></div>
                                <ul className="list row">
                                    <li className="list-item col-md-6">
                                        <div className="tcard">
                                            <div className="card">
                                                <div className="top"
                                                    style={{ backgroundImage: 'url(https://www.smashbros.com/wiiu-3ds/images/character/lizardon/main.png)' }}> </div>
                                                <div className="card-body">
                                                    <h5 className="c-text card-title">Special Team</h5>
                                                    <p className="c-text card-text">College of Arquitecture</p>

                                                </div>
                                                <div className="card-footer">
                                                    <a href="#" className="btn btn-primary">Join Team</a>
                                                    <a href="#" className="btn btn-primary">Remove</a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-item col-md-6">
                                        <div className="tcard">
                                            <div className="card">
                                                <div className="top"
                                                    style={{ backgroundImage: 'url(https://www.smashbros.com/wiiu-3ds/images/character/lizardon/main.png)' }}> </div>
                                                <div className="card-body">
                                                    <h5 className="c-text card-title">best Team</h5>
                                                    <p className="c-text card-text">College of Arquitecture</p>

                                                </div>
                                                <div className="card-footer">
                                                    <a href="#" className="btn btn-primary">Join Team</a>
                                                    <a href="#" className="btn btn-primary">Remove</a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <br/>
                            <div className="container teams-recom r-f">
                                <RecommendedFriends limit={19} />
                            </div>
                        </div>

                        <div className="col-md-6 order-md-1 order-lg-1">
                            <div className="row">
                                <PostForm
                                    content={content}
                                    setContent={setContent}
                                    // file = { file }
                                    // setFile = { setFile }
                                    postSubmit={postSubmit}
                                    // handleAttachments={handleAttachments}
                                    uploading={uploading}
                                    images={images}
                                    setImages={setImages}
                                /> 
                            </div>
                            <hr className="my-4" />
                            <PostList pageClass={'uhp'} />
                        </div>
                        <div className="col-sm-12 col-md-2 order-md-2 order-2">
                            <div className="row d-flex">
                                <Friends limit={20} /> 
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </UserRoute>
    );
};

export default Home;