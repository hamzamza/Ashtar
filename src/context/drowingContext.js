import React, { createContext, useState, useEffect, useRef } from "react";

// import GlobalContext from "./globalContext";

const DrowingContext = createContext();

export const DrawingContextProvider = ({ children }) => {
    // buliding and rendering 

    // vortext class : vortex{ x , y , id}
    // line class : line { vortex1 , vortex2 , id}
    // ===> states  <===
    const width = 1080;
    const height = 720;
    const canvasRef = useRef(null);
    const [selected, setSelected] = useState("vortex");
    const [hoveredVortex, sethoveredVortex] = useState(null); // [x , y
    const [selectedVortex, setSelectedVortex] = useState([]);
    const [vortexes, setvortexes] = useState([]);
    const [edges, setedges] = useState([]);
    const [lastAdded, setLastAdded] = useState(null);
    const [vortexSize, setvortexSize] = useState(5);
    const [undochangment, setundochangment] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    // ===> functions  <===


    function getMousePos(evt) {
        var rect = canvasRef.current.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    const draw = (evt) => {
        console.log(vortexes);
        const position = getMousePos(evt);
        if (selected != null) {
            if (selected === "vortex") {
                if (hoveredVortex == null)
                    setvortexes((old) => { return [...old, { id: 12, position }] })
                else {
                    if (selectedVortex.length == 0)
                        setSelectedVortex(old => [...old, hoveredVortex]);
                    else {
                        setedges(old => [...old, { id: 12, vortex1: selectedVortex[0], vortex2: hoveredVortex }]);
                        setSelectedVortex([]);
                    }
                }
            }

        }
    }

    const putEdge = (position1, position2) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(position1.x, position1.y);
        context.lineTo(position2.x, position2.y);
        context.strokeStyle = "red";
        context.stroke();
    };

    const putVortext = (position, color, size) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(position.x, position.y, size, 0, 2 * Math.PI);
        ctx.fillStyle = color; // Set the fill color
        ctx.fill();
        ctx.closePath();
    }

    // ===> rendering function   <===
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        edges.forEach((line) => {
            putEdge(line.vortex1.position, line.vortex2.position);
        })
        vortexes.forEach((vortex) => {
            putVortext(vortex.position, "red", vortexSize);
        })

        // ===> hovering  managment    <===
        if (hoveredVortex != null)
            putVortext(hoveredVortex.position, "green", vortexSize + 2);
        selectedVortex.forEach((vortex) => {
            putVortext(vortex.position, "blue", vortexSize + 2);
        })
    }, [vortexes, edges, hoveredVortex]);


  const undo=()=>{
        // if remove the last vortex , if it's linked with any edge remove it too
        const lastVortex = vortexes[vortexes.length - 1];  
        if (lastVortex != null) {
            const newVortexes = vortexes.filter((vortex) => vortex.position.x !== lastVortex.position.x && vortex.position.y !== lastVortex.position.y);
            setvortexes(newVortexes);
            const newEdges = edges.filter((edge) =>  edge.vortex1.position.x !== lastVortex.position.x && edge.vortex1.position.y !== lastVortex.position.y && edge.vortex2.position.x !== lastVortex.position.x && edge.vortex2.position.y !== lastVortex.position.y);
            setedges(newEdges);
        }
        setSelectedVortex([]);
    }

    useEffect(() => {
        // if the mouse in top of one of the vortexes : drow a green one in top of it 
        vortexes.some((vortex) => {
            if (Math.abs(mousePosition.x - vortex.position.x) < 10 && Math.abs(mousePosition.y - vortex.position.y) < 10) {
                sethoveredVortex(vortex);
                return true; // This will break out of the loop
            }
            sethoveredVortex(null)
            return false;
        });
    }, [mousePosition]);
    // ===> mouse event listeners   <===
    useEffect(() => {
        const canvas = canvasRef.current;
        const handleMousemove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (x > 0 && x < width && y > 0 && y < height)
                setMousePosition({ x, y });
        };
        canvas.addEventListener('mousemove', handleMousemove);
        return () => {
            canvas.removeEventListener('mousemove', handleMousemove);
        };
    }, []);
        useEffect(() => {
            document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'z') {
                e.preventDefault(); // Prevent the browser's default behavior
                setundochangment (old=>!old) 
            }
        });},[]);
        useEffect(() => {undo()},[undochangment]);

    return (
        <DrowingContext.Provider
            value={{
                // pass arguemnts here to use it 
                width,
                draw,
                putVortext,
                height,
                canvasRef,
                vortexes,
                edges,
            }}
        >
            {children}
        </DrowingContext.Provider>
    );
};

export default DrowingContext;