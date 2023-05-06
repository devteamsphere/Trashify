import express from "express";
import { acceptedRequest } from "../controllers/driverApp.controller.js";
const router = express.Router();

router.put("/:id" , acceptedRequest)

export default router;
