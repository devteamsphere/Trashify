import mongoose from "mongoose";

const DustbinSchema = new mongoose.Schema(
  {
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

    imgURL: {
      type: String,
      required: true,
      default: "",
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
