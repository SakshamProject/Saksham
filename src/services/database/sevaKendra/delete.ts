// import prisma from "../database.js";

// const deleteContactPersonDB = async (id: string) => {
//   const deletedContactPerson = await prisma.contactPerson.delete({
//     where: {
//       id: id,
//     },
//   });
//   console.log(deletedContactPerson);
//   return deletedContactPerson;
// };
// const deleteSevaKendraDB = async (id: string) => {
//   const deletedSevaKendra = await prisma.sevaKendra.delete({
//     where: {
//       id: id,
//     },
//   });
//   console.log(deleteSevaKendraDB);
//   return deletedSevaKendra;
// };
// const deleteSevaKendraAuditLogsDB = async (id: string) => {
//   const deletedAuditLogs = await prisma.sevaKendraAuditLog.deleteMany({
//     where: {
//       sevaKendraId: id,
//     },
//   });
//   console.log(deletedAuditLogs);
//   return deletedAuditLogs;
// };
// const deleteSerivesOnSevaKendraDB = async (id: string) => {
//   const deletedServicesOnSevaKendra =
//     await prisma.servicesOnSevaKendras.deleteMany({
//       where: {
//         sevaKendraId: id,
//       },
//     });
//   console.log(deletedServicesOnSevaKendra);
//   return deletedServicesOnSevaKendra;
// };

// export {
//   deleteSevaKendraDB,
//   deleteContactPersonDB,
//   deleteSevaKendraAuditLogsDB,
//   deleteSerivesOnSevaKendraDB,
// };
