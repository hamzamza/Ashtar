import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,   
    email: String,
    password: String,
    maps : {type :  [{ type: Schema.Types.ObjectId, ref: 'Maps' }] , default : []},
});
export default mongoose.model("Users", UserSchema);
