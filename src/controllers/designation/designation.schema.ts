import { z,ZodType, TypeOf  } from "zod";


const postRequestSchema = z.object({
    stateId: z.string(),
    districtId:z.string() ,
    sevaKendraId: z.string(),
    designation: z.string(),
    featuresId:z.array(z.string()),
    assignedById : z.string()
});
type postRequestType = TypeOf<typeof postRequestSchema>;

export {postRequestSchema,postRequestType};