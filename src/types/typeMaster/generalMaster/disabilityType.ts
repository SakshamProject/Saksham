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

const disabilitySchema = z.object({
  id: inputFieldSchema.optional(),
  name: inputFieldSchema.transform((value) => value.toUpperCase()),
});

const updateDisabilityTypeRequestSchema = z.object({
  id: inputFieldSchema.optional(),
  disabilityType: inputFieldSchema.transform((value) => value.toUpperCase()),
  disabilitySubType: z.array(disabilitySchema).optional(),
});

type updateDisabilityTypeRequestSchemaType = z.infer<
  typeof updateDisabilityTypeRequestSchema
>;

type disabilityTypeRequestSchemaType = z.infer<
  typeof disabilityTypeRequestSchema
>;

type updateDisabilityTypeType = Prisma.DisabilityTypeUpdateInput;

type disabilitySchemaType = z.infer<typeof disabilitySchema>;


type getDisabilityTypeWithdisabilitySubTypeSchema = Prisma.DisabilityTypeGetPayload<{
  include: {
    disability: true;
  };
}>;

type getSelectedDisabilitySubTypeSchema = Prisma.DisabilitySubTypeGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

export {
  postDisabilityTypeType,
  postDisabilitySubTypeType,
  disabilityTypeRequestSchemaType,
  disabilityTypeRequestSchema,
  updateDisabilityTypeType,
  updateDisabilityTypeRequestSchemaType,
  getDisabilityTypeWithdisabilitySubTypeSchema,
  disabilitySchemaType,
  updateDisabilityTypeRequestSchema,
  getSelectedDisabilitySubTypeSchema

};
