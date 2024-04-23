import {
  SevaKendra,
  SevaKendraFilterType,
  SevaKendraRequestSchemaType,
  SevaKendraWhere,
} from "../../types/sevaKendra/sevaKendra.js";
import { AuditLogStatusEnum, Prisma } from "@prisma/client";
import { sevaKendraDefaults } from "../../types/sevaKendra/sevaKendraDefaults.js";
import { generateSevaKendraFilter } from "../../services/database/utils/sevaKendra/filterMapper.js";

const createSevaKendraDBObject = (
  sevaKendra: SevaKendraRequestSchemaType,
  createdBy: string,
  updatedBy: string
) => {
  const sevaKendraDBObject: SevaKendra = {
    name: sevaKendra.name,
    district: {
      connect: {
        id: sevaKendra.districtId,
      },
    },
    address: sevaKendra.address,
    mobileNumber: sevaKendra.mobileNumber,
    landLineNumber: sevaKendra.landLineNumber,
    startDate: sevaKendra.startDate || new Date().toISOString(),
    contactPerson: {
      create: {
        name: sevaKendra.contactPerson.name,
        email: sevaKendra.contactPerson.email,
        phoneNumber1: sevaKendra.contactPerson.phoneNumber1,
        phoneNumber2: sevaKendra.contactPerson.phoneNumber2,
      },
    },
    services: {
      createMany: {
        data: sevaKendra.servicesBySevaKendra,
        skipDuplicates: true,
      },
    },
    auditLog: {
      create: {
        date: sevaKendraDefaults.date,
        description: sevaKendraDefaults.description,
        status: AuditLogStatusEnum.ACTIVE,
      },
    },
    createdBy: { connect: { id: createdBy } },
    createdAt: new Date().toISOString(),
    updatedBy: { connect: { id: updatedBy } },
    updatedAt: new Date().toISOString(),
  };
  return sevaKendraDBObject;
};

const createSevaKendraFilterInputObject = (
  sevaKendraFilter: SevaKendraFilterType | undefined,
  globalSearchConditions: SevaKendraWhere | null
): SevaKendraWhere => {
  const sevaKendraWhereInput = generateSevaKendraFilter(
    sevaKendraFilter,
    globalSearchConditions
  );
  return sevaKendraWhereInput;
};

export { createSevaKendraDBObject, createSevaKendraFilterInputObject };
