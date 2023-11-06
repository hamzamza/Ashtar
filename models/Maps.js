import mongoose from "mongoose";
const { Schema } = mongoose;

const MapSchema = new Schema({
    title: {type : String , required : true},   
    vortexes: {
        type: [
            { _id: false,
                position: {
                    type: { _id: false,
                        x: Number,
                        y: Number
                    },
                    requiredPaths: true
                },
                label: String
            }
        ],
        default: []
    },
    edges: {
        type: [
            { _id: false,
                vortex1: { _id: false,
                    position: {
                        type: { _id: false,
                            x: Number,
                            y: Number
                        },
                        requiredPaths: true
                    },
                    label: String
                },
                vortex2: { _id: false,
                    position: {
                        type: { _id: false,
                            x: Number,
                            y: Number
                        },
                        requiredPaths: true
                    },
                    label: String
                },
                label: String
            }
        ],
        default: []
    },
    owner : {type : String , required : true},
    description: {type : String , required : true},
    url: {type : String , required : true},
    image:{type : String , required : true },
     bgColor : {type : String , default : "#000000"},
    vortexColor : {type : String , default : "#ffffff"},
    vortexSize : {type : Number , default : 2},
    edgesColor : {type : String , default : "#ffffff"},
    edgesWidth : {type : Number , default : 2},
    shortPathColor : {type : String , default : "#ffffff"},
    shortPathWidth : {type : Number , default : 2},
    strokeSize : {type : Number , default : 2},
    strokeColor : {type : String , default : "#ffffff"},
    pathopacity : {type : Number , default : 0.5},
    authorizedTo:{type :  [{ type: String}] , default : []},
});
export default mongoose.model("Maps", MapSchema);
