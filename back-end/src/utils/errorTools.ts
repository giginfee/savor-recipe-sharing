import express from "express";


type fn = (req:express.Request, res: express.Response, next:express.NextFunction) => Promise<any>
export const sendError = (res:express.Response, statusCode:number, status:string, message:string)=> {
    return res.status(statusCode).json({
    status,
    message
    })
}

export const catchError = (fn: fn) => {
    return (req:express.Request, res: express.Response, next:express.NextFunction) => {
        fn(req, res, next).catch(next);
    };
};