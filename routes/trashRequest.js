import express from "express";
import { newtrashRequest,getAllTrashRequest,calculateDistance } from "../controllers/trashRequest.controller.js";
const router = express.Router();

router.post("/newtrashRequest" , newtrashRequest)
router.get("/getAllTrashRequest" , getAllTrashRequest)
router.post("/calculateDistance" , calculateDistance)

export default router;
