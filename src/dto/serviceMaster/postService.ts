import { Prisma } from "@prisma/client";
import {postServiceMasterType} from "../../types/schemas/serviceMaster/serviceMasterSchema.js";

function createServiceDBInputObject(body: postServiceMasterType): Prisma.ServiceUncheckedCreateInput {
    const serviceInput: Prisma.ServiceUncheckedCreateInput = {
        serviceTypeId: body.serviceTypeId,
        name: body.name
    }
    return serviceInput;
}

export {createServiceDBInputObject};