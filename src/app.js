import express from 'express';
import path from 'node:path';
import cookieParser from 'cookie-parser';

import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', authRoute);
app.use('/', userRoute);


export default app;