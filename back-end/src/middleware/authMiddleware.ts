import express from "express";
import {catchError} from "../utils/errorTools";
import {AppError} from "../utils/AppError";
import {createToken, getUserFromToken, JWT, MAXAGE, verify} from "../utils/jwtTool"
import {changedPasswordAfter, getUserById} from "../models/users";

export const getToken = (req: express.Request)=> {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    return token
}
export const authRequired = catchError(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token = getToken(req);

    if (!token) {
        throw new AppError('Please log in to get access.', 401)
    }

    // 2) Verification token

    let currentUser= await getUserFromToken(token)

    next();

})

