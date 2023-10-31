import React, { createContext, useState, useEffect, useRef } from "react";
import { FastPathFinder } from "../utils/algorithms/djikstra"
// import GlobalContext from "./globalContext";
import http from "../utils/http"
const Mapscontext = createContext();
export const MapsContextProvider = ({ children }) => {
    const [selectedmap, setSelectedmap] = useState(null);
    const [maps, setMaps] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const createMap=()=>{    }
    const deleteMap=()=>{    }
    const updateMap=()=>{    }
    useEffect(() => {
        setLoading(true);
        http.axiosInstance
            .get("/maps")
            .then((res) => {
                setMaps(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
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
                setSelectedmap
            }}
        >
            {children}
        </Mapscontext.Provider>
    );
};

export default Mapscontext;