import * as dotenv from 'dotenv';
import nodemailer from 'nodemailer'
import {resolve} from "path";

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
    const html = "Hello"
    const from = `Giginfee <${process.env.EMAIL_FROM}>`;

    const mailOptions = {
        from: from,
        to: toEmail,
        subject,
        html,
        text: html
    };

    await newTransport().sendMail(mailOptions);
}

export const  sendWelcome = async() => {
    await send('welcome', 'Welcome to the Savor Website!', '');
}

