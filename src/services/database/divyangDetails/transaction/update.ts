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
import {
  updateDisabilityOfDivyangDB,
  updateDivyangDetailsDB,
} from "../update.js";
import {
  DisabilityOfDivyang,
  DisabilityOfDivyangList,
} from "../../../../types/divyangDetails/disabilityDetailsSchema.js";

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
      // if (pageNumber == 3) {
      const disabilities: DisabilityOfDivyangList | null =
        await disabilityOfDivyangUpdate(
          prismaTransaction,
          divyangDetails,
          id,
          pageNumber
        );
      // }

      // updating divyang details table for corresponding pagenumber

      const updateDTOObject: updateDivyangDetails =
        (await createUpdateDTOObject(
          pageNumber,
          divyangDetails,
          disabilities
        )) || {};
      if (pageNumber == 4 && disabilities) {
        for (let disability of disabilities.disabilitiesToUpdate) {
          const updatedDisabilityOfDivyang = await updateDisabilityOfDivyangDB(
            prismaTransaction,
            disability,
            disability.id!,
            id
          );
          console.log("++ updated", updatedDisabilityOfDivyang);
        }
      }
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
  divyangId: string,
  pageNumber: number
) => {
  if (pageNumber != 4) return null;
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
    ) || [];
  console.log("disabilities to create", disabilitiesToCreate);
  const disabilitiesToDelete = existingDisabilityId.filter(
    (disabilityId) => !currentDisabilityId.includes(disabilityId)
  );
  console.log("disablities to delete", disabilitiesToDelete);

  const disabilitiesToUpdate =
    divyangDetails.disabiltyDetails?.disabilities.filter(
      (disabilities) => disabilities.id !== undefined
    ) || [];
  console.log("disability to Update", disabilitiesToUpdate);

  const disabilitiesToUpdateIds: string[] =
    divyangDetails.disabiltyDetails?.disabilities
      .filter((disabilities) => disabilities.id !== undefined)
      .map((disabilities) => disabilities.id!) || [];

  const disabilities: DisabilityOfDivyangList = {
    disabilitiesToCreate: disabilitiesToCreate,
    disabilitiesToDelete: disabilitiesToDelete,
    disabilitiesToUpdate: disabilitiesToUpdate,
    disabilitiesToUpdateIds: disabilitiesToUpdateIds,
  };
  return disabilities;
};
export default updateDivyangDetailsTransactionDB;
