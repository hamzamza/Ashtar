import { useContext, useEffect } from "react";
import DrowingContext from "../context/singlemapContext";
import http from "../utils/http";
import handicon from '../hand.svg' 
function NonEditedMap({id}) {
    const {  
        width,handleMousemove,
         backgroundCanvaref,
          mode,setMode,setScale, scale , 
          handleMouseDown,
          handleMouseUp,
          startX,startY,
         height, 
         setmap, setwidth, setheight,
         draw, getmapdetails,
         canvasRef
       } = useContext(DrowingContext);

       const cursortype = mode == 'hand' ? 'cursor-grab' : ''

       useEffect(() => {
        setMode("path")
        setwidth(window.innerWidth )
        setheight(window.innerHeight )
            http.axiosInstance.get(`/map/${id}`).then((res) => {
                console.log(res.data);
                getmapdetails(res.data)
            }).catch((err) => {
                console.log(err)
            })
       },[id])
    return (   <div className=' relative ' style={{  backgroundSize: "cover", width: `${width}px`, height: `${height}px` }}>
    <canvas ref={backgroundCanvaref} width={width} height={height} className='rounded-lg bg-gray-400' />
    <canvas onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={(e)=>handleMousemove(e,startX,startY)} className={'absolute top-0 left-0 z-10 '+ cursortype} ref={canvasRef} width={width} height={height} onClick={(evt) => { draw(evt); }} />
    
       <div className='flex absolute bottom-1 left-1'>
                 <div onClick={() => { setMode(old => old == "path" ? "vortex" : "path") }} className={' border-b-slate-400 px-5  z-20 rounded-md p-2 bg-gray-300 cursor-pointer mr-1 hover:bg-gray-400 ' + (mode == "path" ? " bg-yellow-400" : "")}>
                    <img src="https://cdn-icons-png.flaticon.com/512/8005/8005569.png" width="20px" height="20px"  ></img>
                </div>
                <div onClick={() => { setMode(old => old == "hand" ? "vortex" : "hand") }} className={' border-b-slate-400 px-5  z-20 rounded-md p-2 bg-gray-300 cursor-pointer mr-1 hover:bg-gray-400  ' + (mode == "hand" ? " bg-yellow-400" : "")}>
                    <img src={handicon} width="20px" height="20px"  ></img>
                </div>
       </div>
       <div className='flex gap-1  absolute bottom-1 right-1 '>
                <div onClick={() => { if (scale > 1) setScale(old => old - 0.1) }} className=' border-2 border-black  px-5 py-0 z-20 rounded-sm select-none bg-gray-300 cursor-pointer mr-1 hover:bg-gray-200 text-center text-lg'>-</div>
                <div onClick={() => { if (scale < 2) setScale(old => old + 0.1) }} className='  border-black border-2 px-5 py-0 z-20 rounded-sm select-none bg-gray-300 cursor-pointer  hover:bg-gray-200 text-center text-lg'>+</div>
            </div>
            <div className='    absolute top-1 right-1 '>
            <div className="bg-primary text-white rounded-lg p-3">
                powered by <a href="https://www.3d4h.com">ALLPaths</a>
            </div>    </div>
 </div>     
        );
}
 
export default NonEditedMap;