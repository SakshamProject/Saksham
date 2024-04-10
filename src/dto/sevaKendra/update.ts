import {
  ContactPerson,
  SevaKendraAuditLog,
  SevaKendraServicesList,
  SevaKendraUpdate,
  SevaKendraUpdateRequestSchemaType,
} from "../../types/sevaKendra/sevaKendra.js";

const updateSevaKendraDBObject = (
  sevaKendra: SevaKendraUpdateRequestSchemaType,
  updatedBy: string,
  services: SevaKendraServicesList = {
    servicesToCreate: [],
    servicesToDelete: [],
  }
): SevaKendraUpdate => {
  const sevaKendraDBObject: SevaKendraUpdate = {
    name: sevaKendra.name,
    district: {
      connect: { id: sevaKendra.districtId },
    },
    address: sevaKendra.address,
    mobileNumber: sevaKendra.mobileNumber,
    landLineNumber: sevaKendra.landLineNumber,
    startDate: sevaKendra.startDate,
    updatedBy: updatedBy,
    updatedAt: new Date().toISOString(),
    services: {
      createMany: {
        data: services.servicesToCreate,
      },
      deleteMany: {
        serviceId: {
          in: services.servicesToDelete,
        },
      },
    },
  };
  return sevaKendraDBObject;
};

const updateContactPersonDBObject = (
  sevaKendra: SevaKendraUpdateRequestSchemaType
) => {
  const contactPersonDBObject: ContactPerson = {
    name: sevaKendra.contactPerson.name,
    email: sevaKendra.contactPerson.email,
    phoneNumber1: sevaKendra.contactPerson.phoneNumber1,
    phoneNumber2: sevaKendra.contactPerson.phoneNumber2,
  };
  return contactPersonDBObject;
};

const createSevaKendraAuditLogDBObject = (
  sevaKendra: SevaKendraUpdateRequestSchemaType,
  sevaKendraId: string
): SevaKendraAuditLog | null => {
  if (!sevaKendra.auditLog.id) {
    const auditLogDBObject = {
      sevakendra: {
        connect: {
          id: sevaKendraId,
        },
      },
      date: sevaKendra.auditLog.date,
      description: sevaKendra.auditLog.description,
      status: sevaKendra.auditLog.status,
    };
    return auditLogDBObject;
  }

  return null;
};

export {
  updateSevaKendraDBObject,
  updateContactPersonDBObject,
  createSevaKendraAuditLogDBObject,
};
