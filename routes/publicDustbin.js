import express from "express";
import { dustbin,generatePickupRequest } from "../controllers/publicDustbin.controller.js";

const router = express.Router();

router.post("/publicdustbin" , dustbin)
router.post("/dustbinrequest" , generatePickupRequest)

export default router;