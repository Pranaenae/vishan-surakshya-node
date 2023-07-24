import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  toggleProduct,
  updateProduct,
} from "../controllers/product.controller";
import { upload } from "../middlewares/image.middleware";
import { isAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", upload.single("image"), isAuth, createProduct);
router.get("/", getAllProduct);
router.patch("/", updateProduct);
router.patch("/toggle", toggleProduct);

// router with params are kept below
router.delete("/:_id", deleteProduct);
router.get("/:_id", getProduct);

export default router;
