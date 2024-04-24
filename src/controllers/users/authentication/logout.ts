import { NextFunction, Request, Response } from "express";


async function logout(request: Request, response: Response, next: NextFunction){
    try{
        response.clearCookie("token");
        response.send("logout")
        
    }catch(err){
        next(err)
    }

}

export default logout;