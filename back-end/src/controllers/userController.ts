import express from "express";
import {IUser, createUser, getUsers, getUserById, User, getUserByEmail, isPasswordCorrect} from "../models/users";
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

