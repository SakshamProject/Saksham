
import { z } from "zod";
import {inputFieldSchema} from "../schemas/zodSchemas.js";

const postServiceMasterSchema = z.object({
    type: inputFieldSchema.optional(),
    subtype: inputFieldSchema.optional(),
    name: inputFieldSchema.optional()
})