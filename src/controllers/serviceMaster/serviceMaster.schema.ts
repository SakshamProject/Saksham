
import { z } from "zod";
import {inputFieldSchema} from "../schemas/zodSchemas.js";

const postServiceMasterSchema = z.object({
    subTypeId: z.string().uuid(),
    name: inputFieldSchema
});

export default postServiceMasterSchema;