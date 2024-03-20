import {
  ContactPerson,
  ServicesOnSevaKendras,
  SevaKendra,
  SevaKendraAuditLog,
} from "@prisma/client";
import { SevaKendraRequest } from "../../models/sevaKendra/Request.js";
import { randomUUID } from "crypto";
import { getServiceId } from "../../controllers/sevaKendra/dummy.js";
import { getDistrictIdByName } from "../../services/database/typeMaster/get.js";

const createSevaKendraDBObject = async (
  sevaKendra: SevaKendraRequest,
  contactPersonId: string
): Promise<SevaKendra> => {
  const districtId: string = await getDistrictIdByName(sevaKendra.district);
  const sevaKendraDB: SevaKendra = {
    id: randomUUID(),
    name: sevaKendra.name,
    districtId: districtId,
    address: sevaKendra.address,
    mobileNumber: sevaKendra.mobileNumber,
    landLineNumber: sevaKendra.landLineNumber,
    startDate: sevaKendra.startDate,
    contactPersonId: contactPersonId,
    createdAt: sevaKendra.createdAt,
    createdBy: sevaKendra.createdBy,
    updatedAt: sevaKendra.updatedAt,
    updatedBy: sevaKendra.updatedBy,
    isActive: sevaKendra.isActive,
  };
  return sevaKendraDB;
};

const createContactPersonDBObject = (
  sevaKendra: SevaKendraRequest
): ContactPerson => {
  const contactPersonDBObject: ContactPerson = {
    id: randomUUID(),
    name: sevaKendra.contactPerson.name,
    email: sevaKendra.contactPerson.email,
    phoneNumber1: sevaKendra.contactPerson.phoneNumber1,
    phoneNumber2: sevaKendra.contactPerson.phoneNumber2,
  };

  return contactPersonDBObject;
};

const createServicesOnSevaKendraDBObject = (
  sevaKendraId: string,
  sevaKendra: SevaKendraRequest
): ServicesOnSevaKendras[] => {
  let servicesOnSevaKendra: ServicesOnSevaKendras[] = [];

  for (let service in sevaKendra.servicesBySevaKendra) {
    const servicesOnSevaKendraDBObject: ServicesOnSevaKendras = {
      id: randomUUID(),
      sevaKendraId: sevaKendraId,
      serviceId: getServiceId(service),
    };
    servicesOnSevaKendra.push(servicesOnSevaKendraDBObject);
  }
  return servicesOnSevaKendra;
};
const createSevaKendraAuditLogDBObject = (
  sevaKendra: SevaKendraRequest,
  sevaKendraId: string
): SevaKendraAuditLog => {
  const sevaKendraAuditLog: SevaKendraAuditLog = {
    id: randomUUID(),
    date: sevaKendra.auditLog.date,
    description: sevaKendra.auditLog.description,
    sevaKendraId: sevaKendraId,
    status: sevaKendra.auditLog.status,
  };

  return sevaKendraAuditLog;
};

export {
  createSevaKendraDBObject,
  createContactPersonDBObject,
  createSevaKendraAuditLogDBObject,
  createServicesOnSevaKendraDBObject,
};
