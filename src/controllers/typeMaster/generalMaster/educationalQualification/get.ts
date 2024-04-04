import { NextFunction, Response, Request } from "express";
import { getEducationalQualificationTypeSchema } from "../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";
import { getEducationQualificationTypeByIdDB, getEducationQualificationTypeDB, getEducationQualificationByEducationQualificationTypeIdDB, getEducationQualificationTypeDBTotal} from "../../../../services/database/typeMaster/generalMaster/educationalQualification/read.js";
import { EducationQualificationType } from "@prisma/client";
import getRequestSchema from "../../../../types/getRequestSchema.js";
import { getEducationQualificationTypeDBTransaction } from "../../../../services/database/typeMaster/generalMaster/educationalQualification/transaction/read.js";
import { createResponseWithQuery } from "../../../../types/createResponseSchema.js";

async function getEducationQualificationTypeById(request:Request, response:Response, next:NextFunction){
    try{
        const id = request.params.id;
        console.log(id)
        const result: getEducationalQualificationTypeSchema|undefined|null = await getEducationQualificationTypeByIdDB(id);
        response.send(result);
    }catch(err){
        next(err);
    }
}

async function getEducationQualificationType(request:Request, response:Response, next:NextFunction) {

    const query = getRequestSchema.parse(request.query)
    const result = await getEducationQualificationTypeDBTransaction(
        query.start,
        query.rows,
        query.sortOrder,
        query.searchText,
    )

    const total:number = result?.total || 0;
    const count:number = result?.educationQualificationType?.length || 0;
    const responseData = createResponseWithQuery(
        result || {},
        query,
        total,
        count
    )

    response.send(responseData);
}

async function getEducationQualificationByEducationQualificationTypeId(request:Request,response:Response,next:NextFunction){
    const id :string = request.params.serviceTypeId;
    const result :EducationQualificationType[]|undefined = await getEducationQualificationByEducationQualificationTypeIdDB(id);

    response.send({
        result:result
    });

}

export {getEducationQualificationTypeById, getEducationQualificationType, getEducationQualificationByEducationQualificationTypeId};