import express from "express";
import { createDriver, updateUser,deleteUser,getUser,getUsers } from "../controllers/user.controller.js";

const router = express.Router();

// UPDATE
router.put("/:id", updateUser);
// DELETE
router.delete("/:id", deleteUser);

// GET
router.get("/:id", getUser);
// GET ALL
router.get("/", getUsers);

// newDriverDetail
router.post("/createDriver" , createDriver)

export default router;
