import { Router } from "express";
import { getActivityByProductId } from "../controllers/activityLog.controller";

const router = Router();

router.get("/:id", getActivityByProductId);

export default router;
