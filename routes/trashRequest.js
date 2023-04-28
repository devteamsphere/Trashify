import express from "express";
import { newtrashRequest } from "../controllers/trashRequest.controller.js";
const router = express.Router();

router.post("/newtrashRequest" , newtrashRequest)

export default router;
