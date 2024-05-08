import { AuditLogStatusEnum, Prisma } from "@prisma/client";
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
  getDivyangDetailsDependencyStatusDB,
  getDivyangDetailsStatusDB,
  getEducationQualificationOfDivyangByDivyangIdDB,
} from "../read.js";
import {
  updateDisabilityOfDivyangDB,
  updateDivyangDetailsDB,
  updateEducationQualificationOfDivyangDB,
} from "../update.js";
import {
  DisabilityOfDivyang,
  DisabilityOfDivyangList,
  EducationQualificationOfDivyangList,
} from "../../../../types/divyangDetails/disabilityDetailsSchema.js";
import defaults from "../../../../defaults.js";
import { auditLogStatusEnumSchema } from "../../../../types/inputFieldSchema.js";
import APIError from "../../../errors/APIError.js";
import { StatusCodes } from "http-status-codes";

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
          const auditLog = await getDivyangDetailsStatusDB(
            prismaTransaction,
            id,
            currentDate
          );
          if (divyangDetails.auditLog.status != auditLog?.status) {
            if (
              divyangDetails.auditLog.status === AuditLogStatusEnum.DEACTIVE
            ) {
              const dependencyStatus =
                await getDivyangDetailsDependencyStatusDB(
                  prismaTransaction,
                  id
                );
              if (dependencyStatus) {
                throw new APIError(
                  "Divyang might be added mapped with incomplete services. Cannot be deactivated",
                  StatusCodes.BAD_REQUEST
                );
              }
            }
            await createDivyangDetailsAuditLogDB(
              prismaTransaction,
              divyangDetails.auditLog,
              id
            );
          }
        }
        //update educationQualification if it exists
        const educationQualification =
          await educationQualificationOfDivyangUpdate(
            prismaTransaction,
            divyangDetails,
            id,
            pageNumber
          );
        if (pageNumber === 1 && educationQualification) {
          for (let education of educationQualification.educationQualificationsToUpdate) {
            const updatedEducationQualificationOfDivyang =
              await updateEducationQualificationOfDivyangDB(
                prismaTransaction,
                education,
                education.id!,
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
        if (pageNumber === 4 && disabilities) {
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
            educationQualification,
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
        (disabilities) => disabilities.id === undefined
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

const educationQualificationOfDivyangUpdate = async (
  prismaTransaction: Prisma.TransactionClient,
  divyangDetails: updateDivyangDetailsRequest,
  divyangId: string,
  pageNumber: number
) => {
  if (pageNumber != 1) return null;
  try {
    const existingEducationQualificationsOfDivyang =
      await getEducationQualificationOfDivyangByDivyangIdDB(
        prismaTransaction,
        divyangId
      );
    const existingEducationQualificationsOfDivyangId =
      existingEducationQualificationsOfDivyang?.map(
        (educationQualification) => educationQualification.id
      ) || [];

    const currentEducationQualificationId =
      divyangDetails.personalDetails?.educationQualifications.map(
        (educationQualification) => educationQualification.id
      ) || [];

    const educationQualificationsToCreate =
      divyangDetails.personalDetails?.educationQualifications.filter(
        (educationQualifications) => educationQualifications.id == undefined
      ) || [];

    const educationQualificationsToDelete =
      existingEducationQualificationsOfDivyangId.filter(
        (educationQualificationId) =>
          !currentEducationQualificationId.includes(educationQualificationId)
      );

    const educationQualificationsToUpdate =
      divyangDetails.personalDetails?.educationQualifications.filter(
        (educationQualifications) => educationQualifications.id !== undefined
      ) || [];

    const educationQualifications: EducationQualificationOfDivyangList = {
      educationQualificationsToCreate: educationQualificationsToCreate,
      educationQualificationsToDelete: educationQualificationsToDelete,
      educationQualificationsToUpdate: educationQualificationsToUpdate,
    };
    return educationQualifications;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
export default updateDivyangDetailsTransactionDB;
