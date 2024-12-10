import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import { SyncOutlined } from "@ant-design/icons";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";
import { UserContext } from "../context";
import { useRouter } from "next/router";
const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [secret, setSecret] = useState('');
    const [question, setQuestion] = useState('');
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);

    const [ state ] = useContext(UserContext);
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // console.log(name, email, password, secret);
          setLoading(true);
          const { data } = await axios.post(`/forgot-password`, {
            email,
            newPassword,
            question,
            secret,
          });
       
          if (data.error) {
            toast.error(data.error);
            setLoading(false);
          }
       
          if (data.success) {
            setEmail("");
            setNewPassword("");
            setSecret("");
            setOk(true);
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      };

    if(state && state.token ) { router.push("/") ; }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="display-1 text-center py-5"> Forgot Password </h1>
                </div>
            </div>
            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                    <ForgotPasswordForm 
                        handleSubmit ={ handleSubmit}
                        email ={email}
                        setEmail = { setEmail }
                        newPassword = { newPassword }
                        setNewPassword = { setNewPassword }
                        question = { question }
                        setQuestion = { setQuestion }
                        secret = { secret }
                        setSecret = { setSecret }
                        loading = { loading }
                        setLoading = { setLoading }
                        page ={ "forgot-password" }

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
                        <p>For account password have been change. Please login with new password</p>
                        <p>Please Login:</p>
                        <Link legacyBehavior href="/login" >
                            <a  className="btn btn-primary btn-sm">Login</a>
                        </Link>
                    </Modal>
                </div>
            </div>

        </div>
    );
};

export default ForgotPassword;