import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../Backedn";

import { AuthContext } from "../context/authcontext";
import logo from "../assets/all-pahts.png"
import http from "../utils/http";

function Login() {
    const LOGIN_START = "LOGIN_START";
    const LOGIN_SUCCESS = "LOGIN_SUCCESS";
    const LOGIN_FAILER = "LOGIN_FAILER";
    const LOGOUT = "logout";
    const navigagte = useNavigate();
    //
    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);
 
    const handelChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handelClick = async (e) => {
        e.preventDefault();

        dispatch({ type: LOGIN_START });
        try {
              const response = await http.loginAxiosInstance.post("/login", credentials)
              localStorage.setItem("token",  response.data.token )
             await dispatch({ type: LOGIN_SUCCESS, payload: response.data.details });
            navigagte("/Application", { replace: true });
        } catch (er) {
                dispatch({ type: LOGIN_FAILER, payload: "er.response.data" });
        }
    };
    return (
        <div className=" flex ">

            <section className="bg-gray-50  w-full ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">

                    <div className="w-full     md:mt-0 sm:max-w-md xl:p-0">

                        <img src={logo} alt="logo" className="  h-40 mx-auto" />

                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                    <input id="email" onChange={handelChange} value={credentials.email} name="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 " >Password</label>
                                    <input type="password" id="password" onChange={handelChange} value={credentials.password} name="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label for="remember" className="text-gray-500 ">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a>
                                </div>
                                <button onClick={handelClick} className={"w-full border-2 hover:bg-gray-100 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" + (error ? " border-red-500" : "")}>{loading ? "loaidng ..." : "sign in"} </button>
                                <p className="text-sm font-light text-gray-500 ">
                                    Don’t have an account yet? <Link to={"/register"} className="font-medium text-primary-600 hover:underline">Sign up</Link>
                                </p>
                                {error && <p className="text-red-500 text-center font-bold"> {error.msg}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <div className="hidden lg:block  w-full h-screen" style={{ backgroundImage: `url('/loginbackground.jpg')` ,backgroundPosition :"bottom" , backgroundSize:"cover" ,   backgroundRepeat: "no-repeat" }}>
                 
            </div>

        </div>
    );
}

export default Login;


