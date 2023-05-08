import express from "express";
import { acceptedRequest, completedRequest,getAllDrivers } from "../controllers/driverApp.controller.js";
const router = express.Router();

router.put("/acceptedRequest/:id" , acceptedRequest)
router.put("/completedRequest/:id" , completedRequest)
router.get("/getAllDrivers" , getAllDrivers)

export default router;
