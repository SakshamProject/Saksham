import {
  AuditLogStatusEnum,
  Designation,
  FeaturesOnDesignations,
  Prisma,
  StatusEnum,
} from "@prisma/client";
import throwDatabaseError from "../../utils/errorHandler.js";
import { updateDesignationRequestSchemaType } from "../../../../types/designation/designationSchema.js";
import prisma from "../../database.js";
import {
  createDesignationAuditLog,
  createUpdateDesignationObject,
} from "../../../../dto/designation/designation.js";
import {
  getDesignationDependencyStatus,
  getDesignationStatus,
  updateDesignationDB,
} from "../update.js";
import { getFeaturesIdByDesignationIdDB } from "../read.js";
import {
  createCheckedFeaturesOnDesignations,
  deleteUncheckedDesignations,
  retrieveFeatureIds,
} from "../../../utils/designation/designation.js";
import { createDesignationAuditLogDB } from "../create.js";
import { auditLogSchemaType } from "../../../../types/inputFieldSchema.js";
import defaults from "../../../../defaults.js";
import APIError from "../../../errors/APIError.js";
import { StatusCodes } from "http-status-codes";

async function putDesignationDBTransaction(
  body: updateDesignationRequestSchemaType,
  id: string,
  updatedById: string = defaults.updatedById,
  auditLog:
    | {
        id: string;
        designationId: string;
        status: AuditLogStatusEnum;
        date: Date;
        description: string | null;
      }
    | undefined
) {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const updateDesignationObject = createUpdateDesignationObject(
          body,
          updatedById
        );

        const updatedDesignation: Designation | undefined =
          await updateDesignationDB(
            prismaTransaction,
            updateDesignationObject,
            id
          );

        const exisitingFeatures = await getFeaturesIdByDesignationIdDB(
          prismaTransaction,
          id
        );

        const checkedfeatures = body.features;

        const { existingFeaturesId, checkedFeaturesId } = retrieveFeatureIds(
          exisitingFeatures,
          checkedfeatures
        );

        await createCheckedFeaturesOnDesignations(
          prismaTransaction,
          checkedFeaturesId,
          existingFeaturesId,
          id,
          updatedById
        );

        await deleteUncheckedDesignations(
          prismaTransaction,
          existingFeaturesId,
          checkedFeaturesId,
          id
        );

        if (auditLog?.status !== body.auditLog.status) {
          if (body.auditLog.status === AuditLogStatusEnum.DEACTIVE) {
            const dependency = await getDesignationDependencyStatus(
              prismaTransaction,
              id
            );
            if (dependency) {
              throw new APIError(
                "Cannot deactivate the designation due to the dependent Users assigned to the designation",
                StatusCodes.BAD_REQUEST,
                "S"
              );
            }
          
          }

          const designationAuditLogObject = createDesignationAuditLog(
            id,
            body.auditLog.status,
            body.auditLog.date,
            body.auditLog.description
          );
          const designationAuditLog = await createDesignationAuditLogDB(
            prismaTransaction,
            designationAuditLogObject
          );
        }

        return id;
      } catch (error) {
        if (error instanceof Error) throwDatabaseError(error);
      }
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      maxWait: 50000,
      timeout: 50000,
    }
  );
  return transaction;
}

export { putDesignationDBTransaction };
