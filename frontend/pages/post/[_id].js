import { useEffect, useState, useContext } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import { Modal } from 'antd';
import CommentForm from '../../components/forms/CommentForm';
import UserRoute from '../../components/routes/UserRoute';
import { UserContext } from '../../context';
import { toast } from 'react-toastify';

const ShowPost = () => {
    //const [ post, setPost ] = useState({});
    const [ state ] = useContext(UserContext);
    //const [ posts, setPosts ] = useState([]);
    const [ visible, setVisible ] = useState(false);
    const [comment, setComment] = useState('');
    const [currentPost, setCurrentPost ] = useState('');
    // const [ content, setContent ] = useState('');
    // const [ images, setImages ] = useState({});
    // const [ uploading, setUploading ] = useState(false);


    const router = useRouter();
    const p_id = router.query._id;
    useEffect(() => {
        if(p_id) {  fetchPost( )}
    },[p_id]);

    const fetchPost = async () => {
        try {
            const { data } = await axios.get(`/get-post/${p_id}`)

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

    return (
        <UserRoute>
            <div className="container">
                <div className="row py-3  bg-default-image">
                    <div className="col">
                        <h1 className="display-1 text-center"> Post </h1>
                    </div>
                </div>

                <div className="row py-3" >
                    <div className="col-md-8"> 

                    </div>
                    <div className="col-md-4">
                        Sidebar 2
                    </div>
                </div>
                <div className='row py-3'>
                    <Modal open={ visible } onCancel={ () => setVisible(false) } title="Add Comment" footer={false}>
                        <CommentForm addComment={addComment} />
                    </Modal>
                </div>
            </div>
        </UserRoute>
    );

};

export default ShowPost;