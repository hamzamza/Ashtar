
import React, { useRef, useEffect, useContext } from 'react';
import DrowingContext from '../context/drowingContext';
const CanvasComponent = () => {
   const { drawLine ,width, height,draw, canvasRef, getMousePos } = useContext(DrowingContext);


   return <div className=' flex justify-center items-center h-screen bg-slate-300'>
      <div onClick={(evt) => { draw(evt); }} style={{ backgroundImage: "url('/map2.png')", backgroundRepeat: "no-repeat", backgroundSize: "cover", width: `${width}px`, height: `${height}px` }}>
         <canvas ref={canvasRef} width={width} height={height} />
      </div>;

   </div>
};

export default CanvasComponent;