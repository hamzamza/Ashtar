import { useEffect, useState } from "react";
import  logo from '../LANDING/LOGOBLACK.png'
import logodark from '../LANDING/LOGOWHITE.png'
import { Link } from "react-router-dom";

const menu = "./img/Menu_icon_icon-icons.com_71858.png"
function Navbar( {active,orange,dark}) {
    const backgroud = dark ? " bg-black " : ""
    const gradiantColor =orange ? " gradiantorange " : ""
    const [menuactive , setmenuactive ] = useState(false);
        const toggle =()=>{
        setmenuactive((old)=>!old)
        }
        return (   
<div className={gradiantColor+  backgroud} >
<nav class="border-gray-200 text-xl   container m-auto font-bold " >
    <div class="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" class="flex items-center my-1">
       {  dark ? <img src={logodark} className=" w-20 h-15 " alt="no image sorry" /> : <img src={logo} className=" w-20 h-15 " alt="no image sorry" />  }
           
        </Link>
        <button data-collapse-toggle="mobile-menu" type="button" class="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center" aria-controls="mobile-menu-2" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <div class="hidden md:block w-full md:w-auto" id="mobile-menu">
        <ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
            
            <li>
            <a href="/About" class="text-gray-100 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">About</a>
            </li>
            <li>
            <a href="/Contact" class="text-gray-100 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">Contact</a>
            </li>
        </ul>
        </div>
    </div>
    
    </nav>
    </div>);
}

export default Navbar;