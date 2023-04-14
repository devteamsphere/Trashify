import express from "express";
import { updateUser } from "../controllers/user.js";
import { deleteUser } from "../controllers/user.js";
import { getUser } from "../controllers/user.js";
import { getUsers } from "../controllers/user.js";

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
