import { Router } from "express";
import userRouter from "./user.router";
import adminRouter from "./admin.router";
import productRouter from "./product.router";
import imageRouter from "./image.router";
import activityRouter from "./activity.router";

const router = Router();

router.use("/user", userRouter);
router.use("/admin", adminRouter);

router.use("/image", imageRouter);

router.use("/product", productRouter);
router.use("/activity", activityRouter);

export default router;
