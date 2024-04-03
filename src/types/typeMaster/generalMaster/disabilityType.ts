import { z } from "zod";
import inputFieldSchema from "../../inputFieldSchema.js";
import { Prisma, PrismaClient } from "@prisma/client";

type postDisabilityTypeType = Prisma.DisabilityTypeCreateInput;

type postDisabilitySubTypeType = Prisma.DisabilitySubTypeCreateInput;

const disabilityTypeRequestSchema = z.object({
    id: inputFieldSchema.optional(),
    disabilityType: inputFieldSchema.transform((value) => value.toUpperCase()),
    disabilitySubType: z
      .array(inputFieldSchema)
      .transform((value) =>
        value.map((disabilitySubType) => disabilitySubType.toUpperCase())
      ),
  });

  type disabilityTypeRequestSchemaType = z.infer<typeof disabilityTypeRequestSchema>;



export {postDisabilityTypeType,postDisabilitySubTypeType,disabilityTypeRequestSchemaType,disabilityTypeRequestSchema};
