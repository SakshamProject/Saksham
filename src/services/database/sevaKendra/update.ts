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

const updateSevaKendraAuditLogDB = async (auditLog: SevaKendraAuditLog[]) => {
  for (const log of auditLog) {
    const updatedAuditLog = await prisma.sevaKendraAuditLog.upsert({
      where: {
        id: log.id,
      },
      create: log,
      update: log,
    });
    console.log(updatedAuditLog);
  }
  console.log("\n sevaKendra auditlog updated \n");
};

export {
  updateContactPersonDB,
  updateSevaKendraDB,
  updateSevaKendraAuditLogDB,
};
