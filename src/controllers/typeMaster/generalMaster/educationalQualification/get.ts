import { NextFunction, Response, Request } from "express";
import getRequestSchema from "../../../getRequest.schema.js";
import { getEducationalQualificationWithTypeSchema } from "../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";
import { getEducationalQualificationByIdDB } from "../../../../services/database/typeMaster/generalMaster/educationalQualification/read.js";

async function getEducationalQualificationById(request:Request, response:Response, next:NextFunction){
    try{
        const id = request.params.id;
        console.log(id)
        const result: getEducationalQualificationWithTypeSchema|undefined|null = await getEducationalQualificationByIdDB(id);
        response.send(result);
    }catch(err){
        
        next(err);
    }
}

async function getEducationalQualification(request:Request, response:Response, next:NextFunction){
    const query = getRequestSchema.parse(
        request.query
      );
      console.log(query);
}

export {getEducationalQualificationById,getEducationalQualification};