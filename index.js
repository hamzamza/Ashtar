import express from "express"
import dotenv from "dotenv"
import "express-async-errors";
dotenv.config()
import cookieParser from "cookie-parser";

import connectDb from "./connection.js";
import authRouter from "./routes/auth.js";
import mapRouter from "./routes/maps.js";
import errornotfournd from "./middlewares/errornotfound.js"
import errorhanler from "./middlewares/errorhandler.js"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.urlencoded({ extends: false }));
app.use(express.json());
app.use(cookieParser())

const port = process.env.PORT || 5000
const secret = process.env.MONGO;

app.use('/api/auth', authRouter)
app.use('/api/map', mapRouter )
// errors
app.use(errorhanler);
app.use(errornotfournd);




//

app.listen(port, () => {
    console.log('server start listening ' + `port ${port}`);
    connectDb(secret);

})













/** 
import express from "express";
import dotenv from "dotenv";
import connectDb from "./connection/connectDb"
dotenv.config();
const app = express()
const port = process.env.port || 5000
const MONGO = precess.evn.MONGO
app.listen(port, () => {
    console.log(`"start connecting to port ${port}`);
    connectDb(MONGO)

})

*/



