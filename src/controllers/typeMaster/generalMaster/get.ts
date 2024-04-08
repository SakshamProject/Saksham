import { NextFunction, Request, Response } from "express";
import { getGeneralMasterDB } from "../../../services/database/typeMaster/generalMaster/get.js";
import { createResponseOnlyData } from "../../../types/createResponseSchema.js";

async function getGeneralMaster(request:Request,response:Response,next:NextFunction){
    try{
        const generalmasterSeed = await getGeneralMasterDB()
        const responseData = createResponseOnlyData(generalmasterSeed||{})
        response.send(responseData)
    }catch(err){
        next(err)
    }
}

export {getGeneralMaster};