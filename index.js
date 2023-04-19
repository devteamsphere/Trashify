import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/user.js"
import dustbinRoute from "./routes/publicDustbin.js"
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());


const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

app.use("/api/auth" , authRoute)
app.use("/api/users" , userRoute)
app.use("/api/dustbins" , dustbinRoute)


app.listen(8880, () => {
    connect();
  console.log("Connected to backend");
});
