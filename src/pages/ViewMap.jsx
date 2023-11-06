import { useParams } from "react-router-dom";
import NonEditedMap from "../components/NonEditedMap";

function ViewMap() {
    const id = useParams().id;
    if (!id )   
        return <div>404</div>
    return ( <div>
        <NonEditedMap id = {id }/>
    </div> );
}
export default ViewMap;