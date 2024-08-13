import * as dotenv from 'dotenv';
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import { resolve } from 'path';
import {AppError} from "./utils/AppError";
import {globalErrorHandler} from "./controllers/errorController";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { setupSwagger } from '../swagger';


dotenv.config({ path: resolve(__dirname, '../config.env') });

const app = express()
setupSwagger(app);

const DB = process.env.MONGO_URL.replace(
    '<PASSWORD>',
    process.env.MONGO_PASSWORD
);

mongoose
    .connect(DB)
    .then(() => console.log('DB connection successful!'))
    .catch(err => console.log(err));

mongoose.connection.on("error",(err: Error)=>{
    console.log(err)
})

app.use(cors({
    credentials:true
}))

app.use(compression())
app.use(bodyParser.json())
app.use(cookieParser())


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);