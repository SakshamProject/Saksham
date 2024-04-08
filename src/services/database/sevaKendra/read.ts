import defaults from "../../../defaults.js";
import { sortOrderEnum } from "../../../types/getRequestSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const getSevaKendraDB = async (
  prismaTransaction: any,
  searchText: string,
  orderByColumnAndSortOrder: Object = { name: sortOrderEnum.ascending },
  skip = defaults.skip,
  take = defaults.take
) => {
  try {
    const sevaKendras = await prismaTransaction.sevaKendra.findMany({
      take: take,
      skip: skip,
      where: {
        OR: [
          {
            name: {
              contains: searchText,
              mode: "insensitive",
            },
          },
          {
            district: {
              state: {
                name: {
                  contains: searchText,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            district: {
              name: {
                contains: searchText,
                mode: "insensitive",
              },
            },
          },
          {
            contactPerson: {
              name: {
                contains: searchText,
                mode: "insensitive",
              },
            },
          },
          {
            contactPerson: {
              phoneNumber1: {
                mode: "insensitive",
                contains: searchText,
              },
            },
          },
        ],
      },
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
        contactPerson: {
          select: {
            id: true,
            name: true,
            phoneNumber1: true,
          },
        },
      },
      orderBy: orderByColumnAndSortOrder,
    });
    return sevaKendras;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getSevaKendraDBTotal = async (prismaTransaction: any) => {
  try {
    const sevaKendras = await prismaTransaction.sevaKendra.count();
    return sevaKendras;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getSevaKendraByIdDB = async (sevaKendraId: string): Promise<any> => {
  const sevaKendra = await prisma.sevaKendra.findFirst({
    where: {
      id: sevaKendraId,
    },
    include: {
      contactPerson: true,
      services: true,
      SevaKendraAuditLog: true,
    },
  });
  return sevaKendra;
};

export { getSevaKendraDB, getSevaKendraDBTotal, getSevaKendraByIdDB };
