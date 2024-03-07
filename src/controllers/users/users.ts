import { getUserDB } from "../../src/services/database/users/userDB.js";
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
const getUser = async (req: Request, res: Response) => {
    const user = await getUserDB();
    res.send(user)
}
export { getUser ,GetRequestParser};