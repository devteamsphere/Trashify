import mongoose from "mongoose";

const trashRequestSchema = new mongoose.Schema(
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
        dustbinId: {
            type: String,
            required: false,
            unique: true,

        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            required: true,
            default: "pending",

        },
        requestType: {
            type: String,
            enum: ["public", "personal"],
            required: true,
            default: "",

        },
        description: {
            type: String,
            required: false,

        },
        imgUrl: {
            type: String,
            default: ""
        },
        userId: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            default: ""
        }
        
        


    }, {
    timestamps: true
},

);

export default mongoose.model("trashRequest", trashRequestSchema);
