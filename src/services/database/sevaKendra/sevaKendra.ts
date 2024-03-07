import prisma from "../database.js";
import {
  ContactPerson,
  ServicesOnSevaKendras,
  SevaKendra,
  SevaKendraAuditLog,
} from "@prisma/client";

const createContactPersonDB = (contactPerson: ContactPerson) => {
  const createdContactPerson = prisma.contactPerson.create({
    data: contactPerson,
  });
  console.log("\n contact created \n");
  console.log(createdContactPerson);
};
const createSevaKendraDB = (sevaKendra: SevaKendra) => {
  const createdSevaKendra = prisma.sevaKendra.create({
    data: sevaKendra,
  });
  console.log("\n sevaKendra created \n");
  console.log(createdSevaKendra);
};

const createServicesOnSevaKendraDB = (
  sevaKendraServices: ServicesOnSevaKendras[]
) => {
  for (let service in sevaKendraServices) {
    const createdServicesOnSevaKendra = prisma.servicesOnSevaKendras.create({
      data: sevaKendraServices[service],
    });
    console.log(createdServicesOnSevaKendra);
  }

  console.log("\n services on sevaKendra created \n");
};
const createAuditLogDB = (auditLog: SevaKendraAuditLog) => {
  const createdAuditLog = prisma.sevaKendraAuditLog.create({
    data: auditLog,
  });
  console.log("\n sevaKendra auditlog created \n");
  console.log(createdAuditLog);
};

export {
  createContactPersonDB,
  createSevaKendraDB,
  createServicesOnSevaKendraDB,
  createAuditLogDB,
};
