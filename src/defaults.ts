
import { AuditLogStatusEnum, Prisma } from "@prisma/client";
import { sortOrderEnum } from "./types/getRequestSchema.js";

type Defaults = {
    skip: number,
    take: number,
    minFieldLength: number,
    sortOrder: sortOrderEnum,
    transactionOptions: {
        isolationLevel: Prisma.TransactionIsolationLevel,
        maxWait: number,
        timeout: number
    },
    MAX_FILE_SIZE: number,
    s3: {
        expiresIn: number // in seconds
    }
}
const defaults: Defaults = {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    skip : 0,
    take : 10,
    minFieldLength: 3,
    sortOrder: sortOrderEnum.ascending,
    transactionOptions: {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 50000,
        timeout: 10000,
    },
    s3: {
        expiresIn: 60 * 60 // 1hr in seconds
    }
}


 const auditLogDefaults = {

  status:AuditLogStatusEnum.ACTIVE,
  date :new Date().toISOString(),
  description: "NEW RECORD CREATED"
}


export {auditLogDefaults}
export default defaults;