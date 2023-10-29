import mongoose from "mongoose";
mongoose.set('strictQuery', true);
mongoose.connection.on("disconnection", () => {
    console.log("desconnected error");
})
mongoose.connection.on("connection", () => {
    console.log("connected again ");
})

const connectDb = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("Connected to mongoDB.");
    } catch (error) {
        console.log(error);
    }
};
export default connectDb
