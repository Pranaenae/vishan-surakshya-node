import { Router } from "express";
import {
  changeStatus,
  createNegotiation,
  getNegotiation,
  renegotiate,
} from "../controllers/negotiation.controller";

const router = Router();

router.post("/", createNegotiation);
router.patch("/", renegotiate);
router.patch("/status", changeStatus);

router.get("/:id", getNegotiation);

export default router;
