import express from "express";

import {
    getAllUsers,
    updateUser,
    deleteUser,
    deleteUserById,
    getUserById,
    getCurrentUser,
    uploadUserPhoto, resizeUserPhoto, updateUserPhoto
} from "../controllers/userController";
import {adminOnly, authRequired} from "../middleware/authMiddleware";

const router = express.Router();


router.get('/me', getCurrentUser);
router.patch('/upload-photo', uploadUserPhoto, resizeUserPhoto, updateUserPhoto);

router
    .route('/:id')
    .get(authRequired, getUserById)
    .delete(authRequired,adminOnly,deleteUserById);

router.route('/')
    .get(authRequired,adminOnly, getAllUsers)
    .put(authRequired, updateUser)
    .delete(authRequired, deleteUser)



export default router