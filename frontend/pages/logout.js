import { useContext, useEffect, useState } from "react";
//import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const LogOut = () => {
    //const [ current, setCurrent ] = useState('');
    const [ state, setState ] = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        let location = window.location.pathname;
            window.localStorage.removeItem('auth');
            setState(null);
            router.push("/login");
        },[ process.browser && window.location.pathname ]);

    return (
    <div ></div>
    );
}

export default LogOut;