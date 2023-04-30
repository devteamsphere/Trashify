import express from "express";
import { dustbin,getDustbin } from "../controllers/publicDustbin.controller.js";

const router = express.Router();

router.post("/publicdustbin" , dustbin)
router.get("/getDustbin" , getDustbin)

export default router;