import express from "express";
import { newtrashRequest,getAllTrashRequest,calculateDistance, pendingRequest, allTrashRequest } from "../controllers/trashRequest.controller.js";
const router = express.Router();

router.post("/newtrashRequest" , newtrashRequest)
router.get("/getAllTrashRequest" , getAllTrashRequest)
router.post("/calculateDistance" , calculateDistance)
router.get("/pendingRequest",pendingRequest)
router.get("/allTrashRequest" , allTrashRequest)

export default router;
