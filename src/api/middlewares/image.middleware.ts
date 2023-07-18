import { Request } from "express";
import multer, { StorageEngine } from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  // Modify the filename if needed
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req: Request, file: any, cb: any) => {
  //reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
    // ||
    // file.mimetype === "application/octet-stream" ||
    // file.mimetype === "application/pdf" ||
    // file.mimetype ===
    //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    console.log("wrong file type");
    cb(null, false);
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
  fileFilter: fileFilter,
});
