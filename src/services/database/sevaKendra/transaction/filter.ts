import { Prisma } from "@prisma/client";
import defaults from "../../../../defaults.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import { filterSevaKendraDB, filterSevaKendraDBTotal } from "../filter.js";

const filterSevaKendraDBTransaction = async (
  skip: number = defaults.skip,
  take: number = defaults.take,
  orderByColumnAndSortOrder: Object,
  sevaKendraWhereInput: Prisma.SevaKendraWhereInput
) => {
  try {
    const transaction = await prisma.$transaction(async (prismaTransaction) => {
      try {
        console.log("inside");

        const filteredSevaKendra = await filterSevaKendraDB(
          prismaTransaction,
          skip,
          take,
          orderByColumnAndSortOrder,
          sevaKendraWhereInput
        );
        const total = await filterSevaKendraDBTotal(
          prismaTransaction,
          sevaKendraWhereInput
        );
        return { filteredSevaKendra, total };
      } catch (error) {
        if (error instanceof Error) throwDatabaseError(error);
      }
    });
    return transaction;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export default filterSevaKendraDBTransaction;
