import { z } from "zod";
import { orderByDirection } from "../models/json.js";

const getRequestSchema = z.object({
  rows: z.coerce.number().positive().optional(),
  start: z.coerce
    .number()
    .positive()
    .transform((val) => val - 1)
    .optional(),
  orderBy: z.string().optional(),
  reverse: z.nativeEnum(orderByDirection).optional(),
});
export default getRequestSchema;
