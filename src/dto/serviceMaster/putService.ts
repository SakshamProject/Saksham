import { Prisma } from "@prisma/client";
import {putServiceMasterType} from "../../types/schemas/serviceMaster/serviceMaster.schema.js";

function createServiceDBUpdateObject(body: putServiceMasterType) {
    const serviceUpdate: Prisma.ServiceUncheckedUpdateInput = {
        serviceTypeId: body.serviceTypeId,
        name: body.name
    }
}

export {createServiceDBUpdateObject};