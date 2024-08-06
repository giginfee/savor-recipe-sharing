import express from "express";

import {getAllUsers} from "../controllers/userController";
import {authRequired} from "../middleware/authMiddleware";

const router = express.Router();


router.route('/').get(authRequired, getAllUsers);

export default router