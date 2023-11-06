import React, { createContext, useState, useEffect, useRef } from "react";
import { FastPathFinder } from "../utils/algorithms/djikstra"
// import GlobalContext from "./globalContext";
import http from "../utils/http"
const DrowingContext = createContext();
export const DrawingContextProvider = ({ children }) => {
    // buliding and rendering 

    // vortext class : vortex{ x , y , id}
    // line class : line { vortex1 , vortex2 , id}
    // ===> states  <===
    const OriginalWidth = 1280;
    const OriginalHeight = 720;
    const [width, setwidth ] =useState( window.innerWidth / 1.5);
    const [height, setheight ] = useState((width * OriginalHeight) / OriginalWidth);
    // drag code 
 
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const canvasRef = useRef(null);
    const [startAndEndvortex, setStartAndEndvortex] = useState([]); // [start , end ] 
    const [pathvortexes, setpathvortexes] = useState([]); // [start , end
    const [shortestPath, setSchortestPath] = useState(null); // [line , line , line
    const backgroundCanvaref = useRef(null);
    const [mode, setMode] = useState("vortex");
    const [hoveredVortex, sethoveredVortex] = useState(null); // [x , y
    const [selectedVortex, setSelectedVortex] = useState([]);
    const [vortexes, setvortexes] = useState([]);
    const [scrollx, setScrollx] = useState(0); // 0 - 1
    const [scrolly, setScrolly] = useState(0); // 0 - 1
    const [edges, setedges] = useState([]);
    const [map, setmap] = useState({})
    const [loading, setLoading] = useState(true)
    const [lastScrollx, setLastScrollx] = useState(0)
    const [lastScrolly, setLastScrolly] = useState(0)
   
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [scale, setScale] = useState(1);
    const [vortexSize, setvortexSize] = useState(7);
    const [undochangment, setundochangment] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [imageurl, setImageurl] = useState("");

    const getmapdetails = (map) => {
         setLoading(false)
        setImageurl(map.url)
        setvortexes(map.vortexes)
        console.log(map.edges);
        setedges(map.edges)
        setmap(map)
        setSelectedVortex([])
        setLoading(true)
        setScrollx(0)
        setScrolly(0)
    }


    // ===> functions  <===



    const handleMouseDown = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setStartX(x);
        setStartY(y);
        setIsMouseDown(true);
    };

    // Mouse up event handler
    const handleMouseUp = () => {
        // Reset the positions when the mouse is released
        setStartX(0);
        setStartY(0);
        setCurrentX(0);
        setCurrentY(0);
        setIsMouseDown(false);
        setLastScrollx(scrollx)
        setLastScrolly(scrolly)
    };

    function getMousePos(evt) {
        var rect = canvasRef.current.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    function findPath(v1, v2, vortexes, edges) {
        let graph = new FastPathFinder(vortexes, edges);
        let shortestPaths = graph.findEdges(v1, v2);
        setSchortestPath(shortestPaths);
        const pathvortexess = shortestPaths.map((edge) => { return edge.vortex1 })
        if (shortestPaths.length > 0)
            pathvortexess.push(shortestPaths[shortestPaths.length - 1].vortex2)
        setpathvortexes(pathvortexess)
        setStartAndEndvortex([]);
    }
    const draw = (evt) => {
        const position = getMousePos(evt);
        position.x = (position.x - scrollx) / scale;
        position.y = (position.y - scrolly) / scale;
        if (mode != null) {
            if (mode === "vortex") {
                if (hoveredVortex == null)
                    setvortexes((old) => { return [...old, { label: null, position }] })
                else {
                    if (selectedVortex.length == 0)
                        setSelectedVortex(old => [...old, hoveredVortex]);
                    else {
                        setedges(old => [...old, { id: 12, vortex1: selectedVortex[0], vortex2: hoveredVortex }]);
                        setSelectedVortex([]);
                    }
                }
            }
            if (mode === "path") {
                if (hoveredVortex != null)
                    if (startAndEndvortex.length < 2) {
                        console.log(`firstvortex number ${startAndEndvortex.length + 1}` + hoveredVortex);
                        console.log(hoveredVortex);
                        setStartAndEndvortex(old => [...old, hoveredVortex]);
                    }
                    else {
                        console.log(`firstvortex number  1}` + hoveredVortex);
                        setStartAndEndvortex([hoveredVortex]);
                    }
            }



        }
    }

    const putEdge = (position1, position2, color, bordercolor) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.lineWidth = vortexSize * 2;
        context.beginPath();
        context.moveTo(position1.x, position1.y);
        context.lineTo(position2.x, position2.y);
        context.strokeStyle = bordercolor;
        context.stroke();
        context.closePath();
        context.lineWidth = vortexSize * 2 - 2;
        context.beginPath();
        context.moveTo(position1.x, position1.y);
        context.lineTo(position2.x, position2.y);
        context.strokeStyle = color;
        context.stroke();
        context.closePath();
    };
    const updatemap= ()=>{
        
        map.vortexes = vortexes 
        map.edges = edges 
        console.log(map);
        http.axiosInstance.put("/map/"+ map._id, map).then(res => {console.log("updated");}).catch(erro=> console.log(erro))
    }
    const putVortext = (position, color, size) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(position.x, position.y, size + 2, 0, 2 * Math.PI);
        ctx.fillStyle = color; // Set the fill color
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(position.x, position.y, size - 1, 0, 2 * Math.PI);
        ctx.fillStyle = "#fde293"; // Set the fill color
        ctx.fill();
        ctx.closePath();
    }
    // ===> rendering image backgroundseparitry    <===
    useEffect(() => {
        const backgrouncanva = backgroundCanvaref.current;
        const ctx = backgrouncanva.getContext('2d');
        const image = new Image();
        ctx.clearRect(0, 0, width, height);

        ctx.setTransform(scale, 0, 0, scale, scrollx, scrolly);
        image.src = imageurl;
        image.onload = () => {
            ctx.clearRect(0, 0, width, height);
      
            ctx.drawImage(image, 1, 1,(image.width / image.height) * height -1, height-1 );

        };
    }, [imageurl])


    useEffect(() => {
        const backgrouncanva = backgroundCanvaref.current;
        const ctx = backgrouncanva.getContext('2d');
        const image = new Image();
        ctx.clearRect(0, 0, width, height);
        image.src = imageurl;
        ctx.setTransform(scale, 0, 0, scale, scrollx, scrolly);
        ctx.clearRect(0, 0, width, height);

        ctx.drawImage(image, 1, 1,(image.width / image.height) * height -1, height-1 );



    }, [scale, scrollx, scrolly,imageurl])

    // ===> rendering the canvas    <===
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        ctx.setTransform(scale, 0, 0, scale, scrollx, scrolly);
        edges.forEach((line) => {
            putEdge(line.vortex1.position, line.vortex2.position, "#fde293", "#f8b51c");
        })
        vortexes.forEach((vortex) => {
            putVortext(vortex.position, "yellow", vortexSize);
        })
        // ===> hovering  managment    <===
        if (hoveredVortex != null)
            putVortext(hoveredVortex.position, "green", vortexSize + 2);
        selectedVortex.forEach((vortex) => {
            putVortext(vortex.position, "blue", vortexSize + 2);
        })
        if (shortestPath != null)
            shortestPath.forEach((edge) => {
                putEdge(edge.vortex1.position, edge.vortex2.position, "green", "#f8b51c");
            })
        if (startAndEndvortex.length == 2) {
            findPath(startAndEndvortex[0], startAndEndvortex[1], vortexes, edges);
        }

        if (pathvortexes != null) {
            pathvortexes.forEach((vortex) => {
                putVortext(vortex.position, "green", vortexSize + 2);
            })
            if (pathvortexes.length > 0)
                putVortext(pathvortexes[pathvortexes.length - 1].position, "green", vortexSize + 2);
        }




    }, [vortexes, startAndEndvortex, edges, hoveredVortex, scale, scrollx, scrolly]);

    // ==> undo the last added vortex and its related edges
    const undo = () => {
        //  remove the last vortex , if it's linked with any edge remove it too
        const lastVortex = vortexes[vortexes.length - 1];
        if (lastVortex != null) {
            const newVortexes = vortexes.filter((vortex) => vortex.position.x !== lastVortex.position.x && vortex.position.y !== lastVortex.position.y);
            setvortexes(newVortexes);
            const newEdges = edges.filter((edge) => edge.vortex1.position.x !== lastVortex.position.x && edge.vortex1.position.y !== lastVortex.position.y && edge.vortex2.position.x !== lastVortex.position.x && edge.vortex2.position.y !== lastVortex.position.y);
            setedges(newEdges);
        }
        setSelectedVortex([]);
    }


 
    const handleMousemove = (e, startx, starty) => {
        const image = new Image();
        image.src = imageurl;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if(x<0 || y<0 || x>width || y>height) return setIsMouseDown(false)
        vortexes.some((vortex) => {
            if (Math.abs(x - vortex.position.x * scale - scrollx) < 10 && Math.abs(y - vortex.position.y * scale - scrolly) < 10) {
                sethoveredVortex(vortex);
                return true; // This will break out of the loop
            }
            sethoveredVortex(null)
            return false;
        });

        if (mode === "hand" && isMouseDown) {
            // if the image is finished 
            // if teh hand is out of the box , you should not folow it anymore 
         
            setScrollx(lastScrollx + ((x - startx) * 0.7))
               
            setScrolly(lastScrolly + ((y - starty) * 0.7))
        }
    };
    // ===> mouse event listeners   <===

    // ===> keyboard event listeners    <===

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'z') {
                e.preventDefault(); // Prevent the browser's default behavior
                setundochangment(old => !old)
            }
        });
    }, []);

    useEffect(() => { undo() }, [undochangment]);

    return (
        <DrowingContext.Provider
            value={{
                width,
                draw,
                putVortext,
                height,map,
                canvasRef,
                vortexes,
                edges,
                handleMousemove,
                scrollx,setwidth, setheight,
                scrolly,
                setScrolly, getmapdetails,
                setScrollx,
                setScale,
                handleMouseDown,
                handleMouseUp,
                setMode,setmap,
                setundochangment,
                startX, startY,
                mode,updatemap,
                scale, loading,
                  
                backgroundCanvaref
            }}
        >
            {children}
        </DrowingContext.Provider>
    );
};

export default DrowingContext;