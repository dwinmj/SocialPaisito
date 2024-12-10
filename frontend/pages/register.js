import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import { SyncOutlined } from "@ant-design/icons";
import AuthForm from "../components/forms/AuthForm";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import InputUserName from "../components/input/InputUserName";
const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [about, setAbout] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secret, setSecret] = useState('');
    const [question, setQuestion] = useState('');
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);

    const [ state ] = useContext(UserContext);
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
       // window.console&&console.log(`${name}, ${email}, ${password}, ${question}, and ${secret}`);
       try {
        setLoading(true);
        const { data } = await axios
        .post(`${process.env.NEXT_PUBLIC_API}/register`,{name, email, username, password, about, question, secret});

        if( data.error ){
            toast.error(data.error);
            setLoading(false);
        } else{
            setName('');
            setUsername('');
            setEmail('');
            setAbout('');
            setPassword('');
            setQuestion('');
            setSecret('');
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

    if(state && state.token ) { router.push("/") ; }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="display-1 text-center py-5"> Register </h1>
                </div>
            </div>
            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                    <AuthForm 
                        handleSubmit ={ handleSubmit}
                        name = {name}
                        setName = {setName}
                        username = {username}
                        setUsername = {setUsername}
                        about={about}
                        setAbout={setAbout}
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
                        page ={ "register" }
                        InputUserName = { InputUserName }

                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Modal 
                    title="Yahooo"
                    open={ok}
                    onCancel={()=>{ setOk(false) }}
                    footer={null}
                    >
                        <p>You have Succesfully create your account.</p>
                        <p>Please Login:</p>
                        <Link legacyBehavior href="/login" >
                            <a  className="btn btn-primary btn-sm">Login</a>
                        </Link>
                    </Modal>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p className="text-center"> Already Registered?  &nbsp;
                    <Link legacyBehavior href="/login" >
                        <a  >Login</a>
                    </Link>
                    </p>
                </div>
            </div>    
        </div>
    );
};

export default Register;