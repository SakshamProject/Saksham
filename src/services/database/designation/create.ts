import { Designation, Prisma } from "@prisma/client";
import {
  postAuditLogObjectType,
  postDesignationType,
  postFeaturesOnDesignationsType,
} from "../../../types/designation/designationSchema.js";
import throwDatabaseError from "../utils/errorHandler.js";

async function createDesignationDB(
  prismaTransaction: Prisma.TransactionClient,
  dataObject: postDesignationType
) {
  console.log(`[+]dataObject`,dataObject)
  try {
    const newDesignation: Designation =
      await prismaTransaction.designation.create({
        data: dataObject,
      });
      console.log(`[+]newDesignation`,newDesignation)

    return newDesignation;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

async function createFeaturesOnDesignationDB(
  prismaTransaction: any,
  FeaturesOnDesignationsDBObjects: postFeaturesOnDesignationsType
) {
  try {
    const featuresOnDesignations =
      await prismaTransaction.featuresOnDesignations.create({
        data: FeaturesOnDesignationsDBObjects,
      });
    return featuresOnDesignations;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

async function createDesignationAuditLogDB(
  prismaTransaction: Prisma.TransactionClient,
  DesignationAuditLog: postAuditLogObjectType
) {
  try {
    const designationAuditLog =
      await prismaTransaction.designationAuditLog.create({
        data: DesignationAuditLog,
      });
    return designationAuditLog;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

export {
  createDesignationDB,
  createFeaturesOnDesignationDB,
  createDesignationAuditLogDB,
};
