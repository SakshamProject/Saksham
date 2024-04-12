import { Prisma } from "@prisma/client";
import {
  generateServiceFilter,
  generateServiceList
} from "../../services/database/utils/serviceMaster/serviceMasterFilterMapper.js";
import {
  filterServiceMasterType,
  listServiceMasterType,
  postServiceMasterType
} from "../../types/serviceMaster/serviceMasterSchema.js";

function createServiceDBInputObject(
  body: postServiceMasterType
): Prisma.ServiceUncheckedCreateInput {
  const serviceInput: Prisma.ServiceUncheckedCreateInput = {
    serviceTypeId: body.serviceTypeId,
    name: body.name,
  };
  return serviceInput;
}

function createServiceListWhereInput(
    body: listServiceMasterType
) {
  const serviceTypeWhereInput = generateServiceList(body);
  return serviceTypeWhereInput;
}

function createServiceFilterInputObject(
  body: filterServiceMasterType
): Prisma.ServiceTypeWhereInput {
  const serviceTypeWhereInput = generateServiceFilter(body);
  return serviceTypeWhereInput;
}

export { createServiceDBInputObject, createServiceFilterInputObject, createServiceListWhereInput };
