import { z } from "zod";
import {inputFieldSchema} from "../schemas/zodSchemas.js";

const postServiceMappingSchema = z.object({
    type: inputFieldSchema,
    subtype: inputFieldSchema,
    name: inputFieldSchema
});

export default postServiceMappingSchema;