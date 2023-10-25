import { useEffect, useState } from "react";
import  logo from '../LANDING/all-pahts.png'
import logodark from '../LANDING/LOGOWHITE.png'
import { Link } from "react-router-dom";
 import user from '../LANDING/user.svg'
function Navbar( {active,orange,dark, small}) {
     const [menuactive , setmenuactive ] = useState(false);
        const toggle =()=>{
        setmenuactive((old)=>!old)
        }
        return ( 
<div   >
<nav class="border-gray-200 text-xl   bg-white  m-auto font-bold " >
    <div class="  mx-auto flex p-3 flex-wrap items-center justify-between">
        <Link to="/" class="flex items-center  ml-6 ">
        <img src={logo}  className={small ? "w-20" : "w-32"} alt="no image sorry" />   
        </Link>
        <button data-collapse-toggle="mobile-menu" type="button" class="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center" aria-controls="mobile-menu-2" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <div class="hidden md:block w-full md:w-auto mr-10" id="mobile-menu">
        <ul class="flex-col md:flex-row flex md:space-x-8 items-center mt-4 md:mt-0 md:text-sm md:font-medium">   
                <li className=" hover:scale-x-105 transition   px-2">
                <a href="/About" class=" outline-font text-3xl font-extrabold        md:border-0 block pl-3 pr-4 py-2   md:p-0">About</a>
                </li>
                <li className=" hover:scale-x-105 transition   px-2">
                <a href="/Contact" class="  outline-font text-3xl font-extrabold      md:border-0 block pl-3 pr-4 py-2  md:p-0">Contact</a>
                </li>

            <div className="p-2 flex gap-2 px-4 text-xl items-center justify-center   rounded-full border-2 border-black  ">
                <div> 
                    <img src={user} alt="" width={30 } height={30} />
                </div>
              <div >  login </div>
            </div>
        </ul>
        </div>
    </div>
    
    </nav>
    </div>);
}

export default Navbar;