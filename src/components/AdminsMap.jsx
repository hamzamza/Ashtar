 
import ControleComponenetAdmin from "./EditMapController";
import CanvasComponent from './EditMapCanva'; 
import { useEffect, useState } from "react";
function AdminsMap({map}) {
    
    const [loaing, setloading] = useState(true);
    const [syedbr, setSyedbr] = useState(true)
 
    return (<div>      
        <div className="flex w-full    justify-center items-center ">
         <div className="flex ">
              <CanvasComponent map = {map}/> 
            
             <ControleComponenetAdmin/>
         </div>
        </div>
     </div> );
}

export default AdminsMap;