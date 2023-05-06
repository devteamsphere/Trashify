import mongoose from "mongoose";

const DustbinSchema = new mongoose.Schema(
  {
    dustbinId : {
      type: String,
      default: "",
    },
    longitude: {
      type: String,
      required: true,
      default: "",
    },
    latitude: {
      type: String,
      required: true,
      default: "",
    },

    qrUrl:{
      type: String,
      default: ""
    },
    address: {
      type: String,
      required: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("publicDustbin", DustbinSchema);
