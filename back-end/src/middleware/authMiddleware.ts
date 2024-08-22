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

    let token = getToken(req);
    if (!token) {
        throw new AppError('Please log in to get access.', 401)
    }
    let currentUser= await getUserFromToken(token)
    next();

})

export const adminOnly = catchError(async (req, res, next) => {
    let token = getToken(req);
    if (!token) {
        throw new AppError('Please log in to get access.', 401)
    }
    let currentUser= await getUserFromToken(token)
    if (!currentUser.admin)
        throw new AppError('You don\'t have access.', 403)
    next()



})

