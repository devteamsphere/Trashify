import mongoose from "mongoose";

const DustbinSchema = new mongoose.Schema(
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
        imgURL: {
            type: String,
            required: true,
            default:"",

        },


    },{
        timestamps:true
    },

);

export default mongoose.model("publicDustbin", DustbinSchema);
