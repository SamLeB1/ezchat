import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import { getChats, createChat } from "../controllers/chats";

const router = Router();

router.get("/chats", requireAuth, getChats);
router.post("/chats", requireAuth, createChat);

export default router;
