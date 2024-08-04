
const SECRET = process.env.SECRET || "SECRET";

import jwt from 'jsonwebtoken';

export const MAXAGE =  24 * 60 * 60; // 1 day
export const createToken = (id:string) => {
    return jwt.sign({ id }, SECRET, {
        expiresIn: MAXAGE
    });
};
export const verify = (token:string, callback:jwt.VerifyCallback) => {
    jwt.verify(token, SECRET,(err, decodedToken)=>callback(err, decodedToken))
};

