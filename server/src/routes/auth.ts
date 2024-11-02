import { Router } from "express";
import { checkSchema } from "express-validator";
import { login, signup } from "../controllers/auth";
import { signupValidationSchema } from "../utils/validationSchemas";

const router = Router();

router.post("/login", login);
router.post("/signup", checkSchema(signupValidationSchema), signup);

export default router;
