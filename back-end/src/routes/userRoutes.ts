import express from "express";

import {getAllUsers, register} from "../controllers/authController";

const router = express.Router();


router.post('/register', register);
router.get('/', getAllUsers);


export default router