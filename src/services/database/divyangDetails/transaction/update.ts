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
import defaults from "../../../../defaults.js";

const updateDivyangDetailsTransactionDB = async (
  divyangDetails: updateDivyangDetailsRequest,
  updatedBy: string = defaults.updatedById,
  id: string
) => {
  try {
    const transaction = await prisma.$transaction(
      async (prismaTransaction) => {
        const pageNumber = divyangDetails.pageNumber;

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

        // update disability of divyang if it exists

        const disabilities: DisabilityOfDivyangList | null | undefined =
          await disabilityOfDivyangUpdate(
            prismaTransaction,
            divyangDetails,
            id,
            pageNumber
          );
        if (pageNumber == 4 && disabilities) {
          for (let disability of disabilities.disabilitiesToUpdate) {
            const updatedDisabilityOfDivyang =
              await updateDisabilityOfDivyangDB(
                prismaTransaction,
                disability,
                disability.id!,
                id
              );
          }
        }

        // updating divyang details table for corresponding pagenumber

        const updateDTOObject: updateDivyangDetails =
          (await createUpdateDTOObject(
            pageNumber,
            divyangDetails,
            disabilities,
            updatedBy
          )) || {};

        const updatedDivyangDetails = await updateDivyangDetailsDB(
          prismaTransaction,
          updateDTOObject,
          id
        );
        return updatedDivyangDetails;
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 50000,
        timeout: 10000,
      }
    );
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
  try {
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

    const disabilitiesToDelete = existingDisabilityId.filter(
      (disabilityId) => !currentDisabilityId.includes(disabilityId)
    );

    const disabilitiesToUpdate =
      divyangDetails.disabiltyDetails?.disabilities.filter(
        (disabilities) => disabilities.id !== undefined
      ) || [];

    const disabilities: DisabilityOfDivyangList = {
      disabilitiesToCreate: disabilitiesToCreate,
      disabilitiesToDelete: disabilitiesToDelete,
      disabilitiesToUpdate: disabilitiesToUpdate,
    };
    return disabilities;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
export default updateDivyangDetailsTransactionDB;
