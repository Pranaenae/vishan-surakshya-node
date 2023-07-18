import { Router } from "express";
import userRouter from "./user.router";
import adminRouter from "./admin.router"
import productRouter from "./product.router";
import imageRouter from "./image.router";

const router = Router();

router.use("/user", userRouter);
router.use("/admin", adminRouter);


router.use("/image", imageRouter);

router.use("/product", productRouter);

export default router;
