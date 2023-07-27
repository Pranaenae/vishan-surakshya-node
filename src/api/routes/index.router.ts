import { Router } from "express";
import userRouter from "./user.router";
import adminRouter from "./admin.router";
import productRouter from "./product.router";
import imageRouter from "./image.router";
import activityRouter from "./transaction.router";
import arbitrationRouter from "./litigation.routes";
import negotiationRouter from "./negotiation.router";

const router = Router();

router.use("/image", imageRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/product", productRouter);
router.use("/transaction", activityRouter);
router.use("/arbitration", arbitrationRouter);
router.use("/negotiation", negotiationRouter);

export default router;
