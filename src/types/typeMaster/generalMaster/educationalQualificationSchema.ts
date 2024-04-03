import { Prisma } from "@prisma/client";
import inputFieldSchema from "../../inputFieldSchema.js";
import { z } from "zod";

type getEducationalQualificationTypeSchema =
  Prisma.EducationQualificationTypeGetPayload<{}>;

const postRequestEducationQualification = z.object({
  id: inputFieldSchema.optional(),
  educationQualificationTypeName: inputFieldSchema.transform((value) =>
    value.toUpperCase()
  ),
  educationQualificationName: z
    .array(inputFieldSchema)
    .transform((value) =>
      value.map((serviceName) => serviceName.toUpperCase())
    ),
});

type postEducationalQualificationBodyType = z.infer<
  typeof postRequestEducationQualification
>;

type postEducationalQualificationType =
  Prisma.EducationQualificationTypeCreateInput;

type postEducationQualification = Prisma.EducationQualificationCreateInput;

export {
  getEducationalQualificationTypeSchema,
  postRequestEducationQualification,
  postEducationQualification,
  postEducationalQualificationBodyType,
  postEducationalQualificationType,
};
