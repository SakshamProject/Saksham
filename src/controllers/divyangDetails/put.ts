import { NextFunction, Response, Request } from "express";
import { DivyangDetailsRequest, divyangDetailsRequestSchema } from "../../types/divyangDetails/divyangDetailsSchema.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";
import { createUpdateDTOObject } from "../../dto/divyangDetails/put.js";
import { updateDivyangDetailsDB } from "../../services/database/divyangDetails/update.js";
import { Prisma } from "@prisma/client";

const putDivyangDetails = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: string = request.params.id
        const divyangDetails: DivyangDetailsRequest = divyangDetailsRequestSchema.parse(request.body)
        const pageNumber = divyangDetails.pageNumber
        let responseData;
        
        const updateDTOObject: Prisma.DivyangDetailsUpdateInput | undefined = await createUpdateDTOObject(pageNumber, divyangDetails)
        if(updateDTOObject){
        const result: Prisma.DivyangDetailsUpdateInput | undefined = await updateDivyangDetailsDB(updateDTOObject, id)
        responseData = createResponseOnlyData(result || {})
        }
        response.send(responseData)
    } catch (error) {
        next(error)
    }
}

export { putDivyangDetails }