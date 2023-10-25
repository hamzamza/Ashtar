import { faGlassCheers } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../LANDING/pathy.png"

import { server } from "../Backedn";

import { AuthContext } from "../context/authcontext";
function Register() {
  const LOGIN_START = "LOGIN_START";
  const LOGIN_SUCCESS = "LOGIN_SUCCESS";
  const LOGIN_FAILER = "LOGIN_FAILER";
  const LOGOUT = "logout";
  const navigagte = useNavigate();
  //
  const [isaccepted, setaccepted] = useState(false)
  const [credentials, setCredentials] = useState({
    email: undefined,
    username: undefined,
    password: undefined,
    password2: undefined,
    terms: false
  });
  const [msg, setmsg] = useState("");
  const { loading, error, dispatch } = useContext(AuthContext);
  /*const handelChange = (e) => {
      switch (e.taget.id) {
        case "username":
          setCredentials({ username: e.taget.value });
          break;
        case "password":
          setCredentials({ password: e.taget.value });
          break;
        default:
          break;
      }
    };*/
  const handelChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value, terms: isaccepted }));
  };

  const test = () => {
    console.log("worked");
  }

  const handelClick = async () => {
    const { username, email, password, password2 } = credentials;
    if (password != undefined && password === password2 && isaccepted) {
      setmsg("")
      try {
        const response = await axios.post(
          server + "/api/auth/register",
          { username, email, password }
        );
        await handellogin()

      } catch (error) {

      }

    }
    else {
      setmsg("please finish all the details")
    }

  }
  const handellogin = async () => {



    dispatch({ type: LOGIN_START });
    const { username, password } = credentials;
    try {
      const response = await axios.post(
        server + "/api/auth/login",
        { username, password }
      );
      await dispatch({ type: LOGIN_SUCCESS, payload: response.data.details });
      console.log("loged in");
      navigagte("/");
    } catch (er) {
      dispatch({ type: LOGIN_FAILER, payload: er.response.data });
    }
  };

  return (
    <div className="bg-gray-50  flex ">
      <div className="flex flex-col flex-1 items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
      <img className=" h-32 rounded-lg " src={logo} alt="logo" />
        <Link
          to={"/"}
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >

        </Link>
        <div className="w-full   md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  username
                </label>
                <input
                  onChange={handelChange}
                  value={credentials.username}
                  type="name"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "

                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  onChange={handelChange}
                  value={credentials.email}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  onChange={handelChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={credentials.password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Confirm password
                </label>
                <input
                  onChange={handelChange}
                  type="password"
                  name="password2"
                  id="password2"
                  value={credentials.password2}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required={true}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    onChange={() => setaccepted(old => !old)}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                    value={isaccepted}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 "
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline "
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <div
                onClick={handelClick}
                className="w-full cursor-pointer text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Create an account
              </div>
              <p className="text-sm font-light text-gray-500 ">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-primary-600 hover:underline "
                >
                  Login here
                </Link>
              </p>
              <p className="text-red-600 text-center uppercase">{msg} </p>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-full h-screen flex-1  bg-primary-600" style={{ backgroundImage: `url('/registerbackground.jpg')`, backgroundSize:"cover" , backgroundRepeat:"no-repeat"}}>
      
     

      </div>
          
    </div>
  );
}

export default Register;
