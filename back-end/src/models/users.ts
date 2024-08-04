import mongoose from 'mongoose'
import validator from 'validator';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    _id?:string
    username: string;
    email: string;
    photo?: string;
    password: string;
    passwordConfirm?: string;
    passwordChangedAt?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    username:{
        type:String,
        required:[true, "Every user must have a username"]
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
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
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


userSchema.methods.isPasswordCorrect = async function(
    newPassword:string,
    actualPassword:string
) {
    return await bcrypt.compare(newPassword, actualPassword);
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
export const deleteUser = async (userId:string) => {
    await User.findByIdAndDelete(userId)
}



