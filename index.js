import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import * as PostController from "./controllers/postController.js";
import * as UserController from "./controllers/userController.js";
import { authenticateToken } from "./utils/checkAuth.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import { postCreateValidation } from "./validations/post.js";
import { loginValidation, registerValidation } from "./validations/auth.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/** Posts */
app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  authenticateToken,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.patch(
  "/posts/:id",
  authenticateToken,
  postCreateValidation,
  handleValidationErrors,
  PostController.updateOne
);
app.delete("/posts/:id", authenticateToken, PostController.deleteOne);

/** Tags */
app.get("/tags", PostController.getLastTags);

/** Auth */
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", authenticateToken, UserController.getMe);

/** Uploads */
app.post("/upload", authenticateToken, upload.single("image"), (req, res) => {
  res.json({ url: "/uploads/" + req.file.filename });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
