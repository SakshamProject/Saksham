// import { Request, Response } from "express";
// import {
//   getContactPersonIdBySevaKendraId,
//   getSevaKendraDB,
//   getSevaKendrabyIdDB,
// } from "../../services/database/sevaKendra/get.js";
// import { sevaKendraColumnNameMapper } from "../../services/utils/sevaKendra/sevaKendra.js";
// import SevaKendraUpdateRequest from "../../models/sevaKendra/update.js";
// import {
//   updateContactPersonDBObject,
//   updateServicesOnSevaKendraDBObject,
//   updateSevaKendraAuditLogDBObject,
//   updateSevaKendraDBObject,
// } from "../../dto/sevaKendra/update.js";
// import {
//   updateContactPersonDB,
//   updateServicesOnSevaKendraDB,
//   updateSevaKendraAuditLogDB,
//   updateSevaKendraDB,
// } from "../../services/database/sevaKendra/update.js";
// import {
//   deleteContactPersonDB,
//   deleteSerivesOnSevaKendraDB,
//   deleteSevaKendraAuditLogsDB,
//   deleteSevaKendraDB,
// } from "../../services/database/sevaKendra/delete.js";
// import getRequestSchema from "../../types/getRequestSchema.js";
// import { ContactPerson, SevaKendra } from "../../types/sevaKendra/sevaKendra.js";

// const getSevaKendra = async (request: Request, response: Response) => {
//   const query = getRequestSchema.parse(request.query);
//   const orderByColumnAndDirection = sevaKendraColumnNameMapper(
//     query.orderByColumn,
//     query.sortOrder
//   );
//   const sevaKendras = await getSevaKendraDB(
//     orderByColumnAndDirection,
//     query.start,
//     query.rows
//   );
//   response.send(sevaKendras);
// };
// const getSevaKendraById = async (request: Request, response: Response) => {
//   const id = request.params.id;
//   console.log(id);
//   const sevaKendra = await getSevaKendrabyIdDB(id);
//   response.send(sevaKendra);
// };
// const putSevaKendra = async (request: Request, response: Response) => {
//   const sevaKendraUpdateRequest: SevaKendraUpdateRequest = request.body;
//   const contactPersonDBObject: ContactPerson =
//     await updateContactPersonDBObject(sevaKendraUpdateRequest);
//   // await updateContactPersonDB(contactPersonDBObject);
//   const sevaKendraDBObject: SevaKendra = await updateSevaKendraDBObject(
//     sevaKendraUpdateRequest
//   );
//   await updateSevaKendraDB(sevaKendraDBObject);
//   const servicesOnSevaKendraDBObject = await updateServicesOnSevaKendraDBObject(
//     sevaKendraUpdateRequest
//   );
//   await updateServicesOnSevaKendraDB(servicesOnSevaKendraDBObject);
//   const auditLogDBObject = await updateSevaKendraAuditLogDBObject(
//     sevaKendraUpdateRequest
//   );
//   await updateSevaKendraAuditLogDB(auditLogDBObject);
// };
// const deleteSevaKendra = async (request: Request, response: Response) => {
//   const id = request.params.id;
//   const contactPersonId = await getContactPersonIdBySevaKendraId(id);
//   await deleteContactPersonDB(contactPersonId);
//   await deleteSevaKendraDB(id);
//   await deleteSerivesOnSevaKendraDB(id);
//   await deleteSevaKendraAuditLogsDB(id);
// };

// export {
//   getSevaKendra,
//   postSevaKendra,
//   putSevaKendra,
//   deleteSevaKendra,
//   getSevaKendraById,
// };
