import express from "express";
import multer from "multer";
import { authenticateToken } from "../utils/checkAuth.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
const router = express.Router();

router.post(
  "/upload",
  authenticateToken,
  upload.single("image"),
  (req, res) => {
    res.json({ url: "/uploads/" + req.file.filename });
  }
);

export default router;
