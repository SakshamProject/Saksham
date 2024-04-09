import {
  ContactPerson,
  SevaKendraAuditLog,
  SevaKendraUpdate,
} from "../../../types/sevaKendra/sevaKendra.js";
import prisma from "../database.js";

const updateContactPersonDB = async (
  contactPerson: ContactPerson,
  id: string
) => {
  const updatedContactPerson = await prisma.contactPerson.update({
    where: {
      id: id,
    },
    data: contactPerson,
  });
  return updatedContactPerson;
};
const updateSevaKendraDB = async (sevaKendra: SevaKendraUpdate, id: string) => {
  const updatedSevaKendra = await prisma.sevaKendra.update({
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
};

export { updateContactPersonDB, updateSevaKendraDB };
