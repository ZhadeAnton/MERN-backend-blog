import express from "express";
import { loginValidation, registerValidation } from "../validations/auth.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import { authenticateToken } from "../utils/checkAuth.js";
import * as UserController from "../controllers/userController.js";

const router = express.Router();

router.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
router.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
router.get("/me", authenticateToken, UserController.getMe);

export default router;
