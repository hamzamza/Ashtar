import { useState } from "react";
import { useEffect } from "react";
import CanvasComponent from "../components/CanvasComponenet";
import { DrawingContextProvider } from "../context/drowingContext";
import ControleComponenetAdmin from "../components/ControleComponenet";
import Navbar from "../components/Navbar";
import plusicon from "../LANDING/plus.png"
function Admin() {
    // api to get all projects or all working maps 
    const [projects, setProjects] = useState([
        "project1",
        "project2",
        "project3",
        "project1",
        "project2",
        "project3",
        "project1",
        "project2",
        "project3",
        "project1",
        "project2",
        "project3",
        "project1",
        "project2",
        "project3",
        "project1",
        "project2",
        "project3",
        "project1",
        "project2",
        "project3",
        "project1",
        "project2",
        "project3",
    ])
    const [selectedproject , setselectedproject] = useState(null)
    const period = 1000
    const [loaing, setloading] = useState(true);
    const [syedbr, setSyedbr] = useState(true)
    useEffect(() => {
        setloading(true)
        setTimeout(() => {
            setloading(false)
        }, period);
    }, [])
    // rendering 
    return (<div  >
        <Navbar orange={false} small={true} />

        <div className="flex  ">
            {syedbr == true && <div className=" w-64 h-screen-200  rounded-lg ml-2   border-2 border-primary">
                <div className="p-2 cursor-pointer select-none  hover:bg-gray-500 px-3 m-1 flex items-center justify-between bg-gray-600 mt-1 rounded-lg text-primary">
                 <div >
                      Add new project
                    </div>
                    <div className="bg-primary rounded-full  p-2">
                        <img src={plusicon} alt="" height={20}  width={20}/>
                    </div>
                </div>

                <div className="overflow-scroll h-screen-200">
                <ul className="p-1 ">
                    {projects.map((project) =>  <li className="p-3 bg-slate-500 mt-1 rounded-lg">{project}</li>  ) }
                </ul>
                </div>
            </div>}
            <div className="shrink overflow-scroll p-3  min-h-screen-200"> 
            { selectedproject == null ? 
            <DrawingContextProvider>      
               <div className="flex w-full   my-10 justify-center items-center ">
                <div className="flex ">
                     <CanvasComponent/> 
                   
                    <ControleComponenetAdmin/>
                </div>
               </div>
            </DrawingContextProvider>: 
                <div className="flex w-full items-center min-h-screen-200 justify-center  ">
                    <button className="bg-primary p-4 rounded-lg text-white ">
                        create or select project
                        </button>
                
                </div>  
            }
             </div>
        </div>
        {/* <DrawingContextProvider>
        <div style={ { backgroundImage: `url('data:image/svg+xml,%3Csvg width='38' height='38' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 14h2v2h2v2h-2v2h-2v-2h-2v-2h2v-2Z' fill='%23E9EBEC'/%3E%3C/svg%3E")` }}></div>
           <div className="flex w-full  my-10 justify-center items-center ">
            <div className="flex ">
                 <CanvasComponent/> 
                 <div className="w-2"></div>
                <ControleComponenetAdmin/>
            </div>
           </div>
        </DrawingContextProvider> */}
    </div>
    );
}

export default Admin;