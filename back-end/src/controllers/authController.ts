import express from "express";
import {IUser, createUser, getUsers,getUserById, User} from "../models/users";
import {sendError} from "../utils/sendError";
import {AppError} from "../utils/AppError";
import {createToken, MAXAGE, verify} from "../utils/jwtTool"
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

        let user: IUser = {
            username,
            email,
            password,
            passwordConfirm
        } as IUser

        let newUser :IUser = await createUser(user)
        sendJWTToken(newUser, 201, req, res)
        // res.status(201).json({
        //     status: 'success',
        //     // token,
        //     data: {
        //         newUser
        //     }
        // });

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

export const sendJWTToken = (user:IUser, statusCode:number, req:express.Request, res: express.Response)=>{
    if(user._id == undefined)
        throw new AppError("Problem creating JWT token", 500)

    const TOKEN = createToken(user._id)

    res.cookie('jwt', TOKEN, {
        expires: new Date(
            Date.now() + MAXAGE * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });


    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        TOKEN,
        data: {
            user
        }
    });




}