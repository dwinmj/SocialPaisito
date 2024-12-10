import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import PostForm from "../../components/forms/PostForm";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "../../components/cards/PostList";

const Home = () => {
    const [ state, setState ] = useContext(UserContext);

    const [ content, setContent ] = useState('');

    const [ images, setImages ] = useState({});
    const [ uploading, setUploading ] = useState(false);
    const [ posts, setPosts ] = useState([]);
    const router = useRouter();


    useEffect(() => {
        if( state && state.token ){ fetchUserPosts(); }
    }, [ state && state.token ]);
    
    const fetchUserPosts = async () => {
        try {
            const { data }   = await axios.get("/user-posts");
            setPosts(data);
        } catch (error) {
            console.log(error);
        }
    };

    const postSubmit = async (e) => {
        e.preventDefault();
        try {

            // const formData = new FormData();
            // console.log(content);
            // Array.from(file).forEach(fil => {
            //     formData.append('images', fil)
            // })

            // formData.append("content", content);
            // console.log(formData.entries());
            const { data } = await axios.post('/create-post', { content, images });
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

    const handleAttachments = async (e) => {
        e.preventDefault();
        try {
            var formData = new FormData();
            const newimages = e.target.files;
            //console.log(images);
            
            Array.from(newimages).forEach(img => {
                formData.append('images', img)
            });

            const { data } = await axios.post('/upload-image', formData, {  headers: {'Content-Type': 'multipart/form-data'}});

            if(images && images.length){
                setImages([...images, ...data.image_names]);
            } else {
                setImages(data.image_names);
            }
            if(data.error){
                toast.error(data.error);
            } else {
                toast.success('Images were uploaded successfully!');
                //setContent('');
            }
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    }
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

    }

    return(
        <UserRoute>
            <div className="container">
                <div className="row py-3  bg-default-image">
                    <div className="col">
                        <h1 className="display-1 text-center"> NewsFeed </h1>
                    </div>
                </div>

                <div className="row py-3" >
                    <div className="col-md-8"> 
                        <PostForm 
                            content={ content }
                            setContent = { setContent }
                            // file = { file }
                            // setFile = { setFile }
                            postSubmit = { postSubmit }
                            handleAttachments = { handleAttachments }
                            uploading = { uploading }
                            images = { images }
                            state = { state }
                            setImages = { setImages }
                        />
                        <hr className="my-4"/>
                        <PostList posts = { posts } handleDelete ={ handleDelete } />

                    </div>
                    <div className="col-md-4">
                        Sidebar
                    </div>
                </div>
            </div>
        </UserRoute>
    );
};

export default Home;