import { Prisma } from "@prisma/client";
import defaults from "../../../defaults.js";

const filterSevaKendraDB = async (
  prismaTransaction: Prisma.TransactionClient,
  skip: number = defaults.skip,
  take: number = defaults.take,
  orderByColumnAndSortOrder: Object = {},
  sevaKendraWhereInput: Prisma.SevaKendraWhereInput
) => {
  console.log("entered");
  const filteredSevaKendra = await prismaTransaction.sevaKendra.findMany({
    take: take,
    skip: skip,
    where: sevaKendraWhereInput,
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
  return filteredSevaKendra;
};

const filterSevaKendraDBTotal = async (
  prismaTransaction: Prisma.TransactionClient,
  sevaKendraWhereInput: Prisma.SevaKendraWhereInput
) => {
  const total = await prismaTransaction.sevaKendra.count({
    where: sevaKendraWhereInput,
  });
  return total;
};

export { filterSevaKendraDB, filterSevaKendraDBTotal };
