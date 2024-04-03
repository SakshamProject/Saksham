import {NextFunction, Request, Response} from "express";
import {postServiceMasterSchema} from "../../types/schemas/serviceMaster/serviceMaster.schema.js";
import {createServiceByIdDB} from "../../services/database/serviceMaster/serviceMaster.js";

async function postService(request: Request, response: Response, next: NextFunction) {
    try {
        const body = postServiceMasterSchema.parse(request.body);
        const service = await createServiceByIdDB(body.name, body.serviceTypeId);
        response.json(service);
    } catch (error) {
        next(error);
    }
}

export {postService};