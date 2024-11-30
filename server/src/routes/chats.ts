import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import { getChats, createChat } from "../controllers/chats";

const router = Router();

router.get("/", requireAuth, getChats);
router.post("/", requireAuth, createChat);

export default router;
