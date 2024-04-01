import { Prisma } from "@prisma/client";
import { z } from "zod";
import inputFieldSchema from "../../inputField.js";

type getEducationalQualificationSchema = Prisma.EducationalQualificationGetPayload<{}>;

export {getEducationalQualificationSchema}