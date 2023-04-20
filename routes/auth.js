import express from "express";
import { userSignup, userSignin } from "../controllers/auth.js";
const router = express.Router();

router.post("/signup", userSignup);
router.post("/signin", userSignin);




export default router;