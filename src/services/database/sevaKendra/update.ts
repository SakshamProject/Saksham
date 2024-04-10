import { Prisma } from "@prisma/client";
import {
  ContactPerson,
  SevaKendraAuditLog,
  SevaKendraUpdate,
} from "../../../types/sevaKendra/sevaKendra.js";

const updateContactPersonDB = async (
  prismaTransaction: Prisma.TransactionClient,
  contactPerson: ContactPerson,
  id: string
) => {
  const updatedContactPerson = await prismaTransaction.contactPerson.update({
    where: {
      id: id,
    },
    data: contactPerson,
  });
  return updatedContactPerson;
};
const updateSevaKendraDB = async (
  prismaTransaction: Prisma.TransactionClient,
  sevaKendra: SevaKendraUpdate,
  id: string
) => {
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
  console.log("updated", updatedSevaKendra);
  return updatedSevaKendra;
};

export { updateContactPersonDB, updateSevaKendraDB };
