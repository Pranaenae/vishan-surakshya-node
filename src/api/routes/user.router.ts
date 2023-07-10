import { Router } from "express";
import { register, test } from "../controllers/user.controller";

const router = Router();

router.post("/register", register);
router.get("/test", test);

export default router;
