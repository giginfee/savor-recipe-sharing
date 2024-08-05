import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import {changedPasswordAfter, getUserById, IUser} from "../models/users";
import {AppError} from "./AppError";
import {catchError} from "./errorTools";
import express from "express";

const SECRET = process.env.SECRET || "SECRET";
export type JWT = {
    id: string
    iat: number
    exp: number
}

export const MAXAGE =  24 * 60 * 60; // 1 day
export const createToken = (id:string) => {
    return jwt.sign({ id }, SECRET, {
        expiresIn: MAXAGE
    });
};

export const verify = (token:string, callback: jwt.VerifyCallback) => {
    jwt.verify(token, SECRET,(err, decodedToken:JWT)=>callback(err, decodedToken))
};

export const getUserFromToken = (async (token:string) => {
    try {
        let decodedToken:JWT = (await promisify(verify)(token)) as JWT;

        // const currentUser = await getUserById(decodedToken.id).select('+passwordChangedAt');
        const currentUser = await getUserById(decodedToken.id).select(['+passwordChangedAt','+password']);
        // console.log("currentUser")
        // console.log(currentUser)
        // Check if user exists
        if (!currentUser) {
            throw new AppError(
                'The user belonging to this token does no longer exist.',
                401)
        }
        if (changedPasswordAfter(decodedToken.iat, currentUser.passwordChangedAt)) {
            throw new AppError('User recently changed password! Please log in again.', 401)
        }
        return currentUser
    }catch (e) {
        throw e
    }
})

export const sendJWTToken = (user:IUser, statusCode:number, req:express.Request, res: express.Response)=>{
    if(user._id == undefined)
        throw new AppError("Problem creating JWT token", 500)

    const TOKEN = createToken(user._id)


    // case 1: JWT is stored as cookie
    res.cookie('jwt', TOKEN, {
        expires: new Date(
            Date.now() + MAXAGE * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });

    user.password = undefined;

    // case 2: JWT is sent as json to be used as Bearer Token for API
    res.status(statusCode).json({
        status: 'success',
        token:TOKEN,
        data: {
            user
        }
    });
}
