import express from "express";
import { getGroups, addGroup, addMessage } from "../controllers/groups.js";

const router = express.Router();

router.get("/groups", getGroups);
router.post("/", addGroup);
router.patch('/groups/:id', addMessage)

export default router;
