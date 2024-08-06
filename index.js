import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { authenticateToken } from "./utils/checkAuth.js";
import { registerValidation, loginValidation } from "./validations/auth.js";
import { postCreateValidation } from "./validations/post.js";
import * as UserController from "./controllers/userController.js";
import * as PostController from "./controllers/postController.js";

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", authenticateToken, UserController.getMe);

app.get("/posts", PostController.getAll);

app.get("/posts/:id", PostController.getOne);

app.post(
  "/posts",
  authenticateToken,
  postCreateValidation,
  PostController.create
);

app.patch(
  "/posts/:id",
  authenticateToken,
  postCreateValidation,
  PostController.updateOne
);

app.delete("/posts/:id", authenticateToken, PostController.deleteOne);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
