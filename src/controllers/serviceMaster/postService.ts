import {NextFunction, Request, Response} from "express";
import {
    postServiceMasterSchema,
    postServiceMasterType
} from "../../types/schemas/serviceMaster/serviceMaster.schema.js";
import {createServiceDB} from "../../services/database/serviceMaster/serviceMaster.js";
import {createServiceDBInputObject} from "../../dto/serviceMaster/postService.js";

async function postService(request: Request, response: Response, next: NextFunction) {
    try {
        const body: postServiceMasterType = postServiceMasterSchema.parse(request.body);
        const serviceInput = createServiceDBInputObject(body);
        const service = await createServiceDB(serviceInput);
        response.json(service);
    } catch (error) {
        next(error);
    }
}

export {postService};