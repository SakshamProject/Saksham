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
} from "../../services/database/sevaKendra/sevaKendra.js";
import {
  createContactPersonDBObject,
  createServicesOnSevaKendraDBObject,
  createSevaKendraAuditLogDBObject,
  createSevaKendraDBObject,
} from "../../DTO/sevaKendra/sevaKendra.js";

const getSevaKendra = async (request: Request, response: Response) => {};
const postSevaKendra = async (request: Request, response: Response) => {
  const newSevaKendra: SevaKendraRequestResponse = request.body;
  const contactPersonDBObject = createContactPersonDBObject(newSevaKendra);
  const contactPersonId = contactPersonDBObject.id;
  createContactPersonDB(contactPersonDBObject);
  const sevaKendraDBObject = createSevaKendraDBObject(
    newSevaKendra,
    contactPersonId
  );
  const sevaKendraId = sevaKendraDBObject.id;
  createSevaKendraDB(sevaKendraDBObject);
  const servicesOnSevaKendraDBObject: ServicesOnSevaKendras[] =
    createServicesOnSevaKendraDBObject(sevaKendraId, newSevaKendra);

  createServicesOnSevaKendraDB(servicesOnSevaKendraDBObject);

  const auditLogDBObject = createSevaKendraAuditLogDBObject(
    newSevaKendra,
    sevaKendraId
  );
  createAuditLogDB(auditLogDBObject);
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
