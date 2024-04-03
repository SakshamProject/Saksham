
import { z } from "zod";
import { inputFieldSchema } from "../../zodSchemas.js";

const postServiceMasterSchema = z.object({
    serviceTypeId: z.string().uuid(),
    name: inputFieldSchema
});
type postServiceMasterType = z.infer<typeof postServiceMasterSchema>;

const putServiceMasterSchema = z.object({
    serviceTypeId: z.string().uuid(),
    name: inputFieldSchema
});
type putServiceMasterType = z.infer<typeof putServiceMasterSchema>;

export { postServiceMasterSchema, putServiceMasterSchema, postServiceMasterType, putServiceMasterType };