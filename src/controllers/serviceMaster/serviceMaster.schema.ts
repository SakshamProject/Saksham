
import { z } from "zod";
import { inputFieldSchema } from "../../types/zodSchemas.js";

const postServiceMasterSchema = z.object({
    subTypeId: z.string().uuid(),
    name: inputFieldSchema
});
const putServiceMasterSchema = z.object({
    subTypeId: z.string().uuid(),
    name: inputFieldSchema
});

export { postServiceMasterSchema, putServiceMasterSchema };