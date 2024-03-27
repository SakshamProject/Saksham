import {
  ContactPerson,
  ServicesOnSevaKendras,
  SevaKendra,
  SevaKendraAuditLog,
} from "@prisma/client";
import SevaKendraUpdateRequest from "../../models/sevaKendra/update.js";
import { getServiceId } from "../../controllers/sevaKendra/dummy.js";
import { randomUUID } from "crypto";

const updateContactPersonDBObject = async (
  sevaKendra: SevaKendraUpdateRequest
): Promise<ContactPerson> => {
  const contactPersonDBObject: ContactPerson = {
    id: sevaKendra.contactPerson.id,
    name: sevaKendra.contactPerson.name,
    email: sevaKendra.contactPerson.email,
    phoneNumber1: sevaKendra.contactPerson.phoneNumber1,
    phoneNumber2: sevaKendra.contactPerson.phoneNumber2,
  };

  return contactPersonDBObject;
};
const updateSevaKendraDBObject = async (
  sevaKendra: SevaKendraUpdateRequest
): Promise<SevaKendra> => {
  const sevaKendraDB: SevaKendra = {
    id: sevaKendra.id,
    name: sevaKendra.name,
    districtId: sevaKendra.districtId,
    address: sevaKendra.address,
    mobileNumber: sevaKendra.mobileNumber,
    landLineNumber: sevaKendra.landLineNumber,
    startDate: sevaKendra.startDate,
    contactPersonId: sevaKendra.contactPerson.id,
    createdAt: sevaKendra.createdAt,
    createdBy: sevaKendra.createdBy,
    updatedAt: sevaKendra.updatedAt,
    updatedBy: sevaKendra.updatedBy,
    isActive: sevaKendra.isActive,
  };
  return sevaKendraDB;
};
const updateServicesOnSevaKendraDBObject = (
  sevaKendra: SevaKendraUpdateRequest
): ServicesOnSevaKendras[] => {
  let servicesOnSevaKendra: ServicesOnSevaKendras[] = [];

  for (const service of sevaKendra.servicesBySevaKendra) {
    const serviceId = getServiceId(service.serviceName);
    const id = service.id === undefined ? randomUUID() : service.id;
    const servicesOnSevaKendraDBObject: ServicesOnSevaKendras = {
      id: id,
      sevaKendraId: sevaKendra.id,
      serviceId: serviceId,
    };
    servicesOnSevaKendra.push(servicesOnSevaKendraDBObject);
  }
  return servicesOnSevaKendra;
};
const updateSevaKendraAuditLogDBObject = (
  sevaKendra: SevaKendraUpdateRequest
): SevaKendraAuditLog[] => {
  let sevaKendraAuditLogs: SevaKendraAuditLog[] = [];
  for (const auditLog of sevaKendra.auditLog) {
    const id = auditLog.id === undefined ? randomUUID() : auditLog.id;
    const updatedSevaKendraAuditLog: SevaKendraAuditLog = {
      id: id,
      date: auditLog.date,
      description: auditLog.description,
      sevaKendraId: sevaKendra.id,
      status: auditLog.status,
    };
    sevaKendraAuditLogs.push(updatedSevaKendraAuditLog);
  }
  return sevaKendraAuditLogs;
};
export {
  updateContactPersonDBObject,
  updateSevaKendraDBObject,
  updateServicesOnSevaKendraDBObject,
  updateSevaKendraAuditLogDBObject,
};
