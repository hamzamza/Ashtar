import {  createMap, deleteMap, DeleteAllMaps, getMaps, updateMap, getMap } from '../controllers/mapscontroller.js'
import express from 'express'
import ver from '../utils/verifyToken.js'
const router = express.Router()
router.route("/").post(ver.verifyUser,createMap).get(getMaps).delete(DeleteAllMaps)
router.route("/:id").get(ver.verifyUser , getMap).delete(deletCity)
router.route("/show/:id").get(getMap)
export default router