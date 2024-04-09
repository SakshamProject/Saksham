import { Prisma } from "@prisma/client";
import {
  filterServiceMasterType,
  postServiceMasterType,
} from "../../types/schemas/serviceMaster/serviceMasterSchema.js";
import { generateServiceFilter } from "../../services/database/utils/serviceMaster/serviceMasterFilterMapper.js";

function createServiceDBInputObject(
  body: postServiceMasterType
): Prisma.ServiceUncheckedCreateInput {
  const serviceInput: Prisma.ServiceUncheckedCreateInput = {
    serviceTypeId: body.serviceTypeId,
    name: body.name,
  };
  return serviceInput;
}

function createServiceFilterInputObject(
  body: filterServiceMasterType
): Prisma.ServiceWhereInput {
  const serviceWhereInput = generateServiceFilter(body);
  return serviceWhereInput;
}

export { createServiceDBInputObject, createServiceFilterInputObject };
