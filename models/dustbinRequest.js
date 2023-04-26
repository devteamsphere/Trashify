import mongoose from "mongoose";

const RequestDustbinSchema = new mongoose.Schema(
    {
        longitude: {
            type: String,
            required: true,
            default: ""

        },
        latitude: {
            type: String,
            required: true,
            default: ""
        },
        id: {
            type: String,
            required: true,
            unique: true,

        },
        dustbinStatus: {
            type: String,
            enum:["requested","accepted","rejected"],
            required: true,
            default:"",

        },
        dustbinRequestType: {
            type: String,
            enum:["public","personal"],
            required: true,
            default:"",

        },


    },{
        timestamps:true
    },

);

export default mongoose.model("dustbinRequest", RequestDustbinSchema);
