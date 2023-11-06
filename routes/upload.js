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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null,   file.originalname);
  },
});

const upload = multer({ storage: storage });

const uloadtoCloudinary =async (req, res) => {
    console.log(req.file.filename);
try {
    await cloudinary.uploader.upload(
        './uploads/' + req.file.filename,
        { public_id: uuidv4()+ req.file.filename },
        (error, result) => {
          if (error) { 
            console.error(error);
            return res.status(500).json({ error: 'Upload to Cloudinary failed' });
          }
          fs.unlink('uploads/' + req.file.filename, (err) => {
            if (err) { 
              console.error(err);
            }
       
            console.log('Local file deleted');
          });
          return res.status(200).json({imageurl : result.url, name: req.file.filename });
        }
      );
} catch (error) {
    console.log(error);
}
  res.status(200).json({ msg: "we don't know what happens" });
};
router.route('/').post(upload.single('image'), uloadtoCloudinary);

export default router;
