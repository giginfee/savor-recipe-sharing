import * as dotenv from 'dotenv';
import nodemailer from 'nodemailer'
import {resolve} from "path";
import {getConfirmEmailTemplate} from "../templates/confirmEmailTemplate";
import {IUser} from "../models/users";
import {htmlToText} from 'html-to-text'
import {getResetPasswordTemplate} from "../templates/resetPasswordEmail";

dotenv.config({ path: resolve(__dirname, '../../config.env') });


const newTransport = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
}



export const  send = async (template:string, subject:string, toEmail:string)=>{
    const from = `Giginfee <${process.env.EMAIL_FROM}>`;

    const mailOptions = {
        from: from,
        to: toEmail,
        subject,
        html:template,
        text: htmlToText(template)

    };

    await newTransport().sendMail(mailOptions);
}

export const  sendConfirmEmail = async(user:IUser, link:string) => {
    let template = getConfirmEmailTemplate(link, user.username)
    await send(template, 'Welcome to the Savor Website!', user.email);
}

export const  sendResetPasswordEmail = async(user:IUser, code:string) => {
    let template = getResetPasswordTemplate(code, user.username)
    await send(template, 'Reset password!', user.email);
}

