import { Router } from "express";
import userRouter from "./user.router";
import adminRouter from "./admin.router";
import productRouter from "./product.router";
import imageRouter from "./image.router";
import activityRouter from "./transaction.router";
import arbitration from "./litigation.routes";

const router = Router();

router.use("/user", userRouter);
router.use("/admin", adminRouter);

router.use("/image", imageRouter);

router.use("/product", productRouter);
router.use("/transaction", activityRouter);
router.use("/arbitration", arbitration);

export default router;
