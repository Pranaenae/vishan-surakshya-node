import { Router } from "express";
import userRouter from "./user.router";
import adminRouter from "./admin.router"

const router = Router();

router.use("/user", userRouter);
router.use("/admin", adminRouter);



export default router;
