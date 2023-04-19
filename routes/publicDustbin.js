import express from "express";
import { dustbin } from "../controllers/publicDustbin.controller.js";

const router = express.Router();

router.post("/publicdustbin" , dustbin)

export default router;