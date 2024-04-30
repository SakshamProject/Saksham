import { Prisma } from "@prisma/client";
import { sortOrderEnum } from "../../../../types/getRequestSchema.js";
import { ServiceMappingColumnNamesEnum } from "../../../../types/serviceMapping/serviceMappingDefaults.js";

const serviceMappingColumnNameMapper = (
  orderByColumn: ServiceMappingColumnNamesEnum = ServiceMappingColumnNamesEnum.UPDATED_AT,
  sortOrder: sortOrderEnum = sortOrderEnum.ascending
) => {
  const serviceMappingColumnNameMap: Map<
    string,
    Prisma.DivyangServiceMappingOrderByWithRelationAndSearchRelevanceInput
  > = new Map();

  serviceMappingColumnNameMap.set(ServiceMappingColumnNamesEnum.DIVYANG_NAME, {
    divyang: { firstName: sortOrder },
  });

  serviceMappingColumnNameMap.set(
    ServiceMappingColumnNamesEnum.SEVAKENDRA_DISTRICT,
    {
      user: {
        designation: {
          sevaKendra: {
            district: {
              name: sortOrder,
            },
          },
        },
      },
    }
  );

  serviceMappingColumnNameMap.set(
    ServiceMappingColumnNamesEnum.SEVAKENDRA_STATE,
    {
      user: {
        designation: {
          sevaKendra: {
            district: {
              state: { name: sortOrder },
            },
          },
        },
      },
    }
  );
  serviceMappingColumnNameMap.set(
    ServiceMappingColumnNamesEnum.SEVAKENDRA_NAME,
    {
      user: {
        designation: {
          sevaKendra: {
            name: sortOrder,
          },
        },
      },
    }
  );
  serviceMappingColumnNameMap.set(ServiceMappingColumnNamesEnum.SERVICE_NAME, {
    service: {
      name: sortOrder,
    },
  });
  serviceMappingColumnNameMap.set(ServiceMappingColumnNamesEnum.SERVICE_DATE, {
    dateOfService: sortOrder,
  });
  serviceMappingColumnNameMap.set(
    ServiceMappingColumnNamesEnum.SERVICE_STATUS,
    {
      isCompleted: sortOrder,
    }
  );
  serviceMappingColumnNameMap.set(ServiceMappingColumnNamesEnum.CREATED_AT, {
    createdAt: sortOrder,
  });
  serviceMappingColumnNameMap.set(ServiceMappingColumnNamesEnum.UPDATED_AT, {
    updatedAt: sortOrder,
  });
  return serviceMappingColumnNameMap.get(orderByColumn);
};

export { serviceMappingColumnNameMapper };
