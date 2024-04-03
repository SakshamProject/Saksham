import { NextFunction, Response, Request } from "express";
import { getEducationalQualificationTypeSchema } from "../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";
import { getEducationalQualificationByIdDB, getEducationalQualificationDB } from "../../../../services/database/typeMaster/generalMaster/educationalQualification/read.js";

async function getEducationalQualificationById(request:Request, response:Response, next:NextFunction){
    try{
        const id = request.params.id;
        console.log(id)
        const result: getEducationalQualificationTypeSchema|undefined|null = await getEducationalQualificationByIdDB(id);
        response.send(result);
    }catch(err){
        next(err);
    }
}

async function getEducationalQualification(request:Request, response:Response, next:NextFunction) {
    try {
        const result = await getEducationalQualificationDB()
        response.send(result)
    } catch (error) {
        if (error instanceof Error) {
            next(error)
        }
    }
}

export {getEducationalQualificationById,getEducationalQualification};