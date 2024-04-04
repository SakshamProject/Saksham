import { Prisma } from "@prisma/client";
import { z } from "zod";
import inputFieldSchema from "../../inputFieldSchema.js";

type getEducationalQualificationTypeSchema = Prisma.EducationQualificationTypeGetPayload<{}>;

type getEducationQualificationTypeWithEducationQualificationSchema = Prisma.EducationQualificationTypeGetPayload<{
    include: {
        educationQualification: true,
    }
}>

type getSelectedEducationQualificationSchema = Prisma.EducationQualificationGetPayload<{
    select:{
        id:true,
        name:true
    }
}>

const postRequestEducationQualification = z.object({
    id: inputFieldSchema.optional(),
    name: inputFieldSchema.transform((value) => value.toUpperCase()),
    educationQualification: z.array(inputFieldSchema).transform((value) => value.map((educationQualificationName) => educationQualificationName.toUpperCase()))
})

const educationQualificationNameSchema = z.object({
    id: inputFieldSchema.optional(),
    name: inputFieldSchema.transform((value) => value.toUpperCase()),
});

const updateEducationQualificationTypeRequestSchema = z.object({
    id: inputFieldSchema.optional(),
    name: inputFieldSchema.transform((value) => value.toUpperCase()),
    educationQualification: z.array(educationQualificationNameSchema)
});

type updateEducationQualificationTypeRequestSchemaType = z.infer<typeof updateEducationQualificationTypeRequestSchema>;

type educationQualificationNameSchemaType  = z.infer<typeof educationQualificationNameSchema>;

type postEducationalQualificationBodyType = z.infer<
  typeof postRequestEducationQualification
>;

type postEducationalQualificationType =
  Prisma.EducationQualificationTypeCreateInput;

type postEducationQualification = Prisma.EducationQualificationCreateInput;

type updateEducationQualificationTypeType = Prisma.EducationQualificationTypeUpdateInput;

export {getEducationalQualificationTypeSchema, 
    postRequestEducationQualification, 
    postEducationQualification, 
    postEducationalQualificationBodyType, 
    postEducationalQualificationType,
    updateEducationQualificationTypeRequestSchema,
    updateEducationQualificationTypeRequestSchemaType,
    updateEducationQualificationTypeType,
    educationQualificationNameSchemaType,
    getEducationQualificationTypeWithEducationQualificationSchema,
    getSelectedEducationQualificationSchema}