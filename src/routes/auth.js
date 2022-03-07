import { Router } from "express";
import authController from "../controllers/Auth.js";
import { authValidators } from "../validations/auth.validation.js";
import { validationCatcher } from "../middlewares/validationMd.js";

const router = Router();

router.post(
  "/auth/login",
  authValidators.authenticate,
  validationCatcher,
  authController.login
);

router.get("/api/auth/csrf", authController.request);

export { router };
