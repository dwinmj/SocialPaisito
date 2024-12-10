import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
//import { SyncOutlined } from "@ant-design/icons";
import LoginForm from "../components/forms/LoginForm";
//import router from "../../backend/routes/auth";
import { useRouter } from "next/router";
import { UserContext } from "../context";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [ state, setState ] = useContext(UserContext);
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
       // window.console&&console.log(` ${email}, ${password}`);
       try {
        setLoading(true);
        const { data }  = await axios.post('/login',{email, password });

        if(data.error){
            toast.error(data.error);
            setLoading(false);
        } else {
            setState({
                user: data.user,
                token: data.token,
            });
            window.localStorage.setItem('auth', JSON.stringify(data));
            
            //setLoading(false);
            router.push("/");
        }

       }
       catch(err){ 
        console.dir( err.response.data);
        toast.error(err.response.data);
        setLoading(false);
       }
    };

    useEffect(() => {
        if(state && state.token) {
            router.push("/");
        }
    }, [state && state.token])
    
    

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="display-1 text-center py-5"> Login </h1>
                </div>
            </div>
            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                    <LoginForm 
                        handleSubmit ={ handleSubmit}
                        email ={email}
                        setEmail = { setEmail }
                        password = { password }
                        setPassword = { setPassword }
                       loading = { loading }
                    />
                </div>
            </div>         
            <div className="row">
                <div className="col">
                    <p className="text-center" >Not Yet Already Registered? &nbsp;
                    <Link legacyBehavior href="/register" > 
                     <a  >Register</a>
                    </Link>
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p className="text-center" >
                    <Link legacyBehavior href="/forgot-password" > 
                     <a  className="text-danger" >Forgot password</a>
                    </Link>
                    </p>
                </div>
            </div>   
        </div>
    );
};

export default Login;