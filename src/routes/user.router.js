import { Router} from "express";
import { registerUser,loginUser,logout,githubResponse} from "../controllers/user.controller.js";
import passport from "passport";
//import { validateLogin } from "../middlewares/validateLogin.js";
const router=Router();

router.post('/register',passport.authenticate('register'),registerUser);
router.post('/login',passport.authenticate('login'),loginUser)
router.post('/logout',logout)
router.get('/register-github',passport.authenticate('github',{scope:['user:email']}))
router.get('/profile-github',passport.authenticate('github',{scope:['user:email']}),githubResponse)
export default  router;