
import React, { useContext, useEffect } from 'react';
import DrowingContext from '../context/singlemapContext';
 
const EditMapCanva = ({map}) => {
   const {  
        width,handleMousemove,
         backgroundCanvaref,
          mode,
          handleMouseDown,
          handleMouseUp,
          startX,startY,
         height, 
         setmap, 
         draw, getmapdetails,
         canvasRef
       } = useContext(DrowingContext);
       useEffect(() => {
               getmapdetails(map)
       },[map])
      const cursortype = mode == 'hand' ? 'cursor-grab' : ''
   return <div className=' relative ' style={{  backgroundSize: "cover", width: `${width}px`, height: `${height}px` }}>
         <canvas ref={backgroundCanvaref} width={width} height={height} className='rounded-lg bg-gray-400' />
         <canvas onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={(e)=>handleMousemove(e,startX,startY)} className={'absolute top-0 left-0 z-10 '+ cursortype} ref={canvasRef} width={width} height={height} onClick={(evt) => { draw(evt); }} />
      </div>
};

export default EditMapCanva;