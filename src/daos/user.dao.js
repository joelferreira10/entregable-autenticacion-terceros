import { UsersModel } from "./model/users.model.js";
import { createHash,isValidPassword } from "../utils.js";


export default class UserModelDao{
   /**
    * 
    * @param {Object} user 
    * @returns 
    */
    async register(user){
     try {
        const {email}=user;
        const userExist=await UsersModel.findOne({email:email})
        if(!userExist){
            const newUser=await UsersModel.create({...user,password:createHash(user.password)})
            return newUser;
        }else return false;
     } catch (error) {
        console.log(error);
     }       

    }

    /**
     * 
     * @param {*} user 
     * @returns 
     */
    async login(user){
     try {
        const {email,password}=user
        const userExist=await UsersModel.findOne({email})
        console.log("userexist",userExist);
        if(userExist){
         const validPass=isValidPassword(password,userExist);
         console.log("valid",validPass);
         if(!validPass){return false}
         else {return userExist}
      } else return false;
     } catch (error) {
        console.log(error);
     }   
    }

    /**
     * 
     * @param {*} id 
     * @returns 
     */
    async getById(id){
      try {
         const user=UsersModel.findById(id)
         if(!user)return false;
         return user;
      } catch (error) {
         console.log(error);
      }
    }
    async getByEmail(email){
      try {
         const emailUser=UsersModel.findOne({email})
         if(!emailUser)return false;
         return emailUser
      } catch (error) {
         console.log(error);
      }
    }
}