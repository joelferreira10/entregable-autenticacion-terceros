import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import passport from 'passport';
import UserModelDao from '../daos/user.dao.js'
console.log("entre al google");
const strategyOptions={
    clientID:"106466800406-utpinu35fahdg6lka7mq1ubn1ma4icsm.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: 'http://localhost:8080/users/oauth2/redirect',
    state:true
}
const userDao=new UserModelDao();

const registerOrLogin=async(accessToken,refleshToken,profile,done)=>{
    console.log(profile);
    const email=profile._json.email;
    const user=await userDao.getByEmail(email);
    console.log(user);
    if(user){ return done(null,user)}
    const newUser=await userDao.register({
        first_name:profile._json.given_name,
        last_name:profile._json.family_name,
        email,
        password:"",
        isGoogle:true

    })
    return done(null,newUser)
}


passport.use('google',new GoogleStrategy(strategyOptions,registerOrLogin))
console.log("despues del passport.use");
passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser(async(id,done)=>{
    // console.log("deserilize")
    const user=await userDao.getById(id)
    console.log("user deserialize",user);
    done(null,user)
})