
import express from "express";
import { createDriver, updateUser,deleteUser,getUser,getUsers,updateUsercredits,dashboardInfo } from "../controllers/user.controller.js";


const router = express.Router();
router.post("/createDriver" , createDriver);
router.get("/dashboardInfo" , dashboardInfo)

router.put("/updateUsercredits",updateUsercredits)
// UPDATE
router.put("/:id", updateUser);
// DELETE
router.delete("/:id", deleteUser);

// GET
router.get("/:id", getUser);
// GET ALL
router.get("/", getUsers);

// newDriverDetail


export default router;
