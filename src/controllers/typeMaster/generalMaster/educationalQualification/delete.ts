import { NextFunction, Response, Request } from "express";
import { deleteEducationQualificationTypeDB } from "../../../../services/database/typeMaster/generalMaster/educationalQualification/delete.js";

async function deleteEducationQualificationType(request:Request,response:Response, next:NextFunction){
    try
   { const id:string =request.params.id;
    const deletedEducationQualification = await deleteEducationQualificationTypeDB(id);
    response.send(deletedEducationQualification);
    }catch(err){
        next(err)
    }
}
export { deleteEducationQualificationType };