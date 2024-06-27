import { AuditLogStatusEnum, Prisma } from '@prisma/client';
import { sortOrderEnum } from './types/getRequestSchema.js';
import { loginSchemaType } from './types/authentication/authenticationSchema.js';

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
  s3: {
    expiresIn: number; // in seconds
  };
  createdById: string;
  updatedById: string;
  hashingAlgorithm: string;
  disabilities: number;
};
const defaults: Defaults = {
  disabilities: 10,
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
  s3: {
    expiresIn: 60 * 60, // 1hr in seconds
  },
  createdById: 'defaultCreatedById',
  updatedById: 'defaultUpdatedById',
  hashingAlgorithm: 'sha256',
};

const auditLogDefaults = {
  status: AuditLogStatusEnum.ACTIVE,
  date: new Date().toISOString(),
  description: 'NEW RECORD CREATED',
};

const GENERAL_TYPES_SEED = {
  EDUCATIONAL_QUALIFICATION: 'Educational Qualification',
  DISABILITY_TYPE: 'Disability Type',
  COMMUNITY_CATEGORY: 'Community Category',
  SERVICE_TYPE: 'Service Type',
  STATE: 'State',
  DISTRICT: 'District',
};
export { auditLogDefaults };
export default defaults;
