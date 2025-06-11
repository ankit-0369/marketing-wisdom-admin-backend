import { Router } from "express";
import {  loginUser, logoutController, refreshTokenController, registerUser } from "../controllers/auth.controller";
import { loginAdminValidator, registerAdminValidator } from "../validators/auth.validator";
import { validateRequest } from "../middleware/validate.middleware";

const router= Router();

router.route('/register')
    .post(registerAdminValidator,validateRequest, registerUser);
router.route('/sign-in').post(loginAdminValidator, validateRequest, loginUser);
router.route('/refresh-token').post(refreshTokenController);
router.route('/logout').post(logoutController);

export default router;