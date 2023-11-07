import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_API,
});

const storage = new multer.memoryStorage();
const upload = multer({
  storage,
});

 

const uloadtoCloudinary =async (req, res) => {
 
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);
      res.status(200).json({name : req.file.originalname , imageurl: cldRes.secure_url});
      console.log("everything is good");
    } catch (error) {
      console.log(error);
      res.status(400).send({
        msg: "can't get"
      });
    }
  res.status(200).json({ msg: "we don't know what happens" });
};
router.route('/').post(upload.single('image'), uloadtoCloudinary);

export default router;




 

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, 
   {public_id: uuidv4()+ file.filename ,resource_type: "auto", },
   (error, result) => {
    if (error) { 
      throw new Error("error");
    }
  });
  return res;
}