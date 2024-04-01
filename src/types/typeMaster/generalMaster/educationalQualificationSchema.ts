import { Prisma } from "@prisma/client";
import { z } from "zod";
import inputFieldSchema from "../../inputField.js";

type getEducationalQualificationSchema = Prisma.EducationQualificationGetPayload<{}>;

const educationalQualificationSchema = z.object ({
    
})

export {getEducationalQualificationSchema}