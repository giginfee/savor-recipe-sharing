import express from "express";
import {IUser, createUser, getUsers, getUserById, User, getUserByEmail, isPasswordCorrect} from "../models/users";
import {AppError} from "../utils/AppError";
import {getUserFromToken, sendJWTToken} from "../utils/jwtTool"
import {catchError} from "../utils/errorTools";
import * as process from "process";
import {getToken} from "../middleware/authMiddleware";

export const register = catchError(async (req:express.Request, res: express.Response, next:express.NextFunction)=> {
    await registerHelp(req,res, next)

})
export const registerAsAdmin = catchError(async (req:express.Request, res: express.Response, next:express.NextFunction)=> {
    if(process.env.ADMIN_PASSWORD===req.params.password)
        await registerHelp(req,res, next, true)
    else
        throw new AppError("Access denied", 404)
})



export const login= catchError(async (req:express.Request, res: express.Response, next:express.NextFunction)=> {
    let {
        email,
        password
    } = req.body

    if ( !email || !password)
        new AppError("Missing required fields", 404)

    let user = await getUserByEmail(email).select("+password")

    if(!user || !(await isPasswordCorrect(password, user.password)))
    {
        throw new AppError("Incorrect email or password", 404)

    }
    return sendJWTToken(user, 200, req, res)
})


export const updatePassword = catchError(async (req:express.Request, res: express.Response)=>{

    let user = await getUserFromToken(getToken(req))

    if (!(await isPasswordCorrect(req.body.passwordOld, user.password))) {
        throw new AppError('Your current password is wrong.', 401);
    }

    user.password = req.body.passwordNew;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    sendJWTToken(user, 200, req, res);

})


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


const registerHelp = async (req:express.Request, res: express.Response, next:express.NextFunction, isAdmin = false)=>{
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

    if(isAdmin){
        user.admin=true
    }

    let newUser :IUser = await createUser(user)
    sendJWTToken(newUser, 201, req, res)
}