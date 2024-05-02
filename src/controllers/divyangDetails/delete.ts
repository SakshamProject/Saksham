import { DivyangDetails } from "@prisma/client";
import { NextFunction, Response, Request } from "express";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";
import { deleteDivyangDetailsDB } from "../../services/database/divyangDetails/delete.js";

const deleteDivyangDetails = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: string = request.params.id;
        const result: DivyangDetails | undefined = await deleteDivyangDetailsDB(id)
        const responseData = createResponseOnlyData(result || {})
        response.send(responseData)
    } catch (error) {
        next(error)
    }
}

export { deleteDivyangDetails };