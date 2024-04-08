import { z } from "zod";
import prisma from "../../services/database/database.js";
import { Prisma } from "@prisma/client";

const postDesignationRequestSchema = z.object({
  stateId: z.string(),
  districtId: z.string(),
  sevaKendraId: z.string(),
  designation: z.string(),
  featuresId: z.array(z.string()),
});

type postDesignationRequestSchemaType = z.infer<
  typeof postDesignationRequestSchema
>;

type postDesignationType = Prisma.DesignationCreateInput;

type postFeaturesOnDesignationsType = Prisma.FeaturesOnDesignationsCreateInput;

export {
  postDesignationRequestSchema,
  postDesignationRequestSchemaType,
  postDesignationType,
  postFeaturesOnDesignationsType,
};
