import {
  ContactPerson,
  ServicesOnSevaKendras,
  SevaKendra,
  SevaKendraAuditLog,
} from "../../../types/sevaKendra/sevaKendra.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

// const createContactPersonDB = async (contactPerson: ContactPerson) => {
//   const createdContactPerson = await prisma.contactPerson.create({
//     data: contactPerson,
//   });
//   return createdContactPerson;
//   console.log("\n contact created \n");
//   console.log(createdContactPerson);
// };
const createSevaKendraDB = async (sevaKendra: SevaKendra) => {
  try {
    console.log(sevaKendra);
    const createdSevaKendra = await prisma.sevaKendra.create({
      data: sevaKendra,
      // {
      //   name: sevaKendra.name,
      //   district: sevaKendra.district,
      //   address: sevaKendra.address,
      //   mobileNumber: sevaKendra.mobileNumber,
      //   landLineNumber: sevaKendra.landLineNumber,
      //   contactPerson: sevaKendra.contactPerson,
      // },
    });
    console.log("\n sevaKendra created \n");
    console.log(createdSevaKendra);
    return createdSevaKendra;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

// const createServicesOnSevaKendraDB = async (
//   sevaKendraServices: ServicesOnSevaKendras[]
// ) => {
//   for (let service in sevaKendraServices) {
//     const createdServicesOnSevaKendra =
//       await prisma.servicesOnSevaKendras.create({
//         data: sevaKendraServices[service],
//       });
//     console.log(createdServicesOnSevaKendra);
//   }

//   console.log("\n services on sevaKendra created \n");
// };
// const createAuditLogDB = async (auditLog: SevaKendraAuditLog) => {
//   const createdAuditLog = await prisma.sevaKendraAuditLog.create({
//     data: auditLog,
//   });
//   console.log("\n sevaKendra auditlog created \n");
//   console.log(createdAuditLog);
// };

export {
  //   createContactPersonDB,
  createSevaKendraDB,
  //   createServicesOnSevaKendraDB,
  //   createAuditLogDB,
};
