import express from "express";

import {
    login,
    register,
    registerAsAdmin,
    updatePassword,
    confirmEmail,
    sendConfirmEmailToken,
    resetPassword,
    sendForgotPasswordToken
} from "../controllers/authController";
import {authRequired} from "../middleware/authMiddleware";

const router = express.Router();


router.post('/register/admin/:password', registerAsAdmin);
router.post('/register', register);
router.post('/login', login);
router.route('/confirm-email/:token').get(authRequired, confirmEmail);
router.route('/confirm-email').get(authRequired, sendConfirmEmailToken);
router.route('/forgot-password/:token').patch(authRequired, resetPassword);
router.route('/forgot-password').get(authRequired, sendForgotPasswordToken);
router.route('/update-password').patch(authRequired, updatePassword);

export default router