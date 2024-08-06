import express from "express";

import { login, register, registerAsAdmin, updatePassword, confirmEmail, sendConfirmEmailToken} from "../controllers/authController";
import {authRequired} from "../middleware/authMiddleware";

const router = express.Router();


router.post('/register/admin/:password', registerAsAdmin);
router.post('/register', register);
router.post('/login', login);
router.route('/confirm-email/:token').get(authRequired, confirmEmail);
router.route('/confirm-email').get(authRequired, sendConfirmEmailToken);
router.route('/update-password').patch(authRequired, updatePassword);

export default router