import { Prisma } from "@prisma/client";
import { filterServiceMasterType } from "../../../../types/schemas/serviceMaster/serviceMasterSchema.js";

function filterServiceMasterMapper(
  columnName: string,
  filterOperation: string,
  value: string
) {
  const filterServiceMasterMap: Map<string, Prisma.ServiceWhereInput> =
    new Map();

  const operation =
    filterOperation === "notEquals" ? "equals" : filterOperation;

  filterServiceMasterMap.set("serviceName", {
    name: {
      [operation]: value,
    },
  });

  filterServiceMasterMap.set("serviceTypeName", {
    serviceType: {
      name: {
        [operation]: value,
      },
    },
  });

  if (filterOperation === "notEquals") {
    return {
      NOT: filterServiceMasterMap.get(columnName),
    };
  }
  return filterServiceMasterMap.get(columnName);
}

function generateServiceFilter(body: filterServiceMasterType) {
  const serviceWhereInput: any = {
    AND: [],
  };
  for (const [columnName, filter] of Object.entries(body)) {
    serviceWhereInput.AND.push(
      filterServiceMasterMapper(columnName, filter.operation, filter.value)
    );
  }

  return serviceWhereInput;
}

export { generateServiceFilter, filterServiceMasterMapper };
