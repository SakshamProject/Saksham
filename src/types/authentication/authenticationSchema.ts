import { z } from "zod";
import {
  passwordSchema,
  phoneNumberSchema,
  userNameSchema,
} from "../inputFieldSchema.js";

const loginSchema = z.object({
  userName: userNameSchema,
  password: passwordSchema,
});
type loginSchemaType = z.infer<typeof loginSchema>;

const divyangForgetPasswordSchema = z.object({
  userName: userNameSchema,
  UDIDCardNumber: z.string(),
});
type divyangForgetPasswordSchemaType = z.infer<
  typeof divyangForgetPasswordSchema
>;
const userForgetPasswordSchema = z.object({
  userName: userNameSchema,
  contactNumber: phoneNumberSchema,
});
type userForgetPasswordSchemaType = z.infer<typeof userForgetPasswordSchema>;

const updatePasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords don't match",
  });
type updatePasswordSchemaType = z.infer<typeof updatePasswordSchema>;
export {
  loginSchema,
  loginSchemaType,
  divyangForgetPasswordSchema,
  divyangForgetPasswordSchemaType,
  userForgetPasswordSchema,
  userForgetPasswordSchemaType,
  updatePasswordSchema,
  updatePasswordSchemaType,
};
