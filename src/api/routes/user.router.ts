import { Router } from "express";
import {
  OTPVerify,
  emailSending,
  forgetPassword,
  resetPassword,
  sellerLogin,
  sellerRegister,
  test,
} from "../controllers/user.controller";

const router = Router();

router.post("/emailSent", emailSending);
router.post("/emailVerify", OTPVerify);
router.post("/register", sellerRegister);
router.post("/login", sellerLogin);
router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword", resetPassword);

router.get("/test", test);

export default router;
