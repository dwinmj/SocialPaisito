import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import { Avatar } from "antd";
import ProfileImage from "./images/ProfileImage";

// import { HomeFilled, TeamFilled, WechatFilled, NotificationFilled  } from "@ant-design/icons";
const Nav = () => {
    const [current, setCurrent] = useState('');
    const [state, setState] = useContext(UserContext);

    useEffect(() => {
        let location = window.location.pathname;
        process.browser ? setCurrent(location) : '';
    }, [process.browser && window.location.pathname]);

    const router = useRouter();
    const logOut = () => {
        window.localStorage.removeItem('auth');
        setState(null);
        router.push("/login");
    };
    const c_user = state && state.user && state.user.profile_photo ? state.user: {} ;

    return (
        <header className="bg-menugrbl text-white" >
            <nav className="navbar navbar-expand-lg bg-menugrbl">
                <div className="container justify-content-between" style={{ paddingRight: '20px'}}>

                    <div className="d-flex">
                    
                        <Link className={`navbar-brand me-2 mb-1 d-flex align-items-center${current === "/" ? " active" : ""}`} href="/">
                            <Avatar size={50} className='ml-2'  >
                                TEK
                            </Avatar>
                        </Link>
                        <div className="input-group" style={{display:'none'}}>
                            <span className="input-group-text" id="basic-addon1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                                </svg>
                            </span>
                            <input type="text" className="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="basic-addon1" />
                        </div>
                        
                    </div>
                      {state !== null ? (
                        <>
                            <ul className="navbar-nav flex-row  d-md-flex d-none center-icons non-mobile">
                                <li className={`nav-item mx-3 me-lg-1${current === "/" ? " active" : ""}`}>
                                    <Link className={`text-white text-center nav-link${current === "/" ? " active" : ""}`} href="/">
                                        <div className="menu-icon d-home"></div>
                                         <span>Home</span>
                                    </Link>
                                </li>
                                <li className={`nav-item mx-3 me-lg-1${current === "/teams" ? " active" : ""}`}>
                                    <Link className={`text-white text-center nav-link${current === "/teams" ? " active" : ""}`} href="/teams">
                                        <div className="menu-icon d-team"></div>
                                        <span>Teams</span>
                                    </Link>
                                </li>
                                <li className={`nav-item mx-3 me-lg-1${current === "/notifications" ? " active" : ""}`}>
                                    <Link className={`text-white text-center nav-link${current === "/notifications" ? " active" : ""}`} href="/notifications">
                                        <div className="menu-icon d-notify"></div>
                                        <span>Notifications</span>
                                    </Link>
                                </li>
                                <li className={`nav-item mx-3 me-lg-1${current === "/messages" ? " active" : ""}`}>
                                    <Link className={`text-white text-center nav-link${current === "/messages" ? " active" : ""}`} href="/messages">
                                        <div className="menu-icon d-chat"></div>
                                        <span>Chat</span>
                                    </Link>
                                </li>
                            </ul>
                            <div className="flex-shrink-0 dropdown non-mobile">
                                <Link className='d-block link-dark text-decoration-none dropdown-toggle'
                                                        href="#" data-bs-toggle="dropdown" aria-expanded="false" >  
                                                        { state !== null && c_user && (
                                                            <ProfileImage profilephoto = { c_user.profile_photo} size={45} class_name="top-profile" />
                                                          )
                                                        }
                                </Link>
                                <ul className="dropdown-menu text-small shadow" >
                                    <li><a className={`dropdown-item${current === "/dashboard/user" ? " active" : ""}`} href="/dashboard/user">Dashboard</a></li>
                                    <li><a className={`dropdown-item${current === "/dashboard/profile/update" ? " active" : ""}`} href="/dashboard/profile/update">Profile</a></li>
                                    <li><a className={`dropdown-item${current === "/dashboard/profile/update" ? " active" : ""}`} href="dashboard/profile/update">Settings</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href="/logout">Sign out</a></li>
                                </ul>
                            </div>
                        </>
                      ) : (
                        <>
                                <ul className="navbar-nav flex-row  d-md-flex ">
                                    <li className="nav-item">
                                        <Link className={`nav-link${current === "/login" ? " active" : ""} d-flex align-items-center link-body-emphasis text-decoration-none show`}
                                            href="/login"
                                        >
                                            Log in
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link${current === "/register" ? " active" : ""} d-flex align-items-center link-body-emphasis text-decoration-none show`}
                                            href="/register"  >
                                            Register
                                        </Link>
                                    </li>
                                </ul>
                    </>
                    )
                    }

                </div>
                { state !== null ? (
                    <div className="container justify-content-center flex-row d-md-none d-md-flex d-show">
                        <ul className="navbar-nav flex-row  d-md-flex d-show center-icons mobile">
                        <li className={`nav-item mx-3 me-lg-1${current === "/" ? " active" : ""}`}>
                                    <Link className={`text-white text-center nav-link${current === "/" ? " active" : ""}`} href="/">
                                        <div className="menu-icon d-home"></div>
                                         <span>Home</span>
                                    </Link>
                                </li>
                                <li className={`nav-item mx-3 me-lg-1${current === "/teams" ? " active" : ""}`}>
                                    <Link className={`text-white text-center nav-link${current === "/teams" ? " active" : ""}`} href="/teams">
                                        <div className="menu-icon d-team"></div>
                                        <span>Teams</span>
                                    </Link>
                                </li>
                                <li className={`nav-item mx-3 me-lg-1${current === "/notifications" ? " active" : ""}`}>
                                    <Link className={`text-white text-center nav-link${current === "/notifications" ? " active" : ""}`} href="/notifications">
                                        <div className="menu-icon d-notify"></div>
                                        <span>Notifications</span>
                                    </Link>
                                </li>
                                <li className={`nav-item mx-3 me-lg-1${current === "/messages" ? " active" : ""}`}>
                                    <Link className={`text-white text-center nav-link${current === "/messages" ? " active" : ""}`} href="/messages">
                                        <div className="menu-icon d-chat"></div>
                                        <span>Chat</span>
                                    </Link>
                                </li>
                        </ul>
                        
                  </div>
                  ) : "" }
            </nav>
        </header>
    )
}

export default Nav;