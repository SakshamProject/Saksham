import { Request, Response } from "express";
import {ZodError} from "zod";
import {getRequestSchema} from "../schemas/zodSchemas.js";
import postServiceMasterSchema from "./serviceMaster.schema.js";
import {getServicesDB} from "../../services/database/serviceMaster/serviceMaster.js";

async function postService(request: Request, response: Response): Promise<void> {
    try {
        const body = postServiceMasterSchema.parse(request.body);

        response.json(body);
    }
    catch (error) {
        if (error instanceof ZodError) {
            response.json(error);
        }
    }
}

async function getService(request: Request, response: Response): Promise<void> {
    try {
        const query = getRequestSchema.parse(request.query);

        // No need to decrement query (query.start - 1).
        // It is taken care of by getRequestSchema
        const services = await getServicesDB(query.start, query.rows);

        if (query.orderBy) {
            const order = query.reverse ? 'DESC' : 'ASC';
            const column = query.orderBy;
            const orderBy = {
                column : order
            }
        }
        response.json(services);
    }
    catch (error) {
        if (error instanceof ZodError) {
            response.json(error);
        }
    }
}

export { postService, getService };