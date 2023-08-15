import {hashSync,compareSync,genSaltSync}from 'bcrypt'
import {dirname}from 'path';
import { fileURLToPath } from 'url';
import MongoStore from 'connect-mongo';
import {connectionString} from './config/connection.js'

export const __dirname=dirname(fileURLToPath(import.meta.url))

/**
 * 
 * @param {*} password:string
 * @returns 
 * @function
 */
export const createHash=(password)=> hashSync(password,genSaltSync(10))

/**
 * 
 * @param {*} user 
 * @param {*} password : String
 * @returns booleans
 */
export const isValidPassword=(password,user)=>compareSync(password,user.password)


export const mongoStoreOption={
    store:MongoStore.create({
            mongoUrl:connectionString,
            // crypto:{
            //     secret:'1234'
            // }
        }),
    secret:'1234',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:60000
    }

}