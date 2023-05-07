import express from "express";
import { acceptedRequest, completedRequest } from "../controllers/driverApp.controller.js";
const router = express.Router();

router.put("/acceptedRequest/:id" , acceptedRequest)
router.put("/completedRequest/:id" , completedRequest)

export default router;
