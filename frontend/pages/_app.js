import "bootstrap/dist/css/bootstrap.css";
import { UserProvider } from "../context"
import Nav from "../components/Nav";
import Head from "next/head";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import "antd/dist/";
import "../assets/scss/main.scss";
function ClientApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <Head>
            </Head>
            <Nav />
            <ToastContainer position="top-left" />
            <Component {...pageProps} />
        </UserProvider>
    )
};

export default ClientApp;