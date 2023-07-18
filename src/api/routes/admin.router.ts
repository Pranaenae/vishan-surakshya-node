import { Router } from "express";
import { getUsers } from "../controllers/admin.controller";
const router = Router();

router.get("/", getUsers);

export default router;
