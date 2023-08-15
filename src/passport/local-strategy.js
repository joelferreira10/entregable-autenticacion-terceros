import passport from'passport'
import {Strategy as localStrategy} from 'passport-local';
import UserModelDao from '../daos/user.dao.js';
const userDao=new UserModelDao();

const strategyOpcion={
    usernameField: "email",
    passwordField:"password",
    passReqToCallback : true, //pass request to callback function
}

/**
 * 
 * @param {*} req 
 * @param {*} email 
 * @param {*} password 
 * @param {*} done 
 * @returns 
 */
const register=async(req,email,password,done)=>{
    try {
        const user=await userDao.getByEmail(email);
        if (user) return done(null,false);
        const newUser=await userDao.register(req.body);
        return done(null,newUser)
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} email 
 * @param {*} password 
 * @param {*} done 
 * @returns 
 */
const login=async(req,email,password,done)=>{
    try {
        const user={email,password};
        console.log("user",user);
        const userLogin=await userDao.login(user);
        if(userLogin)return done(null,userLogin)
        return done(null,false);
    } catch (error) {
        console.log(error);
    }
}

const registerStrategy=new localStrategy(strategyOpcion,register)
const loginStrategy=new localStrategy(strategyOpcion,login)
 
passport.use("register",registerStrategy)
passport.use("login",loginStrategy)


passport.serializeUser((user,done)=>{
    done(null,user._id)
})
passport.deserializeUser(async(id,done)=>{
    const user=await userDao.getById(id)
    return done(null,user)
})