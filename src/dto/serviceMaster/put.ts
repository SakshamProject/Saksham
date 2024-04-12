import { Prisma } from "@prisma/client";
import {putServiceMasterType} from "../../types/serviceMaster/serviceMasterSchema.js";

function createServiceDBUpdateObject(body: putServiceMasterType) {
  const serviceUpdate: Prisma.ServiceUncheckedUpdateInput = {
    serviceTypeId: body.serviceTypeId,
    name: body.name,
  };
  return serviceUpdate;
}

export { createServiceDBUpdateObject };
