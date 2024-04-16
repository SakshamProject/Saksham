import { Designation, FeaturesOnDesignations, Prisma } from "@prisma/client";
import throwDatabaseError from "../../utils/errorHandler.js";
import { updateDesignationRequestSchemaType } from "../../../../types/designation/designationSchema.js";
import prisma from "../../database.js";
import {
  createDesignationAuditLog,
  createUpdateDesignationObject,
} from "../../../../dto/designation/designation.js";
import { updateDesignationDB } from "../update.js";
import { getFeaturesIdByDesignationIdDB } from "../read.js";
import {
  createCheckedFeaturesOnDesignations,
  deleteUncheckedDesignations,
  retrieveFeatureIds,
} from "../../../utils/designation/designation.js";
import { createDesignationAuditLogDB } from "../create.js";

async function putDesignationDBTransaction(
  body: updateDesignationRequestSchemaType,
  id: string,
  updatedById: string | undefined
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
