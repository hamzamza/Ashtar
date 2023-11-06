import { useContext, useState } from "react";
import plusicon from "../assets/plus.png"
import Mapscontext from "../context/mapsContext";

function SideBar() {
    const [projects, setProjects] = useState([
        "project1",
        "project2",
        "project3",
    ])
    const { maps,
        loading,
        error,
        createMap,
        deleteMap,
        updateMap, 
        selectedmap,
        setcreateprojectScreenopen,

        opencreateprjectScreen,
        setSelectedmap } = useContext(Mapscontext)
    return ( <div className=" col-span-2 h-screen-200  rounded-lg ml-2    bg-gray-200 shadow-md mr-2">
    <div onClick={opencreateprjectScreen} className="p-2 cursor-pointer select-none  hover:bg-primary px-3 m-1 flex items-center hover:text-black justify-between border-primary border-2 mt-1 rounded-lg text-primary">
                    <div className="mr-3" >
                        Create a  Map
                    </div>
                    <div className=" rounded-full  p-2">
                        <img src={plusicon} alt="" height={20} width={20} />
                    </div>
                </div>
    <div className="overflow-scroll h-screen-200">
        <ul className="p-1 ">
            {maps.map((project) => <li key={project.title} onClick={()=>{setSelectedmap(project); setcreateprojectScreenopen(null)}} className={"p-3 cursor-pointer hover:bg-primary border-2 border-primary mt-1 rounded-lg"+(selectedmap!= null && selectedmap.title == project.title ? " bg-primary text-white " : " ") }>{project.title}</li>)}
        </ul>
    </div>
</div>  );
}

export default SideBar;