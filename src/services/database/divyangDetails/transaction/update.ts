import { Prisma } from "@prisma/client";
import { createUpdateDTOObject } from "../../../../dto/divyangDetails/put.js";
import {
  updateDivyangDetails,
  updateDivyangDetailsRequest,
} from "../../../../types/divyangDetails/divyangDetailsSchema.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import { createDivyangDetailsAuditLogDB } from "../create.js";
import {
  getDisabilityOfDivyangByDivyangIdDB,
  getDivyangDetailsStatusDB,
} from "../read.js";
import { updateDivyangDetailsDB } from "../update.js";

const updateDivyangDetailsTransactionDB = async (
  divyangDetails: updateDivyangDetailsRequest,
  id: string
) => {
  try {
    const transaction = await prisma.$transaction(async (prismaTransaction) => {
      //updating audit log
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
      // if disability page is edited then handling chipsets
      if (pageNumber == 3) {
        disabilityOfDivyangUpdate(prismaTransaction, divyangDetails, id);
      }

      // updating divyang details table for corresponding pagenumber

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
const disabilityOfDivyangUpdate = async (
  prismaTransaction: Prisma.TransactionClient,
  divyangDetails: updateDivyangDetailsRequest,
  divyangId: string
) => {
  const existingDisabilities = await getDisabilityOfDivyangByDivyangIdDB(
    prismaTransaction,
    divyangId
  );
  const existingDisabilityId =
    existingDisabilities?.map((disability) => disability.id) || [];
  const currentDisabilityId =
    divyangDetails.disabiltyDetails?.disabilities.map(
      (disability) => disability.id
    ) || [];
  const disabilitiesToCreate =
    divyangDetails.disabiltyDetails?.disabilities.filter(
      (disabilities) => disabilities.id == undefined
    );
  console.log(disabilitiesToCreate);
  const disabilitiesToDelete = existingDisabilityId.filter(
    (disabilityId) => !currentDisabilityId.includes(disabilityId)
  );
  console.log(disabilitiesToDelete);

  return { disabilitiesToCreate, disabilitiesToDelete };
};
export default updateDivyangDetailsTransactionDB;
