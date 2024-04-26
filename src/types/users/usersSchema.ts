import { z } from "zod";
import { GenderEnum, AuditLogStatusEnum } from "@prisma/client";
import inputFieldSchema, {
  auditLogSchema,
  dateSchema,
  emailSchema,
  phoneNumberSchema,
  uuidSchema,
} from "../inputFieldSchema.js";
import { specialCharsRegex, userNameRegex } from "../regex.js";
import { sortOrderEnum } from "../getRequestSchema.js";

const usersPostSchema = z.object({
  sevaKendraId: uuidSchema.optional(),
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.nativeEnum(GenderEnum).optional(),
  dateOfBirth: dateSchema.optional(),
  designationId: z.string().uuid(),
  email: emailSchema,
  userName: inputFieldSchema,
  password: z.string(),
  contactNumber: phoneNumberSchema,
  whatsappNumber: phoneNumberSchema.optional(),
  // audit log
  status: z.nativeEnum(AuditLogStatusEnum),
  effectiveDate: dateSchema, // effective date
  description: z.string().optional(),
});
type userPostRequestType = z.infer<typeof usersPostSchema>;

const usersPutSchema = z.object({
  sevaKendraId: uuidSchema.optional(),
  personId: uuidSchema,
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.nativeEnum(GenderEnum).optional(),
  dateOfBirth: dateSchema.optional(),
  designationId: z.string().uuid(),
  email: emailSchema,
  userName: inputFieldSchema,
  password: z.string(),
  contactNumber: phoneNumberSchema,
  whatsappNumber: phoneNumberSchema.optional(),
  // audit log
  auditlog: auditLogSchema.optional(),
});
type userPutRequestType = z.infer<typeof usersPutSchema>;

enum userFilterOperationsEnum {
  startsWith = "startsWith",
  endsWith = "endsWith",
  equals = "equals",
  notEquals = "notEquals",
}

enum userFilterColumnNamesEnum {
  firstName = "firstName",
  lastName = "lastName",
  name = "name",
  district = "district",
  state = "state",
  sevaKendraName = "sevaKendraName",
  designation = "designationName",
}

enum userOrderByEnum {
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  name = "name",
  district = "district",
  state = "state",
  sevaKendraName = "sevaKendraName",
  designation = "designationName",
}

const userFilterSchema = z
  .object({
    operation: z.nativeEnum(userFilterOperationsEnum),
    field: z.nativeEnum(userFilterColumnNamesEnum),
    value: z.string(),
  })
  .array();

const paginationSchema = z.object({
  start: z.coerce
    .number()
    .positive()
    .transform((number) => {
      return number - 1;
    }),
  rows: z.coerce.number().positive(),
});

const userListSchema = z.object({
  filters: userFilterSchema.optional(),
  pagination: paginationSchema.optional(),
  searchText: z.string().optional(),
  sorting: z
    .object({
      orderByColumn: z.nativeEnum(userOrderByEnum),
      sortOrder: z.nativeEnum(sortOrderEnum),
    })
    .optional(),
});

type userListType = z.infer<typeof userListSchema>;

export { userOrderByEnum };
export { usersPostSchema, usersPutSchema, userListSchema };
export { userPostRequestType, userPutRequestType, userListType };
