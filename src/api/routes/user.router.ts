import { Router } from "express";
import {
  OTPVerify,
  emailSending,
  sellerRegister,
  test,
  registerUser,
} from "../controllers/user.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/emailSent", emailSending);
router.post("/emailVerify", OTPVerify);
router.post("/registerr", sellerRegister);

router.get("/test", test);

export default router;
