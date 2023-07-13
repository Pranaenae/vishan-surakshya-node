import { Router } from "express";
import {
  OTPVerify,
  emailSending,
  forgetPassword,
  resetPassword,
  sellerLogin,
  sellerRegister,
  test,
  registerUser,
} from "../controllers/user.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/emailSent", emailSending);
router.post("/emailVerify", OTPVerify);
router.post("/registerr", sellerRegister);
router.post("/login", sellerLogin);
router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword", resetPassword);

router.get("/test", test);

export default router;
