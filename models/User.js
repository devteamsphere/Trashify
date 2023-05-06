import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      
    },
    lastName: {
      type: String,
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contactNo: {
      type: Number,
    },
    aadhaarCardNo : {
      type : String,
      
    },
    userType : {
      type : String,
      enum:["user","driver","admin"],
      required : true,
      default : "user"
    },
    longitude: {
      type : String,
    },
    latitude : {
      type : String,
    },
    address : {
      type : String,
      
    },
    profileImg : {
      type : String,
      required : false
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
