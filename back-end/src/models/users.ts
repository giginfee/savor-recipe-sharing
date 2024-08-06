import mongoose from 'mongoose'
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import {AppError} from "../utils/AppError";

export interface IUser extends Document {
    admin?:boolean
    emailConfirmed:boolean
    _id?:string
    username: string;
    email: string;
    photo?: string;
    password: string;
    passwordConfirm?: string;
    passwordChangedAt?: Date;
    confirmToken?: string;
    confirmExpires?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    username:{
        type:String,
        required:[true, "Every user must have a username"]
    },
    admin:{
        type:Boolean
    },
    emailConfirmed:{
        type:Boolean,
        default:false
    },
    email:{
        type:String,
        required: [true, "Every user must provide an email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Email is not valid']
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(el:string) {
                return el === this.password;
            },
            message: 'Passwords are not the same!'
        },
        select: false
    },
    passwordChangedAt: {
        type:Date,
        select:false
    },
    confirmExpires: {
        type:Date,
        select:false
    },
    confirmToken: {
        type:String,
        select:false
    }

})


userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined;

    if (!this.isNew)
        this.passwordChangedAt =  new Date(Date.now() - 1000)
    next();
})


export const isPasswordCorrect = async function(
    password:string,
    actualPassword:string
) {
    return await bcrypt.compare(password, actualPassword);
};

export const changedPasswordAfter = function(JWTTimestamp:number,passwordChangedAt:Date ) {
    if (passwordChangedAt) {
        const changedTimestamp = parseInt(
            `${passwordChangedAt.getTime() / 1000}`,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};

export const User = mongoose.model<IUser>('User', userSchema);

export const getUsers = () => User.find()
export const getUserByEmail = (email:string) => User.findOne({email})
export const getUserById = (id:string) => User.findById(id)
export const createUser = async (user:IUser) => {
    return await User.create(user);
}
export const updateUserById = async (userId:string, user:Omit<IUser, 'password' | 'passwordConfirm'>) => {
    const updatedUser = await User.findByIdAndUpdate(userId, user, {
        new: true,
        runValidators: true
    });
    return updatedUser;
}
export const confirmEmailById = async (userId:string, token:string) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex')


    const user = await User.findOne({
        confirmToken: hashedToken,
        confirmExpires: { $gt: Date.now() }
    });

    if (!user) {
        throw new AppError('Confirm token is invalid or has expired', 400);
    }
    user.confirmToken = undefined;
    user.confirmExpires = undefined;
    user.emailConfirmed = true;

    await user.save();

    return user;
}


export const deleteUser = async (userId:string) => {
    await User.findByIdAndDelete(userId)
}

export const createConfirmToken = async function(userId:string) {
    const resetToken = crypto.randomBytes(32).toString('hex');

    let confirmToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    let confirmExpires = Date.now() + 10 * 60 * 1000;

    await User.findByIdAndUpdate(userId, {
        confirmToken,
        confirmExpires
    })

    return resetToken;
};



