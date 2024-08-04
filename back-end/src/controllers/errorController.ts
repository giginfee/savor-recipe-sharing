import {AppError} from "../utils/AppError";
import express from "express";
import { MongoServerError  } from 'mongodb';
import mongoose from "mongoose";

export const globalErrorHandler = (err:Error | AppError, req:express.Request, res:express.Response, next:express.NextFunction) => {
    console.log("Error", err )
    // console.log("Error name", err.name)

    if(err instanceof mongoose.Error.ValidationError) {
        err = handleValidationErrorDB(err);
    }
    if(err instanceof MongoServerError) {
        if (err.code === 11000)
            err = handleDuplicateFieldsDB(err);

    }
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