import { Prisma, StatusEnum } from '@prisma/client';

import { ServiceMappingColumnNamesEnum } from '../../../../types/serviceMapping/serviceMappingDefaults.js';
import { filterOperationsEnum } from '../../../../types/inputFieldSchema.js';
import {
  ServiceAdditionalWhereSchemaType,
  ServiceMappingWhere,
  serviceMappingFilterType,
} from '../../../../types/serviceMapping/serviceMappingScreens.js';

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
        mode: 'insensitive',
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
                mode: 'insensitive',
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
                mode: 'insensitive',
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
            mode: 'insensitive',
          },
        },
      },
    },
  });
  filterServiceMappingMap.set(ServiceMappingColumnNamesEnum.SERVICE_NAME, {
    service: {
      name: {
        [operation]: value,
        mode: 'insensitive',
      },
    },
  });
  filterServiceMappingMap.set(ServiceMappingColumnNamesEnum.SERVICE_DATE, {
    dateOfService: {
      equals: value,
    },
  });
  filterServiceMappingMap.set(ServiceMappingColumnNamesEnum.SERVICE_STATUS, {
    isCompleted: {
      equals:
        StatusEnum.COMPLETED === value.toUpperCase()
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

const generateServiceMappingFilter = async (
  serviceMappingfilter: serviceMappingFilterType | undefined,
  globalSearchConditions: ServiceMappingWhere | null,
  serviceAdditionalWhere: ServiceAdditionalWhereSchemaType | undefined,
  token: Token | undefined
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
  if (serviceAdditionalWhere === undefined) {
    return ServiceMappingWhereInput;
  }
  if (serviceAdditionalWhere.districtId != undefined) {
    const additionalWhere: ServiceMappingWhere = {
      user: {
        designation: {
          sevaKendra: {
            districtId: serviceAdditionalWhere.districtId,
          },
        },
      },
    };
    ServiceMappingWhereInput.AND.push(additionalWhere);
  }
  if (serviceAdditionalWhere.serviceStatus != undefined) {
    const additionalWhere: ServiceMappingWhere = {
      isCompleted: serviceAdditionalWhere.serviceStatus,
    };
    ServiceMappingWhereInput.AND.push(additionalWhere);
  }
  if (
    serviceAdditionalWhere.startDate != undefined ||
    serviceAdditionalWhere.endDate != undefined
  ) {
    const additionalWhere: ServiceMappingWhere = {
      dateOfService: {
        lte: serviceAdditionalWhere.endDate,
        gte: serviceAdditionalWhere.startDate,
      },
    };
    ServiceMappingWhereInput.AND.push(additionalWhere);
  }
  if (serviceAdditionalWhere.divyangId != undefined) {
    const additionalWhere: ServiceMappingWhere = {
      divyangId: serviceAdditionalWhere.divyangId,
    };
    ServiceMappingWhereInput.AND.push(additionalWhere);
  }
  // access control for users
  if (token !== undefined && !token.superAdminId) {
    // console.log("user has entered: ", token.serviceMappingAccess)
    // if user has service mapping access then he can see all service mapping in his sevakendra
    if (token.serviceMappingAccess) {
      const additionalWhere: ServiceMappingWhere = {
        user: {
          designation: {
            sevaKendraId: token.userSevaKendraId,
          },
        },
      };
      ServiceMappingWhereInput.AND.push(additionalWhere);
    }
    // else he can see all service mapping assigned to him
    else {
      const additionalWhere: ServiceMappingWhere = {
        userId: token.userId,
      };
      ServiceMappingWhereInput.AND.push(additionalWhere);
    }
  }

  return ServiceMappingWhereInput;
};

export { filterServiceMappingMapper, generateServiceMappingFilter };
