import { z } from "zod";
import { passwordRegex, userNameRegex } from "../regex.js";


const loginSchema = z.object({
    userName:z.string().regex(userNameRegex),
   password:z.string().regex(passwordRegex)


})
type loginSchemaType = z.infer<typeof loginSchema>;

export{loginSchema,loginSchemaType}