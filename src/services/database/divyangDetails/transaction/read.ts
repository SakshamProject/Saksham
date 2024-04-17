import { Prisma } from "@prisma/client";
import defaults from "../../../../defaults.js";
import { sortOrderEnum } from "../../../../types/getRequestSchema.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import { getDivyangDetailsDB, getDivyangDetailsTotalDB } from "../read.js";
import {
  DivyangDetailsFilterType,
  DivyangDetailsWhere,
} from "../../../../types/divyangDetails/divyangDetailsSchema.js";
import { DivyangDetailsColumnNamesEnum } from "../../../../types/divyangDetails/divyangDetailsDefaults.js";

const getDivyangDetailsDBTransaction = async (
  start: number = defaults.skip,
  rows: number = defaults.take,
  orderByColumnAndSortOrder: Object = { firstName: sortOrderEnum.ascending },
  divyangDetailsWhereInput: DivyangDetailsWhere
) => {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const divyangDetails = await getDivyangDetailsDB(
          prismaTransaction,
          orderByColumnAndSortOrder,
          divyangDetailsWhereInput
        );

        const total = await getDivyangDetailsTotalDB(
          prismaTransaction,
          divyangDetailsWhereInput
        );
        return { divyangDetails, total };
      } catch (error) {
        if (error instanceof Error) {
          throwDatabaseError(error);
        }
      }
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      maxWait: 50000,
      timeout: 10000,
    }
  );
  return transaction;
};

export { getDivyangDetailsDBTransaction };