import express from "express";
import {
    IUser,
    createUser,
    getUsers,
    getUserById,
    User,
    getUserByEmail,
    isPasswordCorrect,
    createConfirmToken, confirmEmailById, resetPasswordById
} from "../models/users";
import {AppError} from "../utils/AppError";
import {getUserFromToken, sendJWTToken} from "../utils/jwtTool"
import {catchError} from "../utils/errorTools";
import * as process from "process";
import {getToken} from "../middleware/authMiddleware";
import {sendConfirmEmail, sendResetPasswordEmail} from "../utils/emailTools";
import * as path from "path";

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
    if ( !req.body.passwordOld || !req.body.passwordNew || !req.body.passwordConfirm )
        throw new AppError("Missing required fields", 404)

    if (!(await isPasswordCorrect(req.body.passwordOld, user.password))) {
        throw new AppError('Your current password is wrong.', 401);
    }

    user.password = req.body.passwordNew;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    sendJWTToken(user, 200, req, res);

})
export const resetPassword = catchError(async (req:express.Request, res: express.Response)=>{

    if ( !req.body.password )
       throw new AppError("Missing password", 404)

    let user = await getUserFromToken(getToken(req))

    let token = req.params.token
    user = await resetPasswordById(user._id, token, req.body.password)

    sendJWTToken(user, 200, req, res);

})

export const sendConfirmEmailToken =  catchError(async (req:express.Request, res: express.Response)=>{
    let user = await getUserFromToken(getToken(req))
    if(user.emailConfirmed)
        throw new AppError("Email was already confirmed", 400)

    let token = await createConfirmToken(user._id)

    await sendConfirmEmail(user, `${req.protocol}://${req.get(
        'host'
    )}/api/v1/auth/confirm-email/${user._id}/${token}`)

    console.log(`Confirm email token: ${token}`)

    res.status(200).json({
        status: 'success',
        data: {
        }
    });
})
export const sendForgotPasswordToken =  catchError(async (req:express.Request, res: express.Response)=>{
    let user = await getUserFromToken(getToken(req))
    if(!user.emailConfirmed)
        throw new AppError("Email was not confirmed", 400)
    let token = await createConfirmToken(user._id)

    await sendResetPasswordEmail(user, token)

    console.log(`Forgot password token: ${token}`)

    res.status(200).json({
        status: 'success',
        data: {
        }
    });
})


export const confirmEmail =  catchError(async (req:express.Request, res: express.Response)=>{
    // let user = await getUserFromToken(getToken(req))
    let user = await getUserById(req.params.id)
    if (!user)
        throw new AppError('User is not found', 400)
    if(user.emailConfirmed)
        throw new AppError("Email was already confirmed", 400)
    
    let token = req.params.token
    user = await confirmEmailById(user._id, token)

    res.status(200).sendFile(path.join(__dirname, '../templates/confirmEmailPage.html'));

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