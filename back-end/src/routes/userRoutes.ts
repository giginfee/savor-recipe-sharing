import express from "express";

import {getAllUsers, updateUser, deleteUser} from "../controllers/userController";
import {adminOnly, authRequired} from "../middleware/authMiddleware";

const router = express.Router();


router.route('/')
    .get(authRequired,adminOnly, getAllUsers)
    .put(authRequired, updateUser)
    .delete(authRequired, deleteUser)

export default router