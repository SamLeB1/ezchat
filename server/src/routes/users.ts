import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import { getUsers, getUser, uploadPfp } from "../controllers/users";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.patch("/upload-pfp", requireAuth, uploadPfp);

export default router;
