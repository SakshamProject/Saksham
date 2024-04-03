
import { z } from "zod";
import { inputFieldSchema } from "../../zodSchemas.js";

const postServiceMasterSchema = z.object({
    serviceTypeId: z.string().uuid(),
    name: inputFieldSchema
});
const putServiceMasterSchema = z.object({
    serviceTypeId: z.string().uuid(),
    name: inputFieldSchema
});

export { postServiceMasterSchema, putServiceMasterSchema };