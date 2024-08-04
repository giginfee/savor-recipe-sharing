import express from "express";

export const sendError = (res:express.Response, statusCode:number, status:string, message:string)=> {
    return res.status(statusCode).json({
    status,
    message
    })
}