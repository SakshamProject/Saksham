import {z} from "zod";
import { GenderEnum, AuditLogStatusEnum } from "@prisma/client";
import inputFieldSchema, {dateSchema, emailSchema, phoneNumberSchema, uuidSchema} from "../inputFieldSchema.js";
import {specialCharsRegex} from "../regex.js";

const usersPostSchema = z.object({
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
    date: dateSchema, // effective date
    description: inputFieldSchema
});

// const userPostRequestType = z.infer<typeof usersPostSchema>;

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
    date: dateSchema, // effective date
    description: inputFieldSchema
});

// const userPutRequestType = z.infer<typeof usersPutSchema>;

export { usersPostSchema, usersPutSchema};
// export { userPostRequestType, userPutRequestType };