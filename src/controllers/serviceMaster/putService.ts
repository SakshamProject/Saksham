import {NextFunction, Request, Response} from "express";
import {putServiceMasterSchema} from "../../types/schemas/serviceMaster/serviceMasterSchema.js";
import {updateServiceDB} from "../../services/database/serviceMaster/serviceMaster.js";
import {createServiceDBInputObject} from "../../dto/serviceMaster/postService.js";

async function putService(request: Request, response: Response, next: NextFunction) {
    try {
        const body = putServiceMasterSchema.parse(request.body);
        const serviceUpdate = createServiceDBInputObject(body);
        const service = await updateServiceDB(serviceUpdate, request.params.serviceID);
        response.json(service);
    } catch (error) {
        next(error);
    }
}

export {putService};