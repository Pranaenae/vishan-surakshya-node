import { Router } from "express";
import {
  getActivityByProductId,
  logEntry,
} from "../controllers/transaction.controller";

const router = Router();
router.post("/create", logEntry);
router.get("/:id", getActivityByProductId);

export default router;
