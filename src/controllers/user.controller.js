import UserModelDao from "../daos/user.dao.js";
const userDao=new UserModelDao();

export const registerUser=async(req,res)=>{
    try {
        let data = req.body;
        await userDao.register(data)
       res.json({
        msg:"register ok",
        session:req.session,
       })
    } catch (error) {
        console.log(error);
    }
}
export const loginUser=async(req,res)=>{
    try {
    const user=await userDao.getById(req.session.passport.user)
   // console.log("userController",req.session.passport.user);
    res.json({
        msg:"login ok",
        user
    })
    } catch (error) {
        console.log(error);
    }
}

export const logout=(req,res)=>{
    req.session.destroy(err=>{
        if(!err)res.render('login')
        else res.redirect('/login-error')
    })
}

export const githubResponse=async(req,res)=>{
    try {
        const {first_name,email,isGithub}=req.user;
        res.json({
            msg:"login/register ok",
            session:req.session,
            dataUser:{first_name,email,isGithub}
        })
    } catch (error) {
        console.log(error);
    }
}


