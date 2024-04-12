import { NextFunction, Request, Response } from "express";

async function postServiceMapping(request:Request,response:Response,next:NextFunction){
    try{

        const body = ;

}catch(err){
    next(err);
}

}

export {postServiceMapping};