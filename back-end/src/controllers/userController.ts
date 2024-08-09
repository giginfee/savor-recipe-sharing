import express from "express";
import {
    IUser,
    createUser,
    getUsers,
    deleteUserById,
    getUserById,
    User,
    getUserByEmail,
    isPasswordCorrect,
    updateUserById, confirmEmailById
} from "../models/users";
import {AppError} from "../utils/AppError";
import {getUserFromToken, sendJWTToken} from "../utils/jwtTool"
import {catchError} from "../utils/errorTools";
import * as process from "process";
import {getToken} from "../middleware/authMiddleware";


export const getAllUsers = catchError(async (req:express.Request, res: express.Response)=>
{
    const users = await getUsers();

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            data: users
        }
    });
})
export const deleteUser = catchError(async (req:express.Request, res: express.Response)=>
{
    let user = await getUserFromToken(getToken(req))
    await deleteUserById(user._id)
    res.status(200).json({
        status: 'success',
        data: {
        }
    });
})

export const updateUser = catchError(async (req:express.Request, res: express.Response)=>
{
    let user = await getUserFromToken(getToken(req))

    if (req.body.password || req.body.passwordConfirm) {
        throw new AppError(
                'This route is not for password updates.',
                400)

    }

    let emailConfirmed = false
    if (user.email===req.body.email.toLowerCase())
        emailConfirmed = true

    user.email = req.body.email
    user.username = req.body.username
    user.emailConfirmed = emailConfirmed

    await user.save()

    res.status(200).json({
        status: 'success',
        data: {
            data: user
        }
    });
})

