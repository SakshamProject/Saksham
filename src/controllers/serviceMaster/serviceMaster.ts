import { Request, Response } from "express";
import {ZodError} from "zod";
import getRequestSchema from "../getRequest.schema.js";

async function postService(request: Request, response: Response): Promise<void> {
    response.json(request.body);
}

async function getService(request: Request, response: Response): Promise<void> {
    try {
        const query = getRequestSchema.parse(request.query);
        if (query.orderBy) {
            const order = query.reverse ? 'DESC' : 'ASC';
            const column = query.orderBy;
            const orderBy = {
                column : order
            }
        }
        response.json(query);
    }
    catch (error) {
        if (error instanceof ZodError) {
            response.json(error);
        }
    }
}

export { postService, getService };