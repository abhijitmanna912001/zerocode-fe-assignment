import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.route("/").post(protect, sendMessage).get(protect, getMessages);

export default router;
