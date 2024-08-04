import express from "express";
import {IUser, createUser, getUsers} from "../models/users";
import {sendError} from "../utils/sendError";
import {AppError} from "../utils/AppError";

export const register = async (req:express.Request, res: express.Response, next:express.NextFunction)=> {
    try {
        let {
            username,
            email,
            password,
            passwordConfirm
        } = req.body
        if (!username || !email || !password || !passwordConfirm)

            return next(new AppError("Missing required fields", 404))
        // return sendError(res, 404, "fail", "Missing required fields")

        let user: IUser = {
            username,
            email,
            password,
            passwordConfirm
        } as IUser

        const newUser = await createUser(user)
        res.status(201).json({
            status: 'success',
            // token,
            data: {
                newUser
            }
        });

    }catch (err){
        return next(err)
        // sendError(res, 404, "fail", err.message)
    }

}

export const getAllUsers = async (req:express.Request, res: express.Response)=>
{
    const users = await getUsers();

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            data: users
        }
    });
};