import { Prisma } from "@prisma/client";
import defaults from "../../../defaults.js";
import {
  DivyangDetailsRequest,
  DivyangDetailsWhere,
} from "../../../types/divyangDetails/divyangDetailsSchema.js";
import { sortOrderEnum } from "../../../types/getRequestSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const getDivyangDetailsDB = async (
  prismaTransaction: Prisma.TransactionClient,
  orderByColumnAndSortOrder: Object,
  divyangDetailsWhereInput: DivyangDetailsWhere
) => {
  try {
    const divyangsDetails = await prismaTransaction.divyangDetails.findMany({
      select: {
        firstName: true,
        mailId: true,
        mobileNumber: true,
        divyangId: true,
      },
      orderBy: orderByColumnAndSortOrder,
      where: divyangDetailsWhereInput,
    });

    return divyangsDetails;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

const getDivyangDetailsByIdDB = async (id: string) => {
  try {
    const divyangDetails = await prisma.divyangDetails.findFirstOrThrow({
      where: {
        id: id,
      },
    });
    return divyangDetails;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

async function getDivyangDetailsTotal(
  prismaTransaction: any,
  divyangDetailsWhereInput: DivyangDetailsWhere
) {
  try {
    const divyangDetails: number = await prismaTransaction.DivyangDetails.count(
      {
        where: divyangDetailsWhereInput,
      }
    );
    return divyangDetails;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}

export { getDivyangDetailsDB, getDivyangDetailsTotal, getDivyangDetailsByIdDB };
