import UserModelDao from "../daos/user.dao.js";
const userDao=new UserModelDao();

export const registerUser=async(req,res)=>{
    try {
        let data = req.body;
        await userDao.register(data)
       res.send({
        msg:"register ok",
        session:req.session,
       })
    } catch (error) {
        console.log(error);
    }
}
export const loginUser=async(req,res)=>{
    try {
    
   // console.log("userController",req.session.passport.user);
    res.send({
        msg:"login ok",
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

export const googleResponse = async (req, res, next) => {
    try {
      // console.log(req.user)
      const { first_name, last_name, email, isGoogle } = req.user;
      res.json({
        msg: "Register/Login Google OK",
        session: req.session,
        userData: {
          first_name,
          last_name,
          email,
          isGoogle,
        },
      });
    } catch (error) {
      next(error.message);
    }
  };
  



