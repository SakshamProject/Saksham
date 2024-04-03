import {NextFunction, Request, Response} from "express";
import {putServiceMasterSchema} from "../../types/schemas/serviceMaster/serviceMaster.schema.js";
import {updateServiceByIdDB} from "../../services/database/serviceMaster/serviceMaster.js";

async function putService(request: Request, response: Response, next: NextFunction) {
    try {
        const body = putServiceMasterSchema.parse(request.body)
        console.log("reached controllers")
        const service = await updateServiceByIdDB(request.params.serviceID, body.serviceTypeId, body.name);// updateService
        response.json(service);
    } catch (error) {
        next(error)
    }
}

export {putService};