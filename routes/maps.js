import {  createMap, deleteMap, DeleteAllMaps, getMaps, updateMap, getMap } from '../controllers/mapscontroller.js'
import express from 'express'
import ver from '../utils/verifyToken.js'
const router = express.Router()
router.route("/").post(ver.verifyToken,createMap).get(ver.verifyToken,getMaps).delete(DeleteAllMaps)
router.route("/:id").get(ver.verifyToken , getMap).put(ver.verifyToken,updateMap).delete(ver.verifyToken,deleteMap)
router.route("/show/:id").get(getMap)
export default router