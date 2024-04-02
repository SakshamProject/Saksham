import { Prisma } from "@prisma/client";
import { z } from "zod";
import inputFieldSchema from "../../inputField.js";
import { postRequestSchema } from "./serviceTypeSchema.js";

type getEducationalQualificationSchema = Prisma.EducationQualificationGetPayload<{}>;

type getEducationalQualificationWithTypeSchema = Prisma.EducationQualificationTypeGetPayload<{}>;

const educationalQualificationSchema = z.object ({
    id: inputFieldSchema.optional(),
    type: inputFieldSchema.transform((value) => value.toUpperCase()),
    subType:z.array(inputFieldSchema).transform((value) => value.map((subType) => subType.toUpperCase())),
})

type postRequestSchemaType = z.infer<typeof postRequestSchema>;

export {getEducationalQualificationWithTypeSchema}