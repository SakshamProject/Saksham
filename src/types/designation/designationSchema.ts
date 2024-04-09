import { z } from "zod";
import { Prisma } from "@prisma/client";
import inputFieldSchema from "../inputFieldSchema.js";

const postDesignationRequestSchema = z.object({
  stateId: z.string(),
  districtId: z.string(),
  sevaKendraId: z.string(),
  designation: z.string().toUpperCase(),
  featuresId: z.array(z.string()).min(1),
});

type postDesignationRequestSchemaType = z.infer<
  typeof postDesignationRequestSchema
>;

type postDesignationType = Prisma.DesignationCreateInput;

type postFeaturesOnDesignationsType = Prisma.FeaturesOnDesignationsCreateInput;

const featuresSchema = z.object({
  id: inputFieldSchema,
  name: inputFieldSchema.transform((value) => value.toUpperCase()).optional(),
});


const updateDesignationRequestSchema = z.object({
  stateId: z.string(),
  districtId: z.string(),
  sevaKendraId: z.string(),
  designation: z.string().toUpperCase(),
  features: z.array(featuresSchema),
})

type updateDesignationRequestSchemaType =  z.infer<
typeof updateDesignationRequestSchema
>;
type featuresSchemaType =  z.infer<
typeof featuresSchema
>;
type updateDesignationObjectType = Prisma.DesignationUpdateInput;

export {
  postDesignationRequestSchema,
  postDesignationRequestSchemaType,
  postDesignationType,
  postFeaturesOnDesignationsType,
  updateDesignationRequestSchema,
  updateDesignationRequestSchemaType,
  updateDesignationObjectType,
  featuresSchemaType
};
