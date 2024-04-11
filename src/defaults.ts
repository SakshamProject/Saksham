import { AuditLogStatusEnum, Prisma } from "@prisma/client";
import { sortOrderEnum } from "./types/getRequestSchema.js";

const defaults = {
  skip : 0,
  take : 10,
  minFieldLength: 3,
  sortOrder: sortOrderEnum.ascending,
  transactionOptions: {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      maxWait: 50000,
      timeout: 10000,
  }
}
 const auditLogDefaults = {

  status:AuditLogStatusEnum.ACTIVE,
  date :new Date().toISOString(),
  description: "NEW RECORD CREATED"
}


export {auditLogDefaults}
export default defaults;
