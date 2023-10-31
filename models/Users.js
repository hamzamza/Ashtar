import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password:
    {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    maps : {type :  [{ type: Schema.Types.ObjectId, ref: 'Maps' }] , default : []},
});
export default mongoose.model("Users", UserSchema);
