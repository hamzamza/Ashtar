import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import LoadingItem from "../components/LoadigItem";
import { useEffect, useState } from "react";
 

function Home() {
  const period = 2000
  const [loaing, setloading] = useState(true);
  useEffect(() => {
      setloading(true)
      setTimeout(() => {
        setloading(false)
      }, period);
    }, [])
    return ( 
    <div>

{ loaing ? <LoadingItem/> :
 
    <div className=" font-bold">      
        <main className="landingpage  "   > 
        <div className=" backdrop-blur-xsm h-screen  relative">
        <Navbar orange={false}/>
         <div className="flex justify-end  w-full ">
         <div className=" mr-20 bg-white  p-32 ">  
         <h1 className="mr-10     text-7xl mt-10  mb-5 outline-font" > Trouvez le chemin le plus </h1>
         <h1 className=" font-bold outline-font  text-end text-7xl">  court avec <span className=" bg-primary text-white">   ALL-PATHS</span>   </h1>
           </div>
         </div>
         <div className="flex absolute bottom-0 right-0 w-full justify-center p-20"> 
           <Link to={"/Application"}>
           <div className=" px-20 py-3  rounded-full flex items-center transition-all hover:scale-x-105 border-2 border-black">
             <h1 className=" outline-font text-3xl font-bold text-center space-x-2 align-top inline-block" >Start</h1>
             </div>
            </Link>
        </div>
        </div>
        

        </main>
        
        </div>}
        </div>  );
}

export default Home;