import { Prisma } from "@prisma/client";
import prisma from "../../database.js";
import { getSevaKendraServicesById } from "../read.js";
import {
  ContactPerson,
  SevaKendraAuditLog,
  SevaKendraServices,
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
  const transaction = prisma.$transaction(
    async (prismaTransaction) => {
      try {
        await createAuditLogIfExists(
          prismaTransaction,
          updateRequestSevaKendra,
          id
        );

        const contactPersonDBObject: ContactPerson =
          updateContactPersonDBObject(updateRequestSevaKendra);
        const updatedContactPerson = await updateContactPersonDB(
          contactPersonDBObject,
          updateRequestSevaKendra.contactPerson.id
        );

        const existingServices: SevaKendraServices | undefined | null =
          await getSevaKendraServicesById(prismaTransaction, id);
        const services = updateServicesOnSevaKendras(
          existingServices,
          updateRequestSevaKendra
        );
        const sevaKendraDBObject = await updateSevaKendraDBObject(
          updateRequestSevaKendra,
          updatedBy,
          services
        );
        const updatedSevaKendra = await updateSevaKendraDB(
          sevaKendraDBObject,
          id
        );
        return updatedSevaKendra;
      } catch (error) {
        if (error instanceof Error) throwDatabaseError(error);
      }
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
      maxWait: 5000, // default: 2000
      timeout: 10000, // default: 5000
    }
  );
  return transaction;
};

export default updateSevaKendraDBTransaction;

async function createAuditLogIfExists(
  prismaTransaction: Prisma.TransactionClient,
  updateRequestSevaKendra: SevaKendraUpdateRequestSchemaType,
  id: string
) {
  if (updateRequestSevaKendra.auditLog) {
    const auditLogDBObject: SevaKendraAuditLog | null =
      createSevaKendraAuditLogDBObject(updateRequestSevaKendra, id);
    if (auditLogDBObject) {
      const createAuditLog = await createSevaKendraAuditLogDB(
        prismaTransaction,
        auditLogDBObject
      );
    } else {
      throw new Error("auditlog object is null");
    }
  }
}
