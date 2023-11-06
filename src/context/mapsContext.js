import React, { createContext, useState, useEffect, useRef } from "react";
import { FastPathFinder } from "../utils/algorithms/djikstra"
// import GlobalContext from "./globalContext";
import http from "../utils/http"
const Mapscontext = createContext();
export const MapsContextProvider = ({ children }) => {
    const [selectedmap, setSelectedmap] = useState(null);
    const [maps, setMaps] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [createprojectScreenopen, setcreateprojectScreenopen] = useState(false)
 
    const createMap=(credentials)=>{   
          setLoading(true);
          http.axiosInstance
            .post("/map", credentials)
            .then((res) => {
                reload()
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
         setLoading(false)  
      }
    const deleteMap=()=>{    }
    const updateMap=()=>{    }
    const  opencreateprjectScreen =()=>{
        setcreateprojectScreenopen(true)
        setSelectedmap(null)
    }
    const reload=()=>{
        setLoading(true);
        http.axiosInstance
          .get("/map")
          .then((res) => {
              setMaps(res.data);
              setLoading(false);
          })
          .catch((err) => {
              setError(err);
              setLoading(false);
          });
       setLoading(false)
    }
    useEffect(() => {
        reload()
    }, []);
    return (
        <Mapscontext.Provider
            value={{
                maps,
                loading,
                error,
                createMap,
                deleteMap,
                updateMap,
                selectedmap,
                setSelectedmap,
                opencreateprjectScreen,
                createprojectScreenopen,
                setcreateprojectScreenopen,
            }}
        >
            {children}
        </Mapscontext.Provider>
    );
};

export default Mapscontext;