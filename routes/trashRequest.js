import express from "express";
import { newtrashRequest,getAllTrashRequest,calculateDistance, pendingRequest } from "../controllers/trashRequest.controller.js";
const router = express.Router();

router.post("/newtrashRequest" , newtrashRequest)
router.get("/getAllTrashRequest" , getAllTrashRequest)
router.post("/calculateDistance" , calculateDistance)
router.get("/pendingRequest",pendingRequest)

export default router;
