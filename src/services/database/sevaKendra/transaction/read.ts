import defaults from "../../../../defaults.js";
import { SevaKendraColumnNamesEnum } from "../../../../types/sevaKendra/sevaKendraDefaults.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import { getSevaKendraDB, getSevaKendraDBTotal } from "../read.js";

const getSevaKendraDBTransaction = async (
  orderByColumnAndSortOrder: Object = {},
  skip: number = defaults.skip,
  take: number = defaults.take
) => {
  const transaction = await prisma.$transaction(async (prismaTransaction) => {
    try {
      const sevaKendra = await getSevaKendraDB(
        prismaTransaction,
        orderByColumnAndSortOrder,
        skip,
        take
      );
      const total = await getSevaKendraDBTotal(prismaTransaction);
      return { sevaKendra, total };
    } catch (error) {
      if (error instanceof Error) throwDatabaseError(error);
    }
  });
  return transaction;
};

export { getSevaKendraDBTransaction };
