import { useState, useContext, useEffect,  } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import { 
    SyncOutlined, LogoutOutlined, CameraOutlined, BarChartOutlined,
    AppstoreOutlined, SettingOutlined, SecurityScanTwoTone
} from "@ant-design/icons";
import ProfileForm from "../../../components/forms/ProfileForm";
import { UserContext } from "../../../context";
//import { useRouter } from "next/router";
import InputUserName from "../../../components/input/InputUserName";
import UserRoute from "../../../components/routes/UserRoute";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localeEn from "dayjs/locale/en";

const daysago = (postDate) => { 
    dayjs.extend(relativeTime).locale(localeEn) 
    let fromNowOn = dayjs(postDate).fromNow(); 
    return(fromNowOn)
 };



const profileUpdate = () => {
    const [ state, setState ] = useContext(UserContext);
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

    const [ profileimage, setProfileimage ] = useState('');
   // const router = useRouter();

    useEffect(() =>{
        if( state && state.user && state.user.name != undefined  ){
            let current = state.user;
            //console.log(current);
            setName(current.name );
            setUsername(current.username);
            setAbout(current.about);
            setEmail(current.email);
            setPassword(current.password);
            setCreatedat(current.createdAt)
            setQuestion(current.question);
            setSecret(current.secret);
            setProfileimage(current.profile_photo);
            setLastseen(current.last_seen);

        }
    },[state && state.user && state.user.name != undefined  ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
       // window.console&&console.log(`${name}, ${email}, ${password}, ${question}, and ${secret}`);
       try {
        setLoading(true);
        const { data } = await axios
        .post(`${process.env.NEXT_PUBLIC_API}/profile-update`,{name, email, username, about, password, question, secret});

        if( data.error ){
            toast.error(data.error);
            setLoading(false);
        } else{
            setProfileimage(data.image_names); 
            setState({...state, ...data});
            setLoading(false);
            setOk(data.ok);
        }
       }
       catch(err){ 
        // console.dir( err.response.data);
        toast.error(err);
        setLoading(false);
       }
    };

    const handleImage = async (e) => {
        e.preventDefault();

        try {
            
            var formData = new FormData();
            const nimages = e.target.files;
            //setUploading(true);
            Array.from(nimages).forEach(img => {
                formData.append('images', img)
            });
                
            const { data } = await axios.post('/upload-image', formData, { headers: {'Content-Type': 'multipart/form-data'}})
            .then(response => {
                // Handle response
                console.log(response.data);
                setProfileimage(response.data.image_names);
            })
            .catch(err => {
                // Handle errors
                console.error(err);
            });
            // .then(() => {
            //     setProfileimage(data.image_names); 
                
            //   });

 //           setProfileimage(data.image_names); 

            if(data.error){
                toast.error(data.error);
            } else {
                toast.success('Image was uploaded successfully!');
                const { data } = await axios.put('/profile-image', { _id: state.user._id, data: {profile_photo: data.image_names[0]}} );
               // console.log( 'data_: ', data_ );
                //setContent('');
//                setState([...state, ...data.image_names]);
                reloadMe();
            }
            //setUploading(false);
        } catch (error) {
            console.log(error);
            //setUploading(false); 
        }
    }

     let join_date = dayjs(createat).locale(localeEn).format('MMM D, YYYY h:mm A').toString() ;
     let last_login =  daysago(lastseen);
    return (
        <UserRoute>
        <div className="container" >
    <div className="row flex-lg-nowrap">
        <div className="col-12 col-lg-auto mb-3" style={{width: '200px'}}>
            <div className="card p-3">
                <div className="e-navlist e-navlist--active-bg">
                    <ul className="nav">
                        <li className="nav-item ">
                            <Link  href="/dashboard/profile/update" className="nav-link active" >
                            <i className="mr-1"><BarChartOutlined className="mx-1 i-con" /><span> Profile</span></i>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link  href="/login" className="nav-link" >
                                <i className="mr-1"><AppstoreOutlined className="mx-1 i-con" /><span>New Post</span></i>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link  href="/login" className="nav-link" >
                                <i className="mr-1"><SettingOutlined className="mx-1 i-con" /><span> Settings</span></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="col">
            <div className="row">
                <div className="col mb-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="e-profile">
                                <div className="row">
                                    <div className="col-12 col-sm-auto mb-3">
                                        <div className="mx-auto" style={{width: '140px'}}>
                                                { profileimage && profileimage.public_url ? (<>
                                                    <div className="d-flex justify-content-center align-items-center rounded" alt={profileimage.s3Name}  style={{
                                                                                                backgroundImage: "url("+ profileimage.public_url + ")",
                                                                                                backgroundRepeat: 'no-repeat',
                                                                                                backgroundPosition: 'center center',
                                                                                                backgroundSize: 'contain',
                                                                                                height: '140px'
                                                                                            }} ></div>
                                                                                            </>
                                                ) : (
                                                    <>
                                                    <div className="update-profile d-flex justify-content-center align-items-center rounded default-profile" >
                                                        <span style={{color: 'rgb(166, 168, 170) MozAnimation'}}> </span>
                                                    </div>
                                                    </>
                                                ) }
                                            
                                        </div>
                                    </div>
                                    <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                                        <div className="text-center text-sm-left mb-2 mb-sm-0">
                                            <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">{name}</h4>
                                            <p className="mb-0">@{username}</p>
                                            <div className="text-muted"><small>Last Logged in {last_login}</small></div>
                                            <div className="mt-2">
                                                <label className="btn btn-primary" type="button">
                                                    
                                                    <span><CameraOutlined className="mx-2 my-1"/> Change Photo</span>
                                                    <input onChange={ handleImage } type="file" accept="image/*" name="image" hidden /> 
                                                </label>
                                             
                                            </div>
                                        </div>
                                        <div className="text-center text-sm-right">
                                            <span className="badge badge-secondary">Administrator</span>
                                            <div className="text-muted"><small>Joined { join_date }</small></div>
                                        </div>
                                    </div>
                                </div>
                                <ul className="nav nav-tabs">
                                    <li className="nav-item"><a href="" className="active nav-link">Settings</a></li>
                                    <li className="nav-item"><a href="" className="nav-link">Password</a></li>
                                </ul>
                                <div className="tab-content pt-3">
                                    <div className="tab-pane active">
                                        { name !== undefined ?
                                        <ProfileForm 
                                            handleSubmit ={ handleSubmit}
                                            name = {name}
                                            setName = {setName}
                                            username = {username}
                                            setUsername = {setUsername}
                                            email ={email}
                                            setEmail = { setEmail }
                                            password = { password }
                                            setPassword = { setPassword }
                                            question = { question }
                                            setQuestion = { setQuestion }
                                            secret = { secret }
                                            setSecret = { setSecret }
                                            loading = { loading }
                                            setLoading = { setLoading }
                                            page ={ "profile" }
                                            InputUserName = { InputUserName }
                                            about={about}
                                            setAbout={setAbout}
                                            isEditable = { false }
                                        />
                                        : '' }
                                    </div>
                                    <div className="tab-pane password">
                                    password
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-3 mb-3">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="px-xl-3">
                                <button className="btn btn-block btn-secondary">
                                    <LogoutOutlined className="mr-1 i-con" />
                                    <span> Logout</span>
                                   
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title font-weight-bold">Support</h6>
                            <p className="card-text">Get fast, free help from our friendly assistants.</p>
                            <button type="button" className="btn btn-primary">Contact Us</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
</UserRoute>
    );
};

export default profileUpdate;