import { Prisma } from "@prisma/client";
import {filterServiceMasterType, listServiceMasterType} from "../../../../types/serviceMaster/serviceMasterSchema.js";
import searchTextMapper from "./searchTextMapper.js";

function filterServiceMasterMapper(
  columnName: string,
  filterOperation: string,
  value: string
) {
  const filterServiceMasterMap: Map<string, Prisma.ServiceTypeWhereInput> =
    new Map();

  const operation =
    filterOperation === "notEquals" ? "equals" : filterOperation;

  filterServiceMasterMap.set("serviceTypeName", {
    name: {
      [operation]: value,
      mode: "insensitive"
    },
  });

  filterServiceMasterMap.set("serviceName", {
    service: {
      some: {
        name: {
          [operation]: value,
          mode: "insensitive"
        },
      }
    },
  });

  if (filterOperation === "notEquals") {
    return {
      NOT: filterServiceMasterMap.get(columnName),
    };
  }
  return filterServiceMasterMap.get(columnName);
}

function generateServiceList(body: listServiceMasterType) {
  const serviceTypeWhereInput: any = {
    AND: [],
  };

  if (body.filters) {
    for (const {operation, value, field} of (body.filters)) {
      serviceTypeWhereInput.AND.push(
          filterServiceMasterMapper(field, operation, value)
      );
    }
  }

  if (body.searchText) {
    if (body.searchText !== "") {
      serviceTypeWhereInput.AND.push(searchTextMapper("ServiceType", body.searchText));
    }
  }

  return serviceTypeWhereInput;
}

function generateServiceFilter(body: filterServiceMasterType) {
  const serviceTypeWhereInput: any = {
    AND: [],
  };
  for (const [columnName, filter] of Object.entries(body)) {
    serviceTypeWhereInput.AND.push(
      filterServiceMasterMapper(columnName, filter.operation, filter.value)
    );
  }

  return serviceTypeWhereInput;
}

export { generateServiceFilter, filterServiceMasterMapper, generateServiceList };
