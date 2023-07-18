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
  getProfile,
  updateUser,
  setPassword,
} from "../controllers/user.controller";
import { isAuth } from "../middlewares/auth.middleware";
import { getAccessToken, getCode } from "../controllers/googleAuth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/emailSent", emailSending);
router.post("/emailVerify", OTPVerify);
router.post("/registerr", sellerRegister);
router.post("/login", sellerLogin);
router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword", resetPassword);
router.get("/", isAuth, getProfile);
router.put("/update", isAuth, updateUser);
router.post("/set-password", isAuth, setPassword);
router.get("/getCode", getCode);
router.get("/token", getAccessToken);

router.get("/test", test);

export default router;
