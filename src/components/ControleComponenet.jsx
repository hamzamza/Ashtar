import { useContext } from 'react';
import DrowingContext from '../context/drowingContext';
import handicon from '../hand.svg'
import jumpicon from '../jump.png'
const ControleComponenetAdmin = () => {
    const {
        setScale,
        scale,
        mode,
        setundochangment,
        setMode,
    } = useContext(DrowingContext);
    const bg = " bg-yellow-200"
    return (<div className='bg-gray-200 rounded-lg  border-gray-400 border-2 w-56 p-2'>
        <div className='mb-3 font-sans'>controle panel</div>

        <section >
            <div className='grid grid-cols-2 gap-1 w-full'>
                <div onClick={() => { if (scale > 1) setScale(old => old - 0.1) }} className=' border-2 border-black  px-5 py-0 z-20 rounded-sm select-none bg-gray-300 cursor-pointer mr-1 hover:bg-gray-200 text-center text-lg'>-</div>
                <div onClick={() => { if (scale < 2) setScale(old => old + 0.1) }} className='  border-black border-2 px-5 py-0 z-20 rounded-sm select-none bg-gray-300 cursor-pointer  hover:bg-gray-200 text-center text-lg'>+</div>
            </div>
        </section>
        <section className='mt-3'>
            modes
            <div className='grid mt-2 gap-1 grid-cols-3'>
                <div onClick={ ()=>setMode("vortex")} className={'   border-b-slate-400 px-5  z-20 rounded-md p-2 bg-gray-300 cursor-pointer mr-1 hover:bg-gray-400  ' + (mode == "vortex" ?  bg  : "")}>
                    <img src={"https://cdn-icons-png.flaticon.com/512/8159/8159502.png"} width="20px" height="20px"  ></img>
                </div>
                <div onClick={() => { setMode(old => old == "path" ? "vortex" : "path") }} className={' border-b-slate-400 px-5  z-20 rounded-md p-2 bg-gray-300 cursor-pointer mr-1 hover:bg-gray-400 ' + (mode == "path" ? bg : "")}>
                    <img src="https://cdn-icons-png.flaticon.com/512/8005/8005569.png" width="20px" height="20px"  ></img>
                </div>
                <div onClick={() => { setMode(old => old == "hand" ? "vortex" : "hand") }} className={' border-b-slate-400 px-5  z-20 rounded-md p-2 bg-gray-300 cursor-pointer mr-1 hover:bg-gray-400  ' + (mode == "hand" ? bg : "")}>
                    <img src={handicon} width="20px" height="20px"  ></img>
                </div>
            </div>


        </section >
        <section className='mt-3'>
            colors
                <ul>
                    <li></li>
                    <li></li>
                </ul>
          
        </section >



    </div>);
}

export default ControleComponenetAdmin;