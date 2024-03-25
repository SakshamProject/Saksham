import prisma from "../database.js";
import {
  ContactPerson,
  ServicesOnSevaKendras,
  SevaKendra,
  SevaKendraAuditLog,
} from "@prisma/client";

const updateContactPersonDB = async (contactPerson: ContactPerson) => {
  const updatedContactPerson = await prisma.contactPerson.update({
    where: {
      id: contactPerson.id,
    },
    data: contactPerson,
  });
  console.log("\n contact updated \n");
  console.log(updatedContactPerson);
};
const updateSevaKendraDB = async (sevaKendra: SevaKendra) => {
  const updatedSevaKendra = await prisma.sevaKendra.update({
    where: {
      id: sevaKendra.id,
    },
    data: sevaKendra,
  });
  console.log("\n sevaKendra updated \n");
  console.log(updatedSevaKendra);
};

const updateServicesOnSevaKendraDB = async (
  sevaKendraServices: ServicesOnSevaKendras[]
) => {
  for (const service of sevaKendraServices) {
    const updatedServicesOnSevaKendra =
      await prisma.servicesOnSevaKendras.upsert({
        where: {
          id: service.id,
        },
        update: service,
        create: service,
      });
    console.log(updatedServicesOnSevaKendra);
  }
  console.log("\n services on sevaKendra updated \n");
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
  updateServicesOnSevaKendraDB,
  updateSevaKendraAuditLogDB,
};
