import { Request, Response } from "express";
import {ZodError} from "zod";
import {getRequestSchema} from "../schemas/zodSchemas.js";
import postServiceMasterSchema from "./serviceMaster.schema.js";
import {
    createServiceByIdDB, deleteServiceByIdDB,
    getServiceByIdDB,
    getServicesDB
} from "../../services/database/serviceMaster/serviceMaster.js";
import {getTotalRowsDB} from "../../services/database/database.js";
import defaults from "../../defaults.js";

async function postService(request: Request, response: Response): Promise<void> {
    try {
        const body = postServiceMasterSchema.parse(request.body);

        const service = await createServiceByIdDB(body.name, body.subTypeId);
        response.json(service);
    }
    catch (error) {
        if (error instanceof ZodError) {
            response.json(error);
        }
    }
}

async function getServices(request: Request, response: Response): Promise<void> {
    try {
        const query = getRequestSchema.parse(request.query);

        // No need to decrement query (query.start - 1).
        // It is taken care of by getRequestSchema
        const services = await getServicesDB(query.orderBy, query.reverse, query.start, query.rows);

        const total = await getTotalRowsDB("Service");

        const start: number = query.start || defaults.skip;
        const rows: number = query.rows || defaults.take;

        let next: {start: number, rows: number} | null = null;
        let prev: {start: number, rows: number} | null = null;

        if (start + rows < total) {
            next = {
                start: start + rows + 1,
                rows: rows
            }
        }

        if (start !== 0) {
            if (start - rows > 0) {
                prev = {
                    start: start - rows + 1,
                    rows: rows
                }
            }
            else {
                prev = {
                    start: 0,
                    rows: rows
                }
            }
        }

        response.json({
            data: services,
            total: total,
            rows: (services || []).length,
            reverse: query.reverse,
            orderBy: query.orderBy,
            start: start + 1,
            next: next,
            prev: prev,
        });
    }
    catch (error) {
        if (error instanceof ZodError) {
            response.json(error);
        }
    }
}
async function getServiceByID(request: Request, response: Response) {
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

async function deleteServiceById(request: Request, response: Response) {
    try {
        const serviceID = request.serviceID;

        const result = await deleteServiceByIdDB(serviceID);

        response.json(result);
    }
    catch (error) {
        console.log(error);
    }
}

export { postService, getServices, getServiceByID, deleteServiceById };