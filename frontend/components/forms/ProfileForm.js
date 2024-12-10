import { SyncOutlined } from "@ant-design/icons";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false});
import "react-quill/dist/quill.snow.css";
const ProfileForm = ({
    handleSubmit,
    InputUserName,
    name = name ? name : ' ',
    setName,
    email,
    setEmail,
    password,
    setPassword,
    question,
    setQuestion,
    secret,
    setSecret,
    loading,
    about,
    setAbout,
    username,
    setUsername,
    isEditable
 }) => {

    return (
    <form className="form" onSubmit={handleSubmit} >
        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                value = {name}
                                onChange= {(e) => setName(e.target.value)} 
                                className="form-control" autoComplete="name" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Username</label>
                            <InputUserName
                                username={username}
                                setUsername={setUsername}
                                isEditable ={ isEditable }
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control" type="text" autoComplete="email"  />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <div className="form-group">
                            <label>About</label>
                        <ReactQuill 
                            theme= "snow"
                            value = { about }
                            onChange={ (e) => setAbout(e)}
                            className = "form-control"
                            placeholder = "About me Bio"  autoComplete="about" 
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-12 col-sm-6 mb-3">
                <div className="mb-2"><b>Change Password</b></div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>Current Password</label>
                            <input className="form-control" autoComplete="current-password" type="password" placeholder="••••••" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>New Password</label>
                            <input className="form-control" autoComplete="new-password" type="password" placeholder="••••••" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>Confirm <span className="d-none d-xl-inline">Password</span></label>
                            <input className="form-control" autoComplete="new-password" type="password" placeholder="••••••" /></div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-5 offset-sm-1 mb-3">
                <div className="mb-2"><b>Keeping in Touch</b></div>
                <div className="row">
                    <div className="col">
                        <label>Email Notifications</label>
                        <div className="custom-controls-stacked px-2">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="mx-3" id="notifications-blog" />
                                <label className="custom-control-label" htmlFor="notifications-blog">Blog posts</label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="mx-3" id="notifications-news" />
                                <label className="custom-control-label" htmlFor="notifications-news">Newsletter</label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="mx-3" id="notifications-offers" />
                                <label className="custom-control-label" htmlFor="notifications-offers">Personal Offers</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col d-flex justify-content-end">
                <button className="btn btn-primary" type="submit">Save Changes</button>
            </div>
        </div>
    </form>
)};



export default ProfileForm;