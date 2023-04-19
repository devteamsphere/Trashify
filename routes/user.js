import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { deleteUser } from "../controllers/user.controller.js";
import { getUser } from "../controllers/user.controller.js";
import { getUsers } from "../controllers/user.controller.js";

const router = express.Router();




// UPDATE
router.put("/:id", updateUser);
// DELETE
router.delete("/:id", deleteUser);

// GET
router.get("/:id", getUser);
// GET ALL
router.get("/", getUsers);

export default router;
