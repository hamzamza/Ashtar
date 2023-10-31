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
        setSelectedmap } = useContext(Mapscontext)
    return ( <div className=" col-span-2 h-screen-200  rounded-lg ml-2    bg-gray-200 shadow-md mr-2">
    <div className="p-2 cursor-pointer select-none  hover:bg-primary px-3 m-1 flex items-center hover:text-black justify-between border-primary border-2 mt-1 rounded-lg text-primary">
                    <div className="mr-3" >
                        Create a  Map
                    </div>
                    <div className=" rounded-full  p-2">
                        <img src={plusicon} alt="" height={20} width={20} />
                    </div>
                </div>

    <div className="overflow-scroll h-screen-200">
        <ul className="p-1 ">
            {projects.map((project) => <li key={project} className="p-3 cursor-pointer hover:bg-primary border-2 border-primary mt-1 rounded-lg">{project}</li>)}
        </ul>
    </div>
</div>  );
}

export default SideBar;