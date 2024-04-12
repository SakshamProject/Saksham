import {z} from "zod";
import { GenderEnum, AuditLogStatusEnum } from "@prisma/client";
import inputFieldSchema, {dateSchema, emailSchema, phoneNumberSchema, uuidSchema} from "../inputFieldSchema.js";
import {specialCharsRegex} from "../regex.js";

const usersPostSchema = z.object({
    sevaKendraId: uuidSchema.optional(),
    userId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.nativeEnum(GenderEnum).optional(),
    dateOfBirth: dateSchema.optional(),
    designationId: z.string().uuid(),
    email: emailSchema,
    contactNumber: phoneNumberSchema,
    whatsappNumber: phoneNumberSchema,
    loginId: phoneNumberSchema,
    password: z.string().regex(specialCharsRegex),
    // audit log
    status: z.nativeEnum(AuditLogStatusEnum),
    effectiveDate: dateSchema, // effective date
    description: z.string().optional()
});
type userPostRequestType = z.infer<typeof usersPostSchema>;

const usersPutSchema = z.object({
    sevaKendraId: uuidSchema,
    userId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.nativeEnum(GenderEnum).optional(),
    dateOfBirth: dateSchema.optional(),
    designationId: z.string().uuid(),
    mail: emailSchema,
    contactNumber: phoneNumberSchema,
    whatsappNumber: phoneNumberSchema,
    loginId: phoneNumberSchema,
    password: z.string().regex(specialCharsRegex),
    // audit log
    status: z.nativeEnum(AuditLogStatusEnum),
    effectiveDate: dateSchema,
    description: inputFieldSchema.optional()
});
type userPutRequestType = z.infer<typeof usersPutSchema>;

export { usersPostSchema, usersPutSchema};
export { userPostRequestType, userPutRequestType };