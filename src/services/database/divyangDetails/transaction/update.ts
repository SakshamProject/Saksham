import { createUpdateDTOObject } from "../../../../dto/divyangDetails/put.js";
import {
  updateDivyangDetails,
  updateDivyangDetailsRequest,
} from "../../../../types/divyangDetails/divyangDetailsSchema.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import { createDivyangDetailsAuditLogDB } from "../create.js";
import { getDivyangDetailsStatusDB } from "../read.js";
import { updateDivyangDetailsDB } from "../update.js";

const updateDivyangDetailsTransactionDB = async (
  divyangDetails: updateDivyangDetailsRequest,
  id: string
) => {
  try {
    const transaction = await prisma.$transaction(async (prismaTransaction) => {
      if (divyangDetails.auditLog != null) {
        const currentDate = new Date(Date.now()).toISOString();
        const auditLog = await getDivyangDetailsStatusDB(id, currentDate);
        if (divyangDetails.auditLog.status != auditLog?.status) {
          await createDivyangDetailsAuditLogDB(
            prismaTransaction,
            divyangDetails.auditLog,
            id
          );
        }
      }

      const pageNumber = divyangDetails.pageNumber;
      const updateDTOObject: updateDivyangDetails =
        (await createUpdateDTOObject(pageNumber, divyangDetails)) || {};

      const updatedDivyangDetails: updateDivyangDetails | undefined =
        await updateDivyangDetailsDB(prismaTransaction, updateDTOObject, id);
      return updatedDivyangDetails;
    });
    return transaction;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export default updateDivyangDetailsTransactionDB;
