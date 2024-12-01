import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import { getMessages, createMessage } from "../controllers/messages";

const router = Router();

router.get("/", getMessages);
router.post("/", requireAuth, createMessage);

export default router;
