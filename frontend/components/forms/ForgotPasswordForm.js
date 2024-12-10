import { SyncOutlined } from "@ant-design/icons";



const ForgotPasswordForm = ({
    handleSubmit,
    email,
    setEmail,
    newPassword,
    setNewPassword,
    question,
    setQuestion,
    secret,
    setSecret,
    loading,
    setLoading,
    page }) => (
    <form onSubmit={handleSubmit}>

    <div className="form-group p-2">
        <small><label className="text-muted">Your Email</label></small>
        <input
            value = {email}
            onChange = { (e) => setEmail(e.target.value)} 
            type="text" className="form-control" placeholder="Enter your email" autoComplete="username"  />
    </div>
    <div className="form-group p-2">
        <small><label className="text-muted">Your New Password</label></small>
        <input 
            value = {newPassword}
            onChange = {(e) => setNewPassword(e.target.value)}
            type="password" className="form-control" placeholder="Enter your Password" autoComplete="new-password" />
    </div>
  
    <div className="form-group p-2">
        <small><label className="text-muted">Pick a Question</label></small>
        <select
            value ={question}
            onChange = {(e) => setQuestion(e.target.value)} 
            className="form-control">
            <option  >Select your Question</option>
            <option value="1">What is your Mother maiden name?</option>
            <option value="2">What is your first pet name?</option>
            <option value="3">what is yout best friend name?</option>
            <option value="4">What is your favorite color?</option>
        </select>
        <small className="form-text text-muted" >You will use this Question as a reminder when you need to reset your password!</small>
    </div>

    <div className="form-group p-2">
        <small><label className="text-muted">Your Answer</label></small>
        <input 
            value ={secret}
            onChange = {(e) => setSecret(e.target.value)}
            type="text" className="form-control" placeholder="Enter your answer" />
    </div> 

    <div className="form-group p-2">
        <button disabled={ !email || !newPassword || !question || !secret || loading} className="btn btn-primary col-12">
             { loading ? <SyncOutlined spin className="py-1" /> : "Submit" } 
        </button>
    </div>

</form>
);


export default ForgotPasswordForm;