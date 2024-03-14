import { StatusCodes } from "http-status-codes";
import { getUserDB , CreateNewUserDB, passwordHasherDB,getsevakendra} from "../../services/database/users/userDB.js";
import express, { NextFunction, Request, Response, Router } from "express";
const GetRequestParser = async (req:Request,res:Response,next:NextFunction)=>{
    const data = Object.keys(req.query)
    console.log('Parameters received:', data);
    // Do something with the parameters
    // For example, you can use the parameter names to access their values
    data.forEach(param => {
        console.log(`Value of ${param}:`, req.query[param]);
    });
    next();
}
const PostRequestParser = async (req:Request,res:Response,next:NextFunction)=>{
    const data = req.body
    const sevakendraid = getsevakendra(data)
    // console.log('Parameters received:', data);
    // res.status(StatusCodes.ACCEPTED)
    // res.send("successfully recived i controller")
    // console.log(`password is ${data.passwordid}`)
    next();
}

const getUser = async (req: Request, res: Response) => {
    const user = await getUserDB();
    res.send(user)
}
const AddUser = async (req: Request, res: Response) => {
    const pass = await PasswordHasher(req.body.passwordid)
    console.log(pass.id)
    req.body.passwordid = pass.id
    const newUser = await CreateNewUserDB(req, res)  
    res.json(newUser);
}
const PasswordHasher = async (pass: string) => {
    const passid = await passwordHasherDB(pass)
    return passid
    
}
export { getUser , GetRequestParser,AddUser,PostRequestParser};