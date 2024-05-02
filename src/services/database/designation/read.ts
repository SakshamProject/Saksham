import defaults from "../../../defaults.js";
import { sortOrderEnum } from "../../../types/getRequestSchema.js";
import { designationColumnNameMapper } from "../utils/designation/designation.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";
import { Prisma } from "@prisma/client";
import { designationGetByIdType } from "../../../types/designation/designationSchema.js";

async function getDesignationDB(
  prismaTransaction: Prisma.TransactionClient,
  searchCondition: Object,
  OrderByObject: Object = { name: sortOrderEnum.ascending },
  skip = defaults.skip,
  take = defaults.take
) {
  try {
    const results = await prismaTransaction.designation.findMany({
      skip: skip,
      take: take,
      where: searchCondition,
      select: {
        id: true,
        name: true,
        sevaKendra: {
          select: {
            name: true,
            district: {
              select: {
                name: true,
                state: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },

      orderBy: OrderByObject,
    });
    return results;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

async function getDesignationDBTotal(
  prismaTransaction: Prisma.TransactionClient,
  searchCondition: Object
) {
  try {
    const total: number = await prismaTransaction.designation.count({
      where: searchCondition,
    });
    return total;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

async function getDesignationByIDDB(id: string | undefined) {
  try {
    const currentDate = new Date(Date.now()).toISOString();
    const designation = await prisma.designation.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        sevaKendra: {
          select: {
            id: true,
            name: true,
            district: {
              select: {
                id: true,
                name: true,
                state: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        features: {
          select: {
            feature: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        createdAt: true,
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        updatedAt: true,
        updatedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        auditLog: {
          select: {
            status: true,
          },
          where: {
            date: {
              lt: currentDate,
            },
          },
          orderBy: {
            date: "desc",
          },
          take: 1,
        },
      },
    });

    return designation;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

async function getFeaturesIdByDesignationIdDB(
  prismaTransaction: Prisma.TransactionClient,
  id: string
) {
  try {
    const FeaturesOnDesignation =
      prismaTransaction.featuresOnDesignations.findMany({
        where: {
          designationId: id,
        },
      });
    return FeaturesOnDesignation;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

async function getFeaturesDB() {
  try {
    const features = await prisma.feature.findMany();
    return features;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

const getDesignationsBySevaKendraIdDB = async (sevaKendraId: string) => {
  try {
    const currentDate = new Date(Date.now()).toISOString();
    const designations = await prisma.designation.findMany({
      where: {
        sevaKendraId: sevaKendraId,
      },
      select:{
        id:true,
        name:true,
        auditLog:{
          select:{
            status:true,
          },
          where: {
            date: {
              lt: currentDate,
            },
          },
          orderBy: {
            date: "desc",
          },
          take: 1,
        }
      },
      orderBy:{
        name:"asc"
      }
    });
    return designations;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export {
  getDesignationDB,
  getDesignationByIDDB,
  getDesignationDBTotal,
  getFeaturesIdByDesignationIdDB,
  getFeaturesDB,
  getDesignationsBySevaKendraIdDB,
};
