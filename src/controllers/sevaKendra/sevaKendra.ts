import { Request, Response } from "express";
import { SevaKendraRequestResponse } from "../../models/sevaKendra/sevaKendra.js";
import {
  ContactPerson,
  ServicesOnSevaKendras,
  SevaKendra,
  SevaKendraAuditLog,
} from "@prisma/client";
import { getDistrictId, getServiceId } from "./dummy.js";
import {
  createAuditLogDB,
  createServicesOnSevaKendraDB,
  createSevaKendraDB,
  createContactPersonDB,
} from "../../services/database/sevaKendra/create.js";
import {
  createContactPersonDBObject,
  createServicesOnSevaKendraDBObject,
  createSevaKendraAuditLogDBObject,
  createSevaKendraDBObject,
} from "../../DTO/sevaKendra/sevaKendra.js";
import { getSevaKendraDB } from "../../services/database/sevaKendra/get.js";
import { orderBySevaKendraColumns } from "../../models/sevaKendra/orderBy.js";

const getSevaKendra = async (request: Request, response: Response) => {
  const sevaKendras = await getSevaKendraDB();
  response.send(sevaKendras);

};
const postSevaKendra = async (request: Request, response: Response) => {
  const newSevaKendra: SevaKendraRequestResponse = request.body;
  const contactPersonDBObject = createContactPersonDBObject(newSevaKendra);
  const contactPersonId = contactPersonDBObject.id;
  await createContactPersonDB(contactPersonDBObject);
  const sevaKendraDBObject = createSevaKendraDBObject(
    newSevaKendra,
    contactPersonId
  );
  const sevaKendraId = sevaKendraDBObject.id;
  await createSevaKendraDB(sevaKendraDBObject);
  const servicesOnSevaKendraDBObject: ServicesOnSevaKendras[] =
    createServicesOnSevaKendraDBObject(sevaKendraId, newSevaKendra);

  await createServicesOnSevaKendraDB(servicesOnSevaKendraDBObject);

  const auditLogDBObject = createSevaKendraAuditLogDBObject(
    newSevaKendra,
    sevaKendraId
  );
  await createAuditLogDB(auditLogDBObject);
  response.send("Mission step 1 SUCCESS");
};
const patchSevaKendra = async (request: Request, response: Response) => {};
const putSevaKendra = async (request: Request, response: Response) => {};
const deleteSevaKendra = async (request: Request, response: Response) => {};

export {
  getSevaKendra,
  postSevaKendra,
  putSevaKendra,
  patchSevaKendra,
  deleteSevaKendra,
};
