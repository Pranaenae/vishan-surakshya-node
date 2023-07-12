import { Router } from "express";
import {
  OTPVerify,
  emailSending,
  sellerRegister,
  test,
} from "../controllers/user.controller";

const router = Router();

router.post("/emailSent", emailSending);
router.post("/emailVerify", OTPVerify);
router.post("/register", sellerRegister);

router.get("/test", test);

export default router;
