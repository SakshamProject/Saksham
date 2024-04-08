import { NextFunction, Response, Request } from "express";
import getRequestSchema from "../../types/getRequestSchema.js";
import { createResponseWithQuery } from "../../types/createResponseSchema.js";
import { getDivyangDetailsDBTransaction } from "../../services/database/divyangDetails/transaction/read.js";

const getDivyangDetails = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const query = getRequestSchema.parse(request.query)
        const result = await getDivyangDetailsDBTransaction(query.start, query.rows, query.sortOrder, query.searchText);
        const count: number = result?.divyangDetails?.length || 0;
        const total: number = result?.total || 0;
        const responseData = createResponseWithQuery(
            result?.divyangDetails || {},
            query,
            total,
            count
        )

        response.send(responseData)
    } catch (error) {
        next(error)
    }
}

export { getDivyangDetails }