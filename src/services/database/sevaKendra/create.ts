import prisma from "../database.js";
import {
  ContactPerson,
  ServicesOnSevaKendras,
  SevaKendra,
  SevaKendraAuditLog,
} from "@prisma/client";

const createContactPersonDB = async (contactPerson: ContactPerson) => {
  const createdContactPerson = await prisma.contactPerson.create({
    data: contactPerson,
  });
  console.log("\n contact created \n");
  console.log(createdContactPerson);
};
const createSevaKendraDB = async (sevaKendra: SevaKendra) => {
  const createdSevaKendra = await prisma.sevaKendra.create({
    data: sevaKendra,
  });
  console.log("\n sevaKendra created \n");
  console.log(createdSevaKendra);
};

const createServicesOnSevaKendraDB = async (
  sevaKendraServices: ServicesOnSevaKendras[]
) => {
  for (let service in sevaKendraServices) {
    const createdServicesOnSevaKendra =
      await prisma.servicesOnSevaKendras.create({
        data: sevaKendraServices[service],
      });
    console.log(createdServicesOnSevaKendra);
  }

  console.log("\n services on sevaKendra created \n");
};
const createAuditLogDB = async (auditLog: SevaKendraAuditLog) => {
  const createdAuditLog = await prisma.sevaKendraAuditLog.create({
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
