import express from "express";
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import {
    getUsers,
    deleteUserById as deleteUserDB,
    getUserById as getUserByIdDB, updateUserById,
} from "../models/users";
import {AppError} from "../utils/AppError";
import {getUserFromToken} from "../utils/jwtTool"
import {catchError} from "../utils/errorTools";
import {getToken} from "../middleware/authMiddleware";
import * as path from "path";


const multerStorage = multer.memoryStorage();

const multerFilter = (req:express.Request, file:Express.Multer.File, cb:FileFilterCallback) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {

        cb(new AppError('Not an image! Please upload only images.', 400));
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

export const uploadUserPhoto = upload.single('photo');

export const resizeUserPhoto = catchError(async (req:express.Request, res: express.Response, next:express.NextFunction)=> {
    if (!req.file) return next();
    let user = await getUserFromToken(getToken(req))

    req.file.filename = `user-${user.id}-${Date.now()}.jpeg`;
    const uploadDir = path.join(__dirname, '../public', 'images', 'users',req.file.filename );

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(uploadDir);

    next();
});



export const getAllUsers = catchError(async (req:express.Request, res: express.Response)=>
{
    const users = await getUsers();

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: users
    });
})
export const getUserById = catchError(async (req:express.Request, res: express.Response)=>
{

    let currentUser = await getUserFromToken(getToken(req))
    if(currentUser._id.toString()!==req.params.id && !currentUser.admin)
        throw new AppError(
            'You don\'t have access to other users info.',
            403)

    const user = await getUserByIdDB(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
})
export const getCurrentUser = catchError(async (req:express.Request, res: express.Response)=>
{

    let user = await getUserFromToken(getToken(req))
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
})


export const deleteUser = catchError(async (req:express.Request, res: express.Response)=>
{
    let user = await getUserFromToken(getToken(req))
    await deleteUserDB(user._id)
    res.status(200).json({
        status: 'success',
        data: {
        }
    });
})
export const deleteUserById = catchError(async (req:express.Request, res: express.Response)=>
{
    await deleteUserDB(req.params.id)
    res.status(200).json({
        status: 'success',
        data: {
        }
    });
})



export const updateUser = catchError(async (req:express.Request, res: express.Response)=>
{
    let user = await getUserFromToken(getToken(req))

    if (req.body.password || req.body.passwordConfirm) {
        throw new AppError(
                'This route is not for password updates.',
                400)

    }

    let emailConfirmed = false
    if (user.email===req.body.email.toLowerCase())
        emailConfirmed = true

    user.email = req.body.email
    user.username = req.body.username
    user.emailConfirmed = emailConfirmed

    await user.save()

    res.status(200).json({
        status: 'success',
        data: {
            data: user
        }
    });
})

export const updateUserPhoto = catchError(async (req:express.Request, res: express.Response)=>
{
    let user = await getUserFromToken(getToken(req))

    if (!req.file)
        throw new AppError('No photo detected', 400)

    let photo = req.file.filename;
    const updatedUser = await updateUserById(user._id, {photo})
    await user.save()

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
})

