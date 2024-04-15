import { Prisma } from "@prisma/client";
import prisma from "../../database.js";
import { getSevaKendraServicesById } from "../read.js";
import {
  ContactPerson,
  SevaKendraAuditLog,
  SevaKendraServices,
  SevaKendraServicesList,
  SevaKendraUpdateRequestSchemaType,
} from "../../../../types/sevaKendra/sevaKendra.js";
import { updateServicesOnSevaKendras } from "../../../utils/sevaKendra/UpdateHandler.js";
import { createSevaKendraAuditLogDB } from "../create.js";
import { updateContactPersonDB, updateSevaKendraDB } from "../update.js";
import {
  createSevaKendraAuditLogDBObject,
  updateContactPersonDBObject,
  updateSevaKendraDBObject,
} from "../../../../dto/sevaKendra/update.js";
import throwDatabaseError from "../../utils/errorHandler.js";

const updateSevaKendraDBTransaction = async (
  id: string,
  updateRequestSevaKendra: SevaKendraUpdateRequestSchemaType,
  updatedBy: string
) => {
  try {
    const transaction = await prisma.$transaction(
      async (prismaTransaction) => {
        // updating SevaKendraAuditLog table
        await createAuditLogIfExists(
          prismaTransaction,
          updateRequestSevaKendra,
          id
        );
        // updating contactPerson table
        const contactPersonDBObject: ContactPerson =
          updateContactPersonDBObject(updateRequestSevaKendra);
        const updatedContactPerson = await updateContactPersonDB(
          prismaTransaction,
          contactPersonDBObject,
          updateRequestSevaKendra.contactPerson.id
        );
        // filtering and finding services to create and delete using existing service list
        const existingServices: SevaKendraServices | undefined | null =
          await getSevaKendraServicesById(prismaTransaction, id);
        const services: SevaKendraServicesList = updateServicesOnSevaKendras(
          existingServices,
          updateRequestSevaKendra
        );
        const sevaKendraDBObject = await updateSevaKendraDBObject(
          updateRequestSevaKendra,
          updatedBy,
          services
        );
        // updating sevakendra table
        const updatedSevaKendra = await updateSevaKendraDB(
          prismaTransaction,
          sevaKendraDBObject,
          id
        );
        return updatedSevaKendra;
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
        maxWait: 500000, // default: 2000
        timeout: 100000, // default: 5000
      }
    );
    return transaction;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
//only one audit log entry in created at one time
async function createAuditLogIfExists(
  prismaTransaction: Prisma.TransactionClient,
  updateRequestSevaKendra: SevaKendraUpdateRequestSchemaType,
  id: string
) {
  const auditLogDBObject: SevaKendraAuditLog | null =
    createSevaKendraAuditLogDBObject(updateRequestSevaKendra, id);
  if (auditLogDBObject) {
    if (auditLogDBObject.status != updateRequestSevaKendra.currentStatus) {
      const createdAuditLog = await createSevaKendraAuditLogDB(
        prismaTransaction,
        auditLogDBObject
      );
      return createdAuditLog;
    }
  } else {
    throw new Error("auditlog object is null");
  }
}

export default updateSevaKendraDBTransaction;
