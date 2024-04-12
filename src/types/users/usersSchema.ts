import {z} from "zod";
import { GenderEnum, AuditLogStatusEnum } from "@prisma/client";
import inputFieldSchema, {dateSchema, emailSchema, phoneNumberSchema, uuidSchema} from "../inputFieldSchema.js";
import {specialCharsRegex} from "../regex.js";

const usersPostSchema = z.object({
    sevaKendraId: uuidSchema.optional(),
    userId: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    gender: z.nativeEnum(GenderEnum).optional(),
    dateOfBirth: dateSchema.optional(),
    designationId: z.string().uuid().optional(),
    mail: emailSchema.optional(),
    contactNumber: phoneNumberSchema.optional(),
    whatsappNumber: phoneNumberSchema.optional(),
    loginId: phoneNumberSchema.optional(),
    password: z.string().regex(specialCharsRegex).optional(),
    // audit log
    status: z.nativeEnum(AuditLogStatusEnum).optional(),
    effectiveDate: dateSchema.optional(), // effective date
    // description: inputFieldSchema
    description: z.string().optional()
});
const userPostRequestType = z.infer<typeof usersPostSchema>;

const usersPutSchema = z.object({
    sevaKendraId: uuidSchema,
    userId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.nativeEnum(GenderEnum),
    dateOfBirth: dateSchema,
    designationId: z.string().uuid(),
    mail: emailSchema,
    contactNumber: phoneNumberSchema,
    whatsappNumber: phoneNumberSchema,
    loginId: phoneNumberSchema,
    password: z.string().regex(specialCharsRegex),
    // audit log
    status: z.nativeEnum(AuditLogStatusEnum),
    effectiveDate: dateSchema,
    description: z.string()
    // description: inputFieldSchema
});
const userPutRequestType = z.infer<typeof usersPutSchema>;

export { usersPostSchema, usersPutSchema};
export { userPostRequestType, userPutRequestType };