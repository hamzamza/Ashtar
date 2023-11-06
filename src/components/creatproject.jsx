import { useContext, useState } from "react";
import Mapscontext from "../context/mapsContext";

function CreateProjectForm() {
    const {createMap} = useContext(Mapscontext)
    const [error , setError ] = useState(false)
    const  [loading , setLoading ]  = useState(false )
    const [credentials, setCredentials] = useState({image:null , title : null , description : null})
   const handelChange=(e)=>{
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
        console.log(maps);
   }
   
    const handelupload = (file) => {
        const formData = new FormData();
        formData.append('image', file);

        fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => { 
                 setCredentials(prev => ({ ...prev, image: data.name , url : data.imageurl}))
                  })
            .catch((error) => {
         setError({msg : "can't get "})
            });
    };

    return (  <div className="space-y-4 flex min-h-screen-200 justify-center items-center  md:space-y-6  bg-gray-200 p-3 rounded-lg " >
                        <div className="w-1/2 p-6 border-2 rounded-lg border-primary">
                            <div>
                                <label for="title" className="block mb-2 text-lg text-primary font-medium  ">Map Title</label>
                                <input id="title" onChange={handelChange}  name="title" className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                            </div>
                            <div className="mb-3">
                                <label for="description" className="block mb-2 text-lg font-medium text-primary " > Map Description</label>
                                <input type="description" id="description" onChange={handelChange} name="description" className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                            </div>
                            <div className="relative h-24 border-2   m-2 border-primary rounded-lg hover:bg-primary transition hover:text-white">

                                <label
                                    htmlFor="myImage"
                                    className="w-full  outline-font text-2xl font-bold h-full flex absolute items-center justify-center cursor-pointer  "
                                >
                                {credentials.image!= null ? credentials.image  :  "Upload Image" }
                                </label>
                                <input
                                    type="file"
                                    name="myImage"
                                    className="w-full h-full absolute opacity-0 bg-blue-200"
                                    onChange={(event) => {
                                        handelupload(event.target.files[0]);
                                    }}
                                />
                            </div>
                            <button onClick={()=>createMap(credentials)} className={"w-full outline-font font-bold border-2   text-white bg-primary  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 text-2xl rounded-lg   px-5 py-2.5 text-center" + (error ? " border-red-500" : "")  }>{loading ? "loaidng ..." : "create map"} </button>
                            {error && <p className="text-red-500 text-center font-bold"> {error.msg}</p>}
                        </div>
                    </div> );
}

export default CreateProjectForm ;