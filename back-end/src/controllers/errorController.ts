import {AppError} from "../utils/AppError";
import express from "express";
import { MongoServerError  } from 'mongodb';
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const globalErrorHandler = (err:Error | AppError, req:express.Request, res:express.Response, next:express.NextFunction) => {
    console.error("Global error: ", err.message )

    if(err instanceof mongoose.Error.ValidationError) {
        err = handleValidationErrorDB(err);
    }
    if(err instanceof MongoServerError) {
        if (err.code === 11000)
            err = handleDuplicateFieldsDB(err);

    }

    if (err.name === 'JsonWebTokenError') err =  new AppError('Invalid token. Please log in again!', 401);
    if (err.name === 'TokenExpiredError') err = new AppError('Your token has expired! Please log in again.', 401);

    return res.status((err as AppError).statusCode || 500).json({
        status:  (err as AppError).status || 'error',
        error: err,
        message: err.message,
        stack: err.stack
    });

};

const handleDuplicateFieldsDB = (err:MongoServerError) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err:mongoose.Error.ValidationError) => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};
