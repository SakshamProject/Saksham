import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";
import defaults from "../../../../../defaults.js";
import { Corporation } from "../../../../../types/typeMaster/stateMaster/corporationSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";
import { Prisma } from "@prisma/client";

const getCorporationDB = async (
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
) => {
  const corporationTransaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const corporation = await prismaTransaction.corporation.findMany({
          where: {
            name: {
              contains: searchText,
              mode: "insensitive",
            },
          },
          orderBy: {
            name: sortOrder,
          },
          skip: start,
          take: rows,
        });
        const total = await prisma.corporation.count({
          where: {
            name: { contains: searchText, mode: "insensitive" },
          },
        });
        return { corporation, total };
      } catch (error) {
        await prismaTransaction.$executeRaw;
        if (error instanceof Error) throwDatabaseError(error);
      }
    },
    {
      maxWait: 5000, // default: 2000
      timeout: 10000, // default: 5000
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    }
  );

  return corporationTransaction;
};

const getCorporationByDistrictIdDB = async (
  districtId: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<Corporation[] | undefined> => {
  try {
    const corporations: Corporation[] = await prisma.corporation.findMany({
      where: {
        districtId: districtId,
      },
      orderBy: {
        name: sortOrder,
      },
      skip: start,
      take: rows,
    });
    return corporations;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getCorporationByDistrictIdDBTotal = async (districtId: string) => {
  const corporationsTotal: number = await prisma.corporation.count({
    where: {
      districtId: districtId,
    },
  });
};
const getCorporationByIdDB = async (
  id: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<Corporation | undefined | null> => {
  try {
    const corporations: Corporation | null = await prisma.corporation.findFirst(
      {
        where: {
          id: {
            equals: id,
          },
        },
        orderBy: {
          name: sortOrder,
        },
        skip: start,
        take: rows,
      }
    );
    return corporations;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getCorporationByIdDBTotal = async (id: string) => {
  const corporationTotal = await prisma.corporation.count({
    where: {
      id: id,
    },
  });
};

export {
  getCorporationDB,
  getCorporationByDistrictIdDB,
  getCorporationByIdDB,
};
