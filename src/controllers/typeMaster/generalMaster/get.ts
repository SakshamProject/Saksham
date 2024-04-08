import { NextFunction, Request, Response } from "express";
import { getGeneralMasterDB } from "../../../services/database/typeMaster/generalMaster/get.js";

async function getGeneralMaster(request:Request,response:Response,next:NextFunction){
    try{
        const generalmasterSeed = await getGeneralMasterDB()
    }catch(err){
        next(err)
    }
}

export {getGeneralMaster};