import express from "express";

import {getAllUsers, login, register, registerAsAdmin, updatePassword} from "../controllers/authController";
import {authRequired} from "../middleware/authMiddleware";

const router = express.Router();


router.route('/').get(authRequired, getAllUsers);

export default router