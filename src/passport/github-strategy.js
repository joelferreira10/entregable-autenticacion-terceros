import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import UserModelDao from "../daos/user.dao.js";

const userDao=new UserModelDao();

const optionStrategy={
    clientID:'Iv1.e7a1d6348e95e90b',
    clientSecret:'7b62674f5eab1346db7201ee80e3207aa1948901',
    callbackURL:'http://localhost:8080/users/profile-github',
}

const registerOrlogin=async(accessToken,refreshToken,profile,done)=>{
    const email=profile._json.email;
    const user=await userDao.getByEmail(profile._json.email)

    if(user)return done(null,user)
    const newUser=await userDao.register({
        first_name:profile._json.name,
        last_name:profile._json.name,
        email,
        password:'',
        isGithub:true
    })
    return done(null,newUser)
}

passport.use('github',new GithubStrategy(optionStrategy,registerOrlogin))
