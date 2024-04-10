import { Prisma } from "@prisma/client";
import {
  ContactPerson,
  SevaKendraUpdate,
} from "../../../types/sevaKendra/sevaKendra.js";
import throwDatabaseError from "../utils/errorHandler.js";

const updateContactPersonDB = async (
  prismaTransaction: Prisma.TransactionClient,
  contactPerson: ContactPerson,
  id: string
) => {
  try {
    const updatedContactPerson = await prismaTransaction.contactPerson.update({
      where: {
        id: id,
      },
      data: contactPerson,
    });
    return updatedContactPerson;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const updateSevaKendraDB = async (
  prismaTransaction: Prisma.TransactionClient,
  sevaKendra: SevaKendraUpdate,
  id: string
) => {
  try {
    const updatedSevaKendra = await prismaTransaction.sevaKendra.update({
      where: {
        id: id,
      },
      data: sevaKendra,
      include: {
        contactPerson: true,
        SevaKendraAuditLog: true,
        services: true,
      },
    });
    return updatedSevaKendra;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { updateContactPersonDB, updateSevaKendraDB };
