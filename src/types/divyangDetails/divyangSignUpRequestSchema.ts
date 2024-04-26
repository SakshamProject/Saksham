import { z } from "zod";
import inputFieldSchema, {
  emailSchema,
  passwordSchema,
  phoneNumberSchema,
  userNameSchema,
} from "../inputFieldSchema.js";
import { GenderEnum } from "@prisma/client";

const divyangSignUpRequestSchema = z
  .object({
    username: userNameSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    firstName: inputFieldSchema,
    lastName: inputFieldSchema,
    divyangId: inputFieldSchema,
    picture: inputFieldSchema.optional(),
    gender: z.nativeEnum(GenderEnum), // is optional in sheet
    dateOfBirth: z.string().datetime(),
    age: z.number().optional(),
    mailId: emailSchema,
    mobileNumber: phoneNumberSchema,
    aadharCardNumber: z
      .string()
      .length(12)
      .regex(/^\d{12}$/, "Invalid Aadhaar number format"),
    UDIDCardNumber: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
type DivyangSignUp = z.infer<typeof divyangSignUpRequestSchema>;

export { divyangSignUpRequestSchema, DivyangSignUp };
