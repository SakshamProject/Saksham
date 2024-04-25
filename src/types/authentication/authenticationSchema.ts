import { z } from "zod";
import { passwordSchema, userNameSchema } from "../inputFieldSchema.js";

const loginSchema = z.object({
  userName: userNameSchema,
  password: passwordSchema,
});
type loginSchemaType = z.infer<typeof loginSchema>;

export { loginSchema, loginSchemaType };
