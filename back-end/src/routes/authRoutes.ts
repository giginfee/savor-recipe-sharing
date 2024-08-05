import express from "express";

import {getAllUsers, login, register, registerAsAdmin, updatePassword} from "../controllers/authController";
import {authRequired} from "../middleware/authMiddleware";

const router = express.Router();


router.post('/register', register);
router.post('/register/admin/:password', registerAsAdmin);
router.post('/login', login);
router.route('/').get(authRequired, getAllUsers);
router.route('/updatePassword').patch(authRequired, updatePassword);

export default router