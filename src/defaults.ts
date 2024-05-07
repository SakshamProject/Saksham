import { AuditLogStatusEnum, Prisma } from "@prisma/client";
import { sortOrderEnum } from "./types/getRequestSchema.js";
import { loginSchemaType } from "./types/authentication/authenticationSchema.js";

type Defaults = {
  skip: number;
  take: number;
  minFieldLength: number;
  sortOrder: sortOrderEnum;
  transactionOptions: {
    isolationLevel: Prisma.TransactionIsolationLevel;
    maxWait: number;
    timeout: number;
  };
  MAX_FILE_SIZE: number;
  createdById: string;
  updatedById: string;
  hashingAlgorithm: string;
};
const defaults: Defaults = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  skip: 0,
  take: 10,
  minFieldLength: 3,
  sortOrder: sortOrderEnum.ascending,
  transactionOptions: {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    maxWait: 50000,
    timeout: 10000,
  },
  createdById: "defaultCreatedById",
  updatedById: "defaultUpdatedById",
  hashingAlgorithm: "sha256",
};

const auditLogDefaults = {
  status: AuditLogStatusEnum.ACTIVE,
  date: new Date().toISOString(),
  description: "NEW RECORD CREATED",
};

const superAdmin: loginSchemaType[] = [
  {
    userName: "adminSaksham",
    password: "c995c8da306900af12c2f562b959f85c2d5fe49075e872813610d2f697058e80",
  },
  {
    userName: "admin",
    password: "41e586bed587fb8d5fc4970928f460bdf8e3e455604b4a3f4aa2ca21bbe7f1f8",
  },
];
const superAdminUserNames = ["admin@saksham", "admin"];
export { auditLogDefaults, superAdmin, superAdminUserNames };
export default defaults;
