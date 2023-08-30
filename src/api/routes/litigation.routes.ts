import { Router } from "express";
import { newLitigation } from "../controllers/litigation.controller";
import { upload } from "../middlewares/image.middleware";

const router = Router();

router.post("/:id", upload.array("docs", 5), newLitigation);

export default router;