import Maps from "../models/Maps.js";
import Users from "../models/Users.js";

const createMap = async (req, res) => {
    const body = req.body
    const userId = req.userId
    body.owner = userId
    console.log(body);
    try {  const map = await Maps.create(body)
    const maped  = await  Users.findByIdAndUpdate(userId, { $push: { maps: map._id } }, { new: true }).populate("maps")
    console.log(maped);
        res.status(200).json(maped)
}
    catch(e){
        res.status(400).json({msg : e.stakTrace}) 
    }
}

const deleteMap = async (req, res) => {
    const id = req.params.id
    const  map  = Maps.findById(id)
    const userId = req.userId
    if(  userId != map.owner ){
    map = await Maps.findByIdAndDelete(id)
   return  res.status(200).json(map)
    }
    res.status(401).json({msg:"you are not authorized to delete this map"})
}

const DeleteAllMaps = async (req, res) => {
    const map = await Maps.deleteMany({})
    res.status(200).json(map)
}

const getMaps = async (req, res) => {
try{    console.log("getting maps");
    console.log(req.userId);
    const data = await Users.findById(req.userId).populate("maps")
    console.log(data.maps);
    res.status(200).json(data.maps)}
    catch(eror){
        
    }
}

const updateMap = async (req, res) => {
    const data = await Maps.findById(req.params.id )
    const {_v , _id , owner , ...rest} = data._doc; 
    if( req.userId != data.owner ){
        res.status(401).json({msg:"you are not authorized to update this map"})
    }
    const updatedData = { ...rest ,...req.body  }
    const lastupdate = await Maps.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(lastupdate)
}
const getMap = async (req, res) => {
    const id = req.params.id
    console.log(id);
    try {
        const map = await Maps.findById(id)
        console.log(map);
        return  res.status(200).json(map)
    } catch (error) {
        console.log(error);
        return res.status(402).json({msg:"error in the server side "})
    }
   

}

export { createMap, deleteMap, DeleteAllMaps, getMaps, updateMap, getMap }