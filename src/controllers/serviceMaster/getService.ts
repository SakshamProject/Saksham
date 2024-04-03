import {NextFunction, Request, Response} from "express";
import {getRequestSchema} from "../../types/zodSchemas.js";
import {getServiceByIdDB, getServicesDB} from "../../services/database/serviceMaster/serviceMaster.js";
import generateGetResponse from "../utils/generateGetResponse.js";
import {getTotalRowsWithOrWithoutFilterDB} from "../../services/database/database.js";

async function getServices(request: Request, response: Response, next: NextFunction) {
    try {
        const query = getRequestSchema.parse(request.query);

        // No need to decrement query (query.start - 1).
        // It is taken care of by getRequestSchema
        const services = await getServicesDB(query.orderBy, query.sortOrder, query.start, query.rows, query.searchText);
        const total = await getTotalRowsWithOrWithoutFilterDB("Service", query.searchText);
        response.json(generateGetResponse(query, services, total));

    } catch (error) {
        next(error)
    }
}

async function getServiceByID(request: Request, response: Response, next: NextFunction) {
    try {
        const serviceId = request.params.serviceID;
        const query = getRequestSchema.parse(request.query);
        const service = await getServiceByIdDB(serviceId);

        response.json(service);
    } catch (error) {
        next(error);
    }
}

export {getServices, getServiceByID};