import { Prisma, StatusEnum } from "@prisma/client";

import { ServiceMappingColumnNamesEnum } from "../../../../types/serviceMapping/serviceMappingDefaults.js";
import { filterOperationsEnum } from "../../../../types/inputFieldSchema.js";
import {
  ServiceMappingWhere,
  serviceMappingFilterType,
} from "../../../../types/serviceMapping/serviceMappingScreens.js";

const filterServiceMappingMapper = (
  columnName: string,
  filterOperation: filterOperationsEnum,
  value: string
) => {
  const filterServiceMappingMap: Map<
    string,
    Prisma.DivyangServiceMappingWhereInput
  > = new Map();

  const operation =
    filterOperation === filterOperationsEnum.NOTEQUALS
      ? filterOperationsEnum.EQUALS
      : filterOperation;

  filterServiceMappingMap.set(ServiceMappingColumnNamesEnum.DIVYANG_NAME, {
    divyang: {
      firstName: {
        [operation]: value,
        mode: "insensitive",
      },
    },
  });

  filterServiceMappingMap.set(
    ServiceMappingColumnNamesEnum.SEVAKENDRA_DISTRICT,
    {
      user: {
        designation: {
          sevaKendra: {
            district: {
              name: {
                [operation]: value,
                mode: "insensitive",
              },
            },
          },
        },
      },
    }
  );
  filterServiceMappingMap.set(ServiceMappingColumnNamesEnum.SEVAKENDRA_STATE, {
    user: {
      designation: {
        sevaKendra: {
          district: {
            state: {
              name: {
                [operation]: value,
                mode: "insensitive",
              },
            },
          },
        },   
      },
    },
  });
  filterServiceMappingMap.set(ServiceMappingColumnNamesEnum.SEVAKENDRA_NAME, {
    user: {
      designation: {
        sevaKendra: {
          name: {
            [operation]: value,
            mode: "insensitive",
          },
        },
      },
    },
  });
  filterServiceMappingMap.set(ServiceMappingColumnNamesEnum.SERVICE_NAME, {
    service: {
      name: {
        [operation]: value,
        mode: "insensitive",
      },
    },
  });
  filterServiceMappingMap.set(ServiceMappingColumnNamesEnum.SERVICE_DATE, {
    dateOfService: {
      equals: value,
    },
  });
  filterServiceMappingMap.set(ServiceMappingColumnNamesEnum.SERVICE_DATE, {
    isCompleted: {
      equals:
        StatusEnum.COMPLETED == value
          ? StatusEnum.COMPLETED
          : StatusEnum.PENDING,
    },
  });
  if (filterOperation === filterOperationsEnum.NOTEQUALS) {
    return {
      NOT: filterServiceMappingMap.get(columnName),
    };
  }
  return filterServiceMappingMap.get(columnName);
};

const generateServiceMappingFilter = (
  serviceMappingfilter: serviceMappingFilterType | undefined,
  globalSearchConditions: ServiceMappingWhere | null
) => {
  const ServiceMappingWhereInput: any = {
    AND: [],
  };
  if (serviceMappingfilter) {
    for (const { operation, value, field } of serviceMappingfilter) {
      ServiceMappingWhereInput.AND.push(
        filterServiceMappingMapper(field, operation, value)
      );
    }
  }
  if (globalSearchConditions != null)
    ServiceMappingWhereInput.AND.push(globalSearchConditions);
  return ServiceMappingWhereInput;
};

export { filterServiceMappingMapper, generateServiceMappingFilter };
