import { SyncOutlined } from "@ant-design/icons";



const AuthForm = ({
    handleSubmit,
    name,
    setName,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    question,
    setQuestion,
    secret,
    setSecret,
    loading,
    InputUserName,
    about,
    setAbout,
    page
 }) => (
    <form onSubmit={handleSubmit}>
    <div className="form-group p-2">
        <small><label className="text-muted">Your Name</label></small>
        <input 
            value={ name }
            onChange= {(e) => setName(e.target.value) }
            type="text" className="form-control" placeholder="Enter your name" autoComplete="name" />
    </div> 

    <div className="form-group p-2">
        <small><label className="text-muted">Your Email</label></small>
        <input
            value = {email}
            onChange = { (e) => setEmail(e.target.value)} 
            type="text" className="form-control" placeholder="Enter your email" autoComplete="email"  />
    </div>
    <div className="form-group p-2">
        <small><label className="text-muted">Pick Your UserName</label></small>
        <InputUserName username={ username } setUsername = { setUsername } isEditable= { true }  />

    </div>

    <div className="form-group p-2">
        <small><label className="text-muted">Your Password</label></small>
        <input 
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            type="password" className="form-control" placeholder="Enter your Password" autoComplete="new-password" />
    </div>
    { page === 'profile' && (<>
    <div className="form-group p-2">
        <small><label className="text-muted">What do you like you followers to know?</label></small>
        <textarea 
            value = {about}
            onChange = {(e) => setAbout(e.target.value)}
             className="form-control" placeholder="about you?" autoComplete="about" ></textarea>
    </div>  
    </>
    )}
    { page === 'register' && (<>
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
    </>)}
    { page === 'register' && (<div className="form-group p-2">
        <button disabled={ !name || !email || !username || !password || !question || !secret || loading } className="btn btn-primary col-12">
             { loading ? <SyncOutlined spin className="py-1" /> : "Submit" } 
        </button>
    </div>
    )}
    { page === 'profile' && (<div className="form-group p-2">
        <button disabled={  !email || !password  } className="btn btn-primary col-12">
             { loading ? <SyncOutlined spin className="py-1" /> : "Save Profile" } 
        </button>
    </div>
    )}
</form>
);



export default AuthForm;