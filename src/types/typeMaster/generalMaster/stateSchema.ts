import { Prisma } from "@prisma/client";
import { z } from "zod";
import inputFieldSchema from "../../inputFieldSchema.js";

type getStateSchema = Prisma.StateGetPayload<{}>;

const stateSchema = z.object({
  id: inputFieldSchema.optional(),
  name: inputFieldSchema,
});
type State = z.infer<typeof stateSchema>;

export { State, stateSchema, getStateSchema };
