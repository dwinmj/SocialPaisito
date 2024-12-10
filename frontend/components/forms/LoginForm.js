import { SyncOutlined } from "@ant-design/icons";



const LoginForm = ({
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword,
    loading
 }) => (
    <form onSubmit={handleSubmit}>

    <div className="form-group p-2">
        <small><label className="text-muted">Your Email</label></small>
        <input
            value = {email}
            onChange = { (e) => setEmail(e.target.value)} 
            type="text" className="form-control" placeholder="Enter your email" autoComplete="email"  />
    </div>
    <div className="form-group p-2">
        <small><label className="text-muted">Your Password</label></small>
        <input 
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            type="password" className="form-control" placeholder="Enter your Password" autoComplete="new-password" />
    </div>
    <div className="form-group p-2">
        <button disabled={  !email || !password  } className="btn btn-primary col-12">
             { loading ? <SyncOutlined spin className="py-1" /> : "Login" } 
        </button>
    </div>

</form>
);



export default LoginForm;