import { Prisma } from "@prisma/client";
import {postServiceMasterType} from "../../types/schemas/serviceMaster/serviceMaster.schema.js";

function createServiceDBInputObject(body: postServiceMasterType): Prisma.ServiceUncheckedCreateInput {
    const serviceInput: Prisma.ServiceUncheckedCreateInput = {
        serviceTypeId: body.serviceTypeId,
        name: body.name
    }
    return serviceInput;
}

export {createServiceDBInputObject};