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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 */

/**
 * @swagger
 * /api/v1/auth/register/admin/{secret-token}:
 *   post:
 *     summary: Register a new user as an admin
 *     description: To complete this request you must know a token that will allow to register as admin.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: secret-token
 *         schema:
 *           type: string
 *         required: true
 *         description: The secret token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - passwordConfirm
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               passwordConfirm:
 *                 type: string
 *                 description: Repeat password field
 *             example:
 *               username: test
 *               email: test@mail.com
 *               password: password123
 *               passwordConfirm: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/register/admin/:password', registerAsAdmin);


/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - passwordConfirm
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               passwordConfirm:
 *                 type: string
 *                 description: Repeat password field
 *             example:
 *               username: test
 *               email: test@mail.com
 *               password: password123
 *               passwordConfirm: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/register', register);
router.post('/login', login);
router.route('/confirm-email/:id/:token').get(confirmEmail);
router.route('/confirm-email').get(authRequired, sendConfirmEmailToken);
router.route('/forgot-password/:token').patch(authRequired, resetPassword);
router.route('/forgot-password').get(authRequired, sendForgotPasswordToken);
router.route('/update-password').patch(authRequired, updatePassword);

export default router