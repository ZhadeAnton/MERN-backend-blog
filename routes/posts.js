import express from "express";
import { postCreateValidation } from "../validations/post.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import { authenticateToken } from "../utils/checkAuth.js";
import * as PostController from "../controllers/postController.js";

const router = express.Router();

router.get("/posts", PostController.getAll);
router.get("/posts/:id", PostController.getOne);
router.post(
  "/posts",
  authenticateToken,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
router.patch(
  "/posts/:id",
  authenticateToken,
  postCreateValidation,
  handleValidationErrors,
  PostController.updateOne
);
router.delete("/posts/:id", authenticateToken, PostController.deleteOne);

export default router;
