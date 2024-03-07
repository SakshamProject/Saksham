
import { z } from "zod";
import {inputFieldSchema} from "../schemas/zodSchemas.js";

const postServiceMasterSchema = z.object({
    type: inputFieldSchema,
    subtype: inputFieldSchema,
    name: inputFieldSchema
});

export default postServiceMasterSchema;