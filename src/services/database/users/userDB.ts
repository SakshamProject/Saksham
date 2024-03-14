import prisma from "../database.js";
import express, { NextFunction, Request, Response, Router } from "express";
const getUserDB = async () => {
    const users = await prisma.user.findMany();
    console.log(users);
    return users
} 
const getsevakendra = async (req:Request) => {
    const sevaId = await prisma.sevaKendra.findFirst({
    })
    return sevaId
}
const CreateNewUserDB = async (req:Request,res:Response) => {
    const newUser = await prisma.user.create({ data: req.body })
    console.log("created new user")
    return newUser
}
const passwordHasherDB = async (passw:string) => {
    const passid = await prisma.userPassword.create({
        data: {
            hashedPassword : passw
        }
    })
    return passid
}
export { getUserDB , CreateNewUserDB,passwordHasherDB,getsevakendra};