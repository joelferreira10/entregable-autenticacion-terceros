import express from 'express'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import usersRouter from './routes/user.router.js'
import './config/connection.js'
import { mongoStoreOption } from './utils.js';
import { __dirname } from './utils.js';
import passport from 'passport';
import './passport/local-strategy.js'
import './passport/github-strategy.js'

const app=express();
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser())
app.use(session(mongoStoreOption));
app.use(passport.initialize())
app.use(passport.session())

app.use('/users',usersRouter)
app.listen(8080,()=>console.log("port 8080 ok"))