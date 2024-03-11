import { Request, Response } from "express";
import {ZodError} from "zod";
import {getRequestSchema} from "../schemas/zodSchemas.js";
import postServiceMappingSchema from "./serviceMapping.schema.js";
import {getServiceByIdDB, getServicesDB} from "../../services/database/serviceMapping/serviceMapping.js";

async function postServiceMapping(request: Request, response: Response): Promise<void> {
    try {
        const body = postServiceMappingSchema.parse(request.body);
        response.json(body);
    }

    catch (error) {
        if (error instanceof ZodError) {
            response.json(error);
        }
    }
}

async function getServiceMapping(request: Request, response: Response): Promise<void> {
    try {
        const query = getRequestSchema.parse(request.query);
        const services = await getServicesDB(query.start, query.rows);
        response.json(services)
    }

    catch (error) {
        if (error instanceof ZodError) {
            response.json(error);
        }
    }
}

async function getServiceById(request: Request, response: Response) {
    try {
        const serviceId = request.serviceID;
        const query = getRequestSchema.parse(request.query);
        const service = await getServiceByIdDB(serviceId, query.start, query.rows);

        response.json(service);
    }
    catch (error) {
        console.log(error);
    }
}

export { postServiceMapping, getServiceMapping, getServiceById };