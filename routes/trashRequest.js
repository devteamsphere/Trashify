import express from "express";
import { newtrashRequest,getAllTrashRequest } from "../controllers/trashRequest.controller.js";
const router = express.Router();

router.post("/newtrashRequest" , newtrashRequest)
router.get("/getAllTrashRequest" , getAllTrashRequest)

export default router;
