import { NextFunction, Response, Request } from "express";
import { getEducationalQualificationTypeSchema } from "../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";
import { getEducationQualificationTypeByIdDB, getEducationQualificationTypeDB, getEducationQualificationByEducationQualificationTypeIdDB, getEducationQualificationTypeCount } from "../../../../services/database/typeMaster/generalMaster/educationalQualification/read.js";
import { EducationQualificationType } from "@prisma/client";
import getRequestSchema from "../../../../types/getRequestSchema.js";

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
    const results = await getEducationQualificationTypeDB(
        query.start,
        query.rows,
        query.orderByColumn,
        query.sortOrder,
        query.searchText,
    )

    const count:number  = await getEducationQualificationTypeCount();

    response.send({
        result:results,
        count:count,
        start:query.start,
        rows:query.rows,
        orderByColumn:query.orderByColumn,
        orderByDirection:query.sortOrder
    });
}

async function getEducationQualificationByEducationQualificationTypeId(request:Request,response:Response,next:NextFunction){
    const id :string = request.params.serviceTypeId;
    const result :EducationQualificationType[]|undefined = await getEducationQualificationByEducationQualificationTypeIdDB(id);

    response.send({
        result:result
    });

}

export {getEducationQualificationTypeById, getEducationQualificationType, getEducationQualificationByEducationQualificationTypeId};