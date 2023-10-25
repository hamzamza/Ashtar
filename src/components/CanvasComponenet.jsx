
import React, { useContext } from 'react';
import DrowingContext from '../context/drowingContext';
 
const CanvasComponent = () => {
   const {  
        width,
         backgroundCanvaref,
          mode,
          handleMouseDown,
          handleMouseUp,
         height, 
         draw, 
         canvasRef
       } = useContext(DrowingContext);
      const cursortype = mode == 'hand' ? 'cursor-grab' : ''
   return <div className=' relative ' style={{  backgroundSize: "cover", width: `${width}px`, height: `${height}px` }}>
         <canvas ref={backgroundCanvaref} width={width} height={height} className='rounded-lg bg-gray-400' />
         <canvas onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className={'absolute top-0 left-0 z-10 '+ cursortype} ref={canvasRef} width={width} height={height} onClick={(evt) => { draw(evt); }} />
      </div>
};

export default CanvasComponent;