import { Prisma } from "@prisma/client";
import defaults from "../../../defaults.js";
import { ServiceMappingWhere } from "../../../types/serviceMapping/serviceMappingScreens.js";
import throwDatabaseError from "../utils/errorHandler.js";
import prisma from "../database.js";

const getServiceMappingDB = async (
  prismaTransaction: Prisma.TransactionClient,
  skip: number = defaults.skip,
  take: number = defaults.take,
  searchConditions: ServiceMappingWhere,
  orderByColumnAndSortOrder: Object = { dateOfService: "asc" }
) => {
  try {
    const serviceMapping =
      await prismaTransaction.divyangServiceMapping.findMany({
        skip: skip,
        take: take,
        where: searchConditions,
        orderBy: orderByColumnAndSortOrder,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              designation: {
                select: {
                  sevaKendra: {
                    select: {
                      id: true,
                      name: true,
                      district: {
                        select: {
                          id: true,
                          name: true,
                          state: {
                            select: { id: true, name: true },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          dateOfService: true,
          isCompleted: true,
          service: {
            select: { id: true, name: true },
          },
          divyang: {
            select: { id: true, firstName: true },
          },
          sevaKendra: {
            select: {
              id: true,
              name: true,
              district: {
                select: {
                  id: true,
                  name: true,
                  state: {
                    select: { id: true, name: true },
                  },
                },
              },
            },
          },
        },
      });
    return serviceMapping;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getServiceMappingDBTotal = async (
  prismaTransaction: Prisma.TransactionClient,
  searchConditions: ServiceMappingWhere
) => {
  try {
    const total = await prismaTransaction.divyangServiceMapping.count({
      where: searchConditions,
    });
    return total;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getServiceMappingByIdDB = async (id: string) => {
  try {
    const serviceMapping = await prisma.divyangServiceMapping.findFirstOrThrow({
      where: {
        id: id,
      },
      include: {
        user: {
          include: {
            designation: {
              include: {
                sevaKendra: {
                  include: {
                    district: {
                      include: {
                        state: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        sevaKendra: {
          select: {
            id: true,
            name: true,
            district: {
              select: {
                id: true,
                name: true,
                state: {
                  select: { id: true, name: true },
                },
              },
            },
          },
        },
        nonSevaKendraFollowUp: true,
        donor: true,
        createdBy: true,
        updatedBy: true,
        divyang: true,
        service: {
          include: {
            serviceType: true,
          },
        },
      },
    });
    return serviceMapping;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getServiceMappingByDivyangIdDB = async (
  prismaTransaction: Prisma.TransactionClient,
  divyangId: string,
  skip: number = defaults.skip,
  take: number = defaults.take,
  searchConditions: ServiceMappingWhere,
  orderByColumnAndSortOrder: Object = { dateOfService: "asc" }
) => {
  try {
    const serviceMapping =
      await prismaTransaction.divyangServiceMapping.findMany({
        where: {
          AND: [{ divyangId: divyangId }, searchConditions],
        },
        orderBy: orderByColumnAndSortOrder,
        skip: skip,
        take: take,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              designation: {
                select: {
                  sevaKendra: {
                    select: {
                      id: true,
                      name: true,
                      district: {
                        select: {
                          id: true,
                          name: true,
                          state: {
                            select: { id: true, name: true },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          sevaKendra: {
            select: {
              id: true,
              name: true,
              district: {
                select: {
                  id: true,
                  name: true,
                  state: {
                    select: { id: true, name: true },
                  },
                },
              },
            },
          },
          dateOfService: true,
          isCompleted: true,
          service: {
            select: { id: true, name: true },
          },
          divyang: {
            select: { id: true, firstName: true },
          },
        },
      });
    return serviceMapping;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getServiceMappingByDivyangIdDBTotal = async (
  prismaTransaction: Prisma.TransactionClient,
  divyangId: string,
  searchConditions: ServiceMappingWhere
) => {
  try {
    const serviceMapping = await prismaTransaction.divyangServiceMapping.count({
      where: {
        AND: [{ divyangId: divyangId }, searchConditions],
      },
    });
    return serviceMapping;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
export {
  getServiceMappingDB,
  getServiceMappingDBTotal,
  getServiceMappingByIdDB,
  getServiceMappingByDivyangIdDB,
  getServiceMappingByDivyangIdDBTotal,
};
