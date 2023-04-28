import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/user.js"
import dustbinRoute from "./routes/publicDustbin.js"
import trashRequest from "./routes/trashRequest.js"
import passport from 'passport';
import './utils/passport.js';
import session from 'express-session';
const app = express();

dotenv.config();
app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    
    saveUninitialized: false,
  })
);
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
app.use("/api/trashRequest" , trashRequest)

//Google auth
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("google auth successfull");
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/admin/dashboard');
  });


app.listen(8000, () => {
    connect();
  console.log("Connected to backend");
});
